const {Model, DataTypes} = require("sequelize");
const bcrypt = require("bcrypt");

const saltRounds = 10;
const hash = async (data) => bcrypt.hash(data, await bcrypt.genSalt(saltRounds));

class User extends Model {
  async comparePassword(password) {
    return bcrypt.compare(password, this.password);
  }
}

User.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: "user",
  timestamps: false,
  freezeTableName: true,
  hooks: {
    async beforeSave(user) {
      if (user.changed("password")) {
        user.password = await hash(user.password);
      }
    }
  }
});

module.exports = User;