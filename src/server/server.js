import { Scenes, session, Telegraf } from "telegraf";
import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;
import { addIncome } from "../controller/userTransactions.js";
import "dotenv/config";

const bot = new Telegraf(process.env.BOT_API_TOKEN);

// create a stage
const scene = new Scenes.Stage([addIncome]);

// use session to store temp memory of the scene
bot.use(session());

// use middleware to handle scene
bot.use(scene.middleware());

bot.start((ctx) => {
  console.log("start is running!");
  ctx.reply(
    "Welcome to Finance Tracker. If you would like to add your income, type '/income'"
  );
});

// bot.command("/type", (ctx) => {
//   console.log("ctx is received");
//   ctx.reply(
//     "Use /income to input your income. Use /outcome to input your outcome"
//   );
// });
bot.command("income", (ctx) => {
  console.log("income is running");
  ctx.scene.enter("user-transaction");
});

bot.command("report", (ctx) => {
  ctx.reply(
    `INCOME: ${ctx.session.amount}, 
    CATEGORY: ${ctx.session.category}, 
    NOTE: ${ctx.session.note}`
  );
});


// get server
app.get('/', (req, res) => {
  res.send("hello ngrok")
})

// set endpoint for webhook
app.use(bot.webhookCallback('/telegram-webhook'));

// set telegram to use webhook's endpoint
bot.telegram.setWebhook('https://b480-125-164-182-45.ngrok-free.app/telegram-webhook')

app.listen(PORT, () => {
  console.log(`tunnel is open at ${PORT}`)
})
// bot.command("/type-income", (ctx) =>
//   ctx.reply("What is your income type? e. g passive, active ")
// );
// bot.command("/outcome", (ctx) => ctx.reply("What did you spend on today?"));
