const Telegraf = require("telegraf");
const Stage = require('telegraf/stage');
const WizardScene = require("telegraf/scenes/wizard");

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply(`Bienvenidos al geodaveyBot!`);
});

bot.command("chat_id", (ctx) => {
    ctx.reply(`Chat ID: ${ctx.update.message.chat.id}`)
});

//
// update Loc
//

const updateLoc = WizardScene(
    "update_loc",
    ctx => {
        ctx.reply("Where are you?");
        return ctx.wizard.next();
    },
    ctx => {
        ctx.wizard.state.location = ctx.message.location;
        ctx.reply(`Location: ${ctx.message.location}`);
        console.dir("message", ctx.message);
        console.log("location", ctx.message.location);
        returnctx.scene.leave();
    }
);

const stage = new Stage([updateLoc]);

bot.use(stage.middleware());

bot.command("update_loc", ctx => {
    ctx.scene.enter("update_loc");
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
