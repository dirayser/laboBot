'use strict';

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

const express = require('express');
const Telegraf = require('telegraf');
const TOKEN = '944418146:AAHReRYdJrKG0Hl9xExuk7DnvyxtcdTcjlI';
const PORT = process.env.PORT || 3000;
const bot = new Telegraf(TOKEN);
const app = express();
const URL = 'https://labobot.herokuapp.com';

bot.telegram.setWebhook(`${URL}/bot${TOKEN}`);
app.use(bot.webhookCallback(`/bot${TOKEN}`));

const readline = require('readline');
const fs = require('fs');


const STATUSES = {};
const commands = {
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
function getManual(file) {
  const manual = fs.readFileSync('./manual.txt', 'utf8');
  commands['/manual'] = ctx => { ctx.reply(manual) }
}
identify(LABS);
ownDecisioned(LABS);
getManual('./manual.txt');


function getCategories(labs) {
  const categories = [];
  labs.forEach(lab => {
    if(!categories.includes(lab.category)) categories.push(lab.category);
  })
  return categories;
}
function identify(labs) {
  labs.forEach((lab, i) => lab.id = i + 1)
}
function ownDecisioned(labs) {
  labs.forEach((lab, i) => 
  {
    if(lab.ownDecision) lab.labName += '🕵🏻‍♂️';
  })
}

const addComands = () => { for(const key in commands) bot.command(key, commands[key]) };
const findByCategory = (category, labs) => labs.filter(lab => lab.category === category);
const findByID = (ID, labs) => {
  for(const lab of labs){
    if(lab.id == ID) {
      return lab;
    }
  }
}
const testResultToText = result => {
  let text = '';
  let testsPassed = 0;
  result.forEach((test, i) => {
    text += (`Test ${i + 1}:\n\n`);
    if(test.error) {
      text += test.result + ' ⚠︎♨️\n\n\n';
      console.log(test.result)
    }
    else{
      text += (`Expected result: ${JSON.stringify(test.expectedResult)}\n`);
      text += (`Test is `);
      text += (`${test.passed ? 'passed ✅' : 'not passed ❌'}\n\n\n`);
      if(test.passed) testsPassed++;
    }
  })
  text += result.length === testsPassed ? 'Good job!' : 'Try again!';
  return text;
}
async function getFunction(text) {
  text.trim();
  text = `(${text})`;
  text = timeLimitWrap(text);
  while(text[text.length - 1] === ';') {
    text = text.substring(0, text.length - 1);
  }
  let __fn = function(){};
  try {
    __fn = await eval(`(${text})`);
    return __fn;
  }
  catch(e) {
    console.log('Error: ' + e)
  }
}

const isPassed = (res, expRes) => JSON.stringify(res) === JSON.stringify(expRes); //for functions with non-primitive results
const fullCopy = x => JSON.parse(JSON.stringify(x));

function checkFunction(fn, test) {
  const results = [];
  test.arguments.forEach((args, testIndex) => {
    try {
      const result = fn(...args);
      results.push({
      result: result,
      expectedResult: fullCopy(test.results[testIndex]),
      passed: isPassed(result, test.results[testIndex])
    });
  }
  catch(e) {
    results.push({
      result: e,
      error: true
    })
  }
  });
  return results;
}

addComands();

bot.on('callback_query', ctx => {
  const chatID = ctx.update.callback_query.message.chat.id;
  const messageID = ctx.update.callback_query.message.message_id;
  const urername =  ctx.update.callback_query.from.username;
  const data = ctx.update.callback_query.data;
  const splitedData = data.split(':');
  const queryFor = splitedData[0];
  const queryData = splitedData[1];
  if(queryFor === 'category') {
    const labs = findByCategory(queryData, LABS);
    const inline_keyboard = [];
    labs.forEach(lab => inline_keyboard.push([{text: lab.labName, callback_data: (`lab:${lab.id}`).toString()}]));
    const keyboard = {
      reply_markup: JSON.stringify({
        inline_keyboard: inline_keyboard
      })
    };
    bot.telegram.editMessageText(chatID, messageID, undefined, 'Выбери задание:', keyboard);
  }
  else if(queryFor === 'lab') {
    bot.telegram.sendMessage(372158505, urername);
    const labID = +queryData;
    const lab = findByID(labID, LABS);
    if(!lab.ownDecision) STATUSES[chatID] = labID;
    ctx.reply(`${lab.labName}:\n\n${lab.description}`);
  }
});

bot.on('text', async ctx => {
  const text = ctx.message.text;
  const chatID = ctx.message.chat.id;
  if(STATUSES[chatID]) {
    const fn =  await getFunction(text);
    const lab = findByID(STATUSES[chatID], LABS);
    const testResult = checkFunction(fn, lab);
    const answer = testResultToText(testResult);
    let done = true;
    testResult.forEach(res => {
      if(!res.passed) done = false;
    });
    if(done) STATUSES[chatID] = 0;
    ctx.reply(answer);
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const timeLimitWrap = function(codeStr) {
  let newF =  codeStr.replace(/for *\(.*\{|while *\(.*\{|do *\{/, function(loopHead) {
    return `const start = Date.now();${loopHead}`
  })
  newF = newF.replace(/for *\(.*\{|while *\(.*\{|do *\{/g, function(loopHead) {
    return `${loopHead}if(Date.now() - start > 1500) throw new Error('Time limit exceed');\n`
  })

  newF = newF.replace(/console/g, 'consolе');
  newF = newF.replace(/require/g, 'requirе');
  newF = newF.replace(/bot/g, 'bоt');
  newF = newF.replace(/sendMessage/g, 'youWillNotSendMessage');
  newF = newF.replace(/TOKEN/g, 'youWillNotGetToken');
  newF = newF.replace(/reply/g, 'replyToWho');
  newF = newF.replace(/Error/g, 'Errоr');
  newF = newF.replace(/throw/g, 'thrоw');
  newF = newF.replace(/exec/g, 'exес');
  newF = newF.replace(/process/g, 'processs');
  newF = newF.replace(/eval/g, 'evаl');
  newF = newF.replace(/Promise/g, 'Promisе');
  newF = newF.replace(/app/g, 'apр');

  return newF;
}