const slugify = require("slugify");

const options = {
  replacement: "-",
  remove: /[*+~.()'"!:@„”]/g,
  lower: true
};

module.exports = item => {
  return slugify(item, options);
};
