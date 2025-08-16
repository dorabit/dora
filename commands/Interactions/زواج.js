// marry.js - Dora Bot
// المطور: حمودي سان 🇸🇩
module.exports.config = {
  name: "زواج",
  version: "1.0",
  author: "حمودي سان 🇸🇩",
  description: "زواج وهمي بين عضوين",
  usages: ["زواج @مستخدم"],
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  if (!event.mentions || Object.keys(event.mentions).length < 1) {
    return api.sendMessage("👰 لازم تعمل منشن للشخص اللي عايز تتزوجه 💍", event.threadID);
  }
  const mention = Object.keys(event.mentions)[0];
  api.sendMessage(`💞 تم الزواج بين ${event.senderID} و ${mention} 🎉`, event.threadID);
};
