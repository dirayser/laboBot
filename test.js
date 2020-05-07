const fs = require('fs');

const labs = [
  {
    category: 'Функции и методы',
    labName: 'Интроспекция',
    functionName: 'introspect',
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
    functionName: 'sum',
    description: 'Реализуйте функцию sum(...args), которая суммирует все свои аргументы и возвращает полученную сумму.',
    arguments: [
      [1, 2, 3],
      [5.2, 5.5, 10],
      [17, -4, -3]
    ],
    results: [6, 20.7, 10]
  },
  {
    category: 'Работа с массивами:',
    labName: 'Удаление элемента массива',
    functionName: 'removeElement',
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
  }
];

const findByCategory = category => labs.filter(lab => lab.category === category);
const isPassed = (res, expRes) => JSON.stringify(res) === JSON.stringify(expRes); //for functions with non-primitive results
const fullCopy = x => JSON.parse(JSON.stringify(x));

function checkFunction(fn, test) {
  const results = [];
  test.arguments.forEach((args, testIndex) => {
    const result = fn(...args);
    results.push({
      arguments: args,
      result: result,
      expectedResult: fullCopy(test.results[testIndex]),
      passed: isPassed(result, test.results[testIndex])
    });
  });
  return results;
}

//const test = fs.readFileSync('./testFunctions.txt').toString();