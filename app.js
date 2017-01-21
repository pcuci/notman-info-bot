var builder = require('botbuilder');

// Listen on console
var connector = new builder.ConsoleConnector().listen();

// Universal bot
var bot = new builder.UniversalBot(connector);  
bot.dialog('/', function (session) {
  session.send('Hello World');
});
