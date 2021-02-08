const createReplacer = ({ type = "slim" }) => (_key, value) =>  value?.toJSON?.length === 1
  ? value.map((passenger) => passenger.toJSON(type))
  : value;

module.exports = { createReplacer };