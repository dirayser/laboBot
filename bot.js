'use strict';

const fs = require('fs');
const express = require('express');
const Telegraf = require('telegraf');

const FUNCTIONS = require('./functions');
const CONSTANTS = require('./botConstants');

const STATUSES = {};
const COMMANDS = {
  '/start' : ctx => ctx.reply('Привет, я здесь чтобы давать тебе задания и автоматически их проверять!'),
  '/categories' : ctx => {
    const categories = FUNCTIONS.getCategories(LABS);
    const inline_keyboard = [];
    categories.forEach(cat => inline_keyboard.push([{text: cat, callback_data: (`category:${cat}`).toString()}]));
    const keyboard = {
      reply_markup: JSON.stringify({
        inline_keyboard: inline_keyboard
      })
    };
    ctx.reply('Выбери категорию заданий:', keyboard)
  },
  '/stop_trying' : ctx => {
    STATUSES[ctx.message.chat.id] = 0;
  }
}
const {LABS, restrictedChangeList, BOT_URL, TOKEN}  = CONSTANTS;

const bot = new Telegraf(TOKEN);
bot.telegram.setWebhook(`${BOT_URL}/bot${TOKEN}`);

const app = express();
app.use(bot.webhookCallback(`/bot${TOKEN}`));

FUNCTIONS.identify(LABS);
FUNCTIONS.ownDecisioned(LABS);
FUNCTIONS.getManual(fs, './manual.txt', COMMANDS);
FUNCTIONS.addCommands(COMMANDS, bot);

bot.on('callback_query', ctx => {
  FUNCTIONS.onCallbackQuery(ctx, LABS, STATUSES, bot);
});

bot.on('text', async ctx => {
  FUNCTIONS.onText(ctx, STATUSES, LABS, restrictedChangeList)
})

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

