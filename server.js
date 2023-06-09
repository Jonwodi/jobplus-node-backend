require("dotenv").config();
const app = require("./src/app");

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("Welcome to Jobplus Backend App");
});
