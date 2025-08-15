const axios = require("axios");

module.exports = {
  config: {
    name: "gpt4",
    aliases: ["chatgpt4"],
    description: "اسأل ChatGPT نسخة 4",
    usage: "<السؤال>",
    cooldown: 3
  },

  run: async function({ api, event, args }) {
    const question = args.join(" ");
    if (!question) return api.sendMessage("❌ اكتب السؤال بعد الأمر.", event.threadID, event.messageID);

    try {
      const res = await axios.post("https://api.openai.com/v1/chat/completions", {
        model: "gpt-4",
        messages: [{ role: "user", content: question }]
      }, {
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      });

      api.sendMessage(res.data.choices[0].message.content.trim(), event.threadID, event.messageID);
    } catch (err) {
      console.error(err);
      api.sendMessage("⚠️ حدث خطأ أثناء الاتصال بـ GPT-4.", event.threadID, event.messageID);
    }
  }
};
