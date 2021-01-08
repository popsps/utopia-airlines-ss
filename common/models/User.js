const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const { sequelize } = require("../db");

const saltRounds = 10;
const hash = async (data) => bcrypt.hash(data, await bcrypt.genSalt(saltRounds));

class User extends Model {
  static associate({ UserRole, Booking }) {
    User.belongsTo(UserRole, {
      foreignKey: {
        name:"roleId",
        field: "role_id",
        allowNull: false,
      },
      as: "role",
    });
    User.hasMany(Booking,{
      foreignKey: {
        name: "bookerId",
        field: "booker_id",
        allowNull: false,
      },
      as: "bookings",
    });
  }
  async comparePassword(password) {
    return bcrypt.compare(password, this.password);
  }
  toJSON() {
    const { givenName: given, familyName: family, ...values } = this.get();
    values.name = { given, family };
    delete values.roleId;
    delete values.password;
    return values;
  }
}

User.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  givenName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  familyName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: "user",
  freezeTableName: true,
  hooks: {
    async beforeSave(user) {
      if (user.changed("password")) {
        user.password = await hash(user.password);
      }
    },
  },
  sequelize,
});

module.exports = { User };