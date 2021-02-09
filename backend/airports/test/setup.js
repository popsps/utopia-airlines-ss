const { sequelize } = require("@utopia-airlines-wss/common/db");

afterAll(async () => {
  sequelize.close();
});
