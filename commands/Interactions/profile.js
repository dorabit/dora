// avatar.js - Dora Bot
// المطور: حمودي سان 🇸🇩
const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "صورة",
  version: "1.0",
  author: "حمودي سان 🇸🇩",
  description: "عرض صورة البروفايل",
  usages: ["صورة"],
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const id = event.senderID;
  const url = `https://graph.facebook.com/${id}/picture?width=512&height=512`;
  const imgPath = path.join(__dirname, "avatar.jpg");

  const { data } = await axios.get(url, { responseType: "arraybuffer" });
  fs.writeFileSync(imgPath, Buffer.from(data, "utf-8"));

  api.sendMessage({
    body: "🖼️ هذه صورتك الشخصية:",
    attachment: fs.createReadStream(imgPath)
  }, event.threadID, () => fs.unlinkSync(imgPath));
};
