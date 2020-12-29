const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const { sequelize } = require("../db");

const saltRounds = 10;
const hash = async (data) => bcrypt.hash(data, await bcrypt.genSalt(saltRounds));

class User extends Model {
  async comparePassword(password) {
    return bcrypt.compare(password, this.password);
  }
  toJSON() {
    const values = Object.assign({}, this.get());
    delete values.password;
    delete values.roleId;
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
}, {
  tableName: "user",
  underscored: true,
  timestamps: false,
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

module.exports = User;