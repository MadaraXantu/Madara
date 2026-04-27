const axios = require("axios");

const API = "https://noobs-api.top/dipto/baby";

module.exports.config = {
  name: "bby",
  aliases: ["baby","bot"],
  version: "1.0",
  author: "Antu"
};

module.exports.onStart = async ({ api, event, args }) => {
  const text = args.join(" ");
  const uid = event.senderID;

  try {

    if (!text) {
      return api.sendMessage("Bolo 😌", event.threadID, event.messageID);
    }

    if (text.startsWith("teach ")) {
      const p = text.replace("teach ", "").split(" - ");
      if (p.length < 2) return api.sendMessage("Format: teach msg - reply", event.threadID);

      const res = await axios.get(
        `${API}?teach=${encodeURIComponent(p[0])}&reply=${encodeURIComponent(p[1])}&senderID=${uid}`
      );

      return api.sendMessage(res.data.message, event.threadID);
    }

    if (text.startsWith("remove ")) {
      const msg = text.replace("remove ", "");
      const res = await axios.get(
        `${API}?remove=${encodeURIComponent(msg)}&senderID=${uid}`
      );

      return api.sendMessage(res.data.message, event.threadID);
    }

    const res = await axios.get(
      `${API}?text=${encodeURIComponent(text)}&senderID=${uid}`
    );

    return api.sendMessage(res.data.reply || "API Off 😿", event.threadID, event.messageID);

  } catch (e) {
    console.log(e);
    api.sendMessage("Error 😿", event.threadID);
  }
};

module.exports.onReply = async ({ api, event }) => {
  try {
    const res = await axios.get(
      `${API}?text=${encodeURIComponent(event.body)}&senderID=${event.senderID}`
    );

    return api.sendMessage(res.data.reply || "API Off 😿", event.threadID);
  } catch {}
};

module.exports.onChat = async ({ api, event }) => {
  try {
    const body = event.body?.toLowerCase();
    if (!body) return;

    if (body.startsWith("baby") || body.startsWith("bby") || body.startsWith("bot")) {
      const msg = body.replace(/^\S+\s*/, "");

      if (!msg) {
        return api.sendMessage("Hmm 😌", event.threadID);
      }

      const res = await axios.get(
        `${API}?text=${encodeURIComponent(msg)}&senderID=${event.senderID}`
      );

      return api.sendMessage(res.data.reply || "API Off 😿", event.threadID);
    }

  } catch (e) {
    console.log(e);
  }
};
