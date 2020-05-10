'use strict';

const fs = require('fs');
const express = require('express');
const Telegraf = require('telegraf');
const functions = require('./functions');
const constants = require('./botConstants');

const STATUSES = {};
const COMMANDS = {
  '/start' : ctx => ctx.reply('Привет, я здесь чтобы давать тебе задания и автоматически их проверять!'),
  '/categories' : ctx => {
    const categories = functions.getCategories(LABS);
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
const {LABS, restrictedChangeList, BOT_URL, TOKEN}  = constants;

const bot = new Telegraf(TOKEN);
bot.telegram.setWebhook(`${BOT_URL}/bot${TOKEN}`);

const app = express();
app.use(bot.webhookCallback(`/bot${TOKEN}`));

functions.identify(LABS);
functions.ownDecisioned(LABS);
functions.getManual(fs, './manual.txt', COMMANDS);
functions.addCommands(COMMANDS, bot);

bot.on('callback_query', ctx => {
  const chatID = ctx.update.callback_query.message.chat.id;
  const messageID = ctx.update.callback_query.message.message_id;
  const username =  ctx.update.callback_query.from.username;
  const data = ctx.update.callback_query.data;
  const {queryFor, queryData} = functions.getData(data);
  if(queryFor === 'category') functions.queryForCategory(queryData, LABS, chatID, messageID, bot);
  else if(queryFor === 'lab') functions.queryForLab(ctx, queryData, LABS, chatID, username, bot, STATUSES);
});

bot.on('text', async ctx => {
  const text = ctx.message.text;
  const chatID = ctx.message.chat.id;
  const isWaitingForLab = STATUSES[chatID]
  if(isWaitingForLab) {
    const fn =  await functions.getFunction(text, restrictedChangeList);
    const lab = functions.findByID(STATUSES[chatID], LABS);
    const testResult = functions.checkFunction(fn, lab);
    const answer = functions.testResultToText(testResult);
    let done = functions.isTestPassed(testResult);
    if(done) STATUSES[chatID] = 0;
    ctx.reply(answer);
  }
})

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

