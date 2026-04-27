const axios = require("axios");

module.exports = {
  config: {
    name: "dialogue2",
    version: "1.1",
    author: "Antu",
    category: "anime"
  },

  onStart: async function ({ message, args }) {

    const name = args.join(" ").toLowerCase();

    if (!name) {
      return message.reply("❌ Use: /dialogue2 naruto");
    }

    try {
      const url = `https://animechan.io/api/v1/quotes/random?character=${encodeURIComponent(name)}`;

      const res = await axios.get(url);

      const quote = res.data.data.content;
      const character = res.data.data.character.name;

      return message.reply(`🔥 ${character.toUpperCase()}:\n\n"${quote}"`);

    } catch (e) {

      // ⚡ fallback system (API fail হলে এটা চলবে)
      const fallback = {
        naruto: ["Believe it!", "I will become Hokage!", "Rasengan!"],
        sasuke: ["I walk alone.", "Power is everything.", "I am an avenger."],
        madara: ["Wake up to reality!", "Power decides everything."],
        gojo: ["I am the strongest.", "Infinity is unstoppable."]
      };

      const list = fallback[name];

      if (!list) {
        return message.reply("❌ No data found!");
      }

      const random = list[Math.floor(Math.random() * list.length)];

      return message.reply(`🔥 ${name.toUpperCase()}:\n\n"${random}"`);
    }
  }
};
