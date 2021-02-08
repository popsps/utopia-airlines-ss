const createReplacer = ({ type = "slim" }) => {
  const replacer = (_key, value) =>  {
    if (Array.isArray(value)) return value.map((value) => replacer(null, value));
    return value?.toJSON?.length === 1
      ? value.toJSON(type)
      : value;
  };
  return replacer;
};

module.exports = { createReplacer };