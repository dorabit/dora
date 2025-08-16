// Dora Bot - بوت مسنجر بالعربي
// المطور: حمودي سان 🇸🇩
// الفيسبوك: https://www.facebook.com/babasnfor80
// الانستجرام: hmoodysan606

import fs from "fs";
import path from "path";
import login from "./logins/fcax/fb-chat-api/index.js"; 
import { fileURLToPath } from "url";

// ---- اعدادات البوت ---- //
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = JSON.parse(fs.readFileSync("./config.json", "utf-8"));
const prefix = config.prefix || "!";

// ---- تحميل جميع الأوامر من مجلد "الأوامر" ---- //
let commands = {};
const commandsPath = path.join(__dirname, "الأوامر");
const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith(".js"));

for (const file of commandFiles) {
  const command = await import(path.join(commandsPath, file));
  if (command.default && command.default.name) {
    commands[command.default.name] = command.default;
  }
}

console.log(`✅ تم تحميل ${Object.keys(commands).length} أوامر.`);

// ---- تسجيل الدخول للبوت ---- //
login({ appState: JSON.parse(fs.readFileSync("appstate.json", "utf-8")) }, (err, api) => {
  if (err) return console.error(err);

  console.log(`🚀 Dora Bot شغال الآن...`);
  console.log(`المطور: حمودي سان 🇸🇩`);

  // رسالة ترحيب أول ما يشتغل البوت
  api.sendMessage(
    {
      body: "🌸 مرحبا بكم في بوت دورا احبكم سنافري 💋",
      attachment: fs.createReadStream("./welcome.jpg"),
    },
    config.mainThreadID
  );

  // ---- الاستماع للرسائل ---- //
  api.listenMqtt((err, event) => {
    if (err) return console.error(err);

    // تجاهل الرسائل من البوت نفسه
    if (event.senderID == api.getCurrentUserID()) return;

    // لو الرسالة مش أمر
    if (!event.body || !event.body.startsWith(prefix)) return;

    const args = event.body.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = commands[commandName];
    if (!command) return;

    try {
      command.execute(api, event, args);
    } catch (e) {
      console.error(e);
      api.sendMessage("❌ حصل خطأ أثناء تنفيذ الأمر", event.threadID);
    }
  });
});
