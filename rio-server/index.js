const express = require("express");
const cors = require("cors");
const app = express();

const corsOptions = {
  // origin: "http://localhost:3000",
  origin: true,
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.post("/", (req, res) => {
  // options are not really necessary for the demo to work
  let options = {
    maxAge: 1000 * 60 * 15,
    httpOnly: true,
    signed: false
  };
  res.cookie("cookieName", "cookieValue", options);
  res.send("Hello World!");
});

app.listen(4000, () => console.log("Example app listening on port 4000!"));
