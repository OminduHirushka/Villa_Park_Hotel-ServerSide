import bodyParser from "body-parser";
import express from "express";

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  const name = "VILLA PARK";
  const message = "Welcome to " + name + " Hotel";

  res.json({
    message: message,
  });
  
  console.log(message);
});

app.listen(5000, (req, res) => {
  console.log("Server is running on port 5000");
});
