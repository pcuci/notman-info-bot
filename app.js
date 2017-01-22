var builder = require('botbuilder');

var connector = new builder.ConsoleConnector().listen();
var bot = new builder.UniversalBot(connector);
var intents = new builder.IntentDialog();
bot.dialog('/', intents);

intents.matches(/^change name/i, [
    function (session) {
        session.beginDialog('/profile');
    },
    function (session, results) {
        session.send('Ok... Changed your name to %s', session.userData.name);
    }
]);

intents.matches(/bathroom/i, [
    function (session) {
        session.beginDialog('/bathroom');
    },
    function (session, results) {
        session.send('Ok, great - good luck finding the bathroom on floor %s', session.userData.currentFloor);
    }
]);

intents.onDefault([
    function (session, args, next) {
        if (!session.userData.name) {
            session.beginDialog('/profile');
        } else {
            next();
        }
    },
    function (session, results) {
        session.send('Hello %s!', session.userData.name);
    }
]);

bot.dialog('/profile', [
    function (session) {
        builder.Prompts.text(session, 'Hi! What is your name?');
    },
    function (session, results) {
        session.userData.name = results.response;
        session.endDialog();
    }
]);

bot.dialog('/bathroom', [
    function (session) {
        builder.Prompts.text(session, 'What floor are you on?');
    },
    function (session, results) {
        session.userData.currentFloor = results.response;
        if (session.userData.currentFloor === '1') {
          session.send('Look near the stairs in the back, for floor %s!', session.userData.currentFloor);
        } else {
          session.send('You\'re joking, this is not a real floor.\n Head over to the OSMO cafe on the main floor, please! You typed in %s',
          session.userData.currentFloor);
        }
    },
    function (session, results) {
        session.endDialog();
    }
]);

// where's the bathroom?
// what's the wifi password?
// how many events going on?
// how many people upstairs?
//
