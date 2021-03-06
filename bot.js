'use strict';

const fs = require('fs');
const { Telegraf } = require('telegraf');

const FUNCTIONS = require('./modules/functions');
const CONSTANTS = require('./modules/botConstants');

const STATUSES = {};
const { LABS, restrictedChangeList, BOT_URL, TOKEN, MANUAL }  = CONSTANTS;
const COMMANDS = {
  '/start': ctx => {
    const categories = FUNCTIONS.getCategories(LABS);
    const inline_keyboard = [];
    categories.forEach(cat => inline_keyboard.push([
      {
        text: cat,
        callback_data: `category:${cat}`.toString(),
      },
    ]));
    const keyboard = {
      reply_markup: JSON.stringify({
        inline_keyboard,
      }),
    };
    let answer = `Привет, я здесь чтобы давать тебе задания
    и автоматически их проверять!\nВыбери категорию заданий:`;
    ctx.reply(answer, keyboard);
  },
  '/tasks': ctx => {
    const categories = FUNCTIONS.getCategories(LABS);
    const inline_keyboard = [];
    categories.forEach(cat => inline_keyboard.push([
      {
        text: cat,
        callback_data: `category:${cat}`.toString(),
      },
    ]));
    const keyboard = {
      reply_markup: JSON.stringify({
        inline_keyboard,
      }),
    };
    ctx.reply('Выбери категорию заданий:', keyboard);
  },
  '/stop_trying': ctx => {
    STATUSES[ctx.message.chat.id] = 0;
    ctx.reply('Ну, можно код больше не кидать.');
  },
};

const bot = new Telegraf(TOKEN);

bot.telegram.setWebhook(`${BOT_URL}/bot${TOKEN}`);
bot.startWebhook(`/bot${TOKEN}`, null, process.env.PORT);

FUNCTIONS.identify(LABS);
FUNCTIONS.ownDecisioned(LABS);
FUNCTIONS.getManual(fs, MANUAL, COMMANDS);
FUNCTIONS.addCommands(COMMANDS, bot);

bot.on('callback_query', ctx => {
  FUNCTIONS.onCallbackQuery(ctx, LABS, STATUSES, bot);
});

bot.on('text', async ctx => {
  FUNCTIONS.onText(ctx, STATUSES, LABS, restrictedChangeList);
});
