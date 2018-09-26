'use strict'

var http = require('http');
const Telegraf = require('telegraf');
const Markup = require('telegraf/markup');
const Extra = require('telegraf/extra');
const axios = require('axios');
var wordpress = require( "wordpress" );


// FINALMENTE
// http://itlc.comp.dkit.ie/tutorials/nodejs/create-wordpress-post-node-js/

// https://www.npmjs.com/package/wordpress

var datacompleta;
var datahora;
var datadia;
var datames;
var dataano;
var datadata;
var dataai;

var debug = false;

var acordado = true;

var fimdodia = false;

// Clima

var clima = {};
var climaicon = "";

// Data de nascimento do bot: 17/09/2018





// Chamadas para o Local
	const env = require('./.env');
	const bot = new Telegraf(env.token);

	const apiUrl = env.apiUrl;
	const apiFileUrl = env.apiFileUrl;

	const idKiliano = env.idKiliano;
	const idBartira = env.idBartira;
	const idChatDegrau = env.idChatDegrau;
	const idChatFronts = env.idChatFronts;

	const idTodos = env.idTodos;


	const apiClimatempo = env.apiClimatempo;

	const wordpressPass = env.wordpressPass;


// Chamadas para o Heroku
	// 		setTimeout(function(){
	// 			http.get("http://shielded-peak-24448.herokuapp.com/")
	// 			console.log(datahora-3)
	// 		 },1350000);

	// 		setInterval(function(){ 
	// 			var datacompleta = new Date();
	// 			let datahora = ((datacompleta.getHours()));
	// 			if (datahora < 19+3) {

	// 				if (fimdodia == true) {
	// 					fimdodia = false;
	// 					novodia();
	// 				}


	// 				setTimeout(function(){
	// 					http.get("http://shielded-peak-24448.herokuapp.com/")
	// 					console.log(datahora-3)
	// 				 },750000);

	// 				setTimeout(function(){
	// 					http.get("http://shielded-peak-24448.herokuapp.com/")
	// 					console.log(datahora-3)
	// 				 },1350000);
	// 			} else {

	// 				if (fimdodia == false) {
	// 					fimdodia = true;
	// 				}

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
	// const wordpressPass = process.env.wordpressPass;

	// const idTodos = process.env.idTodos

	// const apiUrl = `https://api.telegram.org/bot${token}`
	// const apiFileUrl = `https://api.telegram.org/file/bot${token}`

	// const apiClimatempo = process.env.apiClimatempo

	// const bot = new Telegraf(token)



// Código

let random = Math.floor((Math.random() * 23) + 1)
let ultimorandom = random
var trocasvalidas = [];
var indisponiveltxt = [];

var conteudo = {};

// Login WP
var wp = wordpress.createClient({
    url: "http://api.degraupublicidade.com.br",
    username: "tiodopao",
    password: wordpressPass
});

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
		"bisnagacreme":0
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
	atualizarData();


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
		"bisnagacreme":0
	};

	if (debug == false) {
		msg(`novodia()`, idKiliano)
	}

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

			// Estrutura da troca id[0] : nome[1] : trocaria[2] : produto original[3] : por[4] : produto trocado[5]
			if (acaoatual[2] == 'trocaria' ) {
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


		for (var ij = 0; ij < pedido.indisponibilidade.length; ij++) {

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

	
}

const atualizarData = () => {
	datacompleta = new Date();
	datahora = datacompleta.getHours();
	datadia = datacompleta.getDate();
	datames = (datacompleta.getMonth()+1);
	dataano = datacompleta.getFullYear();
	datadata = (datadia+'/'+datames+'/'+dataano);
	dataai = dataano+'-'+datames+'-'+datadia;
}

const gravarlocal = () => {
	// datacompleta = new Date();
	// datadia = datacompleta.getDate();
	// datames = (datacompleta.getMonth()+1);
	// dataano = datacompleta.getFullYear();

	// console.log(databaselocaltxt.ano[0].mes[0].dia[0]);

	// if (databaselocaltxt.ano[0] != datadia) {
	// 	databaselocaltxt.unshift("ano_data")
	// }
	// fs.writeFile('pao.json', 'teste');
}
		// unshift



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



const tecladoFinal = Markup.keyboard([
	['👍 Tô satisfeito tio!'],
	['😋 Quero pedir mais um pão'],
	['❌ Cancelar meus Pedidos ❌']

]).resize().oneTime().extra()

const tecladoCancelar = Markup.keyboard([
	['Voltar,'],
	['❌ Certeza que quero cancelar ❌']

]).resize().oneTime().extra()


const tecladoBranco = Markup.keyboard([
	['👍 Valeu Tio!']

]).resize().oneTime().extra()

// botões fixos

// Substituição de pão
const tecladoFixoItensFalta = Extra.markup(Markup.inlineKeyboard([
	Markup.callbackButton('Pão Francês', 'xpaofrances'),
	Markup.callbackButton('Pão de Milho', 'xpaodemilho'),
	Markup.callbackButton('Rosquinha Comum', 'xrosquinha'),

	Markup.callbackButton('Rosquinha com Recheio', 'xrosquinharecheio'),
	Markup.callbackButton('Croissant Presunto', 'xcroissantpresunto'),
	Markup.callbackButton('Croissant Frango', 'xcroissantfrango'),

	Markup.callbackButton('Bisnaga Comum', 'xbisnaga'),
	Markup.callbackButton('Bisnaga com Açúcar', 'xbisnagaacucar'),
	Markup.callbackButton('Bisnaga com Creme', 'xbisnagacreme'),

	Markup.callbackButton('Nenhum item em falta', 'xreiniciar')
], {columns: 3}))

// Finalização de pedido
const tecladoFixoItens = Extra.markup(Markup.inlineKeyboard([
	Markup.callbackButton('✔ Confirmar Pedido', 'pconfirmar'),
	Markup.callbackButton('✖ Falta de Produto', 'pfalta')
], {columns: 2}))

// Clima
const tecladoClima = Extra.markup(Markup.inlineKeyboard([
	Markup.callbackButton('Hoje', 'choje'),
	Markup.callbackButton('Amanhã', 'camanha'),
	Markup.callbackButton('Próximos 7 Dias', 'csetedias')
], {columns: 3}))



// Início do dia
novodia();


// Criação de comandos

bot.command(['pao','Pao'], async ctx => {

	if (acordado == true) {
		if (ctx.update.message.from.id == ctx.chat.id) {
			await ctx.replyWithMarkdown(`📣📣📣 Pedidos do dia *${pedido.dia_data}/${pedido.mes_data}/${pedido.ano_data} * 📣📣📣 \n O que você quer pedir?`, tecladoPao)
		} else {
			await ctx.replyWithMarkdown(`\n 📣📣📣 *Hora do Pão cambada!!!* 📣📣📣 \n\n Os pedidos devem ser feitos por uma *✉ mensagem direta ✉* \n Só me mandar uma direct e escrever /pao`)
		}
	} else {
		await ctx.reply("💤💤💤")
	}
})


bot.command(['pedir', 'cardapio'], async ctx => {
	await ctx.replyWithMarkdown(`Escolha seu pãozinho`, tecladoPao)
})


// Ouvindo o pedido
bot.hears(['🍞 Pão Francês', '🌽 Pão de Milho', '🍩 Rosquinha', '🍩 com Recheio','🥐 Croissant Presunto', '🥐 Croissant Frango','🥖 Bisnaga','🥖 com Açúcar','🥖 com Creme'], async ctx => {
	if (acordado == true) {
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

		console.log(pedido.acoes);
	} else {
		await ctx.reply("💤💤💤")
	}
})


// Selecionado uma segunda opção

bot.hears(['❌Não quero uma segunda opção❌'], async ctx => {
	await ctx.reply(`Beleza 😊. Anotei seu pedido. Quer mais algo? `, tecladoFinal)

})



bot.hears(['🍞 Pão Francês.', '🌽 Pão de Milho.', '🍩 Rosquinha.', '🍩 com Recheio.','🥐 Croissant Presunto.', '🥐 Croissant Frango.','🥖 Bisnaga.','🥖 com Açúcar.','🥖 com Creme.'], async ctx => {

	if (acordado == true) {
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
		
		// Estrutura da troca id[0] : nome[1] : trocaria[2] : produto original[3] : por[4] : produto trocado[5]
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


		pedido.acoes.push(ctx.update.message.from.id+' : '+nome+' : trocaria : '+acaoitemoriginal+' : por : '+item);

		await ctx.reply(`Ok! Caso não tenha ${acaoitemoriginal}, vou trazer ${item} Mais alguma coisa? `, tecladoFinal);
		
		console.log(pedido.acoes);
	} else {
		await ctx.reply("💤💤💤")
	}
})

// Removendo um pedido
bot.hears(['❌ Certeza que quero cancelar ❌'], async ctx => {

	if (pedido.acoes.length > 0) {
		for (var i = 0; i < pedido.acoes.length;) {
			var acaoatual = pedido.acoes[i].split(' : ');

			if(acaoatual[0] == ctx.update.message.from.id) {
		        pedido.acoes.splice(i, 1);
		        i = 0;
		    } else {
		    	i += 1;
		    }
		}
	}


	await ctx.replyWithMarkdown(`*Todos os seus pedidos foram removidos*`, tecladoFinal);
	// msg(`${ctx.update.message.from.first_name} cancelou tudo que pediu`, idChatDegrau)

})

bot.command('cancelar', async ctx => {

	if (pedido.acoes.length > 0) {
		for (var i = 0; i < pedido.acoes.length;) {
			var acaoatual = pedido.acoes[i].split(' : ');

			if(acaoatual[0] == ctx.update.message.from.id) {
		        pedido.acoes.splice(i, 1);
		        i = 0;
		    } else {
		    	i += 1;
		    }
		}
	}

	await ctx.replyWithMarkdown(`*Todos os seus pedidos foram removidos*`);
})

bot.command('cancelartodosospedidos', async ctx => {
	pedido.acoes = [];
	pedido.indisponibilidade = [];
	pedido.lista = [];

	pedido.paofrances = 0;
	pedido.paodemilho = 0;
	pedido.rosquinha = 0;
	pedido.rosquinharecheio = 0;
	pedido.croissantpresunto = 0;
	pedido.croissantfrango = 0;
	pedido.bisnaga = 0;
	pedido.bisnagaacucar = 0;
	pedido.bisnagacreme = 0;

	await ctx.replyWithMarkdown(`*Todos pedidos de todo mundo foram cacelados*`);

})

bot.hears(['❌ Cancelar meus Pedidos ❌'], async ctx => {
	await ctx.replyWithMarkdown(`*Tem certeza que quer cancelar tudo que pediu hoje?*`, tecladoCancelar);
})

bot.hears(['Voltar,'], async ctx => {
	await ctx.replyWithMarkdown(`Voltando...`, tecladoFinal);
})


// Finalizando pedido particular
bot.hears(['😋 Quero pedir mais um pão'], async ctx => {
	await ctx.replyWithMarkdown(`Tá com fome ein? Pede aí ✌️ `, tecladoPao)
})


bot.hears(['👍 Tô satisfeito tio!'], async ctx => {
	await ctx.reply(`É nóiz 👍`)

	if (ctx.update.message.from.id == ctx.chat.id) {

		listar();
		var listapessoal = [];

		if (pedido.acoes.length > 0) {
			for (var ip = 0; ip < pedido.acoes.length; ip++) {

				var acaoatual = pedido.acoes[ip].split(' : ');
				if (acaoatual[2] == 'pediu' && acaoatual[0] == ctx.chat.id ) {
					listapessoal.push(" \n "+acaoatual[3]);
				}

			}
		}

		if (listapessoal.length > 0) {
			await ctx.replyWithMarkdown(`Você pediu os seguintes itens: \n${listapessoal}\n`);

			// apagar pós testes
			// msg(`${ctx.update.message.from.first_name} pediu ${listapessoal}`, idChatKiliano);

		} else {
			await ctx.replyWithMarkdown(`Sua lista de pedidos está vazia. Peça algo com o /pao`);
		}
		

	}


	
})


bot.command('novodia', async ctx => {
	novodia();
	await ctx.reply("Um novo dia começa")
})

bot.command('remover', async ctx => {
	await ctx.reply("Escolha o que você quer remover da lista", tecladoRemover)
})

// Concluíndo pedido

bot.command(['pedido', 'fechar', 'finalizar', 'fecharpedido'], async ctx => {


	// Deixar esse comando habilitado em grupos
	listar();

	if (ctx.update.message.from.id == ctx.chat.id) {
		var listapessoal = [];

		if (pedido.acoes.length > 0) {
			for (var ip = 0; ip < pedido.acoes.length; ip++) {

				var acaoatual = pedido.acoes[ip].split(' : ');
				if (acaoatual[2] == 'pediu' && acaoatual[0] == ctx.chat.id ) {
					listapessoal.push(" \n "+acaoatual[3]);
				}

			}
		}

		if (listapessoal.length > 0) {
			await ctx.replyWithMarkdown(`Você pediu os seguintes itens: \n${listapessoal}\n`);
			await ctx.replyWithMarkdown(`*Para ver o pedido geral, escreva /pedido no grupo da degrau*`);
			await ctx.replyWithMarkdown(`*Para cancelar os seus pedidos, escreva /cancelar*`);
		} else {
			await ctx.replyWithMarkdown(`Sua lista de pedidos está vazia. Peça algo com o /pao`);
		}
		

	} else {
		if (pedido.lista.length > 0) {

			if (pedido.indisponibilidade.length > 0) {
				indisponiveltxt = "_Os seguintes itens estavam em falta: *"+pedido.indisponibilidade+"*_"
			} else {
				indisponiveltxt = ""
			}

			await ctx.replyWithMarkdown(`*📝📝 Pedidos pro Tio do Pão 📝📝* \n\ Referente ao dia ${pedido.dia_data}/${pedido.mes_data}/${pedido.ano_data} \n${pedido.lista}\n\n ${indisponiveltxt}`, tecladoFixoItens)
			console.log(pedido.lista);

		} else {
			await ctx.reply(`A lista de pedidos de ${pedido.dia_data}/${pedido.mes_data}/${pedido.ano_data} está vazia`)
		}
	}
})

bot.command(['quem'], async ctx => {

	var quem = [];
	var quemtroca = [];

	for (var i = 0; i < pedido.acoes.length; i++) {
		var acaoatual = pedido.acoes[i].split(' : ');
		if (acaoatual[2] == 'pediu') {
			quem.push("\n"+acaoatual[1]+" pediu 1 "+acaoatual[3]);
		}

		if (acaoatual[2] == 'trocaria') {
			quemtroca.push("\n"+acaoatual[1]+": se não houver "+acaoatual[3]+", quero um "+acaoatual[5]);
		}
	}

	if (quem.length > 0 ) {
		await ctx.reply(`Quem pediu o que: ${quem}`)
	}

	if (quemtroca.length > 0 ) {
		await ctx.reply(`Listagem de trocas: ${quemtroca}`)
	}
})



bot.command(['bartira'], async ctx => {
	listar();
	if (pedido.lista.length > 0) {
		msg(`Referente ao dia ${pedido.dia_data}/${pedido.mes_data}/${pedido.ano_data} \n${pedido.lista}`, idKiliano)

		if (debug == false) {
			msg(`Referente ao dia ${pedido.dia_data}/${pedido.mes_data}/${pedido.ano_data} \n${pedido.lista}`, idBartira)
		}
	}
	
})




// Actions
bot.action('pfalta', async ctx => {
	await ctx.editMessageText(`Qual item está em falta?`, tecladoFixoItensFalta)
})

bot.action('pconfirmar', async ctx => {
	await ctx.editMessageText(`✅ Pedido gravado ✅`);


	listar()

	if (pedido.lista.length > 0) {

		if (pedido.indisponibilidade.length > 0) {
			indisponiveltxt = "_Os seguintes itens estavam em falta: *"+pedido.indisponibilidade+"*_"
		} else {
			indisponiveltxt = ""
		}

		await ctx.replyWithMarkdown(`*📝📝 Pedidos pro Tio do Pão 📝📝* \n\ Referente ao dia ${pedido.dia_data}/${pedido.mes_data}/${pedido.ano_data} \n${pedido.lista}\n\n ${indisponiveltxt}`)

	} else {
		await ctx.reply(`A lista de pedidos de ${pedido.dia_data}/${pedido.mes_data}/${pedido.ano_data} está vazia`)
	}	

	await ctx.reply(`(Por enquanto isso não faz nada, mas futuramente vai ser 🔝)`)
	msg(`Não esquece de mandar um /bartira pra gravar o último pedido`, idKiliano)
})

bot.action('xpaofrances', async ctx => {
	pedido.indisponibilidade.push('Pão Francês');
	await ctx.editMessageText(`---------------------`);

	listar()

	if (pedido.lista.length > 0) {

		if (pedido.indisponibilidade.length > 0) {
			indisponiveltxt = "_Os seguintes itens estavam em falta: *"+pedido.indisponibilidade+"*_"
		} else {
			indisponiveltxt = ""
		}

		await ctx.replyWithMarkdown(`*📝📝 Pedidos pro Tio do Pão 📝📝* \n\ Referente ao dia ${pedido.dia_data}/${pedido.mes_data}/${pedido.ano_data} \n${pedido.lista}\n\n ${indisponiveltxt}`, tecladoFixoItens)

	} else {
		await ctx.reply(`A lista de pedidos de ${pedido.dia_data}/${pedido.mes_data}/${pedido.ano_data} está vazia`)
	}	
})


bot.action('xpaodemilho', async ctx => {
	pedido.indisponibilidade.push('Pão de Milho');

	await ctx.editMessageText(`---------------------`);

	listar()

	if (pedido.lista.length > 0) {

		if (pedido.indisponibilidade.length > 0) {
			indisponiveltxt = "_Os seguintes itens estavam em falta: *"+pedido.indisponibilidade+"*_"
		} else {
			indisponiveltxt = ""
		}

		await ctx.replyWithMarkdown(`*📝📝 Pedidos pro Tio do Pão 📝📝* \n\ Referente ao dia ${pedido.dia_data}/${pedido.mes_data}/${pedido.ano_data} \n${pedido.lista}\n\n ${indisponiveltxt}`, tecladoFixoItens)

	} else {
		await ctx.reply(`A lista de pedidos de ${pedido.dia_data}/${pedido.mes_data}/${pedido.ano_data} está vazia`)
	}	
})

bot.action('xrosquinha', async ctx => {
	pedido.indisponibilidade.push('Rosquinha Comum');

	await ctx.editMessageText(`---------------------`);

	listar()

	if (pedido.lista.length > 0) {

		if (pedido.indisponibilidade.length > 0) {
			indisponiveltxt = "_Os seguintes itens estavam em falta: *"+pedido.indisponibilidade+"*_"
		} else {
			indisponiveltxt = ""
		}

		await ctx.replyWithMarkdown(`*📝📝 Pedidos pro Tio do Pão 📝📝* \n\ Referente ao dia ${pedido.dia_data}/${pedido.mes_data}/${pedido.ano_data} \n${pedido.lista}\n\n ${indisponiveltxt}`, tecladoFixoItens)

	} else {
		await ctx.reply(`A lista de pedidos de ${pedido.dia_data}/${pedido.mes_data}/${pedido.ano_data} está vazia`)
	}	
})

bot.action('xrosquinharecheio', async ctx => {
	pedido.indisponibilidade.push('Rosquinha com Recheio');

	await ctx.editMessageText(`---------------------`);

	listar()

	if (pedido.lista.length > 0) {

		if (pedido.indisponibilidade.length > 0) {
			indisponiveltxt = "_Os seguintes itens estavam em falta: *"+pedido.indisponibilidade+"*_"
		} else {
			indisponiveltxt = ""
		}

		await ctx.replyWithMarkdown(`*📝📝 Pedidos pro Tio do Pão 📝📝* \n\ Referente ao dia ${pedido.dia_data}/${pedido.mes_data}/${pedido.ano_data} \n${pedido.lista}\n\n ${indisponiveltxt}`, tecladoFixoItens)

	} else {
		await ctx.reply(`A lista de pedidos de ${pedido.dia_data}/${pedido.mes_data}/${pedido.ano_data} está vazia`)
	}	
})


bot.action('xcroissantpresunto', async ctx => {
	pedido.indisponibilidade.push('Croissant Presunto');

	await ctx.editMessageText(`---------------------`);

	listar()

	if (pedido.lista.length > 0) {

		if (pedido.indisponibilidade.length > 0) {
			indisponiveltxt = "_Os seguintes itens estavam em falta: *"+pedido.indisponibilidade+"*_"
		} else {
			indisponiveltxt = ""
		}

		await ctx.replyWithMarkdown(`*📝📝 Pedidos pro Tio do Pão 📝📝* \n\ Referente ao dia ${pedido.dia_data}/${pedido.mes_data}/${pedido.ano_data} \n${pedido.lista}\n\n ${indisponiveltxt}`, tecladoFixoItens)

	} else {
		await ctx.reply(`A lista de pedidos de ${pedido.dia_data}/${pedido.mes_data}/${pedido.ano_data} está vazia`)
	}	
})

bot.action('xcroissantfrango', async ctx => {
	pedido.indisponibilidade.push('Croissant Frango');

	await ctx.editMessageText(`---------------------`);

	listar()

	if (pedido.lista.length > 0) {

		if (pedido.indisponibilidade.length > 0) {
			indisponiveltxt = "_Os seguintes itens estavam em falta: *"+pedido.indisponibilidade+"*_"
		} else {
			indisponiveltxt = ""
		}

		await ctx.replyWithMarkdown(`*📝📝 Pedidos pro Tio do Pão 📝📝* \n\ Referente ao dia ${pedido.dia_data}/${pedido.mes_data}/${pedido.ano_data} \n${pedido.lista}\n\n ${indisponiveltxt}`, tecladoFixoItens)

	} else {
		await ctx.reply(`A lista de pedidos de ${pedido.dia_data}/${pedido.mes_data}/${pedido.ano_data} está vazia`)
	}	
})


bot.action('xbisnaga', async ctx => {
	pedido.indisponibilidade.push('Bisnaga Comum');

	await ctx.editMessageText(`---------------------`);

	listar()

	if (pedido.lista.length > 0) {

		if (pedido.indisponibilidade.length > 0) {
			indisponiveltxt = "_Os seguintes itens estavam em falta: *"+pedido.indisponibilidade+"*_"
		} else {
			indisponiveltxt = ""
		}

		await ctx.replyWithMarkdown(`*📝📝 Pedidos pro Tio do Pão 📝📝* \n\ Referente ao dia ${pedido.dia_data}/${pedido.mes_data}/${pedido.ano_data} \n${pedido.lista}\n\n ${indisponiveltxt}`, tecladoFixoItens)

	} else {
		await ctx.reply(`A lista de pedidos de ${pedido.dia_data}/${pedido.mes_data}/${pedido.ano_data} está vazia`)
	}	
})

bot.action('xbisnagaacucar', async ctx => {
	pedido.indisponibilidade.push('Bisnaga com Açúcar');

	await ctx.editMessageText(`---------------------`);

	listar()

	if (pedido.lista.length > 0) {

		if (pedido.indisponibilidade.length > 0) {
			indisponiveltxt = "_Os seguintes itens estavam em falta: *"+pedido.indisponibilidade+"*_"
		} else {
			indisponiveltxt = ""
		}

		await ctx.replyWithMarkdown(`*📝📝 Pedidos pro Tio do Pão 📝📝* \n\ Referente ao dia ${pedido.dia_data}/${pedido.mes_data}/${pedido.ano_data} \n${pedido.lista}\n\n ${indisponiveltxt}`, tecladoFixoItens)

	} else {
		await ctx.reply(`A lista de pedidos de ${pedido.dia_data}/${pedido.mes_data}/${pedido.ano_data} está vazia`)
	}	
})

bot.action('xbisnagacreme', async ctx => {
	pedido.indisponibilidade.push('Bisnaga com Creme');

	await ctx.editMessageText(`---------------------`);

	listar()

	if (pedido.lista.length > 0) {

		if (pedido.indisponibilidade.length > 0) {
			indisponiveltxt = "_Os seguintes itens estavam em falta: *"+pedido.indisponibilidade+"*_"
		} else {
			indisponiveltxt = ""
		}

		await ctx.replyWithMarkdown(`*📝📝 Pedidos pro Tio do Pão 📝📝* \n\ Referente ao dia ${pedido.dia_data}/${pedido.mes_data}/${pedido.ano_data} \n${pedido.lista}\n\n ${indisponiveltxt}`, tecladoFixoItens)

	} else {
		await ctx.reply(`A lista de pedidos de ${pedido.dia_data}/${pedido.mes_data}/${pedido.ano_data} está vazia`)
	}	
})

bot.action('xreiniciar', async ctx => {
	pedido.indisponibilidade = [];

	await ctx.editMessageText(`---------------------`);

	listar()

	if (pedido.lista.length > 0) {

		if (pedido.indisponibilidade.length > 0) {
			indisponiveltxt = "_Os seguintes itens estavam em falta: *"+pedido.indisponibilidade+"*_"
		} else {
			indisponiveltxt = ""
		}

		await ctx.replyWithMarkdown(`*📝📝 Pedidos pro Tio do Pão 📝📝* \n\ Referente ao dia ${pedido.dia_data}/${pedido.mes_data}/${pedido.ano_data} \n${pedido.lista}\n\n ${indisponiveltxt}`, tecladoFixoItens)

	} else {
		await ctx.reply(`A lista de pedidos de ${pedido.dia_data}/${pedido.mes_data}/${pedido.ano_data} está vazia`)
	}	
})


// Start

bot.start(async ctx => {
	atualizarData();
	if (ctx.update.message.from.id == ctx.chat.id) {
		await ctx.replyWithMarkdown(`📣📣📣 Hora do Pão! 📣📣📣 \n O que você quer pedir?`, tecladoPao)
	} else {
		await ctx.replyWithMarkdown(`*Agora os pedidos só podem ser feitos me mandando uma mensagem direta* \n Clique aqui no meu nome e depois em *Enviar Mensagem*`)
		// msg(`📣📣📣 O pedido do Pão está aberto! 📣📣📣 \n Só clicar ou digitar /pao para pedir o pão`, idKiliano)

	}

	if (ctx.chat.id != idChatDegrau) {
		msg(`${ctx.update.message.from.first_name} começou a conversar com o Horácio. O ID dele é ${ctx.update.message.from.id} `, idKiliano)
	}
})








// ----- Comandos e actions não relacionados ao pão ------


// Previsão do tempo

bot.command(['clima'], async ctx => {
	await ctx.reply(`Clima pra que dia?`,tecladoClima);
})

bot.command(['jandira'], async ctx => {
	clima = await axios.get(`http://apiadvisor.climatempo.com.br/api/v1/forecast/locale/3861/days/15?token=${apiClimatempo}`);
	climaicon = "";

	if (clima.data.data[0].rain.probability >= 90) {
		climaicon = "☔";
	} else {

		if (clima.data.data[0].rain.probability >= 70) {
			climaicon = "☂";
		} else {

			if (clima.data.data[0].rain.probability >= 50) {
				climaicon = "🌂";
			} else {
				climaicon = "🌤";
			}

		}

	}

	await ctx.replyWithMarkdown(`☀ ☀ *Previsão para JANDIRA* ☀ ☀`);

	await ctx.reply(`HOJE (${clima.data.data[0].date_br})

		Temperatura: Min: ${clima.data.data[0].temperature.min}ºC | Max: ${clima.data.data[0].temperature.max}ºC 🌡
	 	${clima.data.data[0].text_icon.text.pt} ☀
	 	Provabilidade de chuva: ${clima.data.data[0].rain.probability} % ${climaicon}
	 	\n\n
	 `);




	if (clima.data.data[1].rain.probability >= 90) {
		climaicon = "☔";
	} else {

		if (clima.data.data[1].rain.probability >= 70) {
			climaicon = "☂";
		} else {

			if (clima.data.data[1].rain.probability >= 50) {
				climaicon = "🌂";
			} else {
				climaicon = "🌤";
			}

		}

	}

	await ctx.reply(` AMANHÃ (${clima.data.data[1].date_br})

		Temperatura: Min: ${clima.data.data[1].temperature.min}ºC | Max: ${clima.data.data[1].temperature.max}ºC 🌡
	 	${clima.data.data[1].text_icon.text.pt} ☀
	 	Provabilidade de chuva: ${clima.data.data[1].rain.probability} % ${climaicon}
	 	\n
	 `);




})


http://apiadvisor.climatempo.com.br/api/v1/locale/city?name=São Paulo&state=SP&token=99933162ee7138af4aebd85f77b32265

bot.action('choje', async ctx => {

	clima = await axios.get(`http://apiadvisor.climatempo.com.br/api/v1/forecast/locale/3477/days/15?token=${apiClimatempo}`);
	climaicon = "";

	if (clima.data.data[0].rain.probability >= 90) {
		climaicon = "☔";
	} else {

		if (clima.data.data[0].rain.probability >= 70) {
			climaicon = "☂";
		} else {

			if (clima.data.data[0].rain.probability >= 50) {
				climaicon = "🌂";
			} else {
				climaicon = "🌤";
			}

		}

	}

	await ctx.editMessageText(` ☀ ☀ HOJE (${clima.data.data[0].date_br}) ☀ ☀

		Temperatura: Min: ${clima.data.data[0].temperature.min}ºC | Max: ${clima.data.data[0].temperature.max}ºC 🌡
	 	${clima.data.data[0].text_icon.text.pt} ☀
	 	Provabilidade de chuva: ${clima.data.data[0].rain.probability} % ${climaicon}
	 	\n
	 `);
})

bot.action('camanha', async ctx => {

	clima = await axios.get(`http://apiadvisor.climatempo.com.br/api/v1/forecast/locale/3477/days/15?token=${apiClimatempo}`);
	climaicon = "";

	if (clima.data.data[1].rain.probability >= 90) {
		climaicon = "☔";
	} else {

		if (clima.data.data[1].rain.probability >= 70) {
			climaicon = "☂";
		} else {

			if (clima.data.data[1].rain.probability >= 50) {
				climaicon = "🌂";
			} else {
				climaicon = "🌤";
			}

		}

	}

	await ctx.editMessageText(` ☀ ☀ AMANHÃ (${clima.data.data[1].date_br}) ☀ ☀

		Temperatura: Min: ${clima.data.data[1].temperature.min}ºC | Max: ${clima.data.data[1].temperature.max}ºC 🌡
	 	${clima.data.data[1].text_icon.text.pt} ☀
	 	Provabilidade de chuva: ${clima.data.data[1].rain.probability} % ${climaicon}
	 	\n
	 `);
})

bot.action('csetedias', async ctx => {

	clima = await axios.get(`http://apiadvisor.climatempo.com.br/api/v1/forecast/locale/3477/days/15?token=${apiClimatempo}`);
	climaicon = "";

	var csetedias = [];


	// for
	for (var iclima = 0; iclima < 7; iclima++) {
		if (clima.data.data[iclima].rain.probability >= 90) {
			climaicon = "☔";
		} else {

			if (clima.data.data[iclima].rain.probability >= 70) {
				climaicon = "☂";
			} else {

				if (clima.data.data[iclima].rain.probability >= 50) {
					climaicon = "🌂";
				} else {
					climaicon = "🌤";
				}

			}
		}

		csetedias.push(`\n\n ${clima.data.data[iclima].date_br} \n🌡 ${clima.data.data[iclima].temperature.min}ºC a ${clima.data.data[iclima].temperature.max}ºC | ${climaicon} ${clima.data.data[iclima].text_icon.text.pt}`)
	}


	// for
	await ctx.editMessageText(` ☀ ☀ 7 Dias ☀ ☀ ${csetedias}`);	
})




// Extras
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






// Testes

bot.command(['teste'], async ctx => {
	
	pedido.dia_data = 1;
	// var testewp = await axios.get(`http://api.degraupublicidade.com.br/wp-json/wp/v2/pao/`);
	// console.log(testewp.data[0].acf.teste01);


	// wp.getPosts({
	// 	type: "cpt-pao"

	// }, function( error, data ) {
	//         conteudo = arguments;
	//         conteudo = JSON.stringify(conteudo);
	//         conteudo = conteudo[1];
	//         console.log(conteudo);
	        
	// })

	// await ctx.reply(`${conteudo}`)

})

wp.getPosts({
	type: "cpt-pao"

}, function( error, data ) {
        conteudo = arguments;
        conteudo = JSON.stringify(conteudo);
        console.log(conteudo);
})

// wp.getPosts({
// 		type: "cpt-pao"

// 	}, function( error, data ) {
// 	        conteudo = arguments;
// 	        conteudo = JSON.stringify(conteudo);
// 	        conteudo = conteudo[1];
	        
// 	})


// wp.getPosts({
// 	type: "cpt-pao"

// }, function( error, data ) {
//         conteudo = arguments;
//         conteudo = JSON.stringify(conteudo);
//         conteudo = conteudo[1];
// })




bot.command(['post'], async ctx => {

	var dia_data_zero = "";
	if (pedido.dia_data < 10) {
		dia_data_zero = "0";
	} else {
		dia_data_zero = "";
	}

	var mes_data_zero = "";
	if (pedido.mes_data < 10) {
		mes_data_zero = "0";
	} else {
		mes_data_zero = "";
	}

	wp.newPost({
	        title: "Pedido: "+pedido.dia_data+"/"+pedido.mes_data+"/"+pedido.ano_data,
	        status: "publish",
	        type: "cpt-pao",
	        date: pedido.ano_data+"-"+mes_data_zero+pedido.mes_data+"-"+dia_data_zero+pedido.dia_data+"T05:00:00.000Z",
	        "customFields": [
		        {
		          "key": "dia_data",
		          "value": pedido.dia_data
		        },
		        {
		          "key": "mes_data",
		          "value": pedido.mes_data
		        },
		        {
		          "key": "ano_data",
		          "value": pedido.ano_data
		        },
		        {
		          "key": "acoes",
		          "value": pedido.acoes
		        },
		        {
		          "key": "indisponibilidade",
		          "value": pedido.indisponibilidade
		        },
		        {
		          "key": "lista",
		          "value": pedido.lista
		        },
		        {
		          "key": "paofrances",
		          "value": pedido.paofrances
		        },
		        {
		          "key": "paodemilho",
		          "value": pedido.paodemilho
		        },
		        {
		          "key": "rosquinha",
		          "value": pedido.rosquinha
		        },
		        {
		          "key": "rosquinharecheio",
		          "value": pedido.rosquinharecheio
		        },
		        {
		          "key": "croissantpresunto",
		          "value": pedido.croissantpresunto
		        },
		        {
		          "key": "croissantfrango",
		          "value": pedido.croissantfrango
		        },
		        {
		          "key": "bisnaga",
		          "value": pedido.bisnaga
		        },
		        {
		          "key": "bisnagaacucar",
		          "value": pedido.bisnagaacucar
		        },
		        {
		          "key": "bisnagacreme",
		          "value": pedido.bisnagacreme
		        }
		      ]
	        

	}, function( error, data ) {
	        console.log( "Post enviado resposta como:\n" );
	        console.log( arguments );
	        console.log("\n");
	});



// author
// commentStatus
// content
// customFields
// date
// excerpt
// format
// id
// link
// modified
// menuOrder
// name
// pageTemplate
// parent
// password
// pingStatus
// status
// sticky
// terms
// termNames
// thumbnail
// title
// type




	// var testewp = await axios.post(`http://api.degraupublicidade.com.br/wp-json/wp/v2/posts?title=the+title&content=this+is+the+content`).catch(e => console.log(e));
})

// tiodopao
// mQAj*r)!Vxi4u3qUB(5vnaO6


// / Código

// Loop
bot.startPolling()