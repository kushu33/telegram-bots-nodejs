var TelegramBot = require('node-telegram-bot-api');

var token = 'XXXXXXXXXXXXXXXXXXXXXXXXXX';
// Setup polling way
var bot = new TelegramBot(token, {polling: true});
var xubzReply = [
                    "k.",
                    "hi",
                    "nvm",
                    "baka",
                    "anime",
                    "poha is worse than upma",
                    "mfw persona 4",
                    "lewd",
                    "yuri yuri",
                    "Ghanta",
                    "*facepalm*"
];
var typingIntervals = [5,6,7,8,9];
var xubzyProbability = 67;
bot.onText(/\/pullaxubz/, function (msg, match) {
    var fromId = msg.chat.id;
    var randomTypingTime = typingIntervals[Math.floor(Math.random() * typingIntervals.length)]*1000;
    bot.sendChatAction(fromId, "typing");
    setTimeout(function(){
        var randomReply = xubzReply[Math.floor(Math.random() * xubzReply.length)];
        var shouldXubzSend = Math.round()*100<xubzyProbability?false:true;
        bot.sendChatAction(fromId, "");
        if(shouldXubzSend) {
            bot.sendMessage(fromId, randomReply);
        }
    }, randomTypingTime);
});
