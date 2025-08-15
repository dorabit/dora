const axios = require('axios');

module.exports = {
  config: {
    name: "chatgpt",
    aliases: ["gpt", "ai"],
    description: "استخدم الذكاء الاصطناعي للإجابة على الأسئلة",
    usage: "<السؤال>",
    cooldown: 5
  },
  run: async function({ api, event, args }) {
    const question = args.join(" ");
    if (!question) return api.sendMessage("❌ من فضلك اكتب سؤال.", event.threadID);

    try {
      const res = await axios.post("https://api.openai.com/v1/chat/completions", {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: question }]
      }, {
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      });

      api.sendMessage(res.data.choices[0].message.content, event.threadID);
    } catch (err) {
      api.sendMessage("⚠️ حدث خطأ أثناء الاتصال بـ ChatGPT.", event.threadID);
      console.error(err);
    }
  }
};
