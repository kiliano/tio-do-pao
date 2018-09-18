'use strict'

// Data de nascimento do bot: 17/09/2018

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

if (datahora < 19) {
	setInterval(function(){
		var datahora = ((datacompleta.getHours())-3);
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

let soninho = 1;

// Teclado

const tecladoPao = Markup.keyboard([
	['🍞 Pão Francês', '🌽 Pão de Milho'],
	['🍩 Rosquinha', '🍩 com Recheio'],
	['🥐 Croissant Presunto', '🥐 Croissant Frango'],
	['🥖 Bisnaga','🥖 com Açúcar','🥖 com Creme']
	// ['✖ Não pedir nada']

]).resize().extra()


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
	let quem = []

	await ctx.replyWithMarkdown(`*📣📣📣 Hora do Pão Cambada!!! 📣📣📣*`, tecladoPao)
	await ctx.replyWithMarkdown(`Depois que todo mundo escolher o que quer, só digitar /pedido pra fechar o pedido.
		Se quiser remover algum item da lista, só digitar /cancelar.`)
	// abrindo pedidos
	abertura = true
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


bot.command('cancelar', async ctx => {
	if (abertura == true) {
		if (paofrances == 1) {
			lista.push('Pão Francês ('+paofrances+') ')
		}

		if (paofrances > 1) {
			lista.push('Pão Francês ('+paofãesnces+') es')
		}

		if (paodemilho == 1) {
			lista.push('Pão de Milho ('+paodemilho+') ')
		}

		if (paodemilho > 1) {
			lista.push('Pão de Milho ('+paodesmilho+') ')
		}

		if (rosquinha == 1) {
			lista.push('Rosquinha Comum ('+rosquinha+') ')
		}

		if (rosquinha > 1) {
			lista.push('Rosquinha Comum ('+rosquinsha+')ns')
		}

		if (rosquinharecheio == 1) {
			lista.push('Rosquinha com Recheio ('+rosquinharecheio+') ')
		}

		if (rosquinharecheio > 1) {
			lista.push('Rosquinha com Recheio ('+rosquinhsarecheio+') ')
		}

		if (croissantpresunto == 1) {
			lista.push('Croissant de Presunto ('+croissantpresunto+') ')
		}

		if (croissantpresunto > 1) {
			lista.push('Croissant de Presunto ('+croissantspresunto+') ')
		}

		if (croissantfrango == 1) {
			lista.push('Croissant de Frango ('+croissantfrango+') ')
		}

		if (croissantfrango > 1) {
			lista.push('Croissant de Frango ('+croissantsfrango+') ')
		}

		if (bisnaga == 1) {
			lista.push('Bisnaga Comum ('+bisnaga+') ')
		}

		if (bisnaga > 1) {
			lista.push('Bisnaga Comum ('+bisnasga+')ns')
		}

		if (bisnagaacucar == 1) {
			lista.push('Bisnaga com Açúcar ('+bisnagaacucar+') ')
		}

		if (bisnagaacucar > 1) {
			lista.push('Bisnaga com Açúcar ('+bisnagsaacucar+') ')
		}

		if (bisnagacreme == 1) {
			lista.push('Bisnaga com Creme ('+bisnagacreme+') ')
		}

		if (bisnagacreme > 1) {
			lista.push('Bisnaga com Creme ('+bisnagsacreme+') ')
		}

		await ctx.reply("Itens até o momento: "+lista+"", tecladoBranco)


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
	
		if (paofrances == 1) {
			lista.push(' \n'+paofrances+' Pão Francês')
		}

		if (paofrances > 1) {
			lista.push(' \n'+paofrances+' Pães Francêses')
		}

		if (paodemilho == 1) {
			lista.push(' \n'+paodemilho+' Pão de Milho')
		}

		if (paodemilho > 1) {
			lista.push(' \n'+paodemilho+' Pães de Milho')
		}

		if (rosquinha == 1) {
			lista.push(' \n'+rosquinha+' Rosquinha Comum')
		}

		if (rosquinha > 1) {
			lista.push(' \n'+rosquinha+' Rosquinhas Comuns')
		}

		if (rosquinharecheio == 1) {
			lista.push(' \n'+rosquinharecheio+' Rosquinha com Recheio')
		}

		if (rosquinharecheio > 1) {
			lista.push(' \n'+rosquinharecheio+' Rosquinhas com Recheio')
		}

		if (croissantpresunto == 1) {
			lista.push(' \n'+croissantpresunto+' Croissant de Presunto')
		}

		if (croissantpresunto > 1) {
			lista.push(' \n'+croissantpresunto+' Croissants de Presunto')
		}

		if (croissantfrango == 1) {
			lista.push(' \n'+croissantfrango+' Croissant de Frango')
		}

		if (croissantfrango > 1) {
			lista.push(' \n'+croissantfrango+' Croissants de Frango')
		}

		if (bisnaga == 1) {
			lista.push(' \n'+bisnaga+' Bisnaga Comum')
		}

		if (bisnaga > 1) {
			lista.push(' \n'+bisnaga+' Bisnagas Comuns')
		}

		if (bisnagaacucar == 1) {
			lista.push(' \n'+bisnagaacucar+' Bisnaga com Açúcar')
		}

		if (bisnagaacucar > 1) {
			lista.push(' \n'+bisnagaacucar+' Bisnagas com Açúcar')
		}

		if (bisnagacreme == 1) {
			lista.push(' \n'+bisnagacreme+' Bisnaga com Creme')
		}

		if (bisnagacreme > 1) {
			lista.push(' \n'+bisnagacreme+' Bisnagas com Creme')
		}

		await ctx.replyWithMarkdown(`*📝📝 Pedidos pro Tio do Pão 📝📝*`)

		await ctx.reply(""+lista+"", tecladoBranco)

		// await ctx.replyWithMarkdown(`*Quem pediu o que:*`)
		// await ctx.replyWithMarkdown("_[ "+quem+" ]_")

		// fechando pedido
		abertura = false

		total = paofrances+paodemilho+rosquinha+rosquinharecheio+croissantpresunto+croissantfrango+bisnaga+bisnagaacucar+bisnagacreme
		totalpedidos += 1

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
		/quem mostra quem pediu o que no último pedido
		/cancelar para carregar o menu de subtração de itens
		/lista para carregar a lista de itens pedidos no momento
		/total para o tio falar quantos pedidos e pães já foram feitos desde a última vez que ele foi ligado
		`)

})

bot.command('lista', async ctx => {


	if (abertura == true) {
		lista = []
	
		if (paofrances == 1) {
			lista.push(' \n'+paofrances+' Pão Francês')
		}

		if (paofrances > 1) {
			lista.push(' \n'+paofrances+' Pães Francêses')
		}

		if (paodemilho == 1) {
			lista.push(' \n'+paodemilho+' Pão de Milho')
		}

		if (paodemilho > 1) {
			lista.push(' \n'+paodemilho+' Pães de Milho')
		}

		if (rosquinha == 1) {
			lista.push(' \n'+rosquinha+' Rosquinha Comum')
		}

		if (rosquinha > 1) {
			lista.push(' \n'+rosquinha+' Rosquinhas Comuns')
		}

		if (rosquinharecheio == 1) {
			lista.push(' \n'+rosquinharecheio+' Rosquinha com Recheio')
		}

		if (rosquinharecheio > 1) {
			lista.push(' \n'+rosquinharecheio+' Rosquinhas com Recheio')
		}

		if (croissantpresunto == 1) {
			lista.push(' \n'+croissantpresunto+' Croissant de Presunto')
		}

		if (croissantpresunto > 1) {
			lista.push(' \n'+croissantpresunto+' Croissants de Presunto')
		}

		if (croissantfrango == 1) {
			lista.push(' \n'+croissantfrango+' Croissant de Frango')
		}

		if (croissantfrango > 1) {
			lista.push(' \n'+croissantfrango+' Croissants de Frango')
		}

		if (bisnaga == 1) {
			lista.push(' \n'+bisnaga+' Bisnaga Comum')
		}

		if (bisnaga > 1) {
			lista.push(' \n'+bisnaga+' Bisnagas Comuns')
		}

		if (bisnagaacucar == 1) {
			lista.push(' \n'+bisnagaacucar+' Bisnaga com Açúcar')
		}

		if (bisnagaacucar > 1) {
			lista.push(' \n'+bisnagaacucar+' Bisnagas com Açúcar')
		}

		if (bisnagacreme == 1) {
			lista.push(' \n'+bisnagacreme+' Bisnaga com Creme')
		}

		if (bisnagacreme > 1) {
			lista.push(' \n'+bisnagacreme+' Bisnagas com Creme')
		}

		await ctx.reply(""+lista+"", tecladoBranco)

	} else {
		await ctx.reply(`O pedido já foi fechado 🔒 `)
	}
})


bot.command('quem', async ctx => {

	if (abertura == true) {
	
		await ctx.replyWithMarkdown(`*Quem pediu o que, até o momento:*`)
		await ctx.replyWithMarkdown("_[ "+quem+" ]_")

	} else {
		await ctx.replyWithMarkdown(`*Quem pediu o que, no último pedido:*`)
		await ctx.replyWithMarkdown("_[ "+quem+" ]_")
	}
})



bot.command('id', async ctx => {
	await ctx.reply(`Oi ${ctx.update.message.from.first_name}, seu id é ${ctx.update.message.from.id}. Essa é uma info meio sensível, melhor apagar essa mensagem depois. `)
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

bot.command('gege', async ctx => {
	await ctx.reply("🐷")
})

bot.command('kiki', async ctx => {
	await ctx.reply("🙏 god 🙏")
})

bot.command('tavinho', async ctx => {
	await ctx.reply("OH TAAAA TAAAAAAAHHHH.....")
})

bot.command(['bicho'], async ctx => {
	random = Math.floor((Math.random() * 23) + 1)
	ctx.replyWithPhoto('http://kiliano.com.br/pao/'+random+'.jpg')
})

bot.command(['faustop'], async ctx => {
	random = Math.floor((Math.random() * 3) + 1)
	ctx.replyWithPhoto('http://kiliano.com.br/faustop/'+random+'.jpg')
})


// / Código

// Loop
bot.startPolling()