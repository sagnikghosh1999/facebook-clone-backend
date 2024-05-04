const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const { readdirSync } = require("fs");
const connectDatabase = require("./database/database");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

//routes
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

//database connection
connectDatabase();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});
