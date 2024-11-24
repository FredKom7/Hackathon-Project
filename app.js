const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const chatbotRoutes = require("./routes/chatbot");
const fileManagementRoutes = require("./routes/file-management");
const sessionAnalyticsRoutes = require("./routes/session-analytics");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/files", fileManagementRoutes);
app.use("/api/sessions", sessionAnalyticsRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
