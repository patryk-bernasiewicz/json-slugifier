const {
  readdir,
  readFile,
  writeFile,
  access,
  exists,
  constants,
  mkdirSync
} = require("fs");
const { join } = require("path");
const jsonMap = require("./lib/json-map");
const slugifyItem = require("./lib/slugify-item");

const srcDir = "src/";
const distDir = "dist/";

const param =
  (process.argv.find(e => e.match(/^--param=(.*?) ?$/)) || "")
    .replace("--param=", "")
    .trim() || "name";

const srcPath = join(__dirname, srcDir);

exists(srcPath, existsResult => {
  if (!existsResult) return;

  readdir(srcPath, {}, (err, files) => {
    if (err) {
      throw new Error("Directory read error: " + err);
      return;
    }

    if (files) {
      files.forEach(file => {
        const filePath = join(srcPath, file);
        access(filePath, constants.F_OK, err => {
          if (err) {
            throw new Error("File access error: " + err);
          }

          readFile(filePath, "utf8", (err, data) => {
            if (err) {
              throw new Error("File read error: " + err);
            }

            const slugs = [];
            const newArray = jsonMap(data, element => {
              if (!element[param]) {
                throw new Error(
                  `Param ${param} does not exist on given element: ${JSON.stringify(
                    element
                  )}`
                );
              }

              let slug;
              let i = 0;
              do {
                slug = (i > 0 ? `${i}-` : "") + slugifyItem(element[param]);
                i++;
              } while (slugs.includes(slug));

              slugs.push(slug);

              return { ...element, slug };
            });

            const _distDir = join(__dirname, distDir);
            access(_distDir, constants.F_OK, err => {
              if (err) {
                mkdirSync(_distDir);
              }

              const distPath = join(distDir, file);

              writeFile(distPath, JSON.stringify(newArray, null, 2), err => {
                if (err) {
                  throw new Error("File write error: " + err);
                }
              });
            });
          });
        });
      });
    }
  });
});
