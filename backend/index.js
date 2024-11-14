const express = require("express");
const rootRouter = require("./routes/index");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/v1", rootRouter);

app.listen(3011, () => {
  console.log("server started at port 3011");
});
