const Telegraf = require("telegraf");
const Stage = require("telegraf/stage");
const Markup = require("telegraf/markup");
const session = require("telegraf/session");
const WizardScene = require("telegraf/scenes/wizard");

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply(`Bienvenidos al geodaveyBot!`);
});

//
// update Loc
//

const updateLoc = new WizardScene(
  "update_loc",
  // Ask for location
  (ctx) => {
    ctx.reply("Where are you?");
    return ctx.wizard.next();
  },
  // Validate location
  (ctx) => {
    if (typeof ctx.message.location === "undefined") ctx.wizard.back();
    else ctx.wizard.next();

    return ctx.wizard.steps[ctx.wizard.cursor](ctx);
  },
  // Ask for location name
  (ctx) => {
    ctx.wizard.state.location = ctx.message.location;

    ctx.reply("What is the location name?");
    return ctx.wizard.next();
  },
  // Validate location name
  (ctx) => {
    ctx.wizard.state.loc_name = ctx.message.text.trim();

    ctx.wizard.next();
    return ctx.wizard.steps[ctx.wizard.cursor](ctx);
  },
  // Ask for verification
  (ctx) => {
    let state = ctx.wizard.state;

    ctx.reply(
      `Is this OK?\n` +
        `ULOC: ${state.location.longitude}, ${state.location.latitude}\n` +
        `UNAM: ${state.loc_name}`,
      Markup.inlineKeyboard([
        Markup.callbackButton("Yes", "submit_loc"),
        Markup.callbackButton("No", "discard_loc"),
      ])
    );
  },
  (ctx) => {
    return ctx.scene.leave();
  }
);

bot.action("submit_loc", (ctx) => {
  ctx.reply("Saved!");
  let state = ctx.wizard.state;
  console.log(state);
});

bot.action("discard_loc", (ctx) => {
  ctx.reply("(discarded)");
});

// Initialize bot with session & stage middleware
const stage = new Stage([updateLoc]);
bot.use(session());
bot.use(stage.middleware());

// Commands
bot.command("update_loc", (ctx) => {
  ctx.scene.enter("update_loc");
});

bot.command("chat_id", (ctx) => {
  ctx.reply(`Chat ID: ${ctx.update.message.chat.id}`);
});

// Netlify process webhook from Telegram API
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
