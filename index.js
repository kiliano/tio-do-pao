'use strict'
var http = require('http')

const Telegraf = require('telegraf')
const Markup = require('telegraf/markup')
const Extra = require('telegraf/extra')
const axios = require('axios')

var datacompleta = new Date();
var datahora = datacompleta.getHours();
var datadia = datacompleta.getDate();
var datames = (datacompleta.getMonth()+1);
var dataano = datacompleta.getFullYear();
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
var trocasvalidas = [];

// Pedido

var pedido = {
		"dia_data": datadia,
		"mes_data": datames,
		"ano_data": dataano,
		"acoes": [],
		"indisponibilidade": [],
		"lista": [],
		"paofrances":0,
		"paodemilho":0,
		"rosquinha":0,
		"rosquinharecheio":0,
		"croissantpresunto":0,
		"croissantfrango":0,
		"bisnaga":0,
		"bisnagaacucar":0,
		"bisnagacreme":0,
	};

// Variáveis do pedido

// mensagem
const msg = (msg, id) => {
	axios.get(`${apiUrl}/sendMessage?chat_id=${id}&text=${encodeURI(msg)}`)
		.catch(e => console.log(e))
}

// Começando o dia
const novodia = () => {

	// Horário
	datacompleta = new Date();
	datahora = datacompleta.getHours();
	datadia = datacompleta.getDate();
	datames = (datacompleta.getMonth()+1);
	dataano = datacompleta.getFullYear();
	datadata = (datacompleta.getDate()+'/'+(datacompleta.getMonth()+1)+'/'+datacompleta.getFullYear());


	// Zerando pedido do dia
	pedido = {
		"dia_data": datadia,
		"mes_data": datames,
		"ano_data": dataano,
		"acoes": [],
		"indisponibilidade": [],
		"lista": [],
		"paofrances":0,
		"paodemilho":0,
		"rosquinha":0,
		"rosquinharecheio":0,
		"croissantpresunto":0,
		"croissantfrango":0,
		"bisnaga":0,
		"bisnagaacucar":0,
		"bisnagacreme":0,
	};

	console.log(pedido)
}


// Montando lista de pedidos
const listar = () => {
	// Reset

	trocasvalidas = [];
	pedido.lista =[]

	pedido.paofrances = 0
	pedido.paodemilho = 0
	pedido.rosquinha = 0
	pedido.rosquinharecheio = 0
	pedido.croissantpresunto = 0
	pedido.croissantfrango = 0
	pedido.bisnaga = 0
	pedido.bisnagaacucar = 0
	pedido.bisnagacreme = 0

	// Quantidades simples, baseada nos pedidos
	for (var i = 0; i < pedido.acoes.length; i++) {
		var acaoatual = pedido.acoes[i].split(' : ');
		if (acaoatual[2] == 'pediu') {
			if ( acaoatual[3] == 'Pão Francês') pedido.paofrances +=1 
			if ( acaoatual[3] == 'Pão de Milho') pedido.paodemilho +=1 
			if ( acaoatual[3] == 'Rosquinha Comum') pedido.rosquinha +=1 
			if ( acaoatual[3] == 'Rosquinha com Recheio') pedido.rosquinharecheio +=1 
			if ( acaoatual[3] == 'Croissant Presunto') pedido.croissantpresunto +=1 
			if ( acaoatual[3] == 'Croissant Frango') pedido.croissantfrango +=1 
			if ( acaoatual[3] == 'Bisnaga Comum') pedido.bisnaga +=1 
			if ( acaoatual[3] == 'Bisnaga com Açúcar') pedido.bisnagaacucar +=1 
			if ( acaoatual[3] == 'Bisnaga com Creme') pedido.bisnagacreme +=1 
		}
	}


	// Itens Indisponíveis

	if (pedido.indisponibilidade.length > 0) {
		for (var i = 0; i < pedido.acoes.length; i++) {

			var acaoatual = pedido.acoes[i].split(' : ');

			// Estrutura da troca id[0] : nome[1] : trocou[2] : produto original[3] : por[4] : produto trocado[5]
			if (acaoatual[2] == 'trocou' ) {
				trocasvalidas.push(pedido.acoes[i]);
			}
		}
	}

	if (trocasvalidas.length > 0 ) {

		for (var i = 0; i < pedido.indisponibilidade.length; i++) {

			for (var it = 0; it < trocasvalidas.length; it++) {

				var acaoatual = trocasvalidas[it].split(' : ');

				if (pedido.indisponibilidade[i] == acaoatual[3] ) {
					if ( acaoatual[5] == 'Pão Francês') pedido.paofrances +=1 
					if ( acaoatual[5] == 'Pão de Milho') pedido.paodemilho +=1 
					if ( acaoatual[5] == 'Rosquinha Comum') pedido.rosquinha +=1 
					if ( acaoatual[5] == 'Rosquinha com Recheio') pedido.rosquinharecheio +=1 
					if ( acaoatual[5] == 'Croissant Presunto') pedido.croissantpresunto +=1 
					if ( acaoatual[5] == 'Croissant Frango') pedido.croissantfrango +=1 
					if ( acaoatual[5] == 'Bisnaga Comum') pedido.bisnaga +=1 
					if ( acaoatual[5] == 'Bisnaga com Açúcar') pedido.bisnagaacucar +=1 
					if ( acaoatual[5] == 'Bisnaga com Creme') pedido.bisnagacreme +=1 


				}

			}

		}

		console.log(pedido.indisponibilidade);

		for (var ij = 0; ij < pedido.indisponibilidade.length; ij++) {
			console.log("indisponivel zerar "+pedido.indisponibilidade[ij]);

			if ( pedido.indisponibilidade[ij] == 'Pão Francês') pedido.paofrances = 0 
			if ( pedido.indisponibilidade[ij] == 'Pão de Milho') pedido.paodemilho = 0 
			if ( pedido.indisponibilidade[ij] == 'Rosquinha Comum') pedido.rosquinha = 0 
			if ( pedido.indisponibilidade[ij] == 'Rosquinha com Recheio') pedido.rosquinharecheio = 0 
			if ( pedido.indisponibilidade[ij] == 'Croissant Presunto') pedido.croissantpresunto = 0 
			if ( pedido.indisponibilidade[ij] == 'Croissant Frango') pedido.croissantfrango = 0 
			if ( pedido.indisponibilidade[ij] == 'Bisnaga Comum') pedido.bisnaga = 0 
			if ( pedido.indisponibilidade[ij] == 'Bisnaga com Açúcar') pedido.bisnagaacucar = 0 
			if ( pedido.indisponibilidade[ij] == 'Bisnaga com Creme') pedido.bisnagacreme = 0 

		}

	}

	


	// Gerando lista de nomes
	if (pedido.paofrances == 1) {
		pedido.lista.push(' \n '+pedido.paofrances+' Pão Francês')
	}

	if (pedido.paofrances > 1) {
		pedido.lista.push(' \n '+pedido.paofrances+' Pães Franceses')
	}

	if (pedido.paodemilho == 1) {
		pedido.lista.push(' \n '+pedido.paodemilho+' Pão de Milho')
	}

	if (pedido.paodemilho > 1) {
		pedido.lista.push(' \n '+pedido.paodemilho+' Pães de Milho')
	}

	if (pedido.rosquinha == 1) {
		pedido.lista.push(' \n '+pedido.rosquinha+' Rosquinha Comum')
	}

	if (pedido.rosquinha > 1) {
		pedido.lista.push(' \n '+pedido.rosquinha+' Rosquinhas Comuns')
	}

	if (pedido.rosquinharecheio == 1) {
		pedido.lista.push(' \n '+pedido.rosquinharecheio+' Rosquinha com Recheio')
	}

	if (pedido.rosquinharecheio > 1) {
		pedido.lista.push(' \n '+pedido.rosquinharecheio+' Rosquinhas com Recheio')
	}

	if (pedido.croissantpresunto == 1) {
		pedido.lista.push(' \n '+pedido.croissantpresunto+' Croissant de Presunto')
	}

	if (pedido.croissantpresunto > 1) {
		pedido.lista.push(' \n '+pedido.croissantpresunto+' Croissants de Presunto')
	}

	if (pedido.croissantfrango == 1) {
		pedido.lista.push(' \n '+pedido.croissantfrango+' Croissant de Frango')
	}

	if (pedido.croissantfrango > 1) {
		pedido.lista.push(' \n '+pedido.croissantfrango+' Croissants de Frango')
	}

	if (pedido.bisnaga == 1) {
		pedido.lista.push(' \n '+pedido.bisnaga+' Bisnaga Comum')
	}

	if (pedido.bisnaga > 1) {
		pedido.lista.push(' \n '+pedido.bisnaga+' Bisnagas Comuns')
	}

	if (pedido.bisnagaacucar == 1) {
		pedido.lista.push(' \n '+pedido.bisnagaacucar+' Bisnaga com Açúcar')
	}

	if (pedido.bisnagaacucar > 1) {
		pedido.lista.push(' \n '+pedido.bisnagaacucar+' Bisnagas com Açúcar')
	}

	if (pedido.bisnagacreme == 1) {
		pedido.lista.push(' \n '+pedido.bisnagacreme+' Bisnaga com Creme')
	}

	if (pedido.bisnagacreme > 1) {
		pedido.lista.push(' \n '+pedido.bisnagacreme+' Bisnagas com Creme')
	}

	console.log("lista: "+pedido.lista)

	
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


const tecladoBranco = Markup.keyboard([
	['👍 Valeu Tio!']

]).resize().oneTime().extra()




// Início do dia
novodia();


// Criação de comandos

bot.command(['pao','Pao'], async ctx => {
	await ctx.replyWithMarkdown(`*📣📣📣 Hora do Pão Cambada!!! 📣📣📣*`)
	msg(`📣📣📣 O pedido do Pão está aberto! 📣📣📣 \n Só clicar ou digitar /pedir para pedir o pão`, idKiliano)


})

bot.command(['pedir'], async ctx => {
	await ctx.replyWithMarkdown(`Escolha seu pãozinho`, tecladoPao)

})


// Ouvindo o pedido
bot.hears(['🍞 Pão Francês', '🌽 Pão de Milho', '🍩 Rosquinha', '🍩 com Recheio','🥐 Croissant Presunto', '🥐 Croissant Frango','🥖 Bisnaga','🥖 com Açúcar','🥖 com Creme'], async ctx => {
	await ctx.replyWithMarkdown(`Anotei seu pedido 😊 \n*Caso não tenha ${ctx.update.message.text}, você quer que peça outra coisa?*`, tecladoSegunda)

	var nome = ctx.update.message.from.first_name
	nome.replace(":", " ")


	var item = ctx.update.message.text;
	
	if (item == '🍞 Pão Francês') item = 'Pão Francês'
	if (item == '🌽 Pão de Milho') item = 'Pão de Milho'
	if (item == '🍩 Rosquinha') item = 'Rosquinha Comum'
	if (item == '🍩 com Recheio') item = 'Rosquinha com Recheio'
	if (item == '🥐 Croissant Presunto') item = 'Croissant Presunto'
	if (item == '🥐 Croissant Frango') item = 'Croissant Frango'
	if (item == '🥖 Bisnaga') item = 'Bisnaga Comum'
	if (item == '🥖 com Açúcar') item = 'Bisnaga com Açúcar'
	if (item == '🥖 com Creme') item = 'Bisnaga com Creme'

	pedido.acoes.push(ctx.update.message.from.id+' : '+nome+' : pediu : '+item)
	console.log(pedido.acoes)
})


// Selecionado uma segunda opção

bot.hears(['❌Não quero uma segunda opção❌'], async ctx => {
	await ctx.reply(`Beleza 😊. Anotei seu pedido. Quer mais algo? `, tecladoFinal)

})



bot.hears(['🍞 Pão Francês.', '🌽 Pão de Milho.', '🍩 Rosquinha.', '🍩 com Recheio.','🥐 Croissant Presunto.', '🥐 Croissant Frango.','🥖 Bisnaga.','🥖 com Açúcar.','🥖 com Creme.'], async ctx => {

	// Estrutura do pedido id[0] : nome[1] : pediu[2] : produto[3]

	var acaoitemoriginal = "";

	if (pedido.acoes.length > 0) {

		for (var i = pedido.acoes.length; i > 0; i--) {

			var acaoatual = pedido.acoes[i-1].split(' : ');

			if (acaoatual[0] == ctx.update.message.from.id && acaoatual[2] == 'pediu' ) {
				acaoitemoriginal = acaoatual[3];
				i = 0;
			} else {
			}
		}
	}
	
	// Estrutura da troca id[0] : nome[1] : trocou[2] : produto original[3] : por[4] : produto trocado[5]
	var nome = ctx.update.message.from.first_name
	nome.replace(":", " ")

	var item = ctx.update.message.text;
	
	if (item == '🍞 Pão Francês.') item = 'Pão Francês'
	if (item == '🌽 Pão de Milho.') item = 'Pão de Milho'
	if (item == '🍩 Rosquinha.') item = 'Rosquinha Comum'
	if (item == '🍩 com Recheio.') item = 'Rosquinha com Recheio'
	if (item == '🥐 Croissant Presunto.') item = 'Croissant Presunto'
	if (item == '🥐 Croissant Frango.') item = 'Croissant Frango'
	if (item == '🥖 Bisnaga.') item = 'Bisnaga Comum'
	if (item == '🥖 com Açúcar.') item = 'Bisnaga com Açúcar'
	if (item == '🥖 com Creme.') item = 'Bisnaga com Creme'


	pedido.acoes.push(ctx.update.message.from.id+' : '+nome+' : trocou : '+acaoitemoriginal+' : por : '+item)
	console.log(pedido.acoes)

	await ctx.reply(`Ok! Caso não tenha ${acaoitemoriginal}, vou trazer ${ctx.update.message.text} Mais alguma coisa? `, tecladoFinal)
})

// Removendo um pedido
bot.hears(['❌ Cancelar meus Pedidos ❌'], async ctx => {

	if (pedido.acoes.length > 0) {
		for (var i = pedido.acoes.length - 1; i > 0; i--) {

			var acaoatual = pedido.acoes[i].split(' : ');

			console.log("avaliando item "+i);

			console.log('Comparação de ids '+acaoatual[0]+' == '+ctx.update.message.from.id);
			if(acaoatual[0] == ctx.update.message.from.id) {
		        pedido.acoes.splice(i, 1);

		        i = pedido.acoes.length;
		        console.log("igual! apagando");
		    } else {
		    	console.log("apagando");
		    }
		}
	}


	await ctx.replyWithMarkdown(`*Todos os seus pedidos foram removidos*`, tecladoSegunda);

	console.log(pedido.acoes);
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
	await ctx.reply("Pedidos: "+pedido.lista+" ")
})

bot.command('remover', async ctx => {
	await ctx.reply("Escolha o que você quer remover da lista", tecladoRemover)
})

// Concluíndo pedido

bot.command(['pedido', 'fechar', 'finalizar', 'fecharpedido'], async ctx => {

		listar()

		await ctx.replyWithMarkdown(`*📝📝 Pedidos pro Tio do Pão 📝📝*`)

		await ctx.reply("Pedido: "+pedido.lista+"", tecladoBranco)

		msg(`Não esquece de mandar um /bartira pra gravar o último pedido`, idKiliano)
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
	console.log(pedido.acoes);
	await ctx.reply(`Testado`);

})

// Teste com o Open Weather







// / Código

// Loop
bot.startPolling()