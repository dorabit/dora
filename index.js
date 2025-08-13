async checkVersion() {
    try {
        const pinkGradient = gradient(["#ff00ff", "#ff99ff"]); // تدرج لوني وردي
        console.log(pinkGradient(`       
█▄▀ ▄▀█ █▀▀ █░█ █▄█ ▄▀█
█░█ █▀█ █▄█ █▄█ ░█░ █▀█
`));

        // اسم البوت والمطور من config.js
        console.log(`${gradient(["#ff99ff", "#ff00ff"])("[ BOT ]: ")} ${gradient("cyan", "pink")(this.currentConfig.BOT_NAME)}`);
        console.log(`${gradient(["#ff99ff", "#ff00ff"])("[ Developer ]: ")} ${gradient("cyan", "pink")(this.currentConfig.DEVELOPER_NAME)}`);

        // الرسالة الترحيبية
        console.log(gradient(["#00ff00", "#00ffff"])("💬 احبكم سنافري 💚"));

        const { data } = await axios.get("https://raw.githubusercontent.com/Tshukie/Kaguya-Pr0ject/master/package.json");
        if (semver.lt(this.package.version, (data.version ??= this.package.version))) {
            log([{ message: "[ SYSTEM ]: ", color: "yellow" }, { message: `New Update: contact the owner`, color: "white" }]);
        }

        this.emit("system:run"); // تشغيل النظام مباشرة بدون إطار متحرك
    } catch (err) {
        this.emit("system:error", err);
    }
}
