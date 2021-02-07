const removeUndefined = query => {
  return Object.entries(query)
    .filter(([,value]) => value != null)
    .reduce((query, [key, value]) => ({ ...query, [key]: value }), {});
};

module.exports = { removeUndefined };