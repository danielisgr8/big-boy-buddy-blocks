const express = require("express");
const app = express();
const port = 80;

app.use(express.static("../client/public", {
  extensions: ["html"]
}));

app.listen(port, () => console.log(`Server listening on port ${port}!`));
