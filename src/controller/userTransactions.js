import { Scenes } from "telegraf";

// create a scene
export const addIncome = new Scenes.WizardScene(
  "user-transaction",
  (ctx) => {
    ctx.reply("Your amount");
    return ctx.wizard.next();
  },

  (ctx) => {
    ctx.wizard.state.amount = ctx.message.text;
    ctx.session.amount = ctx.message.text;
    ctx.reply("enter category");
    return ctx.wizard.next();
  },

  (ctx) => {
    ctx.wizard.state.category = ctx.message.text;
    ctx.session.category = ctx.message.text;
    ctx.reply("enter your note/description");
    return ctx.wizard.next();
  },

  (ctx) => {
    ctx.wizard.state.note = ctx.message.text;
    ctx.session.note = ctx.message.text;
    ctx.reply(
      "Income has been saved!"
    );
    return ctx.scene.leave();
  }
);
