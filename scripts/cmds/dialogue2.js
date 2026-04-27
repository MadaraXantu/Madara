const axios = require("axios");

module.exports = {
  config: {
    name: "dialogue2",
    version: "1.0",
    author: "Antu",
    countDown: 3,
    role: 0,
    shortDescription: "Anime dialogue API",
    longDescription: "Get anime character dialogues",
    category: "anime",
    guide: "{p}dialogue2 <name>"
  },

  onStart: async function ({ message, args }) {
    const name = args.join(" ").toLowerCase();

    if (!name) {
      return message.reply("❌ Use: /dialogue2 naruto");
    }

    try {
      // এখানে তোর JSON link দিবি
      const url = "https://your-link.com/dialogues.json";

      const res = await axios.get(url);
      const data = res.data;

      const list = data[name];

      if (!list) {
        return message.reply("❌ Character not found in database!");
      }

      const random = list[Math.floor(Math.random() * list.length)];

      return message.reply(
        `🔥 ${name.toUpperCase()}:\n\n"${random}"`
      );

    } catch (e) {
      console.log(e);
      return message.reply("❌ Database load failed!");
    }
  }
};
