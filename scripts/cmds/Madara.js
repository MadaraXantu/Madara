module.exports = {
  config: {
    name: "dialogue",
    version: "1.0",
    author: "Antu",
    countDown: 5,
    role: 0,
    shortDescription: "Madara dialogue",
    longDescription: "Random Madara Uchiha dialogue",
    category: "fun",
    guide: "{pn}"
  },

  onStart: async function ({ message }) {
    const dialogues = [
      "Wake up to reality! Nothing ever goes as planned in this accursed world.",
      "The longer you live, the more you realize that reality is just made of pain.",
      "In this world, wherever there is light, there are also shadows.",
      "The concept of hope is nothing more than giving up.",
      "When a man learns to love, he must bear the risk of hatred.",
      "Only power decides everything.",
      "Reality is cruel, dreams are fake.",
      "Weakness disgusts me.",
      "Peace is a lie.",
      "Pain is the best teacher.",
      "The cycle of hatred never ends.",
      "Darkness reveals truth.",
      "Bow before the Uchiha.",
      "I am the ghost of the Uchiha.",
      "My name alone brings fear.",
      "The battlefield is my home.",
      "This world is beyond saving.",
      "My power knows no bounds.",
      "I am unstoppable.",
      "Fight me if you dare."
    ];

    const random = dialogues[Math.floor(Math.random() * dialogues.length)];
    message.reply(`🌀 Madara Uchiha says:\n\n"${random}"`);
  }
};
