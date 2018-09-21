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
	// const env = require('./.env')
	// const bot = new Telegraf(env.token)

	// const apiUrl = env.apiUrl
	// const apiFileUrl = env.apiFileUrl

	// const idRodrigo = env.idRodrigo
	// const idKiliano = env.idKiliano
	// const idBartira = env.idBartira
	// const idChatDegrau = env.idChatDegrau
	// const idChatFronts = env.idChatFronts


// Chamadas para o Heroku
			setTimeout(function(){
				http.get("http://shielded-peak-24448.herokuapp.com/")
				console.log(datahora-3)
			 },1350000);

			setInterval(function(){ 
				var datacompleta = new Date();
				let datahora = ((datacompleta.getHours()));
				if (datahora < 19+3) {
					setTimeout(function(){
						http.get("http://shielded-peak-24448.herokuapp.com/")
						console.log(datahora-3)
					 },750000);

					setTimeout(function(){
						http.get("http://shielded-peak-24448.herokuapp.com/")
						console.log(datahora-3)
					 },1350000);
				}
			}, 2400000);


	var port = (process.env.PORT || 5000)

	http.createServer(function(request, response) {
		response.writeHead(200,{'Content-Type': 'application/json'});
		response.write(JSON.stringify({name: 'tiodopaobot', ver: '0.1'}));
		response.end();
	}).listen(port)

	const token = process.env.token

	const idRodrigo = process.env.idRodrigo
	const idKiliano = process.env.idKiliano
	const idBartira = process.env.idBartira
	const idChatDegrau = process.env.idChatDegrau
	const idChatFronts = process.env.idChatFronts

	const apiUrl = `https://api.telegram.org/bot${token}`
	const apiFileUrl = `https://api.telegram.org/file/bot${token}`

	const bot = new Telegraf(token)



// Código

let random = Math.floor((Math.random() * 23) + 1)
let ultimorandom = random

let lista = []
let listaanterior = []
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

const msg = (msg, id) => {
	axios.get(`${apiUrl}/sendMessage?chat_id=${id}&text=${encodeURI(msg)}`)
		.catch(e => console.log(e))
}




// Teclado

const tecladoPao = Markup.keyboard([
	['🍞 Pão Francês', '🌽 Pão de Milho'],
	['🍩 Rosquinha', '🍩 com Recheio'],
	['🥐 Croissant Presunto', '🥐 Croissant Frango'],
	['🥖 Bisnaga','🥖 com Açúcar','🥖 com Creme']

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
		// aqui

		if (paofrances == 1) {
			lista.push(''+paofrances+' Pão Francês')
		}

		if (paofrances > 1) {
			lista.push(''+paofrances+' Pães Franceses')
		}

		if (paodemilho == 1) {
			lista.push(''+paodemilho+' Pão de Milho')
		}

		if (paodemilho > 1) {
			lista.push(''+paodemilho+' Pães de Milho')
		}

		if (rosquinha == 1) {
			lista.push(''+rosquinha+' Rosquinha Comum')
		}

		if (rosquinha > 1) {
			lista.push(''+rosquinha+' Rosquinhas Comuns')
		}

		if (rosquinharecheio == 1) {
			lista.push(''+rosquinharecheio+' Rosquinha com Recheio')
		}

		if (rosquinharecheio > 1) {
			lista.push(''+rosquinharecheio+' Rosquinhas com Recheio')
		}

		if (croissantpresunto == 1) {
			lista.push(''+croissantpresunto+' Croissant de Presunto')
		}

		if (croissantpresunto > 1) {
			lista.push(''+croissantpresunto+' Croissants de Presunto')
		}

		if (croissantfrango == 1) {
			lista.push(''+croissantfrango+' Croissant de Frango')
		}

		if (croissantfrango > 1) {
			lista.push(''+croissantfrango+' Croissants de Frango')
		}

		if (bisnaga == 1) {
			lista.push(''+bisnaga+' Bisnaga Comum')
		}

		if (bisnaga > 1) {
			lista.push(''+bisnaga+' Bisnagas Comuns')
		}

		if (bisnagaacucar == 1) {
			lista.push(''+bisnagaacucar+' Bisnaga com Açúcar')
		}

		if (bisnagaacucar > 1) {
			lista.push(''+bisnagaacucar+' Bisnagas com Açúcar')
		}

		if (bisnagacreme == 1) {
			lista.push(''+bisnagacreme+' Bisnaga com Creme')
		}

		if (bisnagacreme > 1) {
			lista.push(''+bisnagacreme+' Bisnagas com Creme')
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
		/remover para carregar o menu de subtração de itens
		/cancelarpedido para 
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

		await ctx.replyWithMarkdown(`*📝📝 Pedidos pro Tio do Pão 📝📝*`)

		await ctx.reply("Pedido: "+lista+"", tecladoBranco)

		listaanterior = lista

		msg(`Não esquece de mandar um /bartira pra gravar o último pedido`, idKiliano)

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
		await ctx.reply("Essa é a lista do último pedido feito: "+listaanterior+"")
	}
})



bot.command(['/bartira'], async ctx => {
	if (debug == false) {
		msg(`Último pedido feito :\n\n ${datadata} \n ${listaanterior}`, idKiliano)

		msg(`Oi Bartira, o último pedido feito hoje foi:\n\n ${datadata} \n ${listaanterior}`, idBartira)
	}
})


bot.command(['cancelarpedido'], async ctx => {

	if (abertura == true) {
		lista = []
		await ctx.replyWithMarkdown(`*Pedido cancelado*`, tecladoBranco)

		// fechando pedido
		abertura = false

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
		await ctx.reply(`Esse comando é para cancelar um pedido aberto `)
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
						await ctx.reply(`Mensagem "${mimic}" não pode ser entregue porque o destino não foi especificado.
							Atuais cadastrados: grupo, kiliano, bartira
						`)
					}
				}
			}

			
		}

		
	}
})





// TESTES

bot.command('teste', async ctx => {
	msg("testado", idKiliano)
})

bot.command('cache', async ctx => {
	await ctx.reply("foi?")
})

// Teste com o Open Weather





bot.command('clima', async ctx => {
	const climaIdSaopaulo = '3477'
	const climaApi = '2fe7d4dee3408fa080e8eb5f3a3ddd3b'
	// Esse token será revogado

	const climaRes = await axios.get(`http://apiadvisor.climatempo.com.br/api/v1/forecast/locale/${climaIdSaopaulo}/days/15?token=${climaApi}`)
	console.log(climaRes.data.data)

})




// / Código

// Loop
bot.startPolling()