const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

const teleRoute = require("./tele");
app.use("/tele", teleRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
