var TelegramBot = require('node-telegram-bot-api');

var token = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
// Setup polling way
var bot = new TelegramBot(token, {polling: true});
var msgArray = [
    "Sup, motherfucking posh {{match}}",
    "{{match}} is so fucking posh!",
    "Damn you, {{match}}, you are dazzling posh",
    "{{match}}, you are such a posh bitch.",
    "{{match}} is so posh that it needs standing ovation from our middle finger!"
];
bot.onText(/\/posh (.+)/, function (msg, match) {
console.log(msg);
var fromId = msg.chat.id;
  var resp = msgArray[Math.floor(Math.random()*msgArray.length)].replace("{{match}}", match[1]);
  bot.sendMessage(fromId, resp);
});

