require("dotenv").config();
const { app } = require("./app");

const PORT = process.env.PORT || process.argv[2] || 8090;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
