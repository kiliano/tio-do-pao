// Baseado nesse lindo tutorial: https://medium.com/collabcode/como-criar-um-chatbot-no-telegram-em-nodejs-b5ad0e1b4a9
'use strict'

const Telegram = require('telegram-node-bot');
const TelegramBaseController = Telegram.TelegramBaseController;
const TextCommand = Telegram.TextCommand;
const chatbot = new Telegram.Telegram('669214194:AAFkujwLZsPIzZm00Mn-YVZ8fxeLmc9Eld4');

class EventsController extends TelegramBaseController {
  oiAction(scope) {
  	var contador = 0;
    let msg = 'oi '+contador;
	scope.sendMessage(msg);
  }
get routes() {
    return {
      'oi': 'oiAction'
    }
  }
}


chatbot.router
.when(
 new TextCommand('/oi', 'oi'), new EventsController()
)