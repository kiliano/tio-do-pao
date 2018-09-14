// Chamando bases
const env = require('../.env')
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const bot = new Telegraf(env.token)

// Código
let lista = []

let paofrances = 0;
let paodemilho = 0;

let rosquinha = 0;
let rosquinharecheio = 0;

let croissantpresunto = 0;
let croissantfrango = 0;

let bisnaga = 0;
let bisnagaacucar = 0;
let bisnagacreme = 0;

// Teclado

const botoes = Extra.markup(Markup.inlineKeyboard([
	Markup.callbackButton('Pão Francês', 'paofrances'),
	Markup.callbackButton('Pão de Milho', 'paodemilho'),

	Markup.callbackButton('Rosquinha Comum', 'rosquinha'),
	Markup.callbackButton('Rosquinha com Recheio', 'rosquinharecheio'),

	Markup.callbackButton('Croissant com Presunto', 'croissantpresunto'),
	Markup.callbackButton('Croissant com Frango', 'croissantfrango'),

	Markup.callbackButton('Bisnaga Comum', 'bisnaga'),
	Markup.callbackButton('Bisnaga com Açúcar', 'bisnagaacucar'),
	Markup.callbackButton('Bisnaga com Creme', 'bisnagacreme'),

	Markup.callbackButton('Finalizar pedidos', 'finalizar'),


], {columns: 2}))

bot.start(async ctx=> {
	const nome = ctx.update.message.from.first_name
	await ctx.reply(`Hora do pão! ${nome}`, botoes)
})

bot.action('finalizar', async ctx => {
	
	if (paofrances > 0) {
		lista.push('Pão Francês ('+paofrances+') ')
	}

	if (paodemilho > 0) {
		lista.push('Pão de Milho ('+paodemilho+') ')
	}

	await ctx.reply('Pedido: '+lista)


	// Zerando lista
	lista = []

	paofrances = 0;
	paodemilho = 0;

	rosquinha = 0;
	rosquinharecheio = 0;

	croissantpresunto = 0;
	croissantfrango = 0;

	bisnaga = 0;
	bisnagaacucar = 0;
	bisnagacreme = 0;
})

bot.action('paofrances', async ctx => {
	paofrances += 1

	await ctx.reply(`pediu 1 Pão Francês`)
})

bot.action('paodemilho', async ctx => {
	paodemilho += 1
	await ctx.reply(`pediu 1 Pão de Milho`)
})


// / Código

// Loop
bot.startPolling()