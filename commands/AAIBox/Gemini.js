const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = {
  config: {
    name: "gemini",
    description: "اسأل نموذج Gemini من Google",
    usage: "<السؤال>",
    cooldown: 3
  },

  run: async function({ api, event, args }) {
    const question = args.join(" ");
    if (!question) return api.sendMessage("❌ اكتب سؤالك بعد الأمر.", event.threadID, event.messageID);

    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const result = await model.generateContent(question);
      api.sendMessage(result.response.text(), event.threadID, event.messageID);
    } catch (err) {
      console.error(err);
      api.sendMessage("⚠️ حدث خطأ أثناء الاتصال بـ Gemini.", event.threadID, event.messageID);
    }
  }
};
