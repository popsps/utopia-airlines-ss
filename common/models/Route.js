const { Model } = require("sequelize");
const { sequelize } = require("../db");

class Route extends Model {
  toJSON() {
    return this.name;
  }
}

Route.init({}, {
  tableName: "route",
  underscored: true,
  timestamps: false,
  freezeTableName: true,
  sequelize,
});

module.exports = { Route };