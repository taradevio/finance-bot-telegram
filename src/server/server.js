import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import 'dotenv/config'

const bot = new Telegraf(process.env.BOT_API_TOKEN)

bot.start((ctx) => ctx.reply('Welcome to Finance Tracker'));

bot.command('income', (ctx) => ctx.reply('Add your income'))
bot.command('outcome', (ctx) => ctx.reply('What did you spend on today?'))
bot.command('outcome', (ctx) => ctx.reply('What did you spend on today?'))



// bot.help((ctx) => ctx.reply('Send me a sticker'))
// bot.on(message('sticker'), (ctx) => ctx.reply('👍'))
// bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch()

console.log("Bot is running on polling...")