'use strict'


// Chamadas para o Local
// const env = require('./.env')
// const Telegraf = require('telegraf')
// const Markup = require('telegraf/markup')
// const Extra = require('telegraf/extra')
// const bot = new Telegraf(env.token)

// var datacompleta = new Date();
// var datahora = datacompleta.getHours();

// if (datahora < 19) {
// 	setInterval(function(){
// 		console.log("ping")
// 	},300000);
// }


// Chamadas para o Heroku
var http = require('http')

var datacompleta = new Date();
var datahora = datacompleta.getHours();

if (datahora < 22) {
	setInterval(function(){
		http.get("http://shielded-peak-24448.herokuapp.com/")
	},300000);
}


var port = (process.env.PORT || 5000)

http.createServer(function(request, response) {
	response.writeHead(200,{'Content-Type': 'application/json'});
	response.write(JSON.stringify({name: 'tiodopaobot', ver: '0.1'}));
	response.end();
}).listen(port)

var token = process.env.token

module.exports = {
	token,
	apiUrl: 'https://api.telegram.org/bot${token}',
	apiFileUrl: 'https://api.telegram.org/file/bot${token}'
}

const Telegraf = require('telegraf')
const Markup = require('telegraf/markup')
const Extra = require('telegraf/extra')
const bot = new Telegraf(token)



// Código

let random = Math.floor((Math.random() * 23) + 1)

let lista = []
let quem = []

let abertura = false

let paofrances = 0;
let paodemilho = 0;

let rosquinha = 0;
let rosquinharecheio = 0;

let croissantpresunto = 0;
let croissantfrango = 0;

let bisnaga = 0;
let bisnagaacucar = 0;
let bisnagacreme = 0;

let total = 0;
let totalpedidos = 0;

// Teclado

const tecladoPao = Markup.keyboard([
	['🍞 Pão Francês', '🌽 Pão de Milho'],
	['🍩 Rosquinha', '🍩 com Recheio'],
	['🥐 Croissant Presunto', '🥐 Croissant Frango'],
	['🥖 Bisnaga','🥖 com Açúcar','🥖 com Creme']
	// ['✖ Não pedir nada']

]).resize().extra()

// Teclado de cancelamento
const tecladoCancelar = Markup.keyboard([
	['❌ Pão Francês', '❌ Pão de Milho'],
	['❌ Rosquinha', '❌ Rosquinha Recheio'],
	['❌ Croissant Presunto', '❌ Croissant Frango'],
	['❌ Bisnaga','❌ Bis. c Açúcar','❌ Bis. c Creme'],
	['✖ Não cancelar nada']

]).resize().oneTime().extra()

// Teclado em branco
const tecladoBranco = Markup.keyboard([
	['👍 Valeu Tio!', '👍 Valeu Bel!']

]).resize().oneTime().extra()

// Cancelamento Inline
const tecladoCancelarInline = Extra.markup(Markup.inlineKeyboard([
	Markup.callbackButton('❌ Pão Francês', 'pao'),
	Markup.callbackButton('❌ Pão de Milho', 'milho'),
	Markup.callbackButton('❌ Rosquinha', 'ros'),

	Markup.callbackButton('❌ Ros. Recheio', 'rosres'),
	Markup.callbackButton('❌ Cro. Presunto', 'cropre'),
	Markup.callbackButton('❌ Cro. Frango', 'crofran'),

	Markup.callbackButton('❌ Bisnaga', 'bis'),
	Markup.callbackButton('❌ Bis. c Açúcar', 'bisacu'),
	Markup.callbackButton('❌ Bis. c Creme', 'biscre')
], {columns: 3}))


// Teclado inline
const botoesinline = Extra.markup(Markup.inlineKeyboard([
	// Markup.callbackButton('➕ Pedir outro', 'pedir'),
	// Markup.callbackButton('➖ Remover', 'cancelar'),
	Markup.callbackButton('✅ Fechar pedidos ✅', 'fecharpedido')
], {columns: 1}))

// Iniciando pedidos

bot.command(['pao','Pao'], async ctx => {
	random = Math.floor((Math.random() * 23) + 1)

	await ctx.replyWithMarkdown(`*📣📣📣 Hora do Pão Cambada!!! 📣📣📣*`, tecladoPao)
	await ctx.replyWithMarkdown(`Depois que todo mundo escolher o que quer, só digitar /pedido pra fechar o pedido.
		Se quiser remover algum item da lista, só digitar /cancelar.`)
	// abrindo pedidos
	abertura = true

	ctx.replyWithPhoto('http://kiliano.com.br/pao/'+random+'.jpg')
})


bot.command(['bicho'], async ctx => {
	random = Math.floor((Math.random() * 23) + 1)
	ctx.replyWithPhoto('http://kiliano.com.br/pao/'+random+'.jpg')
})

bot.command('cardapio', async ctx => {
	if (abertura == true) {
		await ctx.reply(`Abrindo teclado de cardápio de novo`, tecladoPao)
	}
})

// Ouvindo o pedido
bot.hears(['🍞 Pão Francês', '🌽 Pão de Milho', '🍩 Rosquinha', '🍩 com Recheio','🥐 Croissant Presunto', '🥐 Croissant Frango','🥖 Bisnaga','🥖 com Açúcar','🥖 com Creme'], async ctx => {
	const nome = ctx.update.message.from.first_name
	let pediu = ctx.update.message.text

	if (abertura == true) {
		await ctx.reply(`${nome} pediu 1 ${pediu}`)
		quem.push(`${nome}: ${pediu} -- `)

		if (pediu == '🍞 Pão Francês') 	paofrances += 1
		if (pediu == '🌽 Pão de Milho') 	paodemilho += 1
		if (pediu == '🍩 Rosquinha') 	rosquinha += 1
		if (pediu == '🍩 com Recheio') 	rosquinharecheio += 1
		if (pediu == '🥐 Croissant Presunto') 	croissantpresunto += 1
		if (pediu == '🥐 Croissant Frango') 	croissantfrango += 1
		if (pediu == '🥖 Bisnaga') 	bisnaga += 1
		if (pediu == '🥖 com Açúcar') 	bisnagaacucar += 1
		if (pediu == '🥖 com Creme') 	bisnagacreme += 1
	} else {
		await ctx.reply(`Oi, ${nome}. A anotação dos pedidos já foi fechada 🔒 `)
	}

	
})


// Cancelando o pedido
bot.hears(['❌ Pão Francês', '❌ Pão de Milho', '❌ Rosquinha', '❌ Rosquinha Recheio','❌ Croissant Presunto', '❌ Croissant Frango','❌ Bisnaga','❌ Bis. c Açúcar','❌ Bis. c Creme'], async ctx => {
	const nome = ctx.update.message.from.first_name
	let pediu = ctx.update.message.text

	if (abertura == true) {
		await ctx.reply(`${nome} removeu 1 ${pediu} do pedido `)

		if (pediu == '❌ Pão Francês') 	paofrances -= 1
		if (pediu == '❌ Pão de Milho') 	paodemilho -= 1
		if (pediu == '❌ Rosquinha') 	rosquinha -= 1
		if (pediu == '❌ Rosquinha Recheio') 	rosquinharecheio -= 1
		if (pediu == '❌ Croissant Presunto') 	croissantpresunto -= 1
		if (pediu == '❌ Croissant Frango') 	croissantfrango -= 1
		if (pediu == '❌ Bisnaga') 	bisnaga -= 1
		if (pediu == '❌ Bis. c Açúcar') 	bisnagaacucar -= 1
		if (pediu == '❌ Bis. c Creme') 	bisnagacreme -= 1
	} else {
		await ctx.reply(`Oi, ${nome}. A anotação dos pedidos já foi fechada 🔒 `)
	}
})

// 

bot.command('cancelar', async ctx => {
	if (abertura == true) {
		if (paofrances > 0) {
			lista.push('Pão Francês ('+paofrances+') ')
		}

		if (paodemilho > 0) {
			lista.push('Pão de Milho ('+paodemilho+') ')
		}

		if (rosquinha > 0) {
			lista.push('Rosquinha Comum ('+rosquinha+') ')
		}

		if (rosquinharecheio > 0) {
			lista.push('Rosquinha com Recheio ('+rosquinharecheio+') ')
		}

		if (croissantpresunto > 0) {
			lista.push('Croissant de Presunto ('+croissantpresunto+') ')
		}

		if (croissantfrango > 0) {
			lista.push('Croissant de Frango ('+croissantfrango+') ')
		}

		if (bisnaga > 0) {
			lista.push('Bisnaga Comum ('+bisnaga+') ')
		}

		if (bisnagaacucar > 0) {
			lista.push('Bisnaga com Açúcar ('+bisnagaacucar+') ')
		}

		if (bisnagacreme > 0) {
			lista.push('Bisnaga com Creme ('+bisnagacreme+') ')
		}

		await ctx.reply("Itens até o momento: [ "+lista+" ]", tecladoBranco)


		await ctx.reply(`Clique no item para diminuir a quantidade da lista.`, tecladoCancelarInline)
	} else {
		await ctx.reply(`O pedido já foi fechado 🔒 `)
	}

})


bot.action('pao', ctx => {
	if (abertura == true) {
		paofrances -= 1
		ctx.reply(`1 Pão Francês Removido`)
		quem.push(`1 Pão Francês Removido --`)
	}
})

bot.action('milho', ctx => {
	if (abertura == true) {
		paodemilho -= 1
		ctx.reply(`1 Pão de Milho Removido`)
		quem.push(`1 Pão de Milho Removido --`)
	}
})

bot.action('ros', ctx => {
	if (abertura == true) {
		rosquinha -= 1
		ctx.reply(`1 Rosquinha Removida`)
		quem.push(`1 Rosquinha Removida --`)
	}
})

bot.action('rosres', ctx => {
	if (abertura == true) {
		rosquinharecheio -= 1
		ctx.reply(`1 Rosquinha Recheio Removida`)
		quem.push(`1 Rosquinha Recheio Removida --`)
	}
})

bot.action('cropre', ctx => {
	if (abertura == true) {
		croissantpresunto -= 1
		ctx.reply(`1 Croissant Presunto Removido`)
		quem.push(`1 Croissant Presunto Removido --`)
	}
})

bot.action('crofran', ctx => {
	if (abertura == true) {
		croissantfrango -= 1
		ctx.reply(`1 Croissant Frango Removido`)
		quem.push(`1 Croissant Frango Removido --`)
	}
})

bot.action('bis', ctx => {
	if (abertura == true) {
		bisnaga -= 1
		ctx.reply(`1 Bisnaga Removida`)
		quem.push(`1 Bisnaga Removida --`)
	}
})


bot.action('bisacu', ctx => {
	if (abertura == true) {
		bisnagaacucar -= 1
		ctx.reply(`1 Bisnaga c Açúcar Removida`)
		quem.push(`1 Bisnaga c Açúcar Removida --`)
	}
})


bot.action('biscre', ctx => {
	if (abertura == true) {
		bisnagacreme -= 1
		ctx.reply(`1 Bisnaga c Creme Removida`)
		quem.push(`1 Bisnaga c Creme Removida --`)
	}
})

bot.command(['oi'], async ctx => {
	await ctx.replyWithMarkdown(`*🤙 Galera eu sou o Tio do Pão 🤙*

		Vou anotar os pedidos de 🥖pão🥖, pra não ter bizu.

		O que eu posso fazer:

		_/pao para iniciar um pedido
		/pedido para finalizar um pedido
		/cancelar para carregar o menu de subtração de itens
		/lista para carregar a lista de itens pedidos no momento
		/bicho para mostrar uma foto bonitinha de pães e bichos
		/wifi para eu lembrar vocês qual a senha do wifi para visitantes
		 _
		`)
})

bot.command(['bomdia'], async ctx => {
	await ctx.reply(`Bom dia ${ctx.update.message.from.first_name} 😉`)
})

bot.command(['pedido', 'fechar', 'finalizar', 'fecharpedido'], async ctx => {

	if (abertura == true) {
		lista = []
	
		if (paofrances > 0) {
			lista.push('Pão Francês ('+paofrances+') ')
		}

		if (paodemilho > 0) {
			lista.push('Pão de Milho ('+paodemilho+') ')
		}

		if (rosquinha > 0) {
			lista.push('Rosquinha Comum ('+rosquinha+') ')
		}

		if (rosquinharecheio > 0) {
			lista.push('Rosquinha com Recheio ('+rosquinharecheio+') ')
		}

		if (croissantpresunto > 0) {
			lista.push('Croissant de Presunto ('+croissantpresunto+') ')
		}

		if (croissantfrango > 0) {
			lista.push('Croissant de Frango ('+croissantfrango+') ')
		}

		if (bisnaga > 0) {
			lista.push('Bisnaga Comum ('+bisnaga+') ')
		}

		if (bisnagaacucar > 0) {
			lista.push('Bisnaga com Açúcar ('+bisnagaacucar+') ')
		}

		if (bisnagacreme > 0) {
			lista.push('Bisnaga com Creme ('+bisnagacreme+') ')
		}

		await ctx.replyWithMarkdown(`*📝📝 Pedidos pro Tio do Pão 📝📝*`)

		await ctx.reply("[ "+lista+" ]", tecladoBranco)

		await ctx.replyWithMarkdown(`*Quem pediu o que:*`)
		await ctx.replyWithMarkdown("_[ "+quem+" ]_")

		// Apagando mensagem original
		// ctx.tg.deleteMessage(ctx.chat.id, ctx.message.message_id)

		// fechando pedido
		abertura = false

		total = paofrances+paodemilho+rosquinha+rosquinharecheio+croissantpresunto+croissantfrango+bisnaga+bisnagaacucar+bisnagacreme
		totalpedidos += 1

		// Zerando lista
		lista = []
		quem = []

		paofrances = 0;
		paodemilho = 0;

		rosquinha = 0;
		rosquinharecheio = 0;

		croissantpresunto = 0;
		croissantfrango = 0;

		bisnaga = 0;
		bisnagaacucar = 0;
		bisnagacreme = 0;


	} else {
		await ctx.reply(`O pedido já foi fechado 🔒 `)
	}
})


bot.command('total', async ctx => {
	await ctx.reply("O Tio do Pão já anotou "+totalpedidos+" pedidos, somando "+total+" coisas pra comer.")
})

bot.command('wifi', async ctx => {
	await ctx.replyWithMarkdown(`A senha do wifi *DPI_VISITANTE* é *opedroaindanaoacessa*`)
})

bot.command(['help', 'ajuda'], async ctx => {
	await ctx.reply(`
		/pao para iniciar um pedido
		/pedido para finalizar um pedido
		/cancelar para carregar o menu de subtração de itens
		/lista para carregar a lista de itens pedidos no momento
		/total para o tio falar quantos pedidos e pães já foram feitos desde a última vez que ele foi ligado
		/bicho para mostrar uma foto bonitinha de pães e bichos
		`)

})

bot.command('lista', async ctx => {


	if (abertura == true) {
		lista = []
	
		if (paofrances > 0) {
			lista.push('Pão Francês ('+paofrances+') ')
		}

		if (paodemilho > 0) {
			lista.push('Pão de Milho ('+paodemilho+') ')
		}

		if (rosquinha > 0) {
			lista.push('Rosquinha Comum ('+rosquinha+') ')
		}

		if (rosquinharecheio > 0) {
			lista.push('Rosquinha com Recheio ('+rosquinharecheio+') ')
		}

		if (croissantpresunto > 0) {
			lista.push('Croissant de Presunto ('+croissantpresunto+') ')
		}

		if (croissantfrango > 0) {
			lista.push('Croissant de Frango ('+croissantfrango+') ')
		}

		if (bisnaga > 0) {
			lista.push('Bisnaga Comum ('+bisnaga+') ')
		}

		if (bisnagaacucar > 0) {
			lista.push('Bisnaga com Açúcar ('+bisnagaacucar+') ')
		}

		if (bisnagacreme > 0) {
			lista.push('Bisnaga com Creme ('+bisnagacreme+') ')
		}

		await ctx.reply("Pedido atual: "+lista)

	} else {
		await ctx.reply(`O pedido já foi fechado 🔒 `)
	}
})

// TESTES

bot.command('teste', async ctx => {
	await ctx.reply("são "+datahora+" horas")
})

// Zueiras

bot.command('bichao', async ctx => {
	await ctx.reply("display: table;")
})

bot.command('mimi', async ctx => {
	await ctx.reply("🐦")
})

bot.command('kiki', async ctx => {
	await ctx.reply("🙏 god 🙏")
})

bot.command('tavinho', async ctx => {
	await ctx.reply("OH TAAAA TAAAAAAAHHHH.....")
})


// / Código

// Loop
bot.startPolling()