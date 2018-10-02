
/*

---- Checklist ----
Pedir Truco, 6, 9 e 12
/chat mensagem para geral

mão de 11
mão de ferro

Colocar novodia pra reiniciar cada começo de dia (corrigindo problema de fuso horário, que reinicia antes da hora)

/piscar piscar pro parceiro (50% de chance de perceberem)
/chingar 
/bater
/trucosair

*/


'use strict'

var http = require('http');
const Telegraf = require('telegraf');
const Markup = require('telegraf/markup');
const Extra = require('telegraf/extra');
const axios = require('axios');
var wordpress = require( "wordpress" );


// http://itlc.comp.dkit.ie/tutorials/nodejs/create-wordpress-post-node-js/
// https://www.npmjs.com/package/wordpress


var datacompleta;
var datahora;
var datadia;
var datames;
var dataano;
var datadata;
var dataai;

var debug = true;

var acordado = true;

var fimdodia = false;

var conteudocarregado = false;
var relatorioTempo = [];

// Clima

var clima = {};
var climaicon = "";

// Middlewares

const exec = (ctx, ...middlewares) => {
	const run = current => {
		middlewares && current < middlewares.length && middlewares[current](ctx,() => run(current +1 ))
	}
	run(0)
}
const ctx = {}

// Data de nascimento do bot: 17/09/2018





// Chamadas para o Local
	const env = require('./.env');
	const bot = new Telegraf(env.token);

	const apiUrl = env.apiUrl;
	const apiFileUrl = env.apiFileUrl;

	const idKiliano = env.idKiliano;
	const idBartira = env.idBartira;
	const idRodrigo = env.idRodrigo;
	const idIsabel = env.idIsabel;
	const idChatDegrau = env.idChatDegrau;
	const idChatFronts = env.idChatFronts;

	const idTodos = env.idTodos;


	const apiClimatempo = env.apiClimatempo;

	const wordpressPass = env.wordpressPass;


// Chamadas para o Heroku
	// 		setTimeout(function(){
	// 			http.get("http://shielded-peak-24448.herokuapp.com/");
	// 			console.log("Primeiro ping do dia "+(datahora-3));
	// 		 },1350000);

	// 		setInterval(function(){ 
	// 			exec(ctx,atualizarData)

	// 			if (datahora < 19+3) {

	// 				if (fimdodia == true) {
	// 					fimdodia = false;
	// 					msg(`Reiniciando por causa do fimdodia==true`, idKiliano)
	// 					exec(ctx, atualizarData, novodia, carregarum, atualizarlocal, liberandopost)
	// 				}


	// 				setTimeout(function(){
	// 					http.get("http://shielded-peak-24448.herokuapp.com/");
	// 					console.log("Ping timeout 750000 "+(datahora-3));

	// 					if (conteudocarregado == true)  {
	// 						conteudocarregado = false;
	// 						exec(ctx, carregarum, checagemparanovopost)
	// 					} else {
	// 						console.log("nao carregado")
	// 					}

	// 				 },750000);

	// 				setTimeout(function(){
	// 					http.get("http://shielded-peak-24448.herokuapp.com/")
	// 					console.log("Ping timeout 1350000 "+(datahora-3));

	// 					if (conteudocarregado == true)  {
	// 						conteudocarregado = false;
	// 						exec(ctx, carregarum, checagemparanovopost)
	// 					} else {
	// 						console.log("nao carregado")
	// 					}
	// 				 },1350000);
	// 			} else {

	// 				if (fimdodia == false) {
	// 					fimdodia = true;
	// 					console.log("Fim do dia ligado. Boa noite :)")
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
	// const idRodrigo = process.env.idRodrigo;
	// const idIsabel = process.env.idIsabel;
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
var conteudoprimeiro = {};

var pedidosanalisados = [];
var pedidosanalisadossoma = {
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


const carregarum = (ctx, next) => {
	// Carregando conteúdo online
	wp.getPosts({
		type: "cpt-pao",
		number: "1"
	},["title","date", "customFields"],function( error, posts, data ) {
	    conteudo = posts;
	    conteudo = JSON.stringify(conteudo);
	    if (conteudo.length > 0) {
		    conteudo = JSON.parse(conteudo);
		    conteudoprimeiro = conteudo[0];
	    }
	    console.log( "Carregando " + conteudo.length + " posts!" );
	    console.log( "Último post:" );
	    console.log(conteudoprimeiro);
	    next();
	});
}

const carregarsessenta = (ctx, next) => {
	// Carregando conteúdo online
	wp.getPosts({
		type: "cpt-pao",
		number: "60"
	},["title","date", "customFields"],function( error, posts, data ) {
	    conteudo = posts;
	    conteudo = JSON.stringify(conteudo);
	    if (conteudo.length > 0) {
		    conteudo = JSON.parse(conteudo);
		    conteudoprimeiro = conteudo[0];
	    }
	    console.log( "Carregando " + conteudo.length + " posts!" );
	    console.log( "Último post:" );
	    console.log(conteudoprimeiro);
	    next();
	});
}

const carregartodos = (ctx, next) => {
	// Carregando conteúdo online
	wp.getPosts({
		type: "cpt-pao",
		number: "9999"
	},["title","date", "customFields"],function( error, posts, data ) {
	    conteudo = posts;
	    conteudo = JSON.stringify(conteudo);
	    if (conteudo.length > 0) {
		    conteudo = JSON.parse(conteudo);
		    conteudoprimeiro = conteudo[0];
	    }
	    console.log( "Carregando " + conteudo.length + " posts!" );
	    console.log( "Último post:" );
	    console.log(conteudoprimeiro);
	    next()
	});
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

const atualizarData = (ctx, next) => {
	datacompleta = new Date();
	datahora = datacompleta.getHours();
	datadia = datacompleta.getDate();
	datames = (datacompleta.getMonth()+1);
	dataano = datacompleta.getFullYear();
	datadata = (datadia+'/'+datames+'/'+dataano);
	dataai = dataano+'-'+datames+'-'+datadia;

	next();
}

const checagemparanovopost = (ctx, next) => {
			var conteudodia = 0;
			var conteudomes = 0;
			var conteudoacoes = [];

			if(pedido.acoes[0] != undefined && debug == false) {
				if (conteudo.length > 0) {

					for (var i = 0; i < conteudoprimeiro.customFields.length; i++) {

						if (conteudoprimeiro.customFields[i].key == "dia_data") {
							conteudodia = conteudoprimeiro.customFields[i].value;
						}

						if (conteudoprimeiro.customFields[i].key == "mes_data") {
							conteudomes = conteudoprimeiro.customFields[i].value;
						}

						if (conteudoprimeiro.customFields[i].key == "acoes") {
							conteudoacoes = conteudoprimeiro.customFields[i].value;
						}
					}



					if (conteudodia == pedido.dia_data && conteudomes == pedido.mes_data) {
						console.log("Já existe um post nessa data. Verificando se o post está atualizado:" + conteudoacoes + "" +JSON.stringify(pedido.acoes));

						if (conteudoacoes == JSON.stringify(pedido.acoes)) {
							console.log("A versão online já está atualizada. Nenhuma medida necessária.");
							exec(ctx, liberandopost)

						} else {
							console.log("Online desatualizado. Atualizando post.");
							exec(ctx, deletarultimopost, novopost, liberandopost)

						}


					} else {
						console.log("Não existe um post nessa data");
						exec(ctx, novopost, liberandopost)
					}
				} else {
					exec(ctx, novopost, liberandopost)
				}
			} else {
				console.log("lista de ações vazia");
				exec(ctx, liberandopost)
			}

			
}

const novopost = (ctx, next) => {
	
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
	        title: pedido.dia_data+"/"+pedido.mes_data+"/"+pedido.ano_data,
	        status: "publish",
	        type: "cpt-pao",
	        date: pedido.ano_data+"-"+mes_data_zero+pedido.mes_data+"-"+dia_data_zero+pedido.dia_data+"T05:00:00.000Z",
	        termNames: {
                "categoria": ["mes"+pedido.mes_data, "ano"+pedido.ano_data],
	        },
	        customFields: [
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
		          "value": JSON.stringify(pedido.acoes)
		        },
		        {
		          "key": "indisponibilidade",
		          "value": JSON.stringify(pedido.indisponibilidade)
		        },
		        {
		          "key": "lista",
		          "value": JSON.stringify(pedido.lista)
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
	    next();
	});
}


const checagemparaapagar = (ctx, next) => {
			var conteudodia = 0;
			var conteudomes = 0;
			var conteudoacoes = [];

			if (conteudo.length > 0) {

				for (var i = 0; i < conteudoprimeiro.customFields.length; i++) {

					if (conteudoprimeiro.customFields[i].key == "dia_data") {
						conteudodia = conteudoprimeiro.customFields[i].value;
					}

					if (conteudoprimeiro.customFields[i].key == "mes_data") {
						conteudomes = conteudoprimeiro.customFields[i].value;
					}

					if (conteudoprimeiro.customFields[i].key == "acoes") {
						conteudoacoes = conteudoprimeiro.customFields[i].value;
					}
				}



				if (conteudodia == pedido.dia_data && conteudomes == pedido.mes_data) {
					console.log("Já existe um post nessa data. Apagando post");
					exec(ctx, deletarultimopost, liberandopost)
		
				} else {
					console.log("Não existe um post nessa data");
					exec(ctx, liberandopost)
				}
			} else {
				exec(ctx, liberandopost)
			}
}

const deletarultimopost = (ctx, next) => {
	
	console.log("deletando ultimo post");

	wp.deletePost(conteudoprimeiro.id,function( error, data ) {
		console.log("deletando post de id "+conteudoprimeiro.id)
	        console.log( arguments );
	        console.log("\n");
	        next();
	});
}


const liberandopost = (ctx, next) => {
	conteudocarregado = true;
}


// Começando o dia
const novodia = (ctx, next) => {

	// Horário
	relatorioTempo = [1,datames,dataano];


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

	msg(`função novodia()`, idKiliano)

	next();

	// carregar();
}

// Atualizar local com o online

const atualizarlocal = (ctx, next) => {

	var conteudoprimeirodia;
	var conteudoprimeiromes;

	for (var i = 0; i < conteudoprimeiro.customFields.length; i++) {
		if (conteudoprimeiro.customFields[i].key == "dia_data") {
			conteudoprimeirodia = conteudoprimeiro.customFields[i].value;
		}

		if (conteudoprimeiro.customFields[i].key == "mes_data") {
			conteudoprimeiromes = conteudoprimeiro.customFields[i].value;
		}
	}


	console.log("atualizar local. conteudoprimeiro.dia_data:"+conteudoprimeirodia+" == pedido.dia_data: "+pedido.dia_data);
	console.log("atualizar local. conteudoprimeiro.dia_data:"+conteudoprimeiromes+" == pedido.mes_data: "+pedido.mes_data);

	if (conteudoprimeirodia == pedido.dia_data && conteudoprimeiromes == pedido.mes_data) {

		for (var i = 0; i < conteudoprimeiro.customFields.length; i++) {
			if (conteudoprimeiro.customFields[i].key == "acoes") {
				pedido.acoes = JSON.parse(conteudoprimeiro.customFields[i].value);
			}

			if (conteudoprimeiro.customFields[i].key == "indisponibilidade") {
				pedido.indisponibilidade = JSON.parse(conteudoprimeiro.customFields[i].value);
			}

			if (conteudoprimeiro.customFields[i].key == "lista") {
				pedido.lista = JSON.parse(conteudoprimeiro.customFields[i].value);
			}

			if (conteudoprimeiro.customFields[i].key == "paofrances") {
				pedido.paofrances = parseInt(conteudoprimeiro.customFields[i].value);
			}

			if (conteudoprimeiro.customFields[i].key == "paodemilho") {
				pedido.paodemilho = parseInt(conteudoprimeiro.customFields[i].value);
			}

			if (conteudoprimeiro.customFields[i].key == "rosquinha") {
				pedido.rosquinha = parseInt(conteudoprimeiro.customFields[i].value);
			}

			if (conteudoprimeiro.customFields[i].key == "rosquinharecheio") {
				pedido.rosquinharecheio = parseInt(conteudoprimeiro.customFields[i].value);
			}

			if (conteudoprimeiro.customFields[i].key == "croissantpresunto") {
				pedido.croissantpresunto = parseInt(conteudoprimeiro.customFields[i].value);
			}

			if (conteudoprimeiro.customFields[i].key == "croissantfrango") {
				pedido.croissantfrango = parseInt(conteudoprimeiro.customFields[i].value);
			}

			if (conteudoprimeiro.customFields[i].key == "bisnaga") {
				pedido.bisnaga = parseInt(conteudoprimeiro.customFields[i].value);
			}

			if (conteudoprimeiro.customFields[i].key == "bisnagaacucar") {
				pedido.bisnagaacucar = parseInt(conteudoprimeiro.customFields[i].value);
			}

			if (conteudoprimeiro.customFields[i].key == "bisnagacreme") {
				pedido.bisnagacreme = parseInt(conteudoprimeiro.customFields[i].value);
			}


		}
		

		console.log("Puxando versão mais atualizada do servidor");

		console.log(pedido);

	} else {
		console.log("Não existe uma versão online do dia de hoje");
	}



	next();

	// carregar();
}
	








const relatoriopao = (ctx, next) => {
	// relatorioTempo[0] mensal ou anual (1 é mês, 2 é ano)
	// relatorioTempo[1] mes referencia
	// relatorioTempo[2] ano referencia




	if (conteudo.length > 0) {
		console.log("analisando conteúdo dos "+conteudo.length+" posts puxados");

		pedidosanalisadossoma = {
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

		pedidosanalisados = [];

		for (var ic = 0; ic < conteudo.length; ic++) {
			var pedidoanalisado = {
				"dia_data": 0,
				"mes_data": 0,
				"ano_data": 0,
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

			for (var id = 0; id < conteudo[ic].customFields.length; id++) {
				if (conteudo[ic].customFields[id].key == "dia_data") {
					pedidoanalisado.dia_data = JSON.parse(conteudo[ic].customFields[id].value);
				}

				if (conteudo[ic].customFields[id].key == "mes_data") {
					pedidoanalisado.mes_data = JSON.parse(conteudo[ic].customFields[id].value);
				}

				if (conteudo[ic].customFields[id].key == "ano_data") {
					pedidoanalisado.ano_data = JSON.parse(conteudo[ic].customFields[id].value);
				}

				if (conteudo[ic].customFields[id].key == "acoes") {
					pedidoanalisado.acoes = JSON.parse(conteudo[ic].customFields[id].value);
				}

				if (conteudo[ic].customFields[id].key == "indisponibilidade") {
					pedidoanalisado.indisponibilidade = JSON.parse(conteudo[ic].customFields[id].value);
				}

				if (conteudo[ic].customFields[id].key == "lista") {
					pedidoanalisado.lista = JSON.parse(conteudo[ic].customFields[id].value);
				}

				if (conteudo[ic].customFields[id].key == "paofrances") {
					pedidoanalisado.paofrances = parseInt(conteudo[ic].customFields[id].value);
				}

				if (conteudo[ic].customFields[id].key == "paodemilho") {
					pedidoanalisado.paodemilho = parseInt(conteudo[ic].customFields[id].value);
				}

				if (conteudo[ic].customFields[id].key == "rosquinha") {
					pedidoanalisado.rosquinha = parseInt(conteudo[ic].customFields[id].value);
				}

				if (conteudo[ic].customFields[id].key == "rosquinharecheio") {
					pedidoanalisado.rosquinharecheio = parseInt(conteudo[ic].customFields[id].value);
				}

				if (conteudo[ic].customFields[id].key == "croissantpresunto") {
					pedidoanalisado.croissantpresunto = parseInt(conteudo[ic].customFields[id].value);
				}

				if (conteudo[ic].customFields[id].key == "croissantfrango") {
					pedidoanalisado.croissantfrango = parseInt(conteudo[ic].customFields[id].value);
				}

				if (conteudo[ic].customFields[id].key == "bisnaga") {
					pedidoanalisado.bisnaga = parseInt(conteudo[ic].customFields[id].value);
				}

				if (conteudo[ic].customFields[id].key == "bisnagaacucar") {
					pedidoanalisado.bisnagaacucar = parseInt(conteudo[ic].customFields[id].value);
				}

				if (conteudo[ic].customFields[id].key == "bisnagacreme") {
					pedidoanalisado.bisnagacreme = parseInt(conteudo[ic].customFields[id].value);
				}
			}

			if (relatorioTempo[0] == 1) {
				// Busca por mês
				if (pedidoanalisado.ano_data == relatorioTempo[2] && pedidoanalisado.mes_data == relatorioTempo[1]) {
					pedidosanalisados.push(pedidoanalisado);
				}
			}

			if (relatorioTempo[0] == 2) {
				// Busca por ano
				if (pedidoanalisado.ano_data == relatorioTempo[2]) {
					pedidosanalisados.push(pedidoanalisado);
				}
			}
		}
		console.log("Total de "+pedidosanalisados.length+" pedidos selecionados");

		for (var ip = 0; ip < pedidosanalisados.length; ip++) {
			pedidosanalisadossoma.paofrances += pedidosanalisados[ip].paofrances;
			pedidosanalisadossoma.paodemilho += pedidosanalisados[ip].paodemilho;
			pedidosanalisadossoma.rosquinha += pedidosanalisados[ip].rosquinha;
			pedidosanalisadossoma.rosquinharecheio += pedidosanalisados[ip].rosquinharecheio;
			pedidosanalisadossoma.croissantpresunto += pedidosanalisados[ip].croissantpresunto;
			pedidosanalisadossoma.croissantfrango += pedidosanalisados[ip].croissantfrango;
			pedidosanalisadossoma.bisnaga += pedidosanalisados[ip].bisnaga;
			pedidosanalisadossoma.bisnagaacucar += pedidosanalisados[ip].bisnagaacucar;
			pedidosanalisadossoma.bisnagacreme += pedidosanalisados[ip].bisnagacreme;
		}

		if (pedidosanalisados.length > 0) {
			if (relatorioTempo[0] == 1) {
				pedidosanalisadossoma.lista.push("RELATÓRIO MENSAL ("+pedidosanalisados.length+" pedidos cadastrados) \n\nPedidos de "+relatorioTempo[1]+"/"+relatorioTempo[2]);
			}

			if (relatorioTempo[0] == 2) {
				pedidosanalisadossoma.lista.push("RELATÓRIO ANUAL ("+pedidosanalisados.length+" pedidos cadastrados) \n\nPedidos de "+relatorioTempo[2]);
			}

			if (pedidosanalisadossoma.paofrances > 0) {
				pedidosanalisadossoma.lista.push("\n Pão Francês ("+pedidosanalisadossoma.paofrances+")");
			}

			if (pedidosanalisadossoma.paodemilho > 0) {
				pedidosanalisadossoma.lista.push("\n Pão de Milho ("+pedidosanalisadossoma.paodemilho+")");
			}

			if (pedidosanalisadossoma.rosquinha > 0) {
				pedidosanalisadossoma.lista.push("\n Rosquinha Comum ("+pedidosanalisadossoma.rosquinha+")");
			}

			if (pedidosanalisadossoma.rosquinharecheio > 0) {
				pedidosanalisadossoma.lista.push("\n Rosquinha com Recheio ("+pedidosanalisadossoma.rosquinharecheio+")");
			}

			if (pedidosanalisadossoma.croissantpresunto > 0) {
				pedidosanalisadossoma.lista.push("\n Croissant de Presunto ("+pedidosanalisadossoma.croissantpresunto+")");
			}

			if (pedidosanalisadossoma.croissantfrango > 0) {
				pedidosanalisadossoma.lista.push("\n Croissant de Frango ("+pedidosanalisadossoma.croissantfrango+")");
			}

			if (pedidosanalisadossoma.bisnaga > 0) {
				pedidosanalisadossoma.lista.push("\n Bisnaga Comum ("+pedidosanalisadossoma.bisnaga+")");
			}

			if (pedidosanalisadossoma.bisnagaacucar > 0) {
				pedidosanalisadossoma.lista.push("\n Bisnaga com Açucar ("+pedidosanalisadossoma.bisnagaacucar+")");
			}

			if (pedidosanalisadossoma.bisnagacreme > 0) {
				pedidosanalisadossoma.lista.push("\n Bisnaga com Creme ("+pedidosanalisadossoma.bisnagacreme+")");
			}
			
		} else {
			if (relatorioTempo[0] == 1) {
				pedidosanalisadossoma.lista.push("Nenhum pedido cadastrado em "+relatorioTempo[1]+"/"+relatorioTempo[2]);
			}

			if (relatorioTempo[0] == 2) {
				pedidosanalisadossoma.lista.push("Nenhum pedido cadastrado no ano de "+relatorioTempo[2]);
			}

			
		}
		next();
    }
}


const relatoriopaoprint = (ctx, next) => {
	ctx.reply(""+pedidosanalisadossoma.lista+"");
	next();
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


const tecladoSegundaAntes = Markup.keyboard([
	['✅Quero uma segunda opção✅'],
	['❌Não quero uma segunda opção❌']

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
	Markup.callbackButton('🍞 P. Francês', 'xpaofrances'),
	Markup.callbackButton('🌽 P. Milho', 'xpaodemilho'),
	Markup.callbackButton('🍩 R. Comum', 'xrosquinha'),

	Markup.callbackButton('🍩 R. Recheio', 'xrosquinharecheio'),
	Markup.callbackButton('🥐 C. Presunto', 'xcroissantpresunto'),
	Markup.callbackButton('🥐 C. Frango', 'xcroissantfrango'),

	Markup.callbackButton('🥖 B. Comum', 'xbisnaga'),
	Markup.callbackButton('🥖 B. Açúcar', 'xbisnagaacucar'),
	Markup.callbackButton('🥖 B. Creme', 'xbisnagacreme'),

	Markup.callbackButton('Nenhum item em falta', 'xreiniciar')
], {columns: 3}))

// Finalização de pedido
const tecladoFixoItens = Extra.markup(Markup.inlineKeyboard([
	Markup.callbackButton('✔ Confirmar Pedido', 'pconfirmar'),
	Markup.callbackButton('➖ Falta de Produto', 'pfalta'),
	Markup.callbackButton('✖ Apagar Tudo', 'pcancelar')
], {columns: 1}))

const tecladoFixoItensCancelar = Extra.markup(Markup.inlineKeyboard([
	Markup.callbackButton('🔙 Voltar', 'pcancelarvoltar'),
	Markup.callbackButton('✖✖ Apagar todos os itens do Pedido ✖✖', 'pcancelarapagar')
], {columns: 1}))

// Clima
const tecladoClima = Extra.markup(Markup.inlineKeyboard([
	Markup.callbackButton('Hoje', 'choje'),
	Markup.callbackButton('Amanhã', 'camanha'),
	Markup.callbackButton('Próximos 7 Dias', 'csetedias')
], {columns: 3}))

// Relatório Pão
const tecladoRelatorioPao = Extra.markup(Markup.inlineKeyboard([
	Markup.callbackButton('Mês Atual', 'rmesatual'),
	Markup.callbackButton('Mês Passado', 'rmespassado'),
	Markup.callbackButton('Ano Atual', 'ranoatual'),
	Markup.callbackButton('Ano Passado', 'ranopassado'),
	Markup.callbackButton('Especificar Data', 'respecificar')
], {columns: 2}))

const tecladoRelatorioPaoMes = Extra.markup(Markup.inlineKeyboard([
	Markup.callbackButton('01', 'rmes 1'),
	Markup.callbackButton('02', 'rmes 2'),
	Markup.callbackButton('03', 'rmes 3'),
	Markup.callbackButton('04', 'rmes 4'),
	Markup.callbackButton('05', 'rmes 5'),
	Markup.callbackButton('06', 'rmes 6'),
	Markup.callbackButton('07', 'rmes 7'),
	Markup.callbackButton('08', 'rmes 8'),
	Markup.callbackButton('09', 'rmes 9'),
	Markup.callbackButton('10', 'rmes 10'),
	Markup.callbackButton('11', 'rmes 11'),
	Markup.callbackButton('12', 'rmes 12')
], {columns: 6}))







// Início do dia
exec(ctx, atualizarData, novodia, carregarum, atualizarlocal, liberandopost)


// Criação de comandos

bot.command(['pao','Pao','pedir', 'cardapio'], async ctx => {

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


// Ouvindo o pedido
bot.hears(['🍞 Pão Francês', '🌽 Pão de Milho', '🍩 Rosquinha', '🍩 com Recheio','🥐 Croissant Presunto', '🥐 Croissant Frango','🥖 Bisnaga','🥖 com Açúcar','🥖 com Creme'], async ctx => {
	if (acordado == true) {
		await ctx.replyWithMarkdown(`Anotei seu pedido 😊 \n*Caso não tenha ${ctx.update.message.text}, você quer que peça outra coisa?*`, tecladoSegundaAntes)

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


bot.hears(['✅Quero uma segunda opção✅'], async ctx => {
	await ctx.reply(`Escolha sua segunda opção `, tecladoSegunda)

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

bot.action('pcancelar', async ctx => {
	await ctx.editMessageText(`Tem certeza que você quer apagar completamente o pedido?`, tecladoFixoItensCancelar)
})

bot.action('pcancelarvoltar', async ctx => {
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

bot.action('pcancelarapagar', async ctx => {
	await ctx.editMessageText(`Pedido apagado`);

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

	if (conteudocarregado == true)  {
		conteudocarregado = false;
		exec(ctx, carregarum, checagemparaapagar)
	} else {
		console.log("nao carregado")
	}

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

	// Enviando post pro servidor
	if (conteudocarregado == true)  {
		conteudocarregado = false;
		exec(ctx, carregarum, checagemparanovopost)
	} else {
		console.log("nao carregado")
	}

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





// Relatórios

// Actions
bot.action('rmesatual', async ctx => {

	relatorioTempo = [1,pedido.mes_data,pedido.ano_data];

	console.log("buscando: "+relatorioTempo);

	await ctx.editMessageText(`⏳ carregando ...`);

	if (conteudocarregado == true)  {
		conteudocarregado = false;
		exec(ctx, atualizarData, carregartodos, relatoriopao, relatoriopaoprint, liberandopost)
	} else {
		console.log("nao carregado")
		await ctx.editMessageText(`Erro, solicite o pedido novamente`);
	}
})

bot.action('rmespassado', async ctx => {

	if (pedido.mes_data == 1) {
		relatorioTempo = [1,12,(pedido.ano_data-1)];
	} else {
		relatorioTempo = [1,(pedido.mes_data-1),pedido.ano_data];
	}

	console.log("buscando: "+relatorioTempo);
	await ctx.editMessageText(`⏳ carregando ...`);

	if (conteudocarregado == true)  {
		conteudocarregado = false;
		exec(ctx, atualizarData, carregartodos, relatoriopao, relatoriopaoprint, liberandopost)
	} else {
		console.log("nao carregado")
		await ctx.editMessageText(`Erro, solicite o pedido novamente`);
	}
})

bot.action('ranoatual', async ctx => {

	relatorioTempo = [2,pedido.mes_data,pedido.ano_data];

	console.log("buscando: "+relatorioTempo);
	await ctx.editMessageText(`⏳ carregando ...`);

	if (conteudocarregado == true)  {
		conteudocarregado = false;
		exec(ctx, atualizarData, carregartodos, relatoriopao, relatoriopaoprint, liberandopost)
	} else {
		console.log("nao carregado")
		await ctx.editMessageText(`Erro, solicite o pedido novamente`);
	}
})

bot.action('ranopassado', async ctx => {

	relatorioTempo = [2,pedido.mes_data,(pedido.ano_data-1)];

	console.log("buscando: "+relatorioTempo);
	await ctx.editMessageText(`⏳ carregando ...`);

	if (conteudocarregado == true)  {
		conteudocarregado = false;
		exec(ctx, atualizarData, carregartodos, relatoriopao, relatoriopaoprint, liberandopost)
	} else {
		console.log("nao carregado")
		await ctx.editMessageText(`Erro, solicite o pedido novamente`);
	}
})

bot.action('respecificar', async ctx => {
	await ctx.editMessageText(`Selecionar Mês`, tecladoRelatorioPaoMes);
	relatorioTempo[0] = 1;
})

bot.action(/rmes (\d+)/, async ctx => {

	relatorioTempo[1] = parseInt(ctx.match[1]);
	console.log("buscando: "+relatorioTempo);

	const tecladoRelatorioPaoAno = Extra.markup(Markup.inlineKeyboard([
		Markup.callbackButton(pedido.ano_data, 'rano '+pedido.ano_data),
		Markup.callbackButton((pedido.ano_data-1), 'rano '+(pedido.ano_data-1)),
		Markup.callbackButton((pedido.ano_data-2), 'rano '+(pedido.ano_data-2))
	], {columns: 3}))

	await ctx.editMessageText(`Selecionar Ano`, tecladoRelatorioPaoAno);
})

bot.action(/rano (\d+)/, async ctx => {

	relatorioTempo[2] = parseInt(ctx.match[1]);

	console.log("buscando: "+relatorioTempo);
	await ctx.editMessageText(`⏳ carregando ...`);

	if (conteudocarregado == true)  {
		conteudocarregado = false;
		exec(ctx, atualizarData, carregartodos, relatoriopao, relatoriopaoprint, liberandopost)
	} else {
		console.log("nao carregado")
		await ctx.editMessageText(`Erro, solicite o pedido novamente`);
	}
	
})



// aaaaaaaaaaaaaaaaaaaaa

// Start

bot.start(async ctx => {
	exec(ctx,atualizarData)
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
	if (ctx.update.message.from.first_name == idRodrigo) {
		clima = await axios.get(`http://apiadvisor.climatempo.com.br/api/v1/forecast/locale/3861/days/15?token=${apiClimatempo}`);
		climaicon = "";

		var jandira1 = "";
		var jandira2 = "";

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

		jandira1 = `☀ ☀ Previsão para JANDIRA ☀ ☀

		HOJE (${clima.data.data[0].date_br})
			Temperatura: Min: ${clima.data.data[0].temperature.min}ºC | Max: ${clima.data.data[0].temperature.max}ºC 🌡
		 	${clima.data.data[0].text_icon.text.pt} ☀
		 	Provabilidade de chuva: ${clima.data.data[0].rain.probability} % ${climaicon}
		 	`;

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

		jandira2 = `AMANHÃ (${clima.data.data[1].date_br})

			Temperatura: Min: ${clima.data.data[1].temperature.min}ºC | Max: ${clima.data.data[1].temperature.max}ºC 🌡
		 	${clima.data.data[1].text_icon.text.pt} ☀
		 	Provabilidade de chuva: ${clima.data.data[1].rain.probability} % ${climaicon}`;

		if (ctx.chat.id != idRodrigo) {
			await ctx.reply(`Previsão de Jandira enviado pro Rodrigo`)
		}

		msg(jandira1+jandira2, idRodrigo);

	}



})


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

bot.command(['help', 'ajuda', 'tio'], async ctx => {
	await ctx.reply(`
		/pao - abre o menu para fazer o pedido do pão
		/pedido - mostra os pedidos do dia do pão
		/quem - mostra os pedidos separadamente de cada um

		/relatorio - gera relatórios dos pedidos de pão

		/clima - mostra a previsão do tempo
		/wifi - mostra a senha da wifi do visitante
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

bot.command(['relatorio'], async ctx => {
	if (ctx.chat.id == idKiliano || ctx.chat.id == idBartira || ctx.chat.id == idIsabel) {
		await ctx.reply(` 📅 Selecione a data do relatório 📅`,tecladoRelatorioPao);
	} else {
		await ctx.reply(`Relatório só podem ser enviados inbox, através do Kiliano, Bartira ou Bel`);

	}
})

// Testes

bot.command(['teste'], async ctx => {
	await ctx.reply("Testado 🔽 3♣");
})

bot.command(['post'], async ctx => {
	if (ctx.chat.id == idKiliano) {
		if (conteudocarregado == true)  {
			conteudocarregado = false;
			exec(ctx, carregarum, checagemparanovopost)
		} else {
			console.log("nao carregado")
		}
	}

})


// / Código





// ------------------------------- TRUCO ---------------------------------


// %E2%99%A3 ♣ 
// %E2%99%A0 ♠
// %E2%99%A5 ♥ 
// %E2%99%A6 ♦

// var testekey = JSON.stringify({"keyboard":[["opt 1","opt 2","opt 3"],["menu"]],"resize_keyboard":true})


// var testekey = JSON.stringify({"keyboard":[["7♦️ ","A♥️","Q♣️"],["truco!","jogar baixo"]],"resize_keyboard":true})
// 	axios.get(`${apiUrl}/sendMessage?chat_id=${idKiliano}&text=${encodeURI('teste oioi oi oi')}&reply_markup=${testekey}`)
// 		.catch(e => console.log(e))


var trucoLoading = false;

var trucoJogadores = [];
var trucoBaralhoTipo = 'sujo';
var trucoBaralho =[];
var trucoComecou = false;
var trucoPrimeiroRound = true;
var trucoValorDaMao = 1;

var trucoContinuar = false;

var trucoCorrer = 0;
var trucoEmTruco = false;
var trucoAlvoTruco = [5,5,5];

var trucoQueimar = [];
var trucoManilha = '';
var trucoManilhaValor = {
	"zap": "",
	"escopeta": "",
	"espadilha": "",
	"picafumo": "",
    "valor10": ["3♣","3♥","3♠","3♦"],
    "valor9": ["2♣","2♥","2♠","2♦"],
    "valor8": ["A♣","A♥","A♠","A♦"],
    "valor7": ["K♣","K♥","K♠","K♦"],
    "valor6": ["J♣","J♥","J♠","J♦"],
    "valor5": ["Q♣","Q♥","Q♠","Q♦"],
    "valor4": ["7♣","7♥","7♠","7♦"],
    "valor3": ["6♣","6♥","6♠","6♦"],
    "valor2": ["5♣","5♥","5♠","5♦"],
    "valor1": ["4♣","4♥","4♠","4♦"],
    "valor0": ["✖️"]
}

var trucoRodada = []
var trucoTurno = 0;
var trucoTurnoPrincipal = 0;
var trucoTurnoId = 123;
var trucoCartasNaMesa = [];

var trucoCartaJogada = "";
var trucoMaiorValorVencedor = [];

var trucoMensagem = [];





const trucozerar = (ctx, next) => {
	trucoLoading = false;

	trucoJogadores = [];
	trucoBaralhoTipo = 'sujo';
	trucoBaralho =[];
	trucoComecou = false;
	trucoPrimeiroRound = true;
	trucoValorDaMao = 1;
	trucoContinuar = false;

	trucoCorrer = 0;
	trucoEmTruco = false;
	trucoAlvoTruco = [5,5,5];

	trucoQueimar = [];
	trucoManilha = '';
	trucoManilhaValor = {
		"zap": "",
		"escopeta": "",
		"espadilha": "",
		"picafumo": "",
	    "valor10": ["3♣","3♥","3♠","3♦"],
	    "valor9": ["2♣","2♥","2♠","2♦"],
	    "valor8": ["A♣","A♥","A♠","A♦"],
	    "valor7": ["K♣","K♥","K♠","K♦"],
	    "valor6": ["J♣","J♥","J♠","J♦"],
	    "valor5": ["Q♣","Q♥","Q♠","Q♦"],
	    "valor4": ["7♣","7♥","7♠","7♦"],
	    "valor3": ["6♣","6♥","6♠","6♦"],
	    "valor2": ["5♣","5♥","5♠","5♦"],
	    "valor1": ["4♣","4♥","4♠","4♦"],
	    "valor0": ["✖️"]
	}

	trucoRodada = []
	trucoTurno = 0;
	trucoTurnoPrincipal = 0;
	trucoTurnoId = 123;
	trucoCartasNaMesa = [];

	trucoCartaJogada = "";
	trucoMaiorValorVencedor = [];

	next();
}


const trucocloading = (ctx, next) => {
	console.log("trucocloading");
	trucoLoading = true;
	next();
}

const trucocloadingfim = (ctx, next) => {
	console.log("trucocloadingfim");
	trucoLoading = false;
}


const trucoadicionarjogador = (ctx, next) => {
	console.log("trucoadicionarjogador");
	next();
}

const trucocomecar = (ctx, next) => {
	console.log("trucocomecar");
	trucoComecou = true;
	next();
}



const trucobaralho = (ctx, next) => {
	console.log("trucobaralho");

	if (trucoBaralhoTipo == 'limpo') {
		trucoBaralho = ["3♣","2♣","A♣","K♣","J♣","Q♣","3♥","2♥","A♥","K♥","J♥","Q♥","3♠","2♠","A♠","K♠","J♠","Q♠","3♦","2♦","A♦","K♦","J♦","Q♦"];
	} else {
		trucoBaralho = ["3♣","2♣","A♣","K♣","J♣","Q♣","7♣","6♣","5♣","4♣","3♥","2♥","A♥","K♥","J♥","Q♥","7♥","6♥","5♥","4♥","3♠","2♠","A♠","K♠","J♠","Q♠","7♠","6♠","5♠","4♠","3♦","2♦","A♦","K♦","J♦","Q♦","7♦","6♦","5♦","4♦"];
	}
	
	next();
}


const trucoEmbaralhar = (ctx, next) => {

	console.log("trucoEmbaralhar");


	var currentIndex = trucoBaralho.length, temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = trucoBaralho[currentIndex];
		trucoBaralho[currentIndex] = trucoBaralho[randomIndex];
		trucoBaralho[randomIndex] = temporaryValue;
	}

	trucoManilhaValor = {
		"zap": "",
		"escopeta": "",
		"espadilha": "",
		"picafumo": "",
	    "valor10": ["3♣","3♥","3♠","3♦"],
	    "valor9": ["2♣","2♥","2♠","2♦"],
	    "valor8": ["A♣","A♥","A♠","A♦"],
	    "valor7": ["K♣","K♥","K♠","K♦"],
	    "valor6": ["J♣","J♥","J♠","J♦"],
	    "valor5": ["Q♣","Q♥","Q♠","Q♦"],
	    "valor4": ["7♣","7♥","7♠","7♦"],
	    "valor3": ["6♣","6♥","6♠","6♦"],
	    "valor2": ["5♣","5♥","5♠","5♦"],
	    "valor1": ["4♣","4♥","4♠","4♦"],
	    "valor0": ["✖️"]
	}


	// axios.get(`${apiUrl}/sendMessage?chat_id=${idKiliano}&text=${encodeURI(trucoBaralho)}`).catch(e => console.log(e))
	next();
}

const trucomanilha = (ctx, next) => {

	console.log("trucomanilha");

	trucoManilha = trucoBaralho[0];
	trucoBaralho.splice(0, 1)

	console.log("Descarte manilha: "+trucoManilha);

	if (trucoManilhaValor.valor1.includes(trucoManilha)){
		trucoManilhaValor.zap = "5♣";
		trucoManilhaValor.escopeta = "5♥";
		trucoManilhaValor.espadilha = "5♠";
		trucoManilhaValor.picafumo = "5♦";
	}


	if (trucoManilhaValor.valor2.includes(trucoManilha)){
		trucoManilhaValor.zap = "6♣";
		trucoManilhaValor.escopeta = "6♥";
		trucoManilhaValor.espadilha = "6♠";
		trucoManilhaValor.picafumo = "6♦";
	}

	if (trucoManilhaValor.valor3.includes(trucoManilha)){
		trucoManilhaValor.zap = "7♣";
		trucoManilhaValor.escopeta = "7♥";
		trucoManilhaValor.espadilha = "7♠";
		trucoManilhaValor.picafumo = "7♦";
	}

	if (trucoManilhaValor.valor4.includes(trucoManilha)){
		trucoManilhaValor.zap = "Q♣";
		trucoManilhaValor.escopeta = "Q♥";
		trucoManilhaValor.espadilha = "Q♠";
		trucoManilhaValor.picafumo = "Q♦";
	}

	if (trucoManilhaValor.valor5.includes(trucoManilha)){
		trucoManilhaValor.zap = "J♣";
		trucoManilhaValor.escopeta = "J♥";
		trucoManilhaValor.espadilha = "J♠";
		trucoManilhaValor.picafumo = "J♦";
	}

	if (trucoManilhaValor.valor6.includes(trucoManilha)){
		trucoManilhaValor.zap = "K♣";
		trucoManilhaValor.escopeta = "K♥";
		trucoManilhaValor.espadilha = "K♠";
		trucoManilhaValor.picafumo = "K♦";
	}

	if (trucoManilhaValor.valor7.includes(trucoManilha)){
		trucoManilhaValor.zap = "A♣";
		trucoManilhaValor.escopeta = "A♥";
		trucoManilhaValor.espadilha = "A♠";
		trucoManilhaValor.picafumo = "A♦";
	}

	if (trucoManilhaValor.valor8.includes(trucoManilha)){
		trucoManilhaValor.zap = "2♣";
		trucoManilhaValor.escopeta = "2♥";
		trucoManilhaValor.espadilha = "2♠";
		trucoManilhaValor.picafumo = "2♦";
	}

	if (trucoManilhaValor.valor9.includes(trucoManilha)){
		trucoManilhaValor.zap = "3♣";
		trucoManilhaValor.escopeta = "3♥";
		trucoManilhaValor.espadilha = "3♠";
		trucoManilhaValor.picafumo = "3♦";
	}

	if (trucoManilhaValor.valor10.includes(trucoManilha)){
		
		if (trucoBaralhoTipo == 'limpo') {
			trucoManilhaValor.zap = "4♣";
			trucoManilhaValor.escopeta = "4♥";
			trucoManilhaValor.espadilha = "4♠";
			trucoManilhaValor.picafumo = "4♦";

		} else {
			trucoManilhaValor.zap = "Q♣";
			trucoManilhaValor.escopeta = "Q♥";
			trucoManilhaValor.espadilha = "Q♠";
			trucoManilhaValor.picafumo = "Q♦";
		}
	}


	// includes

	/*
	trucoManilhaValor = {
		"zap": "x♣",
		"escopeta": "x♥",
		"espadilha": "x♠",
		"picafumo": "x♦",
	    
	}
	*/

	for (var i = 0; i < trucoJogadores[trucoTurno].mao.length; i++) {
		if (trucoCartaJogada == trucoJogadores[trucoTurno].mao[i]) {
			trucoJogadores[trucoTurno].mao.splice(i, 1)
		}
	}


	next();
}



const trucoqueimar = (ctx, next) => {

	console.log("trucoqueimar");


	next();
}

const trucoprimeiramesa = (ctx, next) => {
	console.log("trucoprimeiramesa");
	trucoPrimeiroRound = true;
	trucoComecou = true;
	var trucoJogadoresOrdem1 = trucoJogadores[1];
	var trucoJogadoresOrdem2 = trucoJogadores[2];
	trucoJogadores[1] = trucoJogadoresOrdem2;
	trucoJogadores[2] = trucoJogadoresOrdem1;
	next();
}


const trucolimparmesa = (ctx, next) => {
	console.log("trucolimparmesa");
	trucoValorDaMao = 1;

	for (var i = 0; i < trucoJogadores.length; i++) {
		trucoJogadores[i].mao =[];
		trucoJogadores[i].donodascartas =[];
		trucoJogadores[i].truco = "É Truco ❗❗❗";
	}

	trucoQueimar = [];
	trucoManilha = '';

	
	trucoRodada = [];
	trucoCartasNaMesa = [];

	trucoCorrer = 0;
	trucoEmTruco = false;
	trucoAlvoTruco = [5,5,5];
	trucoCartaJogada = "";
	trucoCartaJogada = "";
	trucoMaiorValorVencedor = [];

	next();

}

const trucoiniciativa = (ctx, next) => {

	console.log("trucoiniciativa");

	if(trucoPrimeiroRound == true) {
		trucoTurno = Math.floor(4*Math.random());
		trucoTurnoId = trucoJogadores[trucoTurno].id;
		console.log(trucoTurno);
		trucoPrimeiroRound = false;
		trucoTurnoPrincipal = trucoTurno;
	} else {
		if (trucoTurnoPrincipal < 3) {
			trucoTurnoPrincipal += 1;
		} else {
			trucoTurnoPrincipal = 0;
		}
		trucoTurno = trucoTurnoPrincipal;

	}
	next();


}



const trucodistribuircarta = async (ctx, next) => {

	console.log("trucodistribuircarta");


	for(var i = 0; i < trucoJogadores.length; i++){

		// zerar mão
		trucoJogadores[i].mao = [];

		// distribuir 3 cartas

		for(var ic = 0; ic < 3; ic++) {
			trucoJogadores[i].mao.push(trucoBaralho[0]);
			trucoBaralho.splice(0, 1)
		}

		await msg(`${trucoJogadores[0].nome} e ${trucoJogadores[2].nome} (${trucoJogadores[0].pontos}) X (${trucoJogadores[1].pontos}) ${trucoJogadores[1].nome} e ${trucoJogadores[3].nome}

			Manilhas: [ ${trucoManilhaValor.zap} ]  [ ${trucoManilhaValor.escopeta} ]  [ ${trucoManilhaValor.espadilha} ]  [ ${trucoManilhaValor.picafumo} ]

			${trucoJogadores[i].nome}: Você recebeu as seguintes cartas:
			[ ${trucoJogadores[i].mao[0]} ] [ ${trucoJogadores[i].mao[1]} ] [ ${trucoJogadores[i].mao[2]} ]

			Agora é a vez de ${trucoJogadores[trucoTurno].nome}

			`,trucoJogadores[i].id);
	}


	next();
}


const trucomostrouteclado = (ctx, next) => {

	console.log("trucomostrouteclado");


	var trucoMaoReplaceBaixo = [];

	for ( var i = 0; i < trucoJogadores[trucoTurno].mao.length; i++) {
		trucoMaoReplaceBaixo.push("🔽 "+trucoJogadores[trucoTurno].mao[i])
	}

	var trucoTrucagem = [];

	trucoTrucagem.push(trucoJogadores[trucoTurno].truco);



	var tecladoTruco = JSON.stringify({"keyboard":[trucoJogadores[trucoTurno].mao, trucoMaoReplaceBaixo, trucoTrucagem],"resize_keyboard":true, "one_time_keyboard":true})


	axios.get(`${apiUrl}/sendMessage?chat_id=${trucoJogadores[trucoTurno].id}&text=${encodeURI('Jogada:')}&reply_markup=${encodeURI(tecladoTruco)}`)
		.catch(e => console.log(e))


	next();
}

const trucomostroutecladotruco = (ctx, next) => {



	var trucoTrucagem = [];

	trucoTrucagem.push(trucoJogadores[trucoAlvoTruco[1]].truco);

	var tecladoTrucagem = JSON.stringify({"keyboard":[["Desce! ✔"],["Correr? ✖"],trucoTrucagem],"resize_keyboard":true, "one_time_keyboard":true})

	axios.get(`${apiUrl}/sendMessage?chat_id=${trucoJogadores[trucoAlvoTruco[1]].id}&text=${encodeURI('Resposta ao truco:')}&reply_markup=${encodeURI(tecladoTrucagem)}`)
	.catch(e => console.log(e))

	axios.get(`${apiUrl}/sendMessage?chat_id=${trucoJogadores[trucoAlvoTruco[2]].id}&text=${encodeURI('Resposta ao truco:')}&reply_markup=${encodeURI(tecladoTrucagem)}`)
	.catch(e => console.log(e))

	next();
}




const trucoproximajogada = (ctx, next) => {

	if (trucoTurno < 3) {
		trucoTurno += 1;
	} else {
		trucoTurno = 0;
	}

	trucoTurnoId = trucoJogadores[trucoTurno].id;

	// \n[ 5♥ ] : Mimi', '\n[ 3♠ ] : Tavinho', '\n[ A♦ ] : Kiliano;

	if(trucoCartasNaMesa.length < 4) {
		// em jogo
		exec(ctx, trucomostrouteclado);
		trucoMensagem.push(`\n\nAgora é a vez de ${trucoJogadores[trucoTurno].nome}`)

	} else {
		// jogo completo
		exec(ctx, trucocalcularvitoriamao, trucoanalizarrodada);
	}


	next();
}

const trucocalcularvitoriamao = (ctx, next) => {

	

	/*trucoCartasNaMesa = [
		{
			"carta" : trucoCartaJogada,
			"carta" : trucoCartaJogada,
			"cartajogada" : "\n[ "+trucoCartaJogada+" "+trucoCartasNaMesaItemValorNome+"] : "+trucoJogadores[trucoTurno].nome,
			"cartaprabaixo" : false,
			"dono" : ctx.update.message.from.id,
			"time" : 0,
			"valor" : trucoCartasNaMesaItemValor
		},
		{
			"carta" : trucoCartaJogada,
			"carta" : trucoCartaJogada,
			"cartajogada" : "\n[ "+trucoCartaJogada+" "+trucoCartasNaMesaItemValorNome+"] : "+trucoJogadores[trucoTurno].nome,
			"cartaprabaixo" : false,
			"dono" : ctx.update.message.from.id,
			"valor" : trucoCartasNaMesaItemValor
			"time" : 0,
		}
		]*/


	var trucoMaiorValor = [];
	var trucoMaiorValorVencedorTimeNome = '';

	for (var i = 0; i < trucoCartasNaMesa.length; i++) {
		trucoMaiorValor.push(trucoCartasNaMesa[i].valor)
	}

	var trucoMaiorValorUnico = trucoMaiorValor.reduce(function(a, b) {
	  return Math.max(a, b);
	});

	

	for (var i = 0; i < trucoCartasNaMesa.length; i++) {
		if (trucoCartasNaMesa[i].valor == trucoMaiorValorUnico) {

			var trucoMaiorValorVencedorItem = {
				"visual": trucoCartasNaMesa[i].carta,
				"dono" : trucoCartasNaMesa[i].dono,
				"dononumero" : trucoCartasNaMesa[i].dononumero,
				"dononome" : trucoCartasNaMesa[i].dononome,
				"time" : trucoCartasNaMesa[i].time 
			};

			trucoMaiorValorVencedor.push(trucoMaiorValorVencedorItem)
		}
	}


	console.log(trucoMaiorValorVencedor)


	// Se só tiver 1 carta vencedora
	if (trucoMaiorValorVencedor.length == 1) {

		/*
			trucoMaiorValorVencedor = [
				{
					"visual": "5♣",
					"dono" : 1224,
					"dononumero" : 1,
					"dononome" : "Kiliano",
					"time" : 0 
				}
			]
		*/



		if (trucoMaiorValorVencedor[0].time == 0) {
			trucoMaiorValorVencedorTimeNome = trucoJogadores[0].nome+" e "+trucoJogadores[2].nome;
		}

		if (trucoMaiorValorVencedor[0].time == 1) {
			trucoMaiorValorVencedorTimeNome = trucoJogadores[1].nome+" e "+trucoJogadores[3].nome;
		}

		trucoRodada.push(trucoMaiorValorVencedor[0].time);
		console.log(trucoRodada);

		trucoMensagem.push(`\n\nVitória: [ ${trucoMaiorValorVencedor[0].visual} ] ${trucoMaiorValorVencedorTimeNome}`);
		
	}




	// Se só tiver 2 cartas vencedoras
	if (trucoMaiorValorVencedor.length == 2) {

		/*
			trucoMaiorValorVencedor = [
				{
					"visual": "5♣",
					"dono" : 123,
					"dononumero" : 1,
					"dononome" : "Kiliano",
					"time" : 0 
				},
				{
					"visual": "5♣",
					"dono" : 123,
					"dononumero" : 1,
					"dononome" : "Kiliano",
					"time" : 0 
				}
			]
		*/

		// Checar se são do mesmo time
		if (trucoMaiorValorVencedor[0].time == trucoMaiorValorVencedor[1].time) {
			if (trucoMaiorValorVencedor[1].time == 0) {
				trucoMaiorValorVencedorTimeNome = trucoJogadores[0].nome+" e "+trucoJogadores[2].nome;
			}

			if (trucoMaiorValorVencedor[1].time == 1) {
				trucoMaiorValorVencedorTimeNome = trucoJogadores[1].nome+" e "+trucoJogadores[3].nome;
			}

			trucoRodada.push(trucoMaiorValorVencedor[1].time);

			trucoMensagem.push(`\n\nVitória: [ ${trucoMaiorValorVencedor[1].visual} ] ${trucoMaiorValorVencedorTimeNome}`)


		} else {
			// se forem de times diferentes
			trucoRodada.push(3);
			trucoMensagem.push(`\n\nRodada Empatada: [ ${trucoMaiorValorVencedor[0].visual} ] [ ${trucoMaiorValorVencedor[1].visual} ]`)
			
		}
	}


	// 3 cartas empatadas

	if (trucoMaiorValorVencedor.length == 3) {
		trucoRodada.push(3);
		trucoMensagem.push(`\n\nRodada Empatada: [ ${trucoMaiorValorVencedor[0].visual} ] [ ${trucoMaiorValorVencedor[1].visual} ] [ ${trucoMaiorValorVencedor[2].visual} ]`);

	}

	// 4 cartas empatadas
	if (trucoMaiorValorVencedor.length == 4) {
		trucoRodada.push(3);

		trucoMensagem.push(`\n\nRodada Empatada: [ ${trucoMaiorValorVencedor[0].visual} ] [ ${trucoMaiorValorVencedor[1].visual} ] [ ${trucoMaiorValorVencedor[2].visual} ] [ ${trucoMaiorValorVencedor[3].visual} ]`);
	}


	// for (var i = 0; i < trucoJogadores.length; i++) {
	// 	msg(`Fim da rodada`,trucoJogadores[i].id);
	// }
	

	next();
}


const trucoanalizarrodada = (ctx, next) => {

	console.log("trucoRodada "+trucoRodada)


	/*
		trucoMaiorValorVencedor = [
			{
				"visual": "5♣",
				"dono" : 1224,
				"dononumero" : 1,
				"dononome" : "Kiliano",
				"time" : 0 
			}
		]
	*/

	// trucoRodada = [0,1,3]


	
	// trucoRodada = [0] ou trucoRodada = [1] ou trucoRodada = [3]

	// Primira rodada
	if (trucoRodada.length == 1) {
		
		trucoTurno = trucoMaiorValorVencedor[trucoMaiorValorVencedor.length-1].dononumero;
		console.log("trucoTurno "+trucoTurno);
		trucoTurnoId = trucoJogadores[trucoTurno].id;

		console.log("trucoTurnoId "+trucoTurnoId)

		

		trucoMensagem.push(`\n\nSegunda rodada: ${trucoJogadores[trucoTurno].nome} vai fazer a volta`);

		trucoCartasNaMesa = [];
		trucoMaiorValorVencedor = [];
		
		exec(ctx,trucomostrouteclado)
	}


	// Segunda rodada
	if (trucoRodada.length == 2) {


		// Se o time 0 ter feito a primeira
		if(trucoRodada[0] == 0) {

			// Se o time 0 ter feito a segunda também
			if (trucoRodada[1] == 0) {
				trucoJogadores[0].pontos += trucoValorDaMao;
				trucoJogadores[2].pontos += trucoValorDaMao;

				trucoMensagem.push(`\n\n${trucoJogadores[0].nome} e ${trucoJogadores[2].nome} ganharam esse jogo, somando ${trucoValorDaMao} na pontuação! 👍

					${trucoJogadores[0].nome} e ${trucoJogadores[2].nome} (${trucoJogadores[0].pontos}) X (${trucoJogadores[1].pontos}) ${trucoJogadores[1].nome} e ${trucoJogadores[3].nome}`);

				trucoCartasNaMesa = [];
				trucoMaiorValorVencedor = [];

				exec(ctx, trucoproximarodada);
			}

			// Se o time 1 ter feito a segunda
			if (trucoRodada[1] == 1) {

				trucoTurno = trucoMaiorValorVencedor[trucoMaiorValorVencedor.length-1].dononumero;
				trucoTurnoId = trucoJogadores[trucoTurno].id;


				trucoMensagem.push(`\n\nÚltima rodada: ${trucoJogadores[trucoTurno].nome} vai fazer a volta`);
				trucoCartasNaMesa = [];
				trucoMaiorValorVencedor = [];
				exec(ctx,trucomostrouteclado)
			}


			// Se o houve empate na segunda
			if (trucoRodada[1] == 3) {
				trucoJogadores[0].pontos += trucoValorDaMao;
				trucoJogadores[2].pontos += trucoValorDaMao;

				trucoMensagem.push(`\n\nComo ${trucoJogadores[0].nome} e ${trucoJogadores[2].nome} fizeram a primeira, eles ganham essa, somando ${trucoValorDaMao} na pontuação! 👍`);

				trucoCartasNaMesa = [];
				trucoMaiorValorVencedor = [];

				exec(ctx, trucoproximarodada);
			}
		}

		// Se o time 1 ter feito a primeira
		if(trucoRodada[0] == 1) {

			// Se o time 0 ter feito a segunda também
			if (trucoRodada[1] == 1) {
				trucoJogadores[1].pontos += trucoValorDaMao;
				trucoJogadores[3].pontos += trucoValorDaMao;

				trucoMensagem.push(`\n\n${trucoJogadores[1].nome} e ${trucoJogadores[3].nome} ganharam esse jogo, somando ${trucoValorDaMao} na pontuação! 👍`);


				trucoCartasNaMesa = [];
				trucoMaiorValorVencedor = [];


				exec(ctx, trucoproximarodada);
			}

			// Se o time 0 ter feito a segunda
			if (trucoRodada[1] == 0) {

				trucoTurno = trucoMaiorValorVencedor[trucoMaiorValorVencedor.length-1].dononumero;
				trucoTurnoId = trucoJogadores[trucoTurno].id;


				trucoMensagem.push(`\n\nÚltima rodada: ${trucoJogadores[trucoTurno].nome} vai fazer a volta`);
				trucoCartasNaMesa = [];
				trucoMaiorValorVencedor = [];
				exec(ctx,trucomostrouteclado)
			}


			// Se o houve empate na segunda
			if (trucoRodada[1] == 3) {
				trucoJogadores[1].pontos += trucoValorDaMao;
				trucoJogadores[3].pontos += trucoValorDaMao;

				trucoMensagem.push(`\n\nComo ${trucoJogadores[1].nome} e ${trucoJogadores[3].nome} fizeram a primeira, eles ganham essa, somando ${trucoValorDaMao} na pontuação! 👍`);

				trucoCartasNaMesa = [];
				trucoMaiorValorVencedor = [];
				exec(ctx, trucoproximarodada);
			}
		}


		// Se foi empate na primeira
		if(trucoRodada[0] == 3) {

			// Se o time 0 ter feito a segunda 
			if (trucoRodada[1] == 0) {
				trucoJogadores[0].pontos += trucoValorDaMao;
				trucoJogadores[2].pontos += trucoValorDaMao;

				trucoMensagem.push(`\n\n${trucoJogadores[0].nome} e ${trucoJogadores[2].nome} ganharam esse jogo, somando ${trucoValorDaMao} na pontuação! 👍`);

				trucoCartasNaMesa = [];
				trucoMaiorValorVencedor = [];

				exec(ctx, trucoproximarodada);
			}

			// Se o time 1 ter feito a segunda 
			if (trucoRodada[1] == 1) {
				trucoJogadores[1].pontos += trucoValorDaMao;
				trucoJogadores[3].pontos += trucoValorDaMao;

				trucoMensagem.push(`\n\n${trucoJogadores[1].nome} e ${trucoJogadores[3].nome} ganharam esse jogo, somando ${trucoValorDaMao} na pontuação! 👍`);

				trucoCartasNaMesa = [];
				trucoMaiorValorVencedor = [];


				exec(ctx, trucoproximarodada);
			}

			// Se o houve empate na segunda
			if (trucoRodada[1] == 3) {
				trucoTurno = trucoMaiorValorVencedor[trucoMaiorValorVencedor.length-1].dononumero;
				trucoTurnoId = trucoJogadores[trucoTurno].id;


				trucoMensagem.push(`\n\nÚltima rodada: ${trucoJogadores[trucoTurno].nome} vai fazer a volta`);
				trucoCartasNaMesa = [];
				trucoMaiorValorVencedor = [];
				exec(ctx,trucomostrouteclado)
			}
		}
	}

	// Terceira Rodada
	if (trucoRodada.length == 3) {

		// Se o time 0 ganhou a terceira
		if (trucoRodada[2] == 0) {
			trucoJogadores[0].pontos += trucoValorDaMao;
			trucoJogadores[2].pontos += trucoValorDaMao;

			trucoMensagem.push(`\n\n${trucoJogadores[0].nome} e ${trucoJogadores[2].nome} ganharam esse jogo, somando ${trucoValorDaMao} na pontuação! 👍`);

			trucoCartasNaMesa = [];
			trucoMaiorValorVencedor = [];

			exec(ctx, trucoproximarodada);
		}

		// Se o time 1 ganhou a terceira
		if (trucoRodada[2] == 1) {
			trucoJogadores[1].pontos += trucoValorDaMao;
			trucoJogadores[3].pontos += trucoValorDaMao;

			trucoMensagem.push(`\n\n${trucoJogadores[1].nome} e ${trucoJogadores[3].nome} ganharam esse jogo, somando ${trucoValorDaMao} na pontuação! 👍`);
			trucoCartasNaMesa = [];
			trucoMaiorValorVencedor = [];
			exec(ctx, trucoproximarodada);
		}

		// Se house empate na terceira
		if (trucoRodada[2] == 3) {

			// Ganha quem fez a primeira
			// Se o time 0 ter feito a primeira
			if (trucoRodada[0] == 0) {
				trucoJogadores[0].pontos += trucoValorDaMao;
				trucoJogadores[1].pontos += trucoValorDaMao;

				trucoMensagem.push(`\n\n${trucoJogadores[0].nome} e ${trucoJogadores[2].nome} ganharam esse jogo, por terem feito a primeira. Somando ${trucoValorDaMao} na pontuação! 👍`);
				trucoCartasNaMesa = [];
				trucoMaiorValorVencedor = [];

				exec(ctx, trucoproximarodada);
			}

			if (trucoRodada[0] == 1) {
				trucoJogadores[1].pontos += trucoValorDaMao;
				trucoJogadores[3].pontos += trucoValorDaMao;

				trucoMensagem.push(`\n\n${trucoJogadores[1].nome} e ${trucoJogadores[3].nome} ganharam esse jogo, por terem feito a primeira. Somando ${trucoValorDaMao} na pontuação! 👍`);
				trucoCartasNaMesa = [];
				trucoMaiorValorVencedor = [];

				exec(ctx, trucoproximarodada);
			}

			if (trucoRodada[0] == 3) {
				trucoMensagem.push(`\n\nAs 3 rodadas empataram! Ninguém marca ponto! 👍`);
				trucoCartasNaMesa = [];
				trucoMaiorValorVencedor = [];

				exec(ctx, trucoproximarodada);
			}
				

		}
	}

	// exec(ctx, trucomostrouteclado)
	next();
}



const trucoproximarodada = (ctx, next) => {

	trucoRodada = [];


	// Dando a vitória
	if(trucoJogadores[0].pontos >= 12 ) {
		trucoMensagem.push(`\n\n 🏆 Vitória da dupla ${trucoJogadores[0].nome} e ${trucoJogadores[2].nome}! 🏆`);
		exec(ctx, trucozerar, trucofim);
	}

	if(trucoJogadores[1].pontos >= 12 ) {
		trucoMensagem.push(`\n\n 🏆 Vitória da dupla ${trucoJogadores[1].nome} e ${trucoJogadores[3].nome}! 🏆`);
		exec(ctx, trucozerar, trucofim);
	}

	console.log(JSON.stringify(trucoJogadores))

	console.log("pontos time1 "+trucoJogadores[0].pontos+"    pontos time2 "+trucoJogadores[2].pontos);


	// Continuando o jogo
	if (trucoJogadores[2].pontos < 12 && trucoJogadores[0].pontos < 12) {

		// Iniciando uma nova rodada comum
		exec(ctx, trucoiniciativa,trucocontinuarrodada, trucomensagemgeral);
	}
	

	// Rezando itens entre rodadas
	next();
}


const trucomensagemgeral = async (ctx, next) =>  {
	console.log(trucoMensagem)
	for (var i = 0; i < trucoJogadores.length; i++) {
		await msg(""+trucoMensagem+"",trucoJogadores[i].id);
	}

	trucoMensagem = [];

	next();
}

const trucocontinuarrodada = (ctx, next) => {

	trucoContinuar = true;

	var tecladoTrucoContinuar = JSON.stringify({"keyboard":[['▫◻ Continuar ◻▫']],"resize_keyboard":true, "one_time_keyboard":true})

	trucoMensagem.push(`\n\n ---------------- \n\n Aguardando ${trucoJogadores[trucoTurno].nome} continuar a próxima rodada.`);

	axios.get(`${apiUrl}/sendMessage?chat_id=${trucoJogadores[trucoTurno].id}&text=${encodeURI('Continue:')}&reply_markup=${encodeURI(tecladoTrucoContinuar)}`).catch(e => console.log(e))

	console.log(trucoJogadores[trucoTurno].nome+" - "+trucoJogadores[trucoTurno].id)


	next();
}



// const truconovarodada = (ctx, next) => {
// 	exec(trucolimparmesa, trucoiniciativa, trucobaralho, trucoEmbaralhar, trucomanilha, trucoqueimar, trucodistribuircarta, trucomostrouteclado);
// 	next();
// }



const trucofim = (ctx, next) => {

	// Só lembrando que ainda tem o loadingfim e o trucomensagemgeral depois desse cara

	// Rezando itens entre rodadas

	trucoComecou = false;
	trucoJogadores = []
	trucoJogadores = []

	console.log("ACABOU A PARTIDA");
	next();
}




bot.command(['truco'], async ctx => {
	// 	trucoJogadores = [
	// {
		// "nome":"Kiliano",
		// "id": idKiliano,
		// "pontos":0,
		// "time" : 0,
		// "mao":[],
		// "donodascartas":[]
	// }]




	if (debug == false) {

		// if (trucoJogadores[trucoTurno].mao.includes(trucoCartaJogada) == true) {
			
			// Primeiro Jogador entrar


			if (trucoJogadores.length == 0) {
				trucoJogadores.push({
					"nome":ctx.update.message.from.first_name,
					"id": ctx.update.message.from.id,
					"pontos":0,
					"time" : 0,
					"mao":[],
					"truco" : "É Truco ❗❗❗",
					"donodascartas":[]
				});

				msg(`${trucoJogadores[0].nome} abriu o ♠♥♦♣ TRUCO ♠♥♦♣ e é o líder da mesa.

					A próxima pessoa à entrar vai ser seu parceiro.`, trucoJogadores[0].id);

			} else {
				// Segundo jogador
				if (trucoJogadores.length == 1 && trucoJogadores[0].id != ctx.update.message.from.id) {

					trucoJogadores.push({
						"nome":ctx.update.message.from.first_name,
						"id": ctx.update.message.from.id,
						"pontos":0,
						"time" : 0,
						"mao":[],
						"truco" : "É Truco ❗❗❗",
						"donodascartas":[]
					});

					msg(`${trucoJogadores[1].nome} acabou de entrar e é parceiro de ${trucoJogadores[0].nome}`, trucoJogadores[0].id);
					msg(`${trucoJogadores[1].nome} acabou de entrar e é parceiro de ${trucoJogadores[0].nome}`, trucoJogadores[1].id);

				} else {
					// terceiro jogador
					if (trucoJogadores.length == 2 && trucoJogadores[0].id != ctx.update.message.from.id && trucoJogadores[1].id != ctx.update.message.from.id) {

						trucoJogadores.push({
							"nome":ctx.update.message.from.first_name,
							"id": ctx.update.message.from.id,
							"pontos":0,
							"time" : 1,
							"mao":[],
							"truco" : "É Truco ❗❗❗",
							"donodascartas":[]
						});

						msg(`${trucoJogadores[2].nome} acabou de entrar e vai jogar contra ${trucoJogadores[0].nome} e ${trucoJogadores[1].nome}`, trucoJogadores[0].id);
						msg(`${trucoJogadores[2].nome} acabou de entrar e vai jogar contra ${trucoJogadores[0].nome} e ${trucoJogadores[1].nome}`, trucoJogadores[1].id);
						msg(`${trucoJogadores[2].nome} acabou de entrar e vai jogar contra ${trucoJogadores[0].nome} e ${trucoJogadores[1].nome}`, trucoJogadores[2].id);
						
					} else {
						// quarto jogador
						if (trucoJogadores.length == 3 && trucoJogadores[0].id != ctx.update.message.from.id && trucoJogadores[1].id != ctx.update.message.from.id && trucoJogadores[2].id != ctx.update.message.from.id) {

							trucoJogadores.push({
								"nome":ctx.update.message.from.first_name,
								"id": ctx.update.message.from.id,
								"pontos":0,
								"time" : 1,
								"mao":[],
								"truco" : "É Truco ❗❗❗",
								"donodascartas":[]
							});


							if (trucoLoading == false) {
								exec(ctx, trucocloading, trucoprimeiramesa, trucolimparmesa, trucoiniciativa, trucobaralho, trucoEmbaralhar, trucomanilha, trucoqueimar,trucodistribuircarta, trucomostrouteclado, trucocloadingfim);
							} else {
								msg(`Ocorreu um erro, por favor desfaçam a sala e criem novamente /trucosair`, trucoJogadores[0].id);
								msg(`Ocorreu um erro, por favor desfaçam a sala e criem novamente /trucosair`, trucoJogadores[1].id);
								msg(`Ocorreu um erro, por favor desfaçam a sala e criem novamente /trucosair`, trucoJogadores[2].id);
								msg(`Ocorreu um erro, por favor desfaçam a sala e criem novamente /trucosair`, trucoJogadores[3].id);
							}


						} else {
							// Quinto jogador

							if (trucoJogadores[0].id == ctx.update.message.from.id || trucoJogadores[1].id == ctx.update.message.from.id || trucoJogadores[2].id == ctx.update.message.from.id || trucoJogadores[3].id == ctx.update.message.from.id) {
								await ctx.reply(`Você já está na sala. Para encerrar a mesa só escrever /trucosair`);
							}
							
							if (trucoJogadores.length > 3) {

								await ctx.reply(`A mesa está cheia:
									${trucoJogadores[0].nome} e ${trucoJogadores[2].nome} (${trucoJogadores[0].pontos}) X (${trucoJogadores[1].pontos}) ${trucoJogadores[1].nome} e ${trucoJogadores[3].nome}
									`);
							}

						}
					}

				}
			}

	}








	// Debug


	if (debug == true) {

		// if (trucoJogadores[trucoTurno].mao.includes(trucoCartaJogada) == true) {
			
			// Primeiro Jogador entrar


			if (trucoJogadores.length == 0) {
				trucoJogadores.push({
					"nome":"Rick",
					"id": ctx.update.message.from.id,
					"pontos":0,
					"time" : 0,
					"mao":[],
					"truco" : "É Truco ❗❗❗",
					"donodascartas":[]
				});

				trucoJogadores.push({
						"nome":"Urgan",
						"id": ctx.update.message.from.id,
						"pontos":0,
						"time" : 0,
						"mao":[],
						"truco" : "É Truco ❗❗❗",
						"donodascartas":[]
					});

			trucoJogadores.push({
						"nome":"Ana",
						"id": ctx.update.message.from.id,
						"pontos":0,
						"time" : 1,
						"mao":[],
						"truco" : "É Truco ❗❗❗",
						"donodascartas":[]
					});

			trucoJogadores.push({
								"nome":"Lifa",
								"id": ctx.update.message.from.id,
								"pontos":0,
								"time" : 1,
								"mao":[],
								"truco" : "É Truco ❗❗❗",
								"donodascartas":[]
							});

				
			} 

		}

		if (trucoLoading == false) {
			exec(ctx, trucocloading, trucoprimeiramesa, trucolimparmesa, trucoiniciativa, trucobaralho, trucoEmbaralhar, trucomanilha, trucoqueimar,trucodistribuircarta, trucomostrouteclado, trucocloadingfim);
		} else {
			msg(`Ocorreu um erro, por favor desfaçam a sala e criem novamente /trucosair`, trucoJogadores[0].id);
			msg(`Ocorreu um erro, por favor desfaçam a sala e criem novamente /trucosair`, trucoJogadores[1].id);
			msg(`Ocorreu um erro, por favor desfaçam a sala e criem novamente /trucosair`, trucoJogadores[2].id);
			msg(`Ocorreu um erro, por favor desfaçam a sala e criem novamente /trucosair`, trucoJogadores[3].id);
		}

	// /Debug
	
})

// Ouvindo Jogadas jogadas na mesa
bot.hears(["3♣","2♣","A♣","K♣","J♣","Q♣","7♣","6♣","5♣","4♣","3♥","2♥","A♥","K♥","J♥","Q♥","7♥","6♥","5♥","4♥","3♠","2♠","A♠","K♠","J♠","Q♠","7♠","6♠","5♠","4♠","3♦","2♦","A♦","K♦","J♦","Q♦","7♦","6♦","5♦","4♦", "🔽 3♣","🔽 2♣","🔽 A♣","🔽 K♣","🔽 J♣","🔽 Q♣","🔽 7♣","🔽 6♣","🔽 5♣","🔽 4♣","🔽 3♥","🔽 2♥","🔽 A♥","🔽 K♥","🔽 J♥","🔽 Q♥","🔽 7♥","🔽 6♥","🔽 5♥","🔽 4♥","🔽 3♠","🔽 2♠","🔽 A♠","🔽 K♠","🔽 J♠","🔽 Q♠","🔽 7♠","🔽 6♠","🔽 5♠","🔽 4♠","🔽 3♦","🔽 2♦","🔽 A♦","🔽 K♦","🔽 J♦","🔽 Q♦","🔽 7♦","🔽 6♦","🔽 5♦","🔽 4♦"], async ctx => {
	
	var trucoCartaJogadaVisual = ctx.update.message.text.replace("🔽 ", "");

	if (["3♣","2♣","A♣","K♣","J♣","Q♣","7♣","6♣","5♣","4♣","3♥","2♥","A♥","K♥","J♥","Q♥","7♥","6♥","5♥","4♥","3♠","2♠","A♠","K♠","J♠","Q♠","7♠","6♠","5♠","4♠","3♦","2♦","A♦","K♦","J♦","Q♦","7♦","6♦","5♦","4♦"].includes(ctx.update.message.text)) {
		trucoCartaJogada = ctx.update.message.text;
	}

	if (["🔽 3♣","🔽 2♣","🔽 A♣","🔽 K♣","🔽 J♣","🔽 Q♣","🔽 7♣","🔽 6♣","🔽 5♣","🔽 4♣","🔽 3♥","🔽 2♥","🔽 A♥","🔽 K♥","🔽 J♥","🔽 Q♥","🔽 7♥","🔽 6♥","🔽 5♥","🔽 4♥","🔽 3♠","🔽 2♠","🔽 A♠","🔽 K♠","🔽 J♠","🔽 Q♠","🔽 7♠","🔽 6♠","🔽 5♠","🔽 4♠","🔽 3♦","🔽 2♦","🔽 A♦","🔽 K♦","🔽 J♦","🔽 Q♦","🔽 7♦","🔽 6♦","🔽 5♦","🔽 4♦"].includes(ctx.update.message.text)) {
		trucoCartaJogada = "✖️";
	}


	// trucoCartaJogada = trucoCartaJogada.replace("♥", "%E2%99%A5");
	// trucoCartaJogada = trucoCartaJogada.replace("♠", "%E2%99%A0");
	// trucoCartaJogada = trucoCartaJogada.replace("♦", "%E2%99%A6");

	// msg direta
	if (ctx.update.message.from.id == ctx.chat.id) {
		// loading
		if (trucoLoading == false) {
			// existe partida
			if (trucoComecou == true) {
				// se é o seu turno
				if (trucoTurnoId == ctx.update.message.from.id) {
					// Se ele tem a carta na mão
					if (trucoJogadores[trucoTurno].mao.includes(trucoCartaJogadaVisual) == true) {


						// Não está em truco
						if (trucoEmTruco == false) {

							



							// Definindo variável da jogada
							
							var trucoCartasNaMesaItemValor = 0;
							var trucoCartasNaMesaItemValorNome = '';

							if (trucoManilhaValor.valor0.includes(trucoCartaJogada)) {trucoCartasNaMesaItemValor = 0}
							if (trucoManilhaValor.valor1.includes(trucoCartaJogada)) {trucoCartasNaMesaItemValor = 1}
							if (trucoManilhaValor.valor2.includes(trucoCartaJogada)) {trucoCartasNaMesaItemValor = 2}
							if (trucoManilhaValor.valor3.includes(trucoCartaJogada)) {trucoCartasNaMesaItemValor = 3}
							if (trucoManilhaValor.valor4.includes(trucoCartaJogada)) {trucoCartasNaMesaItemValor = 4}
							if (trucoManilhaValor.valor5.includes(trucoCartaJogada)) {trucoCartasNaMesaItemValor = 5}
							if (trucoManilhaValor.valor6.includes(trucoCartaJogada)) {trucoCartasNaMesaItemValor = 6}
							if (trucoManilhaValor.valor7.includes(trucoCartaJogada)) {trucoCartasNaMesaItemValor = 7}
							if (trucoManilhaValor.valor8.includes(trucoCartaJogada)) {trucoCartasNaMesaItemValor = 8}
							if (trucoManilhaValor.valor9.includes(trucoCartaJogada)) {trucoCartasNaMesaItemValor = 9}
							if (trucoManilhaValor.valor10.includes(trucoCartaJogada)) {trucoCartasNaMesaItemValor = 10}
							if (trucoManilhaValor.picafumo.includes(trucoCartaJogada)) {trucoCartasNaMesaItemValor = 11; trucoCartasNaMesaItemValorNome = 'Pica-Fumo '}
							if (trucoManilhaValor.espadilha.includes(trucoCartaJogada)) {trucoCartasNaMesaItemValor = 12; trucoCartasNaMesaItemValorNome = 'Espadilha '}
							if (trucoManilhaValor.escopeta.includes(trucoCartaJogada)) {trucoCartasNaMesaItemValor = 13; trucoCartasNaMesaItemValorNome = 'Escopeta '}
							if (trucoManilhaValor.zap.includes(trucoCartaJogada)) {trucoCartasNaMesaItemValor = 14; trucoCartasNaMesaItemValorNome = 'Zap! '}


							var trucoCartasNaMesaItem = {
								"carta" : trucoCartaJogada,
								"cartajogada" : "\n[ "+trucoCartaJogada+" "+trucoCartasNaMesaItemValorNome+"] : "+trucoJogadores[trucoTurno].nome,
								"cartaprabaixo" : false,
								"dono" : ctx.update.message.from.id,
								"dononome" : ctx.update.message.from.first_name,
								"dononumero" : trucoTurno,
								"time" : trucoJogadores[trucoTurno].time,
								"valor" : trucoCartasNaMesaItemValor
							};



							trucoCartasNaMesa.push(trucoCartasNaMesaItem);

							trucoJogadores[trucoTurno].mao.splice( trucoJogadores[trucoTurno].mao.indexOf(trucoCartaJogadaVisual), 1 );

							console.log(trucoCartasNaMesa);

							var trucoCartasNaMesaVisual = [];

							for (var i = 0; i < trucoCartasNaMesa.length; i++) {
								trucoCartasNaMesaVisual.push(trucoCartasNaMesa[i].cartajogada);
							}

							trucoMensagem.push(`Cartas na Mesa:\n${trucoCartasNaMesaVisual}`)
							exec(ctx, trucocloading, trucoproximajogada, trucomensagemgeral, trucocloadingfim);

						} else {
							await ctx.reply(`Espere seu adversário decidir o truco`);
						}


					} else {
						await ctx.reply(`Você não tem essa carta na mão`);
						console.log("trucoJogadores[trucoTurno].mao   "+trucoJogadores[trucoTurno].mao);
						console.log("trucoCartaJogada   "+trucoCartaJogada)
					}
				} else {
					await ctx.reply(`Não é sua vez`);
					console.log("trucoTurnoId: "+trucoTurnoId+" - seu id: "+ctx.update.message.from.id )
				}
			} else {
				await ctx.reply(`Não existe uma jogada ativa`);
			}
		} else {
			await ctx.reply(`Servidor ocupado, tente novamente.`);
		}

	}
	
})


bot.hears(["▫◻ Continuar ◻▫"], async ctx => {

	if (trucoContinuar == true) {
		// msg direta
		if (ctx.update.message.from.id == ctx.chat.id) {

			// Se o continuar veio do turno certo
			if (ctx.update.message.from.id == trucoJogadores[trucoTurno].id) {

				// loading
				if (trucoLoading == false) {
					// existe partida
					if (trucoComecou == true) {

						exec(ctx, trucocloading, trucolimparmesa, trucobaralho, trucoEmbaralhar, trucomanilha, trucoqueimar, trucodistribuircarta, trucomostrouteclado, trucocloadingfim);
						
					} else {
						await ctx.reply(`Não existe uma jogada ativa`);
					}
				} else {
					await ctx.reply(`Servidor ocupado, tente novamente.`);
				}

			} else {
				await ctx.reply(`Não é o seu turno.`);
			}


		}

	}

})

bot.command(['continuar'], async ctx => {
	if (trucoContinuar == true) {
		// msg direta
		if (ctx.update.message.from.id == ctx.chat.id) {

			// Se o continuar veio do turno certo
			if (ctx.update.message.from.id == trucoJogadores[trucoTurno].id) {

				// loading
				if (trucoLoading == false) {
					// existe partida
					if (trucoComecou == true) {

						exec(ctx, trucocloading, trucolimparmesa, trucobaralho, trucoEmbaralhar, trucomanilha, trucoqueimar, trucodistribuircarta, trucomostrouteclado, trucocloadingfim);
						
					} else {
						await ctx.reply(`Não existe uma jogada ativa`);
					}
				} else {
					await ctx.reply(`Servidor ocupado, tente novamente.`);
				}

			} else {
				await ctx.reply(`Não é o seu turno.`);
			}


		}

	}
})



bot.hears(["É Truco ❗❗❗"], async ctx => {
	// msg direta
	if (ctx.update.message.from.id == ctx.chat.id) {

		// Se o continuar veio do turno certo
		if (ctx.update.message.from.id == trucoJogadores[trucoTurno].id) {

			// loading
			if (trucoLoading == false) {
				// existe partida
				if (trucoComecou == true) {

					if (trucoJogadores[trucoTurno].truco == "É Truco ❗❗❗") {

						trucoEmTruco = true;

						if (trucoTurno == 0 || trucoTurno == 2) {

							trucoJogadores[0].truco = "";
							trucoJogadores[2].truco = "";

							trucoJogadores[1].truco = "É SEIS ❗❗❗";
							trucoJogadores[3].truco = "É SEIS ❗❗❗";

							trucoAlvoTruco = [trucoTurno,1,3];
						}

						if (trucoTurno == 1 || trucoTurno == 3) {

							trucoJogadores[1].truco = "";
							trucoJogadores[3].truco = "";

							trucoJogadores[0].truco = "É SEIS ❗❗❗";
							trucoJogadores[2].truco = "É SEIS ❗❗❗";

							trucoAlvoTruco = [trucoTurno,0,2];
						}

						trucoMensagem.push(`${trucoJogadores[trucoAlvoTruco[0]].nome} bateu na mesa e gritou! \n ❗❗❗ É TRUCO ❗❗❗`)


						exec(ctx, trucocloading, trucomensagemgeral, trucomostroutecladotruco, trucocloadingfim);


					} else {
						await ctx.reply(`Você não pode pedir truco`);
					}


					// seis abaixo

					
					
				} else {
					await ctx.reply(`Não existe uma jogada ativa`);
				}
			} else {
				await ctx.reply(`Servidor ocupado, tente novamente.`);
			}

		} else {
			await ctx.reply(`Não é o seu turno.`);
		}
	}


})




bot.hears(["Desce! ✔"], async ctx => {
	// msg direta
	if (ctx.update.message.from.id == ctx.chat.id) {

		// Se o continuar veio do turno certo
		if (trucoEmTruco == true) {

			// loading
			if (trucoLoading == false) {
				// existe partida
				if (trucoComecou == true) {

					// Se a pessoa foi alvo
					if (ctx.update.message.from.id == trucoJogadores[trucoAlvoTruco[1]].id || ctx.update.message.from.id == trucoJogadores[trucoAlvoTruco[2]].id) {
						

						var tecladoTruco = JSON.stringify({"remove_keyboard":true})

						if(ctx.update.message.from.id == trucoJogadores[trucoAlvoTruco[1]].id) {
							axios.get(`${apiUrl}/sendMessage?chat_id=${trucoJogadores[trucoAlvoTruco[1]].id}&text=${encodeURI('Seu parceiro pediu pra descer!')}&reply_markup=${encodeURI(tecladoTruco)}`).catch(e => console.log(e))

						} else {
							axios.get(`${apiUrl}/sendMessage?chat_id=${trucoJogadores[trucoAlvoTruco[2]].id}&text=${encodeURI('Seu parceiro pediu pra descer!')}&reply_markup=${encodeURI(tecladoTruco)}`).catch(e => console.log(e))
						}
						
						if (trucoValorDaMao == 1) {
							trucoValorDaMao = 3;
						} else {
							if (trucoValorDaMao == 3) {
								trucoValorDaMao = 6;
							} else {
								if (trucoValorDaMao == 6) {
									trucoValorDaMao = 9;
								} else {
									if (trucoValorDaMao == 9) {
										trucoValorDaMao = 12;
									}
								}
							}
						}

						trucoEmTruco = false;

						trucoMensagem.push(`${ctx.update.message.from.first_name} mandou descer!`);
						exec(ctx, trucocloading, trucomensagemgeral, trucomostrouteclado, trucocloadingfim);

						
					}
					
				} else {
					await ctx.reply(`Não existe uma jogada ativa`);
				}
			} else {
				await ctx.reply(`Servidor ocupado, tente novamente.`);
			}

		} else {
			await ctx.reply(`Não é hora disso`);
		}
	}


})



bot.command(['mao'], async ctx => {
	// msg direta
	if (ctx.update.message.from.id == ctx.chat.id) {

		// Se o continuar veio do turno certo
		if (ctx.update.message.from.id == trucoJogadores[trucoTurno].id) {

			// loading
			if (trucoLoading == false) {
				// existe partida
				if (trucoComecou == true) {
					if (trucoEmTruco == false) {

						exec(ctx, trucomostrouteclado)
						
					} else {
						await ctx.reply(`Você não pode fazer isso enquanto estiver em truco`);
					}

				} else {
					await ctx.reply(`Não existe uma jogada ativa`);
				}
			} else {
				await ctx.reply(`Servidor ocupado, tente novamente.`);
			}

		} else {
			await ctx.reply(`Não é o seu turno.`);
		}


	}

})

// "Desce! ✔"],["Correr? ✖"

// Loop
bot.startPolling()