module.exports = (json, mapFn) => {
  const data = JSON.parse(json);
  if (Array.isArray(data)) {
    return data.map(mapFn);
  }
  return false;
};
