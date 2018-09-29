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

var debug = false;

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

			if(pedido.acoes[0] != undefined) {
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

	if (debug == false) {
		msg(`função novodia()`, idKiliano)
	}

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
	if (ctx.update.message.from.id == idKiliano || ctx.update.message.from.id == idBartira) {
		if (ctx.chat.id == idKiliano || ctx.chat.id == idBartira) {
			await ctx.reply(` 📅 Selecione a data do relatório 📅`,tecladoRelatorioPao);
		} else {
			await ctx.reply(`Só envio os relatórios inbox 🙂 Me manda uma direct.`);
		}
	} else {

	}
})

// Testes

bot.command(['teste'], async ctx => {
	await ctx.reply("Testado");
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

var trucoQueimar = [];
var trucoManilha = '';

var trucoTurno = 0;
var trucoTurnoId = 123;
var trucoCartasNaMesa = [];

var trucoCartaJogada = "";
var trucoCartaJogadaReplace = "";

var trucoValor = {
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
    "valor0": ["✖️"],
}




const trucozerar = (ctx, next) => {
	trucoJogadores = [];
	trucoBaralhoTipo = 'sujo';
	trucoBaralho =[];
	trucoComecou = false;
	trucoPrimeiroRound = true;
	trucoValorDaMao = 1;

	trucoQueimar = [];
	trucoManilha = '';

	trucoTurno = 0;
	trucoTurnoId = 123;
	trucoCartasNaMesa = [];

	trucoValor = {
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
	    "valor0": ["✖️"],
	}


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

	trucoValor = {
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
	    "valor0": ["✖️"],
	}


	// axios.get(`${apiUrl}/sendMessage?chat_id=${idKiliano}&text=${encodeURI(trucoBaralho)}`).catch(e => console.log(e))
	next();
}

const trucomanilha = (ctx, next) => {

	console.log("trucomanilha");

	trucoManilha = trucoBaralho[0];
	trucoBaralho.splice(0, 1)

	console.log("Descarte manilha: "+trucoManilha);

	console.log("Valores "+JSON.stringify(trucoValor));

	console.log("----------------");

	console.log("----------------");

	if(trucoValor.valor1.includes(trucoManilha)){
		trucoValor.zap = "5♣";
		trucoValor.escopeta = "5♥";
		trucoValor.espadilha = "5♠";
		trucoValor.picafumo = "5♦";
	}


	if(trucoValor.valor2.includes(trucoManilha)){
		trucoValor.zap = "6♣";
		trucoValor.escopeta = "6♥";
		trucoValor.espadilha = "6♠";
		trucoValor.picafumo = "6♦";
	}

	if(trucoValor.valor3.includes(trucoManilha)){
		trucoValor.zap = "7♣";
		trucoValor.escopeta = "7♥";
		trucoValor.espadilha = "7♠";
		trucoValor.picafumo = "7♦";
	}

	if(trucoValor.valor4.includes(trucoManilha)){
		trucoValor.zap = "Q♣";
		trucoValor.escopeta = "Q♥";
		trucoValor.espadilha = "Q♠";
		trucoValor.picafumo = "Q♦";
	}

	if(trucoValor.valor5.includes(trucoManilha)){
		trucoValor.zap = "J♣";
		trucoValor.escopeta = "J♥";
		trucoValor.espadilha = "J♠";
		trucoValor.picafumo = "J♦";
	}

	if(trucoValor.valor6.includes(trucoManilha)){
		trucoValor.zap = "K♣";
		trucoValor.escopeta = "K♥";
		trucoValor.espadilha = "K♠";
		trucoValor.picafumo = "K♦";
	}

	if(trucoValor.valor7.includes(trucoManilha)){
		trucoValor.zap = "A♣";
		trucoValor.escopeta = "A♥";
		trucoValor.espadilha = "A♠";
		trucoValor.picafumo = "A♦";
	}

	if(trucoValor.valor8.includes(trucoManilha)){
		trucoValor.zap = "2♣";
		trucoValor.escopeta = "2♥";
		trucoValor.espadilha = "2♠";
		trucoValor.picafumo = "2♦";
	}

	if(trucoValor.valor9.includes(trucoManilha)){
		trucoValor.zap = "3♣";
		trucoValor.escopeta = "3♥";
		trucoValor.espadilha = "3♠";
		trucoValor.picafumo = "3♦";
	}

	if(trucoValor.valor10.includes(trucoManilha)){
		trucoValor.zap = "4♣";
		trucoValor.escopeta = "4♥";
		trucoValor.espadilha = "4♠";
		trucoValor.picafumo = "4♦";
	}



	trucoValor.valor10.splice( trucoValor.valor10.indexOf(trucoValor.zap), 1 );
	trucoValor.valor9.splice( trucoValor.valor9.indexOf(trucoValor.zap), 1 );
	trucoValor.valor8.splice( trucoValor.valor8.indexOf(trucoValor.zap), 1 );
	trucoValor.valor7.splice( trucoValor.valor7.indexOf(trucoValor.zap), 1 );
	trucoValor.valor6.splice( trucoValor.valor6.indexOf(trucoValor.zap), 1 );
	trucoValor.valor5.splice( trucoValor.valor5.indexOf(trucoValor.zap), 1 );
	trucoValor.valor4.splice( trucoValor.valor4.indexOf(trucoValor.zap), 1 );
	trucoValor.valor3.splice( trucoValor.valor3.indexOf(trucoValor.zap), 1 );
	trucoValor.valor2.splice( trucoValor.valor2.indexOf(trucoValor.zap), 1 );
	trucoValor.valor1.splice( trucoValor.valor1.indexOf(trucoValor.zap), 1 );

	// trucoValor.valor10.splice( trucoValor.valor10.indexOf(trucoValor.escopeta), 1 );
	// trucoValor.valor9.splice( trucoValor.valor9.indexOf(trucoValor.escopeta), 1 );
	// trucoValor.valor8.splice( trucoValor.valor8.indexOf(trucoValor.escopeta), 1 );
	// trucoValor.valor7.splice( trucoValor.valor7.indexOf(trucoValor.escopeta), 1 );
	// trucoValor.valor6.splice( trucoValor.valor6.indexOf(trucoValor.escopeta), 1 );
	// trucoValor.valor5.splice( trucoValor.valor5.indexOf(trucoValor.escopeta), 1 );
	// trucoValor.valor4.splice( trucoValor.valor4.indexOf(trucoValor.escopeta), 1 );
	// trucoValor.valor3.splice( trucoValor.valor3.indexOf(trucoValor.escopeta), 1 );
	// trucoValor.valor2.splice( trucoValor.valor2.indexOf(trucoValor.escopeta), 1 );
	// trucoValor.valor1.splice( trucoValor.valor1.indexOf(trucoValor.escopeta), 1 );

	// trucoValor.valor10.splice( trucoValor.valor10.indexOf(trucoValor.espadilha), 1 );
	// trucoValor.valor9.splice( trucoValor.valor9.indexOf(trucoValor.espadilha), 1 );
	// trucoValor.valor8.splice( trucoValor.valor8.indexOf(trucoValor.espadilha), 1 );
	// trucoValor.valor7.splice( trucoValor.valor7.indexOf(trucoValor.espadilha), 1 );
	// trucoValor.valor6.splice( trucoValor.valor6.indexOf(trucoValor.espadilha), 1 );
	// trucoValor.valor5.splice( trucoValor.valor5.indexOf(trucoValor.espadilha), 1 );
	// trucoValor.valor4.splice( trucoValor.valor4.indexOf(trucoValor.espadilha), 1 );
	// trucoValor.valor3.splice( trucoValor.valor3.indexOf(trucoValor.espadilha), 1 );
	// trucoValor.valor2.splice( trucoValor.valor2.indexOf(trucoValor.espadilha), 1 );
	// trucoValor.valor1.splice( trucoValor.valor1.indexOf(trucoValor.espadilha), 1 );

	// trucoValor.valor10.splice( trucoValor.valor10.indexOf(trucoValor.picafumo), 1 );
	// trucoValor.valor9.splice( trucoValor.valor9.indexOf(trucoValor.picafumo), 1 );
	// trucoValor.valor8.splice( trucoValor.valor8.indexOf(trucoValor.picafumo), 1 );
	// trucoValor.valor7.splice( trucoValor.valor7.indexOf(trucoValor.picafumo), 1 );
	// trucoValor.valor6.splice( trucoValor.valor6.indexOf(trucoValor.picafumo), 1 );
	// trucoValor.valor5.splice( trucoValor.valor5.indexOf(trucoValor.picafumo), 1 );
	// trucoValor.valor4.splice( trucoValor.valor4.indexOf(trucoValor.picafumo), 1 );
	// trucoValor.valor3.splice( trucoValor.valor3.indexOf(trucoValor.picafumo), 1 );
	// trucoValor.valor2.splice( trucoValor.valor2.indexOf(trucoValor.picafumo), 1 );
	// trucoValor.valor1.splice( trucoValor.valor1.indexOf(trucoValor.picafumo), 1 );


	console.log("Valores "+JSON.stringify(trucoValor));

	// includes

	/*
	trucoValor = {
		"zap": "x♣",
		"escopeta": "x♥",
		"espadilha": "x♠",
		"picafumo": "x♦",
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
	    "valor0": ["✖️"],
	}
	*/

	for (var i = 0; i < trucoJogadores[trucoTurno].mao.length; i++) {
		if (trucoCartaJogadaReplace == trucoJogadores[trucoTurno].mao[i]) {
			trucoJogadores[trucoTurno].mao.splice(i, 1)
		}
	}


	next();
}



const trucoqueimar = (ctx, next) => {

	console.log("trucoqueimar");


	next();
}

const trucoiniciativa = (ctx, next) => {

	console.log("trucoiniciativa");

	if(trucoPrimeiroRound == true) {
		trucoTurno = Math.floor(4*Math.random());
		trucoTurnoId = trucoJogadores[trucoTurno].id;
		console.log(trucoTurno);
		trucoPrimeiroRound = false;
	}

	trucoCartasNaMesa = [];
	next();
}

const trucodistribuircarta = (ctx, next) => {

	console.log("trucodistribuircarta");


	for(var i = 0; i < trucoJogadores.length; i++){

		// zerar mão
		trucoJogadores[i].mao = [];

		// distribuir 3 cartas

		for(var ic = 0; ic < 3; ic++) {
			trucoJogadores[i].mao.push(trucoBaralho[0]);
			trucoBaralho.splice(0, 1)
		}

		msg(`${trucoJogadores[0].nome} e ${trucoJogadores[2].nome} (${trucoJogadores[0].pontos}) X (${trucoJogadores[1].pontos}) ${trucoJogadores[1].nome} e ${trucoJogadores[3].nome}

			A carta de manilha queimada foi [ ${trucoManilha} ]

			${trucoJogadores[i].nome}: Você recebeu sua mão:
			[ ${trucoJogadores[i].mao[0]} ] [ ${trucoJogadores[i].mao[1]} ] [ ${trucoJogadores[i].mao[2]} ]

			Agora é a vez de ${trucoJogadores[trucoTurno].nome}

			`,trucoJogadores[i].id);
	}


	next();
}


const trucomostrouteclado = (ctx, next) => {

	console.log("trucomostrouteclado");

	var trucoMaoReplace = trucoJogadores[trucoTurno].mao;
	for (var i = 0; i < trucoMaoReplace.length; i++) {
		trucoMaoReplace[i] = trucoMaoReplace[i].replace("♣", "%E2%99%A3");
		trucoMaoReplace[i] = trucoMaoReplace[i].replace("♥", "%E2%99%A5");
		trucoMaoReplace[i] = trucoMaoReplace[i].replace("♠", "%E2%99%A0");
		trucoMaoReplace[i] = trucoMaoReplace[i].replace("♦", "%E2%99%A6");
	}


	var tecladoTruco = JSON.stringify({"keyboard":[trucoMaoReplace,["TRUCO!!!"]],"resize_keyboard":true, "one_time_keyboard":true})

	axios.get(`${apiUrl}/sendMessage?chat_id=${trucoJogadores[trucoTurno].id}&text=${encodeURI('Jogada:')}&reply_markup=${tecladoTruco}`)
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
		console.log(trucoCartasNaMesa);
	} else {
		// jogo completo
		exec(ctx, trucocalcularvitoriamao);
	}


	next();
}

const trucocalcularvitoriamao = (ctx, next) => {

	

	next();
}


bot.command(['truco'], async ctx => {
	if (trucoLoading == false) {
		exec(ctx, trucocloading, trucoiniciativa, trucobaralho, trucoEmbaralhar, trucomanilha, trucoqueimar,trucodistribuircarta, trucomostrouteclado, trucocloadingfim);
	} else {
		await ctx.reply(`Servidor ocupado, tente novamente.`);
	}
	
})

// Ouvindo Jogadas jogadas na mesa
bot.hears(["3♣","2♣","A♣","K♣","J♣","Q♣","7♣","6♣","5♣","4♣","3♥","2♥","A♥","K♥","J♥","Q♥","7♥","6♥","5♥","4♥","3♠","2♠","A♠","K♠","J♠","Q♠","7♠","6♠","5♠","4♠","3♦","2♦","A♦","K♦","J♦","Q♦","7♦","6♦","5♦","4♦"], async ctx => {
	
	trucoCartaJogada = ctx.update.message.text;
	trucoCartaJogadaReplace = trucoCartaJogada;
	trucoCartaJogadaReplace = trucoCartaJogadaReplace.replace("♣", "%E2%99%A3");
	trucoCartaJogadaReplace = trucoCartaJogadaReplace.replace("♥", "%E2%99%A5");
	trucoCartaJogadaReplace = trucoCartaJogadaReplace.replace("♠", "%E2%99%A0");
	trucoCartaJogadaReplace = trucoCartaJogadaReplace.replace("♦", "%E2%99%A6");

	// msg direta
	if (ctx.update.message.from.id == ctx.chat.id) {
		// loading
		if (trucoLoading == false) {
			// existe partida
			if (trucoComecou == true) {
				// se é o seu turno
				if (trucoTurnoId == ctx.update.message.from.id) {
					// Se ele tem a carta na mão
					if (trucoJogadores[trucoTurno].mao.includes(trucoCartaJogadaReplace) == true) {

						trucoCartasNaMesa.push("\n[ "+trucoCartaJogada+" ] : "+trucoJogadores[trucoTurno].nome);

						console.log(trucoJogadores[trucoTurno].mao);

						trucoJogadores[trucoTurno].mao.splice( trucoJogadores[trucoTurno].mao.indexOf(trucoCartaJogadaReplace), 1 );

						console.log(trucoJogadores[trucoTurno].mao);

						for (var i = 0; i < trucoJogadores.length; i++) {
							msg(`Cartas na Mesa:
								${trucoCartasNaMesa}
								`,trucoJogadores[i].id);
						}

						exec(ctx, trucocloading, trucoproximajogada, trucocloadingfim);

					} else {
						await ctx.reply(`Você não tem essa carta na mão`);
						console.log("trucoJogadores[trucoTurno].mao   "+trucoJogadores[trucoTurno].mao);
						console.log("trucoCartaJogadaReplace   "+trucoCartaJogadaReplace)
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













// DEBUG





const trucodebug = (ctx, next) => {

	trucoJogadores = [
	{
		"nome":"Kiliano",
		"id": idKiliano,
		"pontos":0,
		"mao":[],
		"donodascartas":[]
	},

	{
		"nome":"Geovana",
		"id": idKiliano,
		"pontos":0,
		"mao":[],
		"donodascartas":[]
	},

	{
		"nome":"Mimi",
		"id": idKiliano,
		"pontos":0,
		"mao":[],
		"donodascartas":[]
	},

	{
		"nome":"Tavinho",
		"id": idKiliano,
		"pontos":0,
		"mao":[],
		"donodascartas":[]
	}
	]
	next();
}



exec(ctx, trucodebug, trucocomecar);
// Loop
bot.startPolling()