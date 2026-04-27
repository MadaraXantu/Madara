const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "ownerswifey",
    aliases: ["owinfo"],
    version: "1.2",
    author: "Antu",
    role: 0,
    shortDescription: { en: "Show owner gf info" },
    category: "owner"
  },

  onStart: async function ({ message }) {

    const name = "Priya";
    const className = "9";
    const status = "Mingle 👀";
    const fb = "https://www.facebook.com/profile.php?";

    const videoLink = "VD LINK";

    const timeBD = moment().tz("Asia/Dhaka");

    const msg =
`╭━━━ 💖 𝗢𝗪𝗡𝗘𝗥 𝗪𝗜𝗙𝗘𝗬 𝗣𝗥𝗢𝗙𝗜𝗟𝗘 ━━━╮
┃
┃ 👩 Name   : ${name}
┃ 🎓 Class  : ${className}
┃ 💌 Status : ${status}
┃ 🔗 FB     : ${fb}
┃ 🎬 Video  : ${videoLink}
┃
╰━━━━━━━━━━━━━━━━━━━━━━━╯

⏰ ${timeBD.format("DD MMM YYYY | hh:mm A")}`;

    return message.reply(msg);
  },

  onChat: async function ({ event, message }) {
    if (event.body?.toLowerCase() === "ownerswifey") {
      return this.onStart({ message, event });
    }
  }
};
