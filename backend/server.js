import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("ZenLink backend running 🚀");
});

app.post("/profile", (req, res) => {
  console.log("Incoming body:", req.body);

  const { name, bio, links } = req.body;

  if (!name || !bio) {
    return res.status(400).json({
      success: false,
      message: "Name and bio are required",
    });
  }

  return res.json({
    success: true,
    message: "Profile saved successfully 🎉",
    data: { name, bio, links },
  });
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
