import "dotenv/config";
import cors from "cors";
import express from "express";
import tasksRoute from "./routes/tasks.route.js";
import securityRoute from "./routes/security.route.js";
import financeRoute from "./routes/finance.route.js";
import tradingRoute from "./routes/trading.route.js";
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3001;
app.use("/tasks", tasksRoute);
app.use("/security", securityRoute);
app.use("/finance", financeRoute);
app.use("/trading", tradingRoute);
app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 API running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map