// kiss.js - Dora Bot
// المطور: حمودي سان 🇸🇩
module.exports.config = {
  name: "قبلة",
  version: "1.0",
  author: "حمودي سان 🇸🇩",
  description: "إرسال قبلة أنمي بين عضوين",
  usages: ["قبلة @مستخدم"],
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  if (!event.mentions || Object.keys(event.mentions).length < 1) {
    return api.sendMessage("😘 لازم تعمل منشن للشخص اللي عايز تبوسه 💋", event.threadID);
  }
  const mention = Object.keys(event.mentions)[0];
  api.sendMessage(`💋 ${event.senderID} بعت قبلة لـ ${mention}`, event.threadID);
};
