const Telegraf = require("telegraf");

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply(`Bienvenidos al geodaveyBot!`);
  console.dir(ctx);
});

bot.command("chat_id", (ctx) => {
    ctx.reply(`Chat ID: ${ctx.update.message.chat.id}`)
});

exports.handler = async (event, context, callback) => {
  try {
    let body = event.body == "" ? {} : JSON.parse(event.body);
    await bot.handleUpdate(body);
    callback(null, {
      statusCode: 200,
      body: "",
    });
  } catch (e) {
    callback(e, {
      statusCode: 400,
      body: "error: for bots only",
    });
  }
};
