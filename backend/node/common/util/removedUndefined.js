const removeUndefined = query => {
  return [
    ...Object.entries(query),
    ...Object.getOwnPropertySymbols(query)
      .map(key=> [key, query[key]]),
  ]
    .filter(([,value]) => value != null)
    .reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});
};

module.exports = { removeUndefined };