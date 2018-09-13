const env = require ('../.env')
const Telegraf = require('telegraf')
const bot = new Telegraf(env.token)

// /Start
bot.start (ctx => {

	if (ctx.update.message.from.id == '123') {
		ctx.reply('Olá God')
	} else {
		
		if (mestre == '123') {
			ctx.reply('Koe mimi')
		} else {
			ctx.reply('Você não é o God')
		}
	}
})

bot.startPolling()