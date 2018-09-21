'use strict'
var http = require('http')

const Telegraf = require('telegraf')
const Markup = require('telegraf/markup')
const Extra = require('telegraf/extra')
const axios = require('axios')

var datacompleta = new Date();
var datahora = datacompleta.getHours();
var datadata = (datacompleta.getDate()+'/'+(datacompleta.getMonth()+1)+'/'+datacompleta.getFullYear());

var debug = false


// Data de nascimento do bot: 17/09/2018

// Chamadas para o Local
	const env = require('./.env')
	const bot = new Telegraf(env.token)

	const apiUrl = env.apiUrl
	const apiFileUrl = env.apiFileUrl

	const idKiliano = env.idKiliano
	const idBartira = env.idBartira
	const idChatDegrau = env.idChatDegrau
	const idChatFronts = env.idChatFronts

	const idTodos = env.idTodos


// Chamadas para o Heroku
	// 		setTimeout(function(){
	// 			http.get("http://shielded-peak-24448.herokuapp.com/")
	// 			console.log(datahora-3)
	// 		 },1350000);

	// 		setInterval(function(){ 
	// 			var datacompleta = new Date();
	// 			let datahora = ((datacompleta.getHours()));
	// 			if (datahora < 19+3) {
	// 				setTimeout(function(){
	// 					http.get("http://shielded-peak-24448.herokuapp.com/")
	// 					console.log(datahora-3)
	// 				 },750000);

	// 				setTimeout(function(){
	// 					http.get("http://shielded-peak-24448.herokuapp.com/")
	// 					console.log(datahora-3)
	// 				 },1350000);
	// 			}
	// 		}, 2400000);


	// var port = (process.env.PORT || 5000)

	// http.createServer(function(request, response) {
	// 	response.writeHead(200,{'Content-Type': 'application/json'});
	// 	response.write(JSON.stringify({name: 'tiodopaobot', ver: '0.1'}));
	// 	response.end();
	// }).listen(port)

	// const token = process.env.token

	// const idKiliano = process.env.idKiliano
	// const idBartira = process.env.idBartira
	// const idChatDegrau = process.env.idChatDegrau
	// const idChatFronts = process.env.idChatFronts

	// const idTodos = process.env.idTodos

	// const apiUrl = `https://api.telegram.org/bot${token}`
	// const apiFileUrl = `https://api.telegram.org/file/bot${token}`

	// const bot = new Telegraf(token)



// Código

let random = Math.floor((Math.random() * 23) + 1)
let ultimorandom = random

let acoes = []
let acao = []

let substituicoes = []

let lista = []
let listaanterior = []
let quem = []


// Pedido
let abertura = true

// Pedido simples
let paofrances = 0;
let paodemilho = 0;

let rosquinha = 0;
let rosquinharecheio = 0;

let croissantpresunto = 0;
let croissantfrango = 0;

let bisnaga = 0;
let bisnagaacucar = 0;
let bisnagacreme = 0;


// mensagem
const msg = (msg, id) => {
	axios.get(`${apiUrl}/sendMessage?chat_id=${id}&text=${encodeURI(msg)}`)
		.catch(e => console.log(e))
}

// Reset
const resetSimples = () => {
	// lista
	lista = []

	// Primário
	paofrances = 0;
	paodemilho = 0;

	rosquinha = 0;
	rosquinharecheio = 0;

	croissantpresunto = 0;
	croissantfrango = 0;

	bisnaga = 0;
	bisnagaacucar = 0;
	bisnagacreme = 0;

}

// Montando lista de pedidos

const listar = () => {
	
	resetSimples()

	// for adicionando e removendo itens
	var i = 0;
	for (i = 0; i < acoes.length; i++) {
		acao = acoes[i].split(" : ");
		
		if (acao[1] == 'pediu') {

			if (acao[2] == '🍞 Pão Francês') paofrances += 1;
			if (acao[2] == '🌽 Pão de Milho') paodemilho += 1;
			if (acao[2] == '🍩 Rosquinha') rosquinha += 1;
			if (acao[2] == '🍩 com Recheio') rosquinharecheio += 1;
			if (acao[2] == '🥐 Croissant Presunto') croissantpresunto += 1;
			if (acao[2] == '🥐 Croissant Frango') croissantpresunto += 1;
			if (acao[2] == '🥖 Bisnaga') bisnaga += 1;
			if (acao[2] == '🥖 com Açúcar') bisnagaacucar += 1;
			if (acao[2] == '🥖 com Creme') bisnagacreme += 1;
		}

		if (acao[1] == 'deletou') {

			if (acao[2] == '❌ P. Francês') paofrances -= 1;
			if (acao[2] == '❌ P. Milho') paodemilho -= 1;
			if (acao[2] == '❌ Rosquinha') rosquinha -= 1;
			if (acao[2] == '❌ Ros. com Recheio') rosquinharecheio -= 1;
			if (acao[2] == '❌ Croissant Presunto') croissantpresunto -= 1;
			if (acao[2] == '❌ Croissant Frango') croissantpresunto -= 1;
			if (acao[2] == '❌ Bisnaga') bisnaga -= 1;
			if (acao[2] == '❌ Bis. Açúcar') bisnagaacucar -= 1;
			if (acao[2] == '❌ Bis. Creme') bisnagacreme -= 1;
		}
	}
	// / for

	// Gerando lista de nomes
	if (paofrances == 1) {
		lista.push(' \n'+paofrances+' Pão Francês')
	}

	if (paofrances > 1) {
		lista.push(' \n'+paofrances+' Pães Franceses')
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
}

// Teclados

// Pedido em mensagem direta
const tecladoPao = Markup.keyboard([
	['🍞 Pão Francês', '🌽 Pão de Milho'],
	['🍩 Rosquinha', '🍩 com Recheio'],
	['🥐 Croissant Presunto', '🥐 Croissant Frango'],
	['🥖 Bisnaga','🥖 com Açúcar','🥖 com Creme'],
	['❌Não quero pedir pão❌']

]).resize().oneTime().extra()


const tecladoSegunda = Markup.keyboard([
	['❌Não quero uma segunda opção❌'],
	['🍞 Pão Francês.', '🌽 Pão de Milho.'],
	['🍩 Rosquinha.', '🍩 com Recheio.'],
	['🥐 Croissant Presunto.', '🥐 Croissant Frango.'],
	['🥖 Bisnaga.','🥖 com Açúcar.','🥖 com Creme.']

]).resize().oneTime().extra()

const tecladoRemover = Markup.keyboard([
	['❌ P. Francês', '❌ P. Milho'],
	['❌ Rosquinha', '❌ Ros. com Recheio'],
	['❌ Croissant Presunto', '❌ Croissant Frango'],
	['❌ Bisnaga','❌ Bis. Açúcar,','❌ Bis. Creme']

]).resize().oneTime().extra()

const tecladoFinal = Markup.keyboard([
	['😋 Quero pedir mais um pão'],
	['👍 Tô satisfeito tio!'],

]).resize().oneTime().extra()



// Teclado em branco
const tecladoBranco = Markup.keyboard([
	['👍 Valeu Tio!']

]).resize().oneTime().extra()


bot.command(['pao','Pao'], async ctx => {
	let quem = []

	await ctx.replyWithMarkdown(`*📣📣📣 Hora do Pão Cambada!!! 📣📣📣*`)
	

	// var i = 0;
	// for (i = 0; i < idTodos.length; i++) {
	// 	console.log(idTodos[i])
	// }

	// colocar no for
	msg(`📣📣📣 O pedido do Pão está aberto! 📣📣📣 \n Só clicar ou digitar /pedir para pedir o pão`, idKiliano)
	// / colocar no for

	// abrindo pedidos
	abertura = true
})

bot.command(['pedir'], async ctx => {
	await ctx.replyWithMarkdown(`Escolha seu pãozinho`, tecladoPao)

})


// Ouvindo o pedido
bot.hears(['🍞 Pão Francês', '🌽 Pão de Milho', '🍩 Rosquinha', '🍩 com Recheio','🥐 Croissant Presunto', '🥐 Croissant Frango','🥖 Bisnaga','🥖 com Açúcar','🥖 com Creme','🍞 Pão Francês', '🌽 Pão de Milho', '🍩 Rosquinha', '🍩 com Recheio','🥐 Croissant Presunto', '🥐 Croissant Frango','🥖 Bisnaga','🥖 com Açúcar','🥖 com Creme'], async ctx => {
	if (abertura == true) {
		acoes.push(`${ctx.update.message.from.first_name} : pediu : ${ctx.update.message.text}`)
		console.log(acoes)
		await ctx.replyWithMarkdown(`Anotei seu pedido 😊\n
		Caso não tenha ${ctx.update.message.text}, você quer que peça outra coisa?`, tecladoSegunda)

	} else {
		await ctx.reply(`Oi, ${ctx.update.message.from.first_name}. A anotação dos pedidos já foi fechada 🔒. Para abrir, basta digitar /pao no grupo da degrau `)
	}
})


// Selecionado uma segunda opção

bot.hears(['❌Não quero uma segunda opção❌'], async ctx => {
	
	if (abertura == true) {
		await ctx.reply(`Beleza 😊. Anotei seu pedido. Quer mais algo? `, tecladoFinal)
		console.log(acoes)

	} else {
		await ctx.reply(`Oi, ${ctx.update.message.from.first_name}. A anotação dos pedidos já foi fechada 🔒. Para abrir, basta digitar /pao no grupo da degrau `)
	}
})


bot.hears(['🍞 Pão Francês.', '🌽 Pão de Milho.', '🍩 Rosquinha.', '🍩 com Recheio.','🥐 Croissant Presunto.', '🥐 Croissant Frango.','🥖 Bisnaga.','🥖 com Açúcar.','🥖 com Creme.'], async ctx => {
	
	if (abertura == true) {
		substituicoes.push(`${ctx.update.message.from.first_name} : segunda : ${ctx.update.message.text}`)
		await ctx.reply(`Ok! Vou trazer ${ctx.update.message.text} caso não tenha o que você pediu primeiro. Mais alguma coisa? `, tecladoFinal)
		console.log(substituicoes)

	} else {
		await ctx.reply(`Oi, ${ctx.update.message.from.first_name}. A anotação dos pedidos já foi fechada 🔒. Para abrir, basta digitar /pao no grupo da degrau `)
	}
})

// Removendo um pedido
bot.hears(['❌ P. Francês', '❌ P. Milho', '❌ Rosquinha', '❌ Ros. com Recheio','❌ Croissant Presunto', '❌ Croissant Frango','❌ Bisnaga','❌ Bis. Açúcar','❌ Bis. Creme'], async ctx => {
	if (abertura == true) {
		acoes.push(`${ctx.update.message.from.first_name} : deletou : ${ctx.update.message.text}`)
		console.log(acoes)

	} else {
		await ctx.reply(`Oi, ${ctx.update.message.from.first_name}. A anotação dos pedidos já foi fechada 🔒. Para abrir, basta digitar /pao no grupo da degrau `)
	}
})




// Finalizando pedido particular
bot.hears(['😋 Quero pedir mais um pão'], async ctx => {
	await ctx.replyWithMarkdown(`Tá com fome ein? Pede aí ✌️ `, tecladoPao)
})


bot.hears(['👍 Tô satisfeito tio!'], async ctx => {
	await ctx.reply(`É nóiz 👍`)
})


bot.command('lista', async ctx => {
	listar();
	await ctx.reply("Pedidos: "+lista+" ")
})

bot.command('remover', async ctx => {
	await ctx.reply("Escolha o que você quer remover da lista", tecladoRemover)
})

// Concluíndo pedido

bot.command(['pedido', 'fechar', 'finalizar', 'fecharpedido'], async ctx => {

	if (abertura == true) {
		listar()

		await ctx.replyWithMarkdown(`*📝📝 Pedidos pro Tio do Pão 📝📝*`)

		await ctx.reply("Pedido: "+lista+"", tecladoBranco)

		listaanterior = lista

		msg(`Não esquece de mandar um /bartira pra gravar o último pedido`, idKiliano)

		// await ctx.replyWithMarkdown(`*Quem pediu o que:*`)
		// await ctx.replyWithMarkdown("_[ "+quem+" ]_")

		// fechando pedido
		abertura = false


	} else {
		await ctx.reply(`O pedido já foi fechado 🔒 `)
		await ctx.reply("Essa é a lista do último pedido feito: "+listaanterior+"")
	}
})



// bot.command(['/bartira'], async ctx => {
// 	if (debug == false) {
// 		msg(`Último pedido feito :\n\n ${datadata} \n ${listaanterior}`, idKiliano)

// 		msg(`Oi Bartira, o último pedido feito hoje foi:\n\n ${datadata} \n ${listaanterior}`, idBartira)
// 	}
// })







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


bot.command('id', async ctx => {
	await ctx.reply(`Oi ${ctx.update.message.from.first_name}, seu id é ${ctx.update.message.from.id}. O id do chat é ${ctx.chat.id}. Essa é uma info meio sensível, melhor apagar essa mensagem depois. `)
})

bot.command('msg', async ctx => {
	if (ctx.update.message.from.id == idKiliano) {

		var mimic = ctx.update.message.text

		var destino = mimic.split(/\s+/).slice(1,2);

		var mimic = mimic.replace("/msg", "");
		
		var mimic = mimic.replace(destino, "");

		if (destino == "grupo" ) {
			msg(mimic, idChatDegrau)
		} else {
			if (destino == "kiliano" ) {
				msg(mimic, idKiliano)
			} else {
				if (destino == "bartira" ) {
					msg(mimic, idBartira)
				} else {

					if (destino == "fronts" ) {
						msg(mimic, idChatFronts)
					} else {
						await ctx.reply(`Mensagem - ${mimic} - não pode ser entregue porque o destino não foi especificado.
							Atuais cadastrados: grupo, kiliano, bartira
						`)
					}
				}
			}

			
		}
	}
})



// Start

bot.start(async ctx => {
	await ctx.reply(`Oi! 😀`);
	if (ctx.chat.id != idChatDegrau) {
		msg(`${ctx.update.message.from.first_name} começou a conversar com o Horácio. O ID dele é ${ctx.update.message.from.id} `, idKiliano)
	}
})





// TESTES

bot.command('teste', async ctx => {
	await ctx.reply(`Clique no item para diminuir a quantidade da lista.`)
})

// Teste com o Open Weather







// / Código

// Loop
bot.startPolling()