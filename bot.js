'use strict';

const STATUSES = {};
const LABS = [
  {
    category: 'Функции и методы',
    labName: 'Интроспекция',
    description: 'Задача 4: https://github.com/HowProgrammingWorks/Function/blob/master/Exercises.ru.md',
    arguments: [
      [
        {
          m1: x => [x],
          m2: function (x, y) {
                return [x, y];
              },
          m3(x, y, z) {
            return [x, y, z];
          }
       }
    ]
  ],
    results: [[
      ['m1', 1],
      ['m2', 2],
      ['m3', 3]
    ]]
  },
  {
    category: 'Функции и методы',
    labName: 'Суммирование аргументов',
    description: 'Реализуйте функцию sum(...args), которая суммирует все свои аргументы и возвращает полученную сумму.',
    arguments: [
      [1, 2, 3],
      [5.2, 10],
      [17, -4, -3, -3],
      ['Street ', 16]
    ],
    results: [6, 15.2, 7, 'Street 16']
  },
  {
    category: 'Работа с массивами',
    labName: 'Удаление элемента массива',
    description: 'Задача 1: https://github.com/HowProgrammingWorks/Arrays/blob/master/Exercises.ru.md',
    arguments: [
      [[1, 2, 3, 4, 5, 6, 7], 5],
      [['Kiev', 'Beijing', 'Lima', 'Saratov'], 'Lima'],
      [['Kiev', 'Beijing', 'Lima', 'Saratov'], 'Berlin']
    ],
    results: [
      [1, 2, 3, 4, 6, 7], 
      ['Kiev', 'Beijing', 'Saratov'], 
      ['Kiev', 'Beijing', 'Lima', 'Saratov']
    ]
  },
  {
    category: 'Функции и методы',
    labName: 'Преобразование IP',
    description: 'Реализуйте функцию для преобразования IP адресса в число. Задача 3: https://github.com/HowProgrammingWorks/Function/blob/master/Exercises.ru.md',
    arguments: [
      ['127.0.0.1'],
      ['10.0.0.1'],
      ['192.168.1.10'],
      ['165.225.133.150'],
      ['0.0.0.0'],
      ['8.8.8.8']
    ],
    results: [2130706433, 167772161, -1062731510, -1511946858, 0, 0x08080808]
  },
  {
    category: 'Циклы, итерирование',
    labName: 'Итерирование по двумерному массиву',
    description: 'Найдите максимальный элемент в двумерном массиве',
    arguments: [
      [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]],
      [[[1, -2, 3], [4, 17, 6], [7, 8, 0]]],
      [[[-1, -2, -3], [-4, -5, -6], [-7, -8, -9]]]
    ],
    results: [9, 17, -1]
  },
  {
    category: 'Циклы, итерирование',
    labName: 'Итерирование объектов-справочников',
    description: 'При помощи цикла for..in перебрать объект-справочник с датами рождения и смерти людей и вернуть справочник с продолжительностью их жизни. Задача 7: https://github.com/HowProgrammingWorks/Iteration/blob/master/Exercises.ru.md',
    arguments: [
      [{
        lenin: { born: 1870, died: 1924 },
        mao: { born: 1893, died: 1976 },
        gandhi: { born: 1869, died: 1948 },
        hirohito: { born: 1901, died: 1989 },
      }]
    ],
    results: [{
        lenin: 54,
        mao: 83,
        gandhi: 79,
        hirohito: 88,
       }]
  },
  {
    category: 'Работа с массивами',
    labName: 'Уборка дубликатов',
    description: 'Написать функцию unique(array), которая должна возвращать новый массив, не содержащий дубликатов. \n Задача 3: https://github.com/HowProgrammingWorks/Arrays/blob/master/Exercises.ru.md',
    arguments: [
      [[2, 1, 1, 3, 2]],
      [['top', 'bottom', 'top', 'left']],
      [['top', 0, 'top', false]]
    ],
    results: [[2, 1, 3], ['top', 'bottom', 'left'], ['top', 0, false]]
  },
  {
    category: 'Работа с массивами',
    labName: 'Разность массивов',
    description: 'Написать функцию difference(array1, array2) которая должна находить разницу между массивами, т.е. возвращать новый массив, содержащий значения, которые содержались в array1, но не содержались в array2.\n Задача 4: https://github.com/HowProgrammingWorks/Arrays/blob/master/Exercises.ru.md',
    arguments: [
      [[7, -2, 10, 5], [0, 10]],
      [['Beijing', 'Kiev'], ['Kiev', 'London', 'Baghdad']],
    ],
    results: [[7, -2, 5], ['Beijing']]
  },
  {
    category: 'Функции высшего порядка',
    labName: 'Итерирование с коллбэками',
    description: 'Задача 1: https://github.com/HowProgrammingWorks/HigherOrderFunction/blob/master/Exercises.ru.md',
    ownDecision: true
  },
  {
    category: 'Функции высшего порядка',
    labName: 'Замыкание',
    description: 'Задача 2: https://github.com/HowProgrammingWorks/HigherOrderFunction/blob/master/Exercises.ru.md',
    ownDecision: true
  },
  {
    category: 'Функции высшего порядка',
    labName: 'Контракт функции',
    description: 'Задача 3: https://github.com/HowProgrammingWorks/HigherOrderFunction/blob/master/Exercises.ru.md',
    ownDecision: true
  },
  {
    category: 'Композиция функций',
    labName: 'Композиция в обе стороны',
    description: 'Задача 1 и 2: https://github.com/HowProgrammingWorks/Composition/blob/master/Exercises.ru.md',
    ownDecision: true
  },
  {
    category: 'Замыкания и чеининг',
    labName: 'Замыкание функций',
    description: 'Задача 1: https://github.com/HowProgrammingWorks/Closure/blob/master/Exercises.ru.md',
    ownDecision: true
  },
  {
    category: 'Замыкания и чеининг',
    labName: 'Функциональный объект',
    description: 'Задача 2: https://github.com/HowProgrammingWorks/Closure/blob/master/Exercises.ru.md',
    ownDecision: true
  },
];
const COMMANDS = {
  '/start' : ctx => ctx.reply('Привет, я здесь чтобы давать тебе задания и автоматически их проверять!'),
  '/categories' : ctx => {
    const categories = getCategories(LABS);
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
const restrictedChangeList = {
  'console' : 'consolе',
  'require' : 'requirе',
  'bot' : 'bоt',
  'sendMessage' : 'SеndMessage',
  'TOKEN' : 'T0KEN',
  'reply' : 'replу',
  'Error' : 'Errоr',
  'throw' : 'thrоw',
  'exec' : 'exес',
  'process' : 'processs',
  'eval' : 'evаl',
  'Promise' : 'Promisе',
  'app' : 'apр',
}

const fs = require('fs');
const express = require('express');
const Telegraf = require('telegraf');
const functions = require('./functions');

const TOKEN = '944418146:AAHReRYdJrKG0Hl9xExuk7DnvyxtcdTcjlI';
const PORT = process.env.PORT || 3000;
const URL = 'https://labobot.herokuapp.com';

const bot = new Telegraf(TOKEN);
const app = express();

bot.telegram.setWebhook(`${URL}/bot${TOKEN}`);
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
  else if(queryFor === 'lab') functions.queryForLab(ctx, queryData, LABS, chatID, username, bot);
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

