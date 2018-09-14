// Chamando bases
const env = require('../.env')
const Telegraf = require('telegraf')
const Markup = require('telegraf/markup')
const bot = new Telegraf(env.token)

// Código

const tecladoCarne = Markup.keyboard([
	['Porco', 'Vaca', 'Carneiro'],
	['Galinha', 'Ovo'],
	['Peixe', 'Frutos do mar'],
	['Vegan']

]).resize().oneTime().extra()

bot.start(async ctx => {
	await ctx.reply(`Seja bem vindo, ${ctx.update.message.from.first_name}`)
	await ctx.reply(`Qual bebida você prefere?`,
		Markup.keyboard(['Coca', 'Pepsi']).resize().oneTime().extra())
})

bot.hears(['Coca', 'Pepsi'], async ctx => {
	await ctx.reply(`Nossa, eu também gosto de ${ctx.match}`)
	await ctx.reply('Qual a sua carne predileta?', tecladoCarne)
})

bot.hears(['Vaca'], async ctx => ctx.reply('A minha predileta também.'))
bot.hears(['Vegan'], async ctx => ctx.reply('Parabéns mas eu ainda gosto de carne'))

bot.on('text', ctx => ctx.reply('Legal!'))




// / Código

// Loop
bot.startPolling()