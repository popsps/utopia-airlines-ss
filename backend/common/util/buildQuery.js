const buildQuery = query => {
  return Object.entries(query)
    .filter(([,value]) => value)
    .reduce((query, [key, value]) => ({ ...query, [key]: value }), {});
};

module.exports = { buildQuery };