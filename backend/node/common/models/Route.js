const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../db");

class Route extends Model {
  static associate({ Airport, Flight }) {
    Route.belongsTo(Airport, {
      foreignKey: {
        name: "originId",
        field: "origin_id",
        allowNull: false,
      },
      as: "origin",
    });
    Route.belongsTo(Airport, {
      foreignKey: {
        name: "destinationId",
        field: "destination_id",
        allowNull: false,
      },
      as: "destination",
    });
    Route.hasMany(Flight, {
      foreignKey: {
        name: "routeId",
        field: "route_id",
        allowNull: false,
      },
      as: "flights",
    });
  }

  toJSON() {
    const values = this.get();
    if (values.origin) delete values.originId;
    if (values.destination) delete values.destinationId;
    return values;
  }
}

Route.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id",
  },
  originId: {
    type: DataTypes.STRING,
    field: "origin_id",
    allowNull: false,
  },
  destinationId: {
    type: DataTypes.STRING,
    field: "destination_id",
    allowNull: false,
  },
}, {
  tableName: "route",
  freezeTableName: true,
  sequelize,
});

module.exports = { Route };
