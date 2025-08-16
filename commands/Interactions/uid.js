// id.js - Dora Bot
// المطور: حمودي سان 🇸🇩
module.exports.config = {
  name: "id",
  version: "1.0",
  author: "حمودي سان 🇸🇩",
  description: "إظهار ID الخاص بالعضو",
  usages: ["id"],
  cooldowns: 3
};

module.exports.run = async function({ api, event }) {
  api.sendMessage(`🆔 ID الخاص بك: ${event.senderID}`, event.threadID);
};
