const express = require("express");
const { db } = require("../firebase-config");
const router = express.Router();

// Track a new session
router.post("/track", async (req, res) => {
  const { userId, usageDuration } = req.body;

  if (!userId || !usageDuration) {
    return res.status(400).send({ error: "User ID and usage duration are required." });
  }

  try {
    const sessionData = {
      userId,
      loginTime: new Date().toISOString(),
      usageDuration,
    };
    await db.collection("sessions").add(sessionData);
    return res.status(200).send({ message: "Session tracked successfully." });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

// Fetch sessions
router.get("/", async (req, res) => {
  try {
    const sessionsSnapshot = await db.collection("sessions").get();
    const sessions = sessionsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return res.status(200).send(sessions);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

module.exports = router;
