const { cmd, commands } = require("../command");
const { fetchJson, sleep } = require("../lib/functions");

cmd({
    pattern: "restart",
    desc: "Restart the bot JawadYTX",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup, senderNumber, reply
}) => {
    try {
        // Get the bot owner's number dynamically from conn.user.id
        const botOwner = conn.user.id.split(":")[0]; // Extract the bot owner's number
        if (senderNumber !== botOwner) {
            return reply("Only the bot owner can use this command.");
        }

        const { exec } = require("child_process");
        reply("Restarting...");
        await sleep(1500);
        exec("pm2 restart all");
    } catch (e) {
        console.error(e);
        reply(`${e}`);
    }
});

//fix random commands

cmd({
  pattern: ".",
  alias: [",", "?", "!", "*"],
  desc: "Handles blank commands.",
  category: "main",
  filename: __filename
}, async (conn, mek, m, { reply, sender }) => {
  try {

    return reply(
      {
        text: "*Example:* *. <text>*\n\nPlease provide input for the command.",
        contextInfo: {
          mentionedJid: [sender],
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363354023106228@newsletter",
            newsletterName: "JawadTechX",
            serverMessageId: 143
          }
        }
      }
    );
  } catch (error) {
    console.error(error);
    reply("An error occurred: " + error.message);
  }
});
