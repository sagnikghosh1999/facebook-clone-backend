const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");

const { readdirSync } = require("fs");
const connectDatabase = require("./database/database");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.get("/", (req, res) => {
  res.send("HelloWorld");
});

//routes
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

//database connection
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`app is listening on http://localhost:${process.env.PORT}`);
});

//Unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});
