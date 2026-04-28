const { config } = global.GoatBot;
const { writeFileSync } = require("fs-extra");

module.exports = {
	config: {
		name: "admin",
		aliases: ["operator"],
		version: "4.0",
		author: "Xalman",
		countDown: 5,
		role: 0,
		shortDescription: { en: "Manage bot operators" },
		longDescription: { en: "Add/remove/list bot operators" },
		category: "box chat",
		guide: {
			en:
				"{pn} add <uid/@tag/reply>\n" +
				"{pn} remove <uid/@tag/reply>\n" +
				"{pn} list"
		}
	},

	langs: {
		en: {
			added: "✅ | Added operator for %1 users:\n%2",
			alreadyAdmin: "⚠️ | %1 users already operator:\n%2",
			missingIdAdd: "⚠️ | Enter UID/tag/reply to add.",
			removed: "✅ | Removed operator of %1 users:\n%2",
			notAdmin: "⚠️ | %1 users are not operator:\n%2",
			missingIdRemove: "⚠️ | Enter UID/tag/reply to remove."
		}
	},

	onStart: async function ({ message, args, usersData, event, api, getLang }) {
		if (!config.adminBot) config.adminBot = [];

		const senderID = event.senderID;
		const OWNER = "61583288650615";

		let isThreadAdmin = false;
		try {
			const threadInfo = await api.getThreadInfo(event.threadID);
			isThreadAdmin = threadInfo.adminIDs.some(item => item.id == senderID);
		} catch (e) {}

		switch (args[0]) {

			case "add":
			case "-a": {
				if (senderID !== OWNER && !isThreadAdmin)
					return message.reply("❌ | Only Owner can add operator.");

				let uids = [];
				if (event.type == "message_reply")
					uids.push(event.messageReply.senderID);
				else if (Object.keys(event.mentions).length > 0)
					uids = Object.keys(event.mentions);
				else if (args.slice(1).length > 0)
					uids = args.slice(1).filter(arg => !isNaN(arg));

				if (uids.length == 0)
					return message.reply(getLang("missingIdAdd"));

				const addIds = [];
				const alreadyIds = [];

				for (const uid of uids) {
					if (config.adminBot.includes(uid))
						alreadyIds.push(uid);
					else
						addIds.push(uid);
				}

				config.adminBot.push(...addIds);

				const getNames = await Promise.all(
					uids.map(uid => usersData.getName(uid).then(name => ({ uid, name })))
				);

				writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));

				return message.reply(
					(addIds.length > 0
						? getLang("added", addIds.length,
							getNames.filter(i => addIds.includes(i.uid)).map(i => `• ${i.name} (${i.uid})`).join("\n"))
						: "") +
					(alreadyIds.length > 0
						? "\n" + getLang("alreadyAdmin", alreadyIds.length,
							alreadyIds.join("\n"))
						: "")
				);
			}

			case "remove":
			case "-r": {
				if (senderID !== OWNER && !isThreadAdmin)
					return message.reply("❌ | Only Owner can remove operator.");

				let uids = [];
				if (event.type == "message_reply")
					uids.push(event.messageReply.senderID);
				else if (Object.keys(event.mentions).length > 0)
					uids = Object.keys(event.mentions);
				else if (args.slice(1).length > 0)
					uids = args.slice(1).filter(arg => !isNaN(arg));

				if (uids.length == 0)
					return message.reply(getLang("missingIdRemove"));

				const removeIds = [];
				const notIds = [];

				for (const uid of uids) {
					if (config.adminBot.includes(uid))
						removeIds.push(uid);
					else
						notIds.push(uid);
				}

				for (const uid of removeIds)
					config.adminBot.splice(config.adminBot.indexOf(uid), 1);

				const getNames = await Promise.all(
					removeIds.map(uid => usersData.getName(uid).then(name => ({ uid, name })))
				);

				writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));

				return message.reply(
					(removeIds.length > 0
						? getLang("removed", removeIds.length,
							getNames.map(i => `• ${i.name} (${i.uid})`).join("\n"))
						: "") +
					(notIds.length > 0
						? "\n" + getLang("notAdmin", notIds.length,
							notIds.join("\n"))
						: "")
				);
			}

			case "list":
			case "-l": {
				const getNames = await Promise.all(
					config.adminBot.map(uid => usersData.getName(uid).then(name => ({ uid, name })))
				);

				const ownerBox =
`╭━━━〔 👑 OWNER 〕━━━╮
│ Name : XZ Antu (Madara)
│ UID  : ${OWNER}
╰━━━━━━━━━━━━━━━━━━━━╯`;

				const operatorsBox =
`╭━━〔 🛠 OPERATOR LIST 〕━━╮
${getNames.length > 0
? getNames.map(i => `│ • ${i.name} (${i.uid})`).join("\n")
: "│ No Operators Found"}
╰━━━━━━━━━━━━━━━━━━━━━━╯`;

				return message.reply(ownerBox + "\n\n" + operatorsBox);
			}

			default:
				return message.SyntaxError();
		}
	}
};
