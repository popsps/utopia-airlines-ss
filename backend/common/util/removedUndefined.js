const removeUndefined = query => {
  return Object.entries(query)
    .filter(([,value]) => value != null)
    .reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});
};

module.exports = { removeUndefined };