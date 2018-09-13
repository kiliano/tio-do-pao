const env = require('../.env')
const Telegraf = require('telegraf')
const bot = new Telegraf(env.token)

bot.start( async ctx => {
	await ctx.reply(`Seja bem-vindo, ${ctx.update.message.from.first_name} ! 😎`)
	await ctx.replyWithHTML(`Destacando Mensagem <b>teste</b> <a href="google.com">assa</a>`)
	await ctx.replyWithPhoto(`https://files.allaboutbirds.net/wp-content/uploads/2015/06/prow-featured.jpg`, {caption: 'Mimi cantarolando'})
})

bot.startPolling()