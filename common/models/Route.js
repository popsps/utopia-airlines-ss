const { Model } = require("sequelize");
const { sequelize } = require("../db");

class Route extends Model {
  toJSON() {
    const values = this.get();
    if (values.origin) delete values.originId;
    if (values.destination) delete values.destinationId;
    return values;
  }
}

Route.init({}, {
  tableName: "route",
  freezeTableName: true,
  sequelize,
});

module.exports = { Route };