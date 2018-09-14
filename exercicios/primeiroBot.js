const env = require ('../.env')
const Telegraf = require('telegraf')
const bot = new Telegraf(env.token)

// /Start
bot.start (ctx => {
	const from = ctx.update.message.from
	console.log(from)
	ctx.reply(`Oi ${from.first_name}!`)
})


bot.on('text', async (ctx, next) => {
	ctx.reply('Hora do show')
	next()
})

bot.on('text', async (ctx, next) => {
	ctx.reply('BIRL')
})

bot.startPolling()