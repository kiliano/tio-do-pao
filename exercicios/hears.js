// Chamando bases
const env = require('../.env')
const Telegraf = require('telegraf')
const moment = require('moment')
const bot = new Telegraf(env.token)

// Código

bot.hears('pizza', ctx => ctx.reply('Quero!'));
bot.hears(['fígado', 'chuchu'], ctx => ctx.reply('Passo!'));

bot.hears(/burguer/i, ctx => ctx.reply('Quero ein!'))


// / Código

// Loop
bot.startPolling()