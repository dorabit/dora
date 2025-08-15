const axios = require("axios");

module.exports = {
  config: {
    name: "catgpt",
    description: "احصل على رد ظريف من ChatGPT عن القطط 😺",
    usage: "<السؤال>",
    cooldown: 3
  },

  run: async function({ api, event, args }) {
    const question = args.join(" ");
    if (!question) return api.sendMessage("❌ اكتب سؤالك عن القطط.", event.threadID, event.messageID);

    try {
      const res = await axios.post("https://api.openai.com/v1/chat/completions", {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `أجب على هذا السؤال بطريقة مضحكة وكأنك قط: ${question}` }]
      }, {
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      });

      api.sendMessage(res.data.choices[0].message.content.trim(), event.threadID, event.messageID);
    } catch (err) {
      console.error(err);
      api.sendMessage("⚠️ لم أتمكن من التحدث كقط الآن 😿", event.threadID, event.messageID);
    }
  }
};
