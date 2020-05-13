const Telegraf = require("telegraf");
const Stage = require("telegraf/stage");
const session = require("telegraf/session");
const WizardScene = require("telegraf/scenes/wizard");

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply(`Bienvenidos al geodaveyBot!`);
});

bot.command("chat_id", (ctx) => {
  ctx.reply(`Chat ID: ${ctx.update.message.chat.id}`);
});

//
// update Loc
//

const updateLoc = new WizardScene(
  "update_loc",
  (ctx) => {
    ctx.reply("Where are you?");
    return ctx.wizard.next();
  },
  (ctx) => {
    // validation
    if (typeof ctx.message.location === "undefined") return ctx.wizard.back();

    ctx.wizard.state.location = ctx.message.location;

    ctx.reply("What is the location name?");
    return ctx.wizard.next();
  },
  (ctx) => {
    ctx.wizard.state.loc_name = ctx.message.text.trim();
    return ctx.scene.next();
  },
  (ctx) => {
    let state = ctx.wizard.state;

    ctx.reply(
      "Location: ${state.location.longitude}, ${state.location.latitude}\nName: ${state.loc_name}"
    );
    
    return ctx.scene.leave();
  }
);

const stage = new Stage([updateLoc]);

bot.use(session());
bot.use(stage.middleware());

bot.command("update_loc", (ctx) => {
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
