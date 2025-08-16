// wanted.js - Dora Bot
// المطور: حمودي سان 🇸🇩
const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "مطلوب",
  version: "1.0",
  author: "حمودي سان 🇸🇩",
  description: "يضع صورة العضو على خلفية مطلوب من ون بيس",
  usages: ["مطلوب"],
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const id = event.senderID;
  const url = `https://graph.facebook.com/${id}/picture?width=512&height=512`;
  const imgPath = path.join(__dirname, "wanted.jpg");

  const { data } = await axios.get(url, { responseType: "arraybuffer" });
  fs.writeFileSync(imgPath, Buffer.from(data, "utf-8"));

  api.sendMessage({
    body: "🔎 صورة المطلوب 😈",
    attachment: fs.createReadStream(imgPath)
  }, event.threadID, () => fs.unlinkSync(imgPath));
};
