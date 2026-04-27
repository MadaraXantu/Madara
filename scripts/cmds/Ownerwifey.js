const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "owner",
    aliases: ["adminwifeinfo", "info", "ownerwifeyinfo"],
    version: "3.0",
    author: "Antu",
    countDown: 5,
    role: 0,
    shortDescription: { en: "Show ownerswifey info" },
    category: "owner",
    guide: { en: "{pn}" }
  },

  onStart: async function ({ api, event, message }) {

    const ownerName = "Priya [Kaguya]";
    const ownerAge = "15";
    const fbName = "Scarlet Rose";
    const messenger = "https://www.facebook.com/profile.php?"
    const address  = "Faridpur,Dhaka,BD";
    const religion = "Hindu"
    const relationship = "🌚🫶";
    const whatsapp[Antu]= "01879385410";
    const telegram[Antu]= "@xzantu999";
    const videoLink = "https://gofile.io/d/Eb3wW5";
    const timeBD = moment().tz("Asia/Dhaka");
    
    const infoMsg = 
`『 𝗢𝗪𝗡𝗘𝗥 𝗪𝗜𝗙𝗘𝗬'𝗦 𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗧𝗜𝗢𝗡 』
━━━━━━━━━━━━━━━━━━━━━━━━━

👤 𝗔𝗕𝗢𝗨𝗧 𝗠𝗘:
● Name: ${ownerName}
● Age: ${ownerAge}
● Relationship: ${relationship}
● Religion: ${religion}
● Address: ${address}

📞 𝗖𝗢𝗡𝗧𝗔𝗖𝗧 𝗗𝗘𝗧𝗔𝗜𝗟𝗦:
● Facebook: ${fbName}
● Fb Link: ${messenger}
● WhatsApp: ${whatsapp}
● Telegram: ${telegram}
● API Server: ${apiServer}

⏰ 𝗗𝗔𝗧𝗘 & 𝗧𝗜𝗠𝗘 (𝗕𝗗):
● ${timeBD.format("DD MMMM, YYYY")}
● ${timeBD.format("hh:mm:ss A")}
━━━━━━━━━━━━━━━━━━━━━━━━━`;

    try {
      return message.reply({
        body: infoMsg,
        attachment: await global.utils.getStreamFromURL(videoLink)
      });
    } catch (e) {
      return message.reply(infoMsg);
    }
  },

  onChat: async function ({ event, message }) {
    if (event.body?.toLowerCase() === "info") {
      return this.onStart({ message, event });
    }
  }
};
