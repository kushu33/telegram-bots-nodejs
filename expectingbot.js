var TelegramBot = require('node-telegram-bot-api');
var fs = require('fs');

var token = 'XXXXXXXXXXXXXXXXXXXXXXXXXX';

var version = "0.7.15";

var iExpectCount = 0;

var countFile = "expectCount.txt";

var lastCount = fs.readFileSync(countFile);

var lastMessageTimestamp = 0;
var irritationTime = 60000; // timespan before it gets irritated

if(parseInt(lastCount)>=0) {
    iExpectCount = parseInt(lastCount);
}

// Setup polling way
var bot = new TelegramBot(token, {polling: true});
var normalText = [
    "Bhencho, stop expecting",
    "Mat expect kiya karo yar.",
    "Abhi bhi expecting?",
    "The nation wants to know why are you expecting?",
    "I definitely did not expect that!!!!!!11!",
    "bc, expecting, expecting, expecting.",
    "Jitna jyada expect karoge, utna jyada niraash hoge",
    "Mat kar expect mere dost.",
    "kisne bola tha expect karne ko?",
    "Hatt sala.. expecting",
    "I too expected that!",
    "Tu expect hi karta rahe mere bhai",
    "Tumse na ho payega.. mat kar expect",
    "Hai himmat expect karne ki?",
    "Bhootnike kiski ki expect kar raha hai tu? Sonu Nigam?",
    "Kitna expect karega? Ab baby expect kar mera, tere pet me."
];

var irritatedText = [
    "Meri le rahe ho?",
    "Bus kar mere bhai",
    "Stop it, fgt",
    "Chutiye",
    "STFU",
    "Leave me alone.",
    "Fuck off",
    "I will file charges!,"
    "Chottomatte"
    "Sale suvar, gadhe, makkaar."
];

var emojiIrritated = [
    '(╯°□°）╯︵ ┻━┻',
    '╭∩╮(-_-)╭∩╮',
    '(ノಠ益ಠ)ノ彡┻━┻',
    '┻━┻ ︵ヽ(`Д´)ﾉ︵ ┻━┻',
    'ლ(ಠ益ಠლ)'
];

bot.onText(/^(?!\/).*(expecting|expect)(.*)/, function (msg, match) {
    var fromId = msg.chat.id;
    var message_id = msg.message_id;
    var resp = normalText[Math.floor(Math.random()*normalText.length)];

    var nowTime = Date.now();

    if(nowTime - lastMessageTimestamp <= irritationTime) {
        resp = irritatedText[Math.floor(Math.random()*irritatedText.length)]+" "+emojiIrritated[Math.floor(Math.random()*emojiIrritated.length)];
    }

    lastMessageTimestamp = Date.now();
    iExpectCount++;

    bot.sendMessage(fromId, resp, {
        reply_to_message_id: message_id
    });
});

bot.onText(/\/stop/, function (msg, match) {
    var fromId = msg.chat.id;
    var message_id = msg.message_id;
    var resp = "Abe teri aukaat nahi mere ko rokne ki!";
    bot.sendMessage(fromId, resp, {
        reply_to_message_id: message_id
    });
});

bot.onText(/\/start/, function (msg, match) {
    var fromId = msg.chat.id;
    var message_id = msg.message_id;
    var resp = "Abe gandu me chalu hi hoon!";
    bot.sendMessage(fromId, resp, {
        reply_to_message_id: message_id
    });
});

bot.onText(/(.*)okBotRaj(.*)/i, function (msg, match) {
    var fromId = msg.chat.id;
    var message_id = msg.message_id;
    var resp = "oKHOOMANRAJ";
    bot.sendMessage(fromId, resp, {
        reply_to_message_id: message_id
    });
});

bot.onText(/ok([a-z]*)Raj/i, function (msg, match) {
    var fromId = msg.chat.id;
    var message_id = msg.message_id;
    var resp = "oKHOOMANRAJ";
    bot.sendMessage(fromId, resp, {
        reply_to_message_id: message_id
    });
});

bot.onText(/\/version/, function (msg, match) {
    var fromId = msg.chat.id;
    var message_id = msg.message_id;
    var resp = "Current Version is v"+version;
    bot.sendMessage(fromId, resp, {
        reply_to_message_id: message_id
    });
});

bot.onText(/\/expect/, function (msg, match) {
    iExpectCount++;
    var fromId = msg.chat.id;
    var message_id = msg.message_id;
    var resp = "Haha. Chutiya banaya. Is command se kuch nahi hota.";
    bot.sendMessage(fromId, resp, {
        reply_to_message_id: message_id
    });
});


bot.onText(/\/count/, function (msg, match) {
    var fromId = msg.chat.id;
    var message_id = msg.message_id;
    var resp = "People have expected "+iExpectCount+" times so far. This is why people get depressed.";
    bot.sendMessage(fromId, resp, {
        reply_to_message_id: message_id
    });
});

// catch exit
process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));

function exitHandler(options, err) {
    fs.writeFileSync('expectCount.txt', iExpectCount);
    process.exit();   // Don't think you'll need this line any more
}

