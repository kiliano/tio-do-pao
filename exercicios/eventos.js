const env = require('../.env')
const Telegraf = require('telegraf')
const bot = new Telegraf(env.token)

bot.start( ctx => {
	const name = ctx.update.message.from.first_name
	ctx.reply(`Seja bem-vindo, ${name}!`)
})

bot.on('text', ctx => 
	ctx.reply(`Texto '${ctx.update.message.text}' recebido com sucesso`))

bot.on('location', ctx => {
	const location = ctx.update.message.location
	console.log(location)
	ctx.reply(`Entendido, você está em
		Lat: ${location.latitude},
		Lon: ${location.longitude}!`)
})

bot.on('contact', ctx => {
	const contact = ctx.update.message.contact
	console.log(contact)
	ctx.reply(`Vou lembrar do(a)
		${contact.first_name} `)
})

bot.startPolling()