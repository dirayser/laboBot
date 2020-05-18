function getManual(fs, file, commands) { //gets manual from file
  const manual = fs.readFileSync(file, 'utf8');
  commands['/manual'] = ctx => { ctx.reply(manual) }
}

function getCategories(labs) { // gets categories from labs
  const categories = [];
  labs.forEach(lab => {
    if(!categories.includes(lab.category)) categories.push(lab.category);
  })
  return categories;
}

function identify(labs) { // gives ids to labs
  labs.forEach((lab, i) => lab.id = i + 1)
}

function ownDecisioned(labs) { //checks if lab has own code decision
  labs.forEach(lab => 
  {
    if(lab.ownDecision) lab.labName += '🕵🏻‍♂️';
    else{
      lab.description += '\n\nПрисылай код:'
    }
  })
}

const addCommands = (commands, bot) => { for(const key in commands) bot.command(key, commands[key]) }; // adds commands to bot

const findByCategory = (category, labs) => labs.filter(lab => lab.category === category); // finds labs by category

const findByID = (ID, labs) => { // finds lab by id
  for(const lab of labs){
    if(lab.id == ID) {
      return lab;
    }
  }
}

const testResultToText = result => { // creates text result for message
  let text = '';
  let testsPassed = 0;
  result.forEach((test, i) => {
    text += (`Test ${i + 1}:\n\n`);
    if(test.error) {
      text += test.result + ' ⚠︎♨️\n\n\n';
      console.log(test.result)
    }
    else{
      text += (`Arguments: `);
      test.arguments.forEach((x, i) => text += (`${JSON.stringify(x)}${i === test.arguments.length - 1 ? '\n\n' : ', '}`));
      text += (`Expected result: ${JSON.stringify(test.expectedResult)}\n\n`);
      text += (`Result: ${JSON.stringify(test.result)}\n\n`);
      text += (`Test is `);
      text += (`${test.passed ? 'passed ✅' : 'not passed ❌'}\n\n\n`);
      if(test.passed) testsPassed++;
    }
  })
  text += result.length === testsPassed ? 'Good job!' : 'Try again!';
  return text;
}

async function getFunction(textFn, list) { //prepares and evaluates user code
  try {
    textFn = prepareTextFunction(textFn, list);
    let __fn = function(){};
    __fn = await eval(textFn);
    return __fn;
  }
  catch(e) {
    console.log('Error while evaluating: ' + e)
  }
}

const isPassed = (res, expRes) => JSON.stringify(res) === JSON.stringify(expRes); //for functions with non-primitive results

const fullCopy = x => JSON.parse(JSON.stringify(x)); // creates objects copy

function checkFunction(fn, test) { // tests user code
  const results = [];
  test.arguments.forEach((args, testIndex) => {
    try {
      const result = fn(...fullCopy(args));
      results.push({
      arguments : args,
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

const queryForCategory = (data, labsList, chatID, messageID, bot) => { // starts if category is choosen
  const labs = findByCategory(data, labsList);
  const inline_keyboard = [];
  labs.forEach(lab => inline_keyboard.push([{text: lab.labName, callback_data: (`lab:${lab.id}`).toString()}]));
  const keyboard = {
    reply_markup: JSON.stringify({
      inline_keyboard: inline_keyboard
    })
  };
  bot.telegram.editMessageText(chatID, messageID, undefined, 'Выбери задание:', keyboard);
}

const queryForLab = (ctx, data, labsList, chatID, username, bot, statuses) => {// starts if lab is choosen
  const labID = +data;
  const lab = findByID(labID, labsList);
  if(!lab.ownDecision) statuses[chatID] = labID;
  ctx.reply(`${lab.labName}:\n\n${lab.description}`);
}

const getData = (data) => { // get button callback data
const splitedData = data.split(':');
return ({
'queryFor' : splitedData[0],
'queryData' : splitedData[1]
})
}

const isTestPassed = testResult => { // returrns true if all tests are passed
  let done = true;
  testResult.forEach(res => {
    if(!res.passed) done = false;
  });
  return done;
}

const timeLimitWrap = function(codeStr) { // unables infinite loops by adding code
  let newF =  codeStr.replace(/for *\(.*\{|while *\(.*\{|do *\{/, function(loopHead) {
    return `const start = Date.now();${loopHead}`
  })
  newF = newF.replace(/for *\(.*\{|while *\(.*\{|do *\{/g, function(loopHead) {
    return `${loopHead}if(Date.now() - start > 1500) throw new Error('Time limit exceed');\n`
  })
  return newF;
}

const restrictedChange = (textFn, list) => { // changes restricted keywords
  let copy = fullCopy(textFn);
  for(const restricted in list) {
    copy = copy.replace(new RegExp(restricted, 'g'), list[restricted])
  }
  return copy;
}

const removeSymbFromEnd = (textFn, symb) => { // removes symbols from string ending
  let copy = fullCopy(textFn);
  while(copy[copy.length - 1] === symb) {
    copy = copy.substring(0, copy.length - 1);
  }
  return copy
}

const prepareTextFunction = (textFn, list) => { // prepares users code
  let copy = textFn;
  if(!checkRightLoops(textFn)) throw new Error('Uncorrect loop form.')
  copy = restrictedChange(copy, list);
  copy = timeLimitWrap(copy);
  copy = removeSymbFromEnd(copy, ';');
  copy.trim();
  copy = `(${copy})`;
  return copy;
}

const checkRightLoops = textFn => { // checks if loops are correct
  let left = 0;
  let right = 0;
  let normal = true;
  for(let i = 0; i < textFn.length; i++) {
    if(textFn.substr(i, 3) === 'for' || textFn.substr(i, 5) === 'while') {
      for(; i < textFn.length; i++) {
        if(textFn[i] === '(') left++;
        else if(textFn[i] === ')') right++;
        if(left === right && left !== 0) break;
      }
      i++;
      for(; i < textFn.length; i++) {
        if(textFn[i] === '{') break;
        if(textFn[i] !== '{' && textFn[i] !== ' ' && textFn[i] !== '\n') {
          normal = false;
        }
      }
    }
  }
  return normal;
}

const onCallbackQuery = (ctx, labs, statuses, bot) => { // starts if any button is pressed
  const chatID = ctx.update.callback_query.message.chat.id;
  const messageID = ctx.update.callback_query.message.message_id;
  const username =  ctx.update.callback_query.from.username;
  const data = ctx.update.callback_query.data;
  const {queryFor, queryData} = getData(data);
  if(queryFor === 'category') queryForCategory(queryData, labs, chatID, messageID, bot);
  else if(queryFor === 'lab') queryForLab(ctx, queryData, labs, chatID, username, bot, statuses);
}

const onText = async (ctx, statuses, labs, restrictedList) => { // starts if textmessage received
  const text = ctx.message.text;
  const chatID = ctx.message.chat.id;
  const isWaitingForLab = statuses[chatID]
  if(isWaitingForLab) {
    const fn =  await getFunction(text, restrictedList);
    const lab = findByID(statuses[chatID], labs);
    const testResult = checkFunction(fn, lab);
    const answer = testResultToText(testResult);
    let done = isTestPassed(testResult);
    if(done) statuses[chatID] = 0;
    ctx.reply(answer);
  }
}

module.exports = {
  getManual,
  getCategories,
  identify,
  ownDecisioned,
  addCommands,
  onCallbackQuery,
  onText
}
