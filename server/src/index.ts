import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 API running on http://localhost:${PORT}`);
});
