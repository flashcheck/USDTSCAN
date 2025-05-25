const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  const { message } = req.body;
  const botToken = process.env.BOT_TOKEN;
  const chatId = process.env.CHAT_ID;

  if (!message) return res.status(400).send("Missing message");

  try {
    await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      chat_id: chatId,
      text: message,
      parse_mode: "HTML",
    });
    res.status(200).send("Sent to Telegram");
  } catch (err) {
    res.status(500).send("Failed to send: " + err.message);
  }
});

module.exports = router;