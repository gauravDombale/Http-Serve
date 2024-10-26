const express = require("express");
const app = express();

var users = [
  {
    name: "John",
    kidneys: [
      {
        healthy: false,
      },
      {
        healthy: true,
      },
      {
        healthy: true,
      },
    ],
  },
];

app.use(express.json()); //! This is a middleware that parses the body of the request.

app.get("/", (req, res) => {
  const JohnKidneys = users[0].kidneys;
  const NumberKidneys = JohnKidneys.length;
  const healthyKidneys = JohnKidneys.filter((kidney) => kidney.healthy);
  const unhealthyKidneys = JohnKidneys.filter((kidney) => !kidney.healthy);
  res.json({ JohnKidneys, NumberKidneys, healthyKidneys, unhealthyKidneys });
});

app.post("/add", (req, res) => {
  const isHealthy = req.body.isHealthy;
  users[0].kidneys.push({ healthy: isHealthy });
  res.json({ message: "Kidney added" });
});

app.put("/", (req, res) => {
  for (let i = 0; i < users[0].kidneys.length; i++) {
    if (!users[0].kidneys[i].healthy) {
      users[0].kidneys[i].healthy = true;
      res.json({ message: "Kidney healed" });
    } else {
      res.status(411).json({ message: "All kidneys are healthy" });
    }
  }
});

app.delete("/delete", (req, res) => {
  for (let i = 0; i < users[0].kidneys.length; i++) {
    if (!users[0].kidneys[i].healthy) {
      users[0].kidneys.splice(i, 1);
      i--;
      res.json({ message: "Unhealty Kidney removed" });
      return;
    }
  }
  res.status(411).json({ message: "All kidneys are healthy" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

//* NOTES:
//! When we want to send some data for a get request, we can use query parameters.
//! Query parameters are sent in the URL after the question mark (?).

//! For post requests, we can send data in the body of the request.
