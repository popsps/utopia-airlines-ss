const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../db");

class BookingAgent extends Model {
  static associate({ User }) {
    BookingAgent.belongsTo(User, {
      foreignKey: {
        name: "agentId",
        field: "agent_id",
        allowNull: false,
      },
      as: "agent",
    });
  }
  toJSON() {
    const { agentId, agent } = this.get();
    return agent?.toJSON() ?? agentId;
  }
}

BookingAgent.init ({
  bookingId: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
}, {
  tableName: "booking_agent",
  freezeTableName: true,
  sequelize,
});


module.exports = { BookingAgent };