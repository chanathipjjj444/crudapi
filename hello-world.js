const express = require("express");
const app = express();
const port = 3000;

//return message when the user hit the endpoint with get request

app.get("/", (req, res) => {
  res.send("Hello world, from express");
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}`))


