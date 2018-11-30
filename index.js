
/*

---- Checklist ----
Fazer bot falar sobre feriados, datas comemorativas (proprio aniversário e etc)

*/


'use strict'

var http = require('http');
const Telegraf = require('telegraf');
const Telegram = require('telegraf/telegram');
const Markup = require('telegraf/markup');
const Extra = require('telegraf/extra');
const axios = require('axios');
var wordpress = require( "wordpress" );
// http://itlc.comp.dkit.ie/tutorials/nodejs/create-wordpress-post-node-js/
// https://www.npmjs.com/package/wordpress

var schedule = require('node-schedule');
// https://www.npmjs.com/package/node-schedule




var datacompleta;
var datasemana;
var datahora;
var datadia;
var datames;
var dataano;
var datadata;
var dataai;

var debug = false;

var acordado = true;

var fimdodia = false;
var tiopassou = false;

var conteudocarregado = false;
var relatorioTempo = [];

// Clima

var clima = {};
var climaicon = "";
var fuso = 2;
// horario de verão = 2; normal =3

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
	// const env = require('./.env');
	// const bot = new Telegraf(env.token);
	// const telegram = new Telegram(env.token);

	// const apiUrl = env.apiUrl;
	// const apiFileUrl = env.apiFileUrl;

	// const idKiliano = env.idKiliano;
	// const idBartira = env.idBartira;
	// const idRodrigo = env.idRodrigo;
	// const idIsabel = env.idIsabel;
	// const idChatDegrau = env.idChatDegrau;
	// const idChatFronts = env.idChatFronts;
	// const apiTinypng = env.apiTinypng;
	

	// const idTodos = env.idTodos;


	// const apiClimatempo = env.apiClimatempo;

	// const wordpressPass = env.wordpressPass;

	// fuso = 0;


// Chamadas para o Heroku

	var port = (process.env.PORT || 5000)

	http.createServer(function(request, response) {
		response.writeHead(200,{'Content-Type': 'application/json'});
		response.write(JSON.stringify({name: 'Acorda Horacio', ver: '1.0'}));
		response.end();
	}).listen(port)

	const token = process.env.token

	const idKiliano = process.env.idKiliano
	const idBartira = process.env.idBartira
	const idRodrigo = process.env.idRodrigo;
	const idIsabel = process.env.idIsabel;
	const idChatDegrau = process.env.idChatDegrau
	const idChatFronts = process.env.idChatFronts
	const wordpressPass = process.env.wordpressPass;

	const apiTinypng = process.env.apiTinypng;

	const idTodos = process.env.idTodos

	const apiUrl = `https://api.telegram.org/bot${token}`
	const apiFileUrl = `https://api.telegram.org/file/bot${token}`

	const apiClimatempo = process.env.apiClimatempo

	const bot = new Telegraf(token)
	const telegram = new Telegram(token);
	fuso = 2;




// Código

let random = Math.floor((Math.random() * 23) + 1)
let ultimorandom = random
var trocasvalidas = [];
var indisponiveltxt = [];

var conteudo = {};
var conteudoprimeiro = {};

var pedidosanalisados = [];
var pedidosanalisadosunicos =[];

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

var paopreco = {
	"paofrances":0.5,
	"paodemilho":0.5,
	"rosquinha":1,
	"rosquinharecheio":1.5,
	"croissantpresunto":3,
	"croissantfrango":3,
	"bisnaga":0.5,
	"bisnagaacucar":0.5,
	"bisnagacreme":0.5
};


// Login WP
var wp = wordpress.createClient({
    url: "http://horacio.kiliano.com.br",
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

var pedidolista = [];
var pedidolistasubstituto = [];
// Variáveis do pedido

// mensagem
const msg = (msg, id) => {
	axios.get(`${apiUrl}/sendMessage?chat_id=${id}&text=${encodeURI(msg)}`)
		.catch(e => console.log(e))
}


// CPF

// CPF E CNPJ

// ****************************************
// Script Gerador de CPF e CNPJ VÃ¡lidos
// Autor: Marcos Guiga
// Site : Worldigital.co.cc
// Email: marcosguiga@hotmail.com
// Data:  19/12/2010
// ****************************************
// FunÃ§Ã£o para gerar nÃºmeros randÃ´micos

const gera_random = (n) =>{
    var ranNum = Math.round(Math.random()*n);
    return ranNum;
}

// FunÃ§Ã£o para retornar o resto da divisao entre nÃºmeros (mod)
const mod = (dividendo,divisor) => {
          return Math.round(dividendo - (Math.floor(dividendo/divisor)*divisor));
}

// FunÃ§Ã£o que gera nÃºmeros de CPF vÃ¡lidos
const cpf = () => {
          var n = 9;
          var n1 = gera_random(n);
           var n2 = gera_random(n);
           var n3 = gera_random(n);
           var n4 = gera_random(n);
           var n5 = gera_random(n);
           var n6 = gera_random(n);
           var n7 = gera_random(n);
           var n8 = gera_random(n);
           var n9 = gera_random(n);
           var d1 = n9*2+n8*3+n7*4+n6*5+n5*6+n4*7+n3*8+n2*9+n1*10;
           d1 = 11 - ( mod(d1,11) );
           if (d1>=10) d1 = 0;
           var d2 = d1*2+n9*3+n8*4+n7*5+n6*6+n5*7+n4*8+n3*9+n2*10+n1*11;
           d2 = 11 - ( mod(d2,11) );
           if (d2>=10) d2 = 0;
           return ''+n1+n2+n3+'.'+n4+n5+n6+'.'+n7+n8+n9+'-'+d1+d2;
}

const cnpj = () => {
          var n = 9;
          var n1  = gera_random(n);
           var n2  = gera_random(n);
           var n3  = gera_random(n);
           var n4  = gera_random(n);
           var n5  = gera_random(n);
           var n6  = gera_random(n);
           var n7  = gera_random(n);
           var n8  = gera_random(n);
           var n9  = 0;//gera_random(n);
           var n10 = 0;//gera_random(n);
           var n11 = 0;//gera_random(n);
           var n12 = 1;//gera_random(n);
          var d1 = n12*2+n11*3+n10*4+n9*5+n8*6+n7*7+n6*8+n5*9+n4*2+n3*3+n2*4+n1*5;
           d1 = 11 - ( mod(d1,11) );
           if (d1>=10) d1 = 0;
           var d2 = d1*2+n12*3+n11*4+n10*5+n9*6+n8*7+n7*8+n6*9+n5*2+n4*3+n3*4+n2*5+n1*6;
           d2 = 11 - ( mod(d2,11) );
           if (d2>=10) d2 = 0;
           return ''+n1+n2+'.'+n3+n4+n5+'.'+n6+n7+n8+'/'+n9+n10+n11+n12+'-'+d1+d2;
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
	    next()
	});
}


// Montando lista de pedidos
const listar = () => {
	// Reset

	trocasvalidas = [];
	pedido.lista =[]
	pedidolista = [];
	pedidolistasubstituto = [];


//  -------- Gerando lista VISUAL ----------


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


	// Apagando itens Indisponíveis

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


	if (pedido.paofrances == 1) {
		pedidolista.push(' \n '+pedido.paofrances+' Pão Francês')
	}

	if (pedido.paofrances > 1) {
		pedidolista.push(' \n '+pedido.paofrances+' Pães Franceses')
	}

	if (pedido.paodemilho == 1) {
		pedidolista.push(' \n '+pedido.paodemilho+' Pão de Milho')
	}

	if (pedido.paodemilho > 1) {
		pedidolista.push(' \n '+pedido.paodemilho+' Pães de Milho')
	}

	if (pedido.rosquinha == 1) {
		pedidolista.push(' \n '+pedido.rosquinha+' Rosquinha Comum')
	}

	if (pedido.rosquinha > 1) {
		pedidolista.push(' \n '+pedido.rosquinha+' Rosquinhas Comuns')
	}

	if (pedido.rosquinharecheio == 1) {
		pedidolista.push(' \n '+pedido.rosquinharecheio+' Rosquinha com Recheio')
	}

	if (pedido.rosquinharecheio > 1) {
		pedidolista.push(' \n '+pedido.rosquinharecheio+' Rosquinhas com Recheio')
	}

	if (pedido.croissantpresunto == 1) {
		pedidolista.push(' \n '+pedido.croissantpresunto+' Croissant de Presunto')
	}

	if (pedido.croissantpresunto > 1) {
		pedidolista.push(' \n '+pedido.croissantpresunto+' Croissants de Presunto')
	}

	if (pedido.croissantfrango == 1) {
		pedidolista.push(' \n '+pedido.croissantfrango+' Croissant de Frango')
	}

	if (pedido.croissantfrango > 1) {
		pedidolista.push(' \n '+pedido.croissantfrango+' Croissants de Frango')
	}

	if (pedido.bisnaga == 1) {
		pedidolista.push(' \n '+pedido.bisnaga+' Bisnaga Comum')
	}

	if (pedido.bisnaga > 1) {
		pedidolista.push(' \n '+pedido.bisnaga+' Bisnagas Comuns')
	}

	if (pedido.bisnagaacucar == 1) {
		pedidolista.push(' \n '+pedido.bisnagaacucar+' Bisnaga com Açúcar')
	}

	if (pedido.bisnagaacucar > 1) {
		pedidolista.push(' \n '+pedido.bisnagaacucar+' Bisnagas com Açúcar')
	}

	if (pedido.bisnagacreme == 1) {
		pedidolista.push(' \n '+pedido.bisnagacreme+' Bisnaga com Creme')
	}

	if (pedido.bisnagacreme > 1) {
		pedidolista.push(' \n '+pedido.bisnagacreme+' Bisnagas com Creme')
	}




//  --------Gerando lista de produtos substituidos ---------

	if (trocasvalidas.length > 0 ) {

		pedido.paofrances = 0
		pedido.paodemilho = 0
		pedido.rosquinha = 0
		pedido.rosquinharecheio = 0
		pedido.croissantpresunto = 0
		pedido.croissantfrango = 0
		pedido.bisnaga = 0
		pedido.bisnagaacucar = 0
		pedido.bisnagacreme = 0


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


		if (pedido.paofrances == 1) {
			pedidolistasubstituto.push(' \n '+pedido.paofrances+' Pão Francês')
		}

		if (pedido.paofrances > 1) {
			pedidolistasubstituto.push(' \n '+pedido.paofrances+' Pães Franceses')
		}

		if (pedido.paodemilho == 1) {
			pedidolistasubstituto.push(' \n '+pedido.paodemilho+' Pão de Milho')
		}

		if (pedido.paodemilho > 1) {
			pedidolistasubstituto.push(' \n '+pedido.paodemilho+' Pães de Milho')
		}

		if (pedido.rosquinha == 1) {
			pedidolistasubstituto.push(' \n '+pedido.rosquinha+' Rosquinha Comum')
		}

		if (pedido.rosquinha > 1) {
			pedidolistasubstituto.push(' \n '+pedido.rosquinha+' Rosquinhas Comuns')
		}

		if (pedido.rosquinharecheio == 1) {
			pedidolistasubstituto.push(' \n '+pedido.rosquinharecheio+' Rosquinha com Recheio')
		}

		if (pedido.rosquinharecheio > 1) {
			pedidolistasubstituto.push(' \n '+pedido.rosquinharecheio+' Rosquinhas com Recheio')
		}

		if (pedido.croissantpresunto == 1) {
			pedidolistasubstituto.push(' \n '+pedido.croissantpresunto+' Croissant de Presunto')
		}

		if (pedido.croissantpresunto > 1) {
			pedidolistasubstituto.push(' \n '+pedido.croissantpresunto+' Croissants de Presunto')
		}

		if (pedido.croissantfrango == 1) {
			pedidolistasubstituto.push(' \n '+pedido.croissantfrango+' Croissant de Frango')
		}

		if (pedido.croissantfrango > 1) {
			pedidolistasubstituto.push(' \n '+pedido.croissantfrango+' Croissants de Frango')
		}

		if (pedido.bisnaga == 1) {
			pedidolistasubstituto.push(' \n '+pedido.bisnaga+' Bisnaga Comum')
		}

		if (pedido.bisnaga > 1) {
			pedidolistasubstituto.push(' \n '+pedido.bisnaga+' Bisnagas Comuns')
		}

		if (pedido.bisnagaacucar == 1) {
			pedidolistasubstituto.push(' \n '+pedido.bisnagaacucar+' Bisnaga com Açúcar')
		}

		if (pedido.bisnagaacucar > 1) {
			pedidolistasubstituto.push(' \n '+pedido.bisnagaacucar+' Bisnagas com Açúcar')
		}

		if (pedido.bisnagacreme == 1) {
			pedidolistasubstituto.push(' \n '+pedido.bisnagacreme+' Bisnaga com Creme')
		}

		if (pedido.bisnagacreme > 1) {
			pedidolistasubstituto.push(' \n '+pedido.bisnagacreme+' Bisnagas com Creme')
		}


	}











	// ------ Gerando lista RELEVANTE para o sistema ---------


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



	// Se não tiver algo, gerar substiuições

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
	datasemana = datacompleta.getDay();
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
			var conteudoindisponiveis = [];


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

						if (conteudoprimeiro.customFields[i].key == "indisponibilidade") {
							conteudoindisponiveis = conteudoprimeiro.customFields[i].value;
						}
					}



					if (conteudodia == pedido.dia_data && conteudomes == pedido.mes_data) {
						console.log("Já existe um post nessa data. Verificando se o post está atualizado...");

						if (conteudoacoes == JSON.stringify(pedido.acoes) && conteudoindisponiveis == JSON.stringify(pedido.indisponibilidade)) {
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
	        console.log( "Post enviado"+arguments );
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
	
	wp.deletePost(conteudoprimeiro.id,function( error, data ) {
		console.log("deletando post de id "+conteudoprimeiro.id+" Arguments:"+arguments)
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

	tiopassou = false;

	pedidolista = [];
	pedidolistasubstituto = [];
	pedidosanalisadosunicos = [];

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
				pedidosanalisadossoma.lista.push("📄 RELATÓRIO MENSAL 📄 ("+pedidosanalisados.length+" pedidos cadastrados) \n\n🗓 Pedidos de "+relatorioTempo[1]+"/"+relatorioTempo[2]);
			}

			if (relatorioTempo[0] == 2) {
				pedidosanalisadossoma.lista.push("📄 RELATÓRIO ANUAL 📄 ("+pedidosanalisados.length+" pedidos cadastrados) \n\n🗓 Pedidos de "+relatorioTempo[2]);
			}

			pedidosanalisadossoma.lista.push("\n\n💵 Valor total: R$ "+((Math.floor(((pedidosanalisadossoma.paofrances*paopreco.paofrances)+(pedidosanalisadossoma.paodemilho*paopreco.paodemilho)+(pedidosanalisadossoma.rosquinha*paopreco.rosquinha)+(pedidosanalisadossoma.rosquinharecheio*paopreco.rosquinharecheio)+(pedidosanalisadossoma.croissantpresunto*paopreco.croissantpresunto)+(pedidosanalisadossoma.croissantfrango*paopreco.croissantfrango)+(pedidosanalisadossoma.bisnaga*paopreco.bisnaga)+(pedidosanalisadossoma.bisnagaacucar*paopreco.bisnagaacucar)+(pedidosanalisadossoma.bisnagacreme*paopreco.bisnagacreme))*100)/100).toFixed(2)));

			if (pedidosanalisadossoma.paofrances > 0) {
				pedidosanalisadossoma.lista.push("\n\n Pão Francês ("+pedidosanalisadossoma.paofrances+")");
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




const relatoriopaodetalhado = (ctx, next) => {

	if (conteudo.length > 0) {

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
		pedidosanalisadosunicos = [];

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

		for (var ip = 0; ip < pedidosanalisados.length; ip++) {

			var pedidosanalisadounicolista = [];


			pedidosanalisadossoma.paofrances += pedidosanalisados[ip].paofrances;
			pedidosanalisadossoma.paodemilho += pedidosanalisados[ip].paodemilho;
			pedidosanalisadossoma.rosquinha += pedidosanalisados[ip].rosquinha;
			pedidosanalisadossoma.rosquinharecheio += pedidosanalisados[ip].rosquinharecheio;
			pedidosanalisadossoma.croissantpresunto += pedidosanalisados[ip].croissantpresunto;
			pedidosanalisadossoma.croissantfrango += pedidosanalisados[ip].croissantfrango;
			pedidosanalisadossoma.bisnaga += pedidosanalisados[ip].bisnaga;
			pedidosanalisadossoma.bisnagaacucar += pedidosanalisados[ip].bisnagaacucar;
			pedidosanalisadossoma.bisnagacreme += pedidosanalisados[ip].bisnagacreme;


			if (pedidosanalisados[ip].paofrances == 1) {
				pedidosanalisadounicolista.push(' '+pedidosanalisados[ip].paofrances+' Pão Francês')
			}

			if (pedidosanalisados[ip].paofrances > 1) {
				pedidosanalisadounicolista.push(' '+pedidosanalisados[ip].paofrances+' Pães Franceses')
			}

			if (pedidosanalisados[ip].paodemilho == 1) {
				pedidosanalisadounicolista.push(' '+pedidosanalisados[ip].paodemilho+' Pão de Milho')
			}

			if (pedidosanalisados[ip].paodemilho > 1) {
				pedidosanalisadounicolista.push(' '+pedidosanalisados[ip].paodemilho+' Pães de Milho')
			}

			if (pedidosanalisados[ip].rosquinha == 1) {
				pedidosanalisadounicolista.push(' '+pedidosanalisados[ip].rosquinha+' Rosquinha Comum')
			}

			if (pedidosanalisados[ip].rosquinha > 1) {
				pedidosanalisadounicolista.push(' '+pedidosanalisados[ip].rosquinha+' Rosquinhas Comuns')
			}

			if (pedidosanalisados[ip].rosquinharecheio == 1) {
				pedidosanalisadounicolista.push(' '+pedidosanalisados[ip].rosquinharecheio+' Rosquinha com Recheio')
			}

			if (pedidosanalisados[ip].rosquinharecheio > 1) {
				pedidosanalisadounicolista.push(' '+pedidosanalisados[ip].rosquinharecheio+' Rosquinhas com Recheio')
			}

			if (pedidosanalisados[ip].croissantpresunto == 1) {
				pedidosanalisadounicolista.push(' '+pedidosanalisados[ip].croissantpresunto+' Croissant de Presunto')
			}

			if (pedidosanalisados[ip].croissantpresunto > 1) {
				pedidosanalisadounicolista.push(' '+pedidosanalisados[ip].croissantpresunto+' Croissants de Presunto')
			}

			if (pedidosanalisados[ip].croissantfrango == 1) {
				pedidosanalisadounicolista.push(' '+pedidosanalisados[ip].croissantfrango+' Croissant de Frango')
			}

			if (pedidosanalisados[ip].croissantfrango > 1) {
				pedidosanalisadounicolista.push(' '+pedidosanalisados[ip].croissantfrango+' Croissants de Frango')
			}

			if (pedidosanalisados[ip].bisnaga == 1) {
				pedidosanalisadounicolista.push(' '+pedidosanalisados[ip].bisnaga+' Bisnaga Comum')
			}

			if (pedidosanalisados[ip].bisnaga > 1) {
				pedidosanalisadounicolista.push(' '+pedidosanalisados[ip].bisnaga+' Bisnagas Comuns')
			}

			if (pedidosanalisados[ip].bisnagaacucar == 1) {
				pedidosanalisadounicolista.push(' '+pedidosanalisados[ip].bisnagaacucar+' Bisnaga com Açúcar')
			}

			if (pedidosanalisados[ip].bisnagaacucar > 1) {
				pedidosanalisadounicolista.push(' '+pedidosanalisados[ip].bisnagaacucar+' Bisnagas com Açúcar')
			}

			if (pedidosanalisados[ip].bisnagacreme == 1) {
				pedidosanalisadounicolista.push(' '+pedidosanalisados[ip].bisnagacreme+' Bisnaga com Creme')
			}

			if (pedidosanalisados[ip].bisnagacreme > 1) {
				pedidosanalisadounicolista.push(' '+pedidosanalisados[ip].bisnagacreme+' Bisnagas com Creme')
			}

			pedidosanalisadosunicos.push(`\n\n ${pedidosanalisados[ip].dia_data}/${pedidosanalisados[ip].mes_data} - R$ `+(Math.floor(((pedidosanalisados[ip].paofrances*paopreco.paofrances)+(pedidosanalisados[ip].paodemilho*paopreco.paodemilho)+(pedidosanalisados[ip].rosquinha*paopreco.rosquinha)+(pedidosanalisados[ip].rosquinharecheio*paopreco.rosquinharecheio)+(pedidosanalisados[ip].croissantpresunto*paopreco.croissantpresunto)+(pedidosanalisados[ip].croissantfrango*paopreco.croissantfrango)+(pedidosanalisados[ip].bisnaga*paopreco.bisnaga)+(pedidosanalisados[ip].bisnagaacucar*paopreco.bisnagaacucar)+(pedidosanalisados[ip].bisnagacreme*paopreco.bisnagacreme))*100)/100).toFixed(2)+`\n ${pedidosanalisadounicolista}`);

			// var pedidoanalisado = {
			// 	"dia_data": 0,
			// 	"mes_data": 0,
			// 	"ano_data": 0,
			// 	"acoes": [],
			// 	"indisponibilidade": [],
			// 	"lista": [],
			// 	"paofrances":0,
			// 	"paodemilho":0,
			// 	"rosquinha":0,
			// 	"rosquinharecheio":0,
			// 	"croissantpresunto":0,
			// 	"croissantfrango":0,
			// 	"bisnaga":0,
			// 	"bisnagaacucar":0,
			// 	"bisnagacreme":0
			// };
		}

		if (pedidosanalisados.length > 0) {
			if (relatorioTempo[0] == 1) {
				pedidosanalisadossoma.lista.push("📄 RELATÓRIO MENSAL 📄 ("+pedidosanalisados.length+" pedidos cadastrados) \n\n🗓 Pedidos de "+relatorioTempo[1]+"/"+relatorioTempo[2]);
			}

			if (relatorioTempo[0] == 2) {
				pedidosanalisadossoma.lista.push("📄 RELATÓRIO ANUAL 📄 ("+pedidosanalisados.length+" pedidos cadastrados) \n\n🗓 Pedidos de "+relatorioTempo[2]);
			}

			pedidosanalisadossoma.lista.push("\n\n💵 Valor total: R$ "+((Math.floor(((pedidosanalisadossoma.paofrances*paopreco.paofrances)+(pedidosanalisadossoma.paodemilho*paopreco.paodemilho)+(pedidosanalisadossoma.rosquinha*paopreco.rosquinha)+(pedidosanalisadossoma.rosquinharecheio*paopreco.rosquinharecheio)+(pedidosanalisadossoma.croissantpresunto*paopreco.croissantpresunto)+(pedidosanalisadossoma.croissantfrango*paopreco.croissantfrango)+(pedidosanalisadossoma.bisnaga*paopreco.bisnaga)+(pedidosanalisadossoma.bisnagaacucar*paopreco.bisnagaacucar)+(pedidosanalisadossoma.bisnagacreme*paopreco.bisnagacreme))*100)/100).toFixed(2)));

			pedidosanalisadossoma.lista.push("\n\n📝 Relatórios detalhados abaixo:");

			
			
		} else {
			if (relatorioTempo[0] == 1) {
				pedidosanalisadossoma.lista.push("Nenhum pedido cadastrado em "+relatorioTempo[1]+"/"+relatorioTempo[2]);
			}

			if (relatorioTempo[0] == 2) {
				pedidosanalisadossoma.lista.push("Nenhum pedido cadastrado no ano de "+relatorioTempo[2]);
			}

			
		}

		pedidosanalisadossoma.lista.push(pedidosanalisadosunicos);
		
		next();
    }
}


const relatoriopaoprint = (ctx, next) => {
	ctx.reply(""+pedidosanalisadossoma.lista+"", tecladoRelatorioPaoDetalhado);
	next();
}

const relatoriopaodetalhadoprint = (ctx, next) => {
	ctx.reply(""+pedidosanalisadossoma.lista+"");
	next();
}

const relatoriopaobartira = (ctx, next) => {
	msg(''+pedidosanalisadossoma.lista+'',idKiliano)
	msg(''+pedidosanalisadossoma.lista+'',idBartira)
	next();
}








// eventos agendadso
// ------- Mensagens por tempo ------

const eventosagendados = (ctx, next) => {


	// Dias úteis
	if (datasemana > 0 && datasemana < 6) {

		// --- BOM DIA
		var bomdiarandomminuto = Math.floor(10*Math.random()+10)
		var schedulebomdia = schedule.scheduleJob({hour: 8+fuso, minute: bomdiarandomminuto}, function(){
			// var bomdiarandom = Math.floor(10*Math.random());
			// var bomdiatexto = "Bom dia!";
			var bomdiajson = ["BD (que na lingua do truco é Bom Dia)","Bom dia e que a força esteja com você!","Bom dia meus consagrados!","Bom dia gente! 🙋‍","Bom dia!","Buenos dias! 🎶","🌚 Dia! 🌝","Bom dia! Vida longa e próspera 🖖","Bom dia parças 🤜🤛!","🍞 Bom dia! 🍩","😎 Bom dia! ☀","Dia 🤙!","Bom dia!!"]
			var bomdiarandom = Math.floor(bomdiajson.length*Math.random());

			console.log(bomdiajson[bomdiarandom]);
			
			msg(bomdiajson[bomdiarandom], idChatDegrau);
		});
		// / bom dia


		// --- BOA NOITE
		
		var scheduleboanoitepre = schedule.scheduleJob({hour: 18+fuso, minute: 59}, function(){
			// clima = axios.get(`http://apiadvisor.climatempo.com.br/api/v1/forecast/locale/3477/days/15?token=${apiClimatempo}`);

			axios.get(`http://apiadvisor.climatempo.com.br/api/v1/forecast/locale/3477/days/15?token=${apiClimatempo}`)
			.then(function (response) {

			        clima = response;

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

					var boanoitefds = "";

					if (datasemana == 5) {
						boanoitefds = "\n\nBom fim de semana! 😎"

					}

					msg(`🌙 Boa noite 🌙 ${boanoitefds}

						☀ Previsão do tempo pra amanhã (${clima.data.data[1].date_br})

						Temperatura: Min: ${clima.data.data[1].temperature.min}ºC | Max: ${clima.data.data[1].temperature.max}ºC 🌡
					 	${clima.data.data[1].text_icon.text.pt} ☀
					 	Provabilidade de chuva: ${clima.data.data[1].rain.probability} % ${climaicon}
					 	\n
					`, idChatDegrau);
			// I need this data here ^^
			return response.data;
			})
			.catch(function (error) {
			    console.log(error);
			});
		});

		
		// / BOA NOITE

		// ---- Lembrete Pão
		var schedulelembretepao = schedule.scheduleJob({hour: 15+fuso, minute: 40}, function(){
			msg(`🍞🥐🥖🍩 Não deixe pra última hora! Reserve agora seu pão me enviando um /pao COMO MSG PARTICULAR 🍞🥐🥖🍩`, idChatDegrau);
		});
		// / Lembrete Pão


		// -----  Checando se o tio do pão Realmente veio

		var schedulepaonaopassou = schedule.scheduleJob({hour: 17+fuso, minute: 45}, function(){

			if (pedido.acoes.length > 0){
				if (tiopassou == false) {
					msg(`Gente, pelo que pude notar o meu parceiro da bicicleta não passou hoje 🚴‍♂ . Caso não tenha passado mesmo, temos que apagar o pedido de hoje, se não ele fica registrado no sistema.


					👉 Para apagar é só digitar /pedido e clicar em APAGAR TUDO. Caso ele tenha passado, ignorem essa msg.
					`, idChatDegrau);

				}
			}

			

			
		});

		// /Checando se o tio do pão Realmente veio




	}
	// / dias uteis

	var schedulerelatoriomensal = schedule.scheduleJob({hour: 8+fuso, minute: 15}, function(){
		// Relatório todo dia 1
		if (datadia == 1) {
			if (pedido.mes_data == 1) {
				relatorioTempo = [1,12,(pedido.ano_data-1)];
			} else {
				relatorioTempo = [1,(pedido.mes_data-1),pedido.ano_data];
			}
			exec(ctx, atualizarData, carregartodos, relatoriopao, relatoriopaodetalhado, relatoriopaobartira, liberandopost)
		}

		// Niver do bot
		if (datadia == 17) {
			if (datames == 9) {
				msg(`Fui ativado no dia 17 de setembro de 2018. Teoricamente é meu aniversário 🎂`, idChatDegrau);
			}
		}
	  
	});
	

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

// Relatório Pão
const tecladoRelatorioPaoDetalhado = Extra.markup(Markup.inlineKeyboard([
	Markup.callbackButton('Relatório Detalhado', 'rdetalhado'),
], {columns: 1}))







// Início do dia
exec(ctx, atualizarData, novodia, eventosagendados, carregarum, atualizarlocal, liberandopost)


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

		msg(`${ctx.update.message.from.first_name} reservou um ${ctx.update.message.text}.`, idChatDegrau);

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
	await ctx.reply(`É nóiz 👍`);

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
			var tecladoLimpo = JSON.stringify({"remove_keyboard":true});
			axios.get(`${apiUrl}/sendMessage?chat_id=${ctx.update.message.from.id}&text=${encodeURI(`Você pediu os seguintes itens: \n${listapessoal}\n`)}&reply_markup=${encodeURI(tecladoLimpo)}`)
				.catch(e => console.log(e))


			// Enviando para o server
			if (conteudocarregado == true)  {
				conteudocarregado = false;
				exec(ctx, carregarum, checagemparanovopost)
			} else {
				console.log("Outro loading")
			}


		} else {
			await ctx.replyWithMarkdown(`Sua lista de pedidos está vazia. Peça algo com o /pao`);
		}
		

	}


	
})


// Concluíndo pedido

bot.command(['pedido', 'fechar', 'finalizar', 'fecharpedido'], async ctx => {


	listar();

	if (ctx.update.message.from.id == ctx.chat.id) {
		// Listagem pessoal
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
		// Listagem do grupo
		if (pedido.lista.length > 0) {
			if (pedido.indisponibilidade.length > 0) {
				
				indisponiveltxt = `
				_Os seguintes itens estavam em falta: ${pedido.indisponibilidade}. Trazer os substitutos:_
				*${pedidolistasubstituto}*
				`
			} else {
				indisponiveltxt = ""
			}

			await ctx.replyWithMarkdown(`*📝📝 Pedidos pro Tio do Pão 📝📝* 
				Referente ao dia ${pedido.dia_data}/${pedido.mes_data}/${pedido.ano_data} 
				*${pedidolista}*
				${indisponiveltxt}`, tecladoFixoItens)

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



// Actions
bot.action('pfalta', async ctx => {
	await ctx.editMessageText(`Qual item está em falta?`, tecladoFixoItensFalta)
})

bot.action('pcancelar', async ctx => {
	await ctx.editMessageText(`Tem certeza que você quer apagar completamente o pedido?`, tecladoFixoItensCancelar)
})

bot.action('pcancelarvoltar', async ctx => {
	await ctx.editMessageText(`---------------------`);

	listar();

	if (pedido.lista.length > 0) {

		if (pedido.indisponibilidade.length > 0) {
			
			indisponiveltxt = `
			_Os seguintes itens estavam em falta: ${pedido.indisponibilidade}. Trazer os substitutos:_
			*${pedidolistasubstituto}*
			`
		} else {
			indisponiveltxt = ""
		}

		await ctx.replyWithMarkdown(`*📝📝 Pedidos pro Tio do Pão 📝📝* 
			Referente ao dia ${pedido.dia_data}/${pedido.mes_data}/${pedido.ano_data} 
			*${pedidolista}*
			${indisponiveltxt}`, tecladoFixoItens)
		
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
	tiopassou = true;


	listar()

	if (pedido.lista.length > 0) {

		if (pedido.indisponibilidade.length > 0) {
			
			indisponiveltxt = `
			_Os seguintes itens estavam em falta: ${pedido.indisponibilidade}. Trazer os substitutos:_
			*${pedidolistasubstituto}*
			`
		} else {
			indisponiveltxt = ""
		}

		await ctx.replyWithMarkdown(`*📝📝 Pedidos pro Tio do Pão 📝📝* 
			Referente ao dia ${pedido.dia_data}/${pedido.mes_data}/${pedido.ano_data} 
			*${pedidolista}*
			${indisponiveltxt}`)

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

})

bot.action('xpaofrances', async ctx => {
	pedido.indisponibilidade.push('Pão Francês');
	await ctx.editMessageText(`---------------------`);

	listar();

	if (pedido.lista.length > 0) {

		if (pedido.indisponibilidade.length > 0) {
			
			indisponiveltxt = `
			_Os seguintes itens estavam em falta: ${pedido.indisponibilidade}. Trazer os substitutos:_
			*${pedidolistasubstituto}*
			`
		} else {
			indisponiveltxt = ""
		}

		await ctx.replyWithMarkdown(`*📝📝 Pedidos pro Tio do Pão 📝📝* 
			Referente ao dia ${pedido.dia_data}/${pedido.mes_data}/${pedido.ano_data} 
			*${pedidolista}*
			${indisponiveltxt}`, tecladoFixoItens)

	} else {
		await ctx.reply(`A lista de pedidos de ${pedido.dia_data}/${pedido.mes_data}/${pedido.ano_data} está vazia`)
	}	
})


bot.action('xpaodemilho', async ctx => {
	pedido.indisponibilidade.push('Pão de Milho');

	await ctx.editMessageText(`---------------------`);

	listar();

	if (pedido.lista.length > 0) {

		if (pedido.indisponibilidade.length > 0) {
			
			indisponiveltxt = `
			_Os seguintes itens estavam em falta: ${pedido.indisponibilidade}. Trazer os substitutos:_
			*${pedidolistasubstituto}*
			`
		} else {
			indisponiveltxt = ""
		}

		await ctx.replyWithMarkdown(`*📝📝 Pedidos pro Tio do Pão 📝📝* 
			Referente ao dia ${pedido.dia_data}/${pedido.mes_data}/${pedido.ano_data} 
			*${pedidolista}*
			${indisponiveltxt}`, tecladoFixoItens)

	} else {
		await ctx.reply(`A lista de pedidos de ${pedido.dia_data}/${pedido.mes_data}/${pedido.ano_data} está vazia`)
	}	
})

bot.action('xrosquinha', async ctx => {
	pedido.indisponibilidade.push('Rosquinha Comum');

	await ctx.editMessageText(`---------------------`);

	listar();

	if (pedido.lista.length > 0) {

		if (pedido.indisponibilidade.length > 0) {
			
			indisponiveltxt = `
			_Os seguintes itens estavam em falta: ${pedido.indisponibilidade}. Trazer os substitutos:_
			*${pedidolistasubstituto}*
			`
		} else {
			indisponiveltxt = ""
		}

		await ctx.replyWithMarkdown(`*📝📝 Pedidos pro Tio do Pão 📝📝* 
			Referente ao dia ${pedido.dia_data}/${pedido.mes_data}/${pedido.ano_data} 
			*${pedidolista}*
			${indisponiveltxt}`, tecladoFixoItens)

	} else {
		await ctx.reply(`A lista de pedidos de ${pedido.dia_data}/${pedido.mes_data}/${pedido.ano_data} está vazia`)
	}	
})

bot.action('xrosquinharecheio', async ctx => {
	pedido.indisponibilidade.push('Rosquinha com Recheio');

	await ctx.editMessageText(`---------------------`);

	listar();

	if (pedido.lista.length > 0) {

		if (pedido.indisponibilidade.length > 0) {
			
			indisponiveltxt = `
			_Os seguintes itens estavam em falta: ${pedido.indisponibilidade}. Trazer os substitutos:_
			*${pedidolistasubstituto}*
			`
		} else {
			indisponiveltxt = ""
		}

		await ctx.replyWithMarkdown(`*📝📝 Pedidos pro Tio do Pão 📝📝* 
			Referente ao dia ${pedido.dia_data}/${pedido.mes_data}/${pedido.ano_data} 
			*${pedidolista}*
			${indisponiveltxt}`, tecladoFixoItens)

	} else {
		await ctx.reply(`A lista de pedidos de ${pedido.dia_data}/${pedido.mes_data}/${pedido.ano_data} está vazia`)
	}	
})


bot.action('xcroissantpresunto', async ctx => {
	pedido.indisponibilidade.push('Croissant Presunto');

	await ctx.editMessageText(`---------------------`);

	listar();

	if (pedido.lista.length > 0) {

		if (pedido.indisponibilidade.length > 0) {
			
			indisponiveltxt = `
			_Os seguintes itens estavam em falta: ${pedido.indisponibilidade}. Trazer os substitutos:_
			*${pedidolistasubstituto}*
			`
		} else {
			indisponiveltxt = ""
		}

		await ctx.replyWithMarkdown(`*📝📝 Pedidos pro Tio do Pão 📝📝* 
			Referente ao dia ${pedido.dia_data}/${pedido.mes_data}/${pedido.ano_data} 
			*${pedidolista}*
			${indisponiveltxt}`, tecladoFixoItens)

	} else {
		await ctx.reply(`A lista de pedidos de ${pedido.dia_data}/${pedido.mes_data}/${pedido.ano_data} está vazia`)
	}	
})

bot.action('xcroissantfrango', async ctx => {
	pedido.indisponibilidade.push('Croissant Frango');

	await ctx.editMessageText(`---------------------`);

	listar();

	if (pedido.lista.length > 0) {

		if (pedido.indisponibilidade.length > 0) {
			
			indisponiveltxt = `
			_Os seguintes itens estavam em falta: ${pedido.indisponibilidade}. Trazer os substitutos:_
			*${pedidolistasubstituto}*
			`
		} else {
			indisponiveltxt = ""
		}

		await ctx.replyWithMarkdown(`*📝📝 Pedidos pro Tio do Pão 📝📝* 
			Referente ao dia ${pedido.dia_data}/${pedido.mes_data}/${pedido.ano_data} 
			*${pedidolista}*
			${indisponiveltxt}`, tecladoFixoItens)

	} else {
		await ctx.reply(`A lista de pedidos de ${pedido.dia_data}/${pedido.mes_data}/${pedido.ano_data} está vazia`)
	}	
})


bot.action('xbisnaga', async ctx => {
	pedido.indisponibilidade.push('Bisnaga Comum');

	await ctx.editMessageText(`---------------------`);

	listar();

	if (pedido.lista.length > 0) {

		if (pedido.indisponibilidade.length > 0) {
			
			indisponiveltxt = `
			_Os seguintes itens estavam em falta: ${pedido.indisponibilidade}. Trazer os substitutos:_
			*${pedidolistasubstituto}*
			`
		} else {
			indisponiveltxt = ""
		}

		await ctx.replyWithMarkdown(`*📝📝 Pedidos pro Tio do Pão 📝📝* 
			Referente ao dia ${pedido.dia_data}/${pedido.mes_data}/${pedido.ano_data} 
			*${pedidolista}*
			${indisponiveltxt}`, tecladoFixoItens)

	} else {
		await ctx.reply(`A lista de pedidos de ${pedido.dia_data}/${pedido.mes_data}/${pedido.ano_data} está vazia`)
	}	
})

bot.action('xbisnagaacucar', async ctx => {
	pedido.indisponibilidade.push('Bisnaga com Açúcar');

	await ctx.editMessageText(`---------------------`);

	listar();

	if (pedido.lista.length > 0) {

		if (pedido.indisponibilidade.length > 0) {
			
			indisponiveltxt = `
			_Os seguintes itens estavam em falta: ${pedido.indisponibilidade}. Trazer os substitutos:_
			*${pedidolistasubstituto}*
			`
		} else {
			indisponiveltxt = ""
		}

		await ctx.replyWithMarkdown(`*📝📝 Pedidos pro Tio do Pão 📝📝* 
			Referente ao dia ${pedido.dia_data}/${pedido.mes_data}/${pedido.ano_data} 
			*${pedidolista}*
			${indisponiveltxt}`, tecladoFixoItens)

	} else {
		await ctx.reply(`A lista de pedidos de ${pedido.dia_data}/${pedido.mes_data}/${pedido.ano_data} está vazia`)
	}	
})

bot.action('xbisnagacreme', async ctx => {
	pedido.indisponibilidade.push('Bisnaga com Creme');

	await ctx.editMessageText(`---------------------`);

	listar();

	if (pedido.lista.length > 0) {

		if (pedido.indisponibilidade.length > 0) {
			
			indisponiveltxt = `
			_Os seguintes itens estavam em falta: ${pedido.indisponibilidade}. Trazer os substitutos:_
			*${pedidolistasubstituto}*
			`
		} else {
			indisponiveltxt = ""
		}

		await ctx.replyWithMarkdown(`*📝📝 Pedidos pro Tio do Pão 📝📝* 
			Referente ao dia ${pedido.dia_data}/${pedido.mes_data}/${pedido.ano_data} 
			*${pedidolista}*
			${indisponiveltxt}`, tecladoFixoItens)

	} else {
		await ctx.reply(`A lista de pedidos de ${pedido.dia_data}/${pedido.mes_data}/${pedido.ano_data} está vazia`)
	}	
})

bot.action('xreiniciar', async ctx => {
	pedido.indisponibilidade = [];

	await ctx.editMessageText(`---------------------`);

	listar();

	if (pedido.lista.length > 0) {

		if (pedido.indisponibilidade.length > 0) {
			
			indisponiveltxt = `
			_Os seguintes itens estavam em falta: ${pedido.indisponibilidade}. Trazer os substitutos:_
			*${pedidolistasubstituto}*
			`
		} else {
			indisponiveltxt = ""
		}

		await ctx.replyWithMarkdown(`*📝📝 Pedidos pro Tio do Pão 📝📝* 
			Referente ao dia ${pedido.dia_data}/${pedido.mes_data}/${pedido.ano_data} 
			*${pedidolista}*
			${indisponiveltxt}`, tecladoFixoItens)

	} else {
		await ctx.reply(`A lista de pedidos de ${pedido.dia_data}/${pedido.mes_data}/${pedido.ano_data} está vazia`)
	}	
})





// Relatórios

// Actions
bot.action('rmesatual', async ctx => {

	relatorioTempo = [1,pedido.mes_data,pedido.ano_data];


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


	await ctx.editMessageText(`⏳ carregando ...`);

	if (conteudocarregado == true)  {
		conteudocarregado = false;
		exec(ctx, atualizarData, carregartodos, relatoriopao, relatoriopaoprint, liberandopost)
	} else {
		console.log("nao carregado");
		await ctx.editMessageText(`Erro, solicite o pedido novamente`);
	}
})

bot.action('respecificar', async ctx => {
	await ctx.editMessageText(`Selecionar Mês`, tecladoRelatorioPaoMes);
	relatorioTempo[0] = 1;
})

bot.action(/rmes (\d+)/, async ctx => {

	relatorioTempo[1] = parseInt(ctx.match[1]);

	const tecladoRelatorioPaoAno = Extra.markup(Markup.inlineKeyboard([
		Markup.callbackButton(pedido.ano_data, 'rano '+pedido.ano_data),
		Markup.callbackButton((pedido.ano_data-1), 'rano '+(pedido.ano_data-1)),
		Markup.callbackButton((pedido.ano_data-2), 'rano '+(pedido.ano_data-2))
	], {columns: 3}))

	await ctx.editMessageText(`Selecionar Ano`, tecladoRelatorioPaoAno);
})

bot.action(/rano (\d+)/, async ctx => {

	relatorioTempo[2] = parseInt(ctx.match[1]);

	await ctx.editMessageText(`⏳ carregando ...`);

	if (conteudocarregado == true)  {
		conteudocarregado = false;
		exec(ctx, atualizarData, carregartodos, relatoriopao, relatoriopaoprint, liberandopost)
	} else {
		console.log("nao carregado");
		await ctx.editMessageText(`Erro, solicite o pedido novamente`);
	}
	
})



// Detalhado

bot.action('rdetalhado', async ctx => {

	await ctx.editMessageText(`⏳ carregando ...`);

	if (conteudocarregado == true)  {
		conteudocarregado = false;
		exec(ctx, relatoriopaodetalhado, relatoriopaodetalhadoprint, liberandopost)
	} else {
		console.log("nao carregado");
		await ctx.editMessageText(`Erro, solicite o pedido novamente`);
	}
})




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
	if (ctx.update.message.from.id == idRodrigo) {

		axios.get(`http://apiadvisor.climatempo.com.br/api/v1/forecast/locale/3861/days/15?token=${apiClimatempo}`)
			.then(function (response) {
				clima = response;

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
					ctx.reply(`Previsão de Jandira enviado pro Rodrigo`)
				}

				msg(jandira1+jandira2, idRodrigo);
			       
			// I need this data here ^^
			// return response.data;
			})
			.catch(function (error) {
			    console.log(error);
			    ctx.reply(`Erro :( Veja o log do sistema (chama o kiki).`);	
			});



		

	} else {
		ctx.reply(`Só o Rodrigo pode pedir a previsão de Jandira`)
	}



})


bot.action('choje', async ctx => {

	axios.get(`http://apiadvisor.climatempo.com.br/api/v1/forecast/locale/3477/days/15?token=${apiClimatempo}`)
			.then(function (response) {

				clima = response;

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

				ctx.editMessageText(` ☀ ☀ HOJE (${clima.data.data[0].date_br}) ☀ ☀

					Temperatura: Min: ${clima.data.data[0].temperature.min}ºC | Max: ${clima.data.data[0].temperature.max}ºC 🌡
				 	${clima.data.data[0].text_icon.text.pt} ☀
				 	Provabilidade de chuva: ${clima.data.data[0].rain.probability} % ${climaicon}
				 	\n
				 `);
				
			       
			// I need this data here ^^
			// return response.data;
			})
			.catch(function (error) {
			    console.log(error);
			    ctx.editMessageText(`Erro :( Veja o log do sistema (chama o kiki).`);	
			});

	
})

bot.action('camanha', async ctx => {

	axios.get(`http://apiadvisor.climatempo.com.br/api/v1/forecast/locale/3477/days/15?token=${apiClimatempo}`)
			.then(function (response) {

				clima = response;

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

				ctx.editMessageText(` ☀ ☀ AMANHÃ (${clima.data.data[1].date_br}) ☀ ☀

					Temperatura: Min: ${clima.data.data[1].temperature.min}ºC | Max: ${clima.data.data[1].temperature.max}ºC 🌡
				 	${clima.data.data[1].text_icon.text.pt} ☀
				 	Provabilidade de chuva: ${clima.data.data[1].rain.probability} % ${climaicon}
				 	\n
				 `);
				
			       
			// I need this data here ^^
			// return response.data;
			})
			.catch(function (error) {
			    console.log(error);
			    ctx.editMessageText(`Erro :( Veja o log do sistema (chama o kiki).`);	
			});




	
})

bot.action('csetedias', async ctx => {


	axios.get(`http://apiadvisor.climatempo.com.br/api/v1/forecast/locale/3477/days/15?token=${apiClimatempo}`)
			.then(function (response) {

				clima = response;

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
				ctx.editMessageText(` ☀ ☀ 7 Dias ☀ ☀ ${csetedias}`);	
				
				
			       
			// I need this data here ^^
			// return response.data;
			})
			.catch(function (error) {
			    console.log(error);
			    ctx.editMessageText(`Erro :( Veja o log do sistema (chama o kiki).`);	
			});




	
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
		/truco - joga truco com os amigos
		`)

})


bot.command('id', async ctx => {
	await ctx.reply(`Oi ${ctx.update.message.from.first_name}, seu id é ${ctx.update.message.from.id}. O id do chat é ${ctx.chat.id}. Essa é uma info meio sensível, melhor apagar essa mensagem depois. `)
})

bot.command('organizar', async ctx => {
	await ctx.reply(`🌚 Organizado 🌝`)
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
		await ctx.reply(` 🗓 Selecione a data do relatório 🗓`,tecladoRelatorioPao);
	} else {
		await ctx.reply(`Relatório só podem ser enviados inbox, através do Kiliano, Bartira ou Bel`);

	}
})

// Testes

bot.command(['teste'], async ctx => {
	await ctx.reply("Testado");
	console.log("Testado");
})


// CS
bot.command(['cs'], async ctx => {
	await ctx.reply(`🔫 Terrorist Win 🔫 http://horacio.kiliano.com.br/wp-content/uploads/2018/11/cs.zip`);
})

// 





bot.command(['post'], async ctx => {
	if (ctx.chat.id == idKiliano) {
		if (conteudocarregado == true)  {
			conteudocarregado = false;
			exec(ctx, carregarum, checagemparanovopost)
			await ctx.reply("Subindo pro server");
		} else {
			console.log("nao carregado")
		}
	}

})




// Testando pedidos online a cada 25 minutos
setInterval(function() {
    if (conteudocarregado == true)  {
		conteudocarregado = false;
		exec(ctx, carregarum, checagemparanovopost);
	} else {
		console.log("nao carregado")
	}
}, 25 * 60000); // 60 minutos












bot.command(['cpf'], async ctx => {

	var cpfteste = cpf();

	await ctx.reply(`CPF válido gerado aleatoriamente:
${cpfteste}`);

})

bot.command(['cnpj'], async ctx => {

	var cnpjteste = cnpj();

	await ctx.reply(`CNPJ válido gerado aleatoriamente:
${cnpjteste}`);

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
var trucoMaodeFerro = false;

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
	// trucoBaralhoTipo = 'sujo';
	trucoBaralho =[];
	trucoComecou = false;
	trucoPrimeiroRound = true;
	trucoValorDaMao = 1;

	trucoContinuar = false;
	trucoMaodeFerro = false;

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

	trucoMensagem = [];

	next();
}


const trucocloading = (ctx, next) => {
	trucoLoading = true;
	next();
}

const trucocloadingfim = (ctx, next) => {
	trucoLoading = false;
}


const trucoadicionarjogador = (ctx, next) => {
	next();
}

const trucocomecar = (ctx, next) => {
	trucoComecou = true;
	next();
}



const trucobaralho = (ctx, next) => {

	if (trucoBaralhoTipo == 'limpo') {
		trucoBaralho = ["3♣","2♣","A♣","K♣","J♣","Q♣","3♥","2♥","A♥","K♥","J♥","Q♥","3♠","2♠","A♠","K♠","J♠","Q♠","3♦","2♦","A♦","K♦","J♦","Q♦"];
	} else {
		trucoBaralho = ["3♣","2♣","A♣","K♣","J♣","Q♣","7♣","6♣","5♣","4♣","3♥","2♥","A♥","K♥","J♥","Q♥","7♥","6♥","5♥","4♥","3♠","2♠","A♠","K♠","J♠","Q♠","7♠","6♠","5♠","4♠","3♦","2♦","A♦","K♦","J♦","Q♦","7♦","6♦","5♦","4♦"];
	}
	
	next();
}


const trucoEmbaralhar = (ctx, next) => {



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


	trucoManilha = trucoBaralho[0];
	trucoBaralho.splice(0, 1)


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
			trucoManilhaValor.zap = "Q♣";
			trucoManilhaValor.escopeta = "Q♥";
			trucoManilhaValor.espadilha = "Q♠";
			trucoManilhaValor.picafumo = "Q♦";

		} else {
			trucoManilhaValor.zap = "4♣";
			trucoManilhaValor.escopeta = "4♥";
			trucoManilhaValor.espadilha = "4♠";
			trucoManilhaValor.picafumo = "4♦";
			
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



	next();
}

const trucoprimeiramesa = (ctx, next) => {
	trucoPrimeiroRound = true;
	trucoComecou = true;
	var trucoJogadoresOrdem1 = trucoJogadores[1];
	var trucoJogadoresOrdem2 = trucoJogadores[2];
	trucoJogadores[1] = trucoJogadoresOrdem2;
	trucoJogadores[2] = trucoJogadoresOrdem1;
	next();
}


const trucolimparmesa = (ctx, next) => {
	trucoValorDaMao = 1;

	if (trucoJogadores.length > 0) {
		for (var i = 0; i < trucoJogadores.length; i++) {
			console.log("trucolimparmesa comeco for"+i);
			trucoJogadores[i].mao = [];
			trucoJogadores[i].donodascartas = [];
			trucoJogadores[i].truco = "É Truco ❗❗❗";
			console.log("trucolimparmesa fim for"+i);
		}
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
		trucoTurnoId = trucoJogadores[trucoTurno].id;

	}
	next();


}



const trucodistribuircarta = async (ctx, next) => {



	for(var i = 0; i < trucoJogadores.length; i++){

		// zerar mão
		trucoJogadores[i].mao = [];

		// distribuir 3 cartas

		for(var ic = 0; ic < 3; ic++) {
			trucoJogadores[i].mao.push(trucoBaralho[0]);
			trucoBaralho.splice(0, 1)
		}

		if (trucoMaodeFerro == false) {
			await msg(`${trucoJogadores[0].nome} e ${trucoJogadores[2].nome} (${trucoJogadores[0].pontos}) X (${trucoJogadores[1].pontos}) ${trucoJogadores[1].nome} e ${trucoJogadores[3].nome}

			Manilhas: [ ${trucoManilhaValor.zap} ]  [ ${trucoManilhaValor.escopeta} ]  [ ${trucoManilhaValor.espadilha} ]  [ ${trucoManilhaValor.picafumo} ]

			${trucoJogadores[i].nome}: Você recebeu as seguintes cartas:
			[ ${trucoJogadores[i].mao[0]} ] [ ${trucoJogadores[i].mao[1]} ] [ ${trucoJogadores[i].mao[2]} ]

			Agora é a vez de ${trucoJogadores[trucoTurno].nome}

			`,trucoJogadores[i].id);
		} else {
			await msg(`${trucoJogadores[0].nome} e ${trucoJogadores[2].nome} (${trucoJogadores[0].pontos}) X (${trucoJogadores[1].pontos}) ${trucoJogadores[1].nome} e ${trucoJogadores[3].nome}

			Manilhas: [ ${trucoManilhaValor.zap} ]  [ ${trucoManilhaValor.escopeta} ]  [ ${trucoManilhaValor.espadilha} ]  [ ${trucoManilhaValor.picafumo} ]

			${trucoJogadores[i].nome}: Você recebeu as seguintes cartas:
			[ ▫❓▫ ] [ ▫❓▫ ] [ ▫❓▫ ]

			Agora é a vez de ${trucoJogadores[trucoTurno].nome}

			`,trucoJogadores[i].id);
		}
		
	}


	next();
}


const trucomostrouteclado = (ctx, next) => {



	var trucoMaoReplaceBaixo = [];

	if (trucoRodada.length == 0) {
		
	} else {
		for ( var i = 0; i < trucoJogadores[trucoTurno].mao.length; i++) {
			trucoMaoReplaceBaixo.push("🔽 "+trucoJogadores[trucoTurno].mao[i])
		}
	}
	

	var trucoTrucagem = [];

	trucoTrucagem.push(trucoJogadores[trucoTurno].truco);



	var tecladoTruco = JSON.stringify({"keyboard":[trucoJogadores[trucoTurno].mao, trucoMaoReplaceBaixo, trucoTrucagem],"resize_keyboard":true, "one_time_keyboard":true})


	axios.get(`${apiUrl}/sendMessage?chat_id=${trucoJogadores[trucoTurno].id}&text=${encodeURI('Jogada:')}&reply_markup=${encodeURI(tecladoTruco)}`)
		.catch(e => console.log(e))


	next();
}

const trucomostroutecladomaodeferro = (ctx, next) => {



	var trucoMaoReplaceMaodeFerro = [];

	for ( var i = 0; i < trucoJogadores[trucoTurno].mao.length; i++) {
		trucoMaoReplaceMaodeFerro.push("▫❓▫")
	}

	var tecladoTruco = JSON.stringify({"keyboard":[trucoMaoReplaceMaodeFerro],"resize_keyboard":true, "one_time_keyboard":true})


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

		if (trucoMaodeFerro == false) {
			exec(ctx, trucomostrouteclado);
		} else {
			exec(ctx, trucomostroutecladomaodeferro);
		}
		trucoMensagem.push(`\n\nAgora é a vez de ${trucoJogadores[trucoTurno].nome}`)

	} else {
		// jogo completo
		exec(ctx, trucocalcularvitoriamao, trucoanalizarrodada);
	}


	next();
}

const trucocalcularvitoriamao = (ctx, next) => {

	
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




	// Se só tiver 1 carta vencedora
	if (trucoMaiorValorVencedor.length == 1) {



		if (trucoMaiorValorVencedor[0].time == 0) {
			trucoMaiorValorVencedorTimeNome = trucoJogadores[0].nome+" e "+trucoJogadores[2].nome;
		}

		if (trucoMaiorValorVencedor[0].time == 1) {
			trucoMaiorValorVencedorTimeNome = trucoJogadores[1].nome+" e "+trucoJogadores[3].nome;
		}

		trucoRodada.push(trucoMaiorValorVencedor[0].time);

		trucoMensagem.push(`\n\nVitória: [ ${trucoMaiorValorVencedor[0].visual} ] ${trucoMaiorValorVencedorTimeNome}`);
		
	}




	// Se só tiver 2 cartas vencedoras
	if (trucoMaiorValorVencedor.length == 2) {


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


	

	next();
}


const trucoanalizarrodada = (ctx, next) => {



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
		trucoTurnoId = trucoJogadores[trucoTurno].id;


		

		trucoMensagem.push(`\n\nSegunda rodada: ${trucoJogadores[trucoTurno].nome} vai fazer a volta`);

		trucoCartasNaMesa = [];
		trucoMaiorValorVencedor = [];
		
		if (trucoMaodeFerro == false) {
			exec(ctx,trucomostrouteclado)
		} else {
			exec(ctx,trucomostroutecladomaodeferro)
		}
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
				if (trucoMaodeFerro == false) {
					exec(ctx,trucomostrouteclado)
				} else {
					exec(ctx,trucomostroutecladomaodeferro)
				}
			}


			// Se o houve empate na segunda
			if (trucoRodada[1] == 3) {
				trucoJogadores[0].pontos += trucoValorDaMao;
				trucoJogadores[2].pontos += trucoValorDaMao;

				trucoMensagem.push(`\n\nComo ${trucoJogadores[0].nome} e ${trucoJogadores[2].nome} fizeram a primeira, eles ganham essa, somando ${trucoValorDaMao} na pontuação! 👍

					${trucoJogadores[0].nome} e ${trucoJogadores[2].nome} (${trucoJogadores[0].pontos}) X (${trucoJogadores[1].pontos}) ${trucoJogadores[1].nome} e ${trucoJogadores[3].nome}`);

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

				trucoMensagem.push(`\n\n${trucoJogadores[1].nome} e ${trucoJogadores[3].nome} ganharam esse jogo, somando ${trucoValorDaMao} na pontuação! 👍

					${trucoJogadores[0].nome} e ${trucoJogadores[2].nome} (${trucoJogadores[0].pontos}) X (${trucoJogadores[1].pontos}) ${trucoJogadores[1].nome} e ${trucoJogadores[3].nome}`);


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
				if (trucoMaodeFerro == false) {
					exec(ctx,trucomostrouteclado)
				} else {
					exec(ctx,trucomostroutecladomaodeferro)
				}
			}


			// Se o houve empate na segunda
			if (trucoRodada[1] == 3) {
				trucoJogadores[1].pontos += trucoValorDaMao;
				trucoJogadores[3].pontos += trucoValorDaMao;

				trucoMensagem.push(`\n\nComo ${trucoJogadores[1].nome} e ${trucoJogadores[3].nome} fizeram a primeira, eles ganham essa, somando ${trucoValorDaMao} na pontuação! 👍

					${trucoJogadores[0].nome} e ${trucoJogadores[2].nome} (${trucoJogadores[0].pontos}) X (${trucoJogadores[1].pontos}) ${trucoJogadores[1].nome} e ${trucoJogadores[3].nome}`);

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

				trucoMensagem.push(`\n\n${trucoJogadores[0].nome} e ${trucoJogadores[2].nome} ganharam esse jogo, somando ${trucoValorDaMao} na pontuação! 👍

					${trucoJogadores[0].nome} e ${trucoJogadores[2].nome} (${trucoJogadores[0].pontos}) X (${trucoJogadores[1].pontos}) ${trucoJogadores[1].nome} e ${trucoJogadores[3].nome}`);

				trucoCartasNaMesa = [];
				trucoMaiorValorVencedor = [];

				exec(ctx, trucoproximarodada);
			}

			// Se o time 1 ter feito a segunda 
			if (trucoRodada[1] == 1) {
				trucoJogadores[1].pontos += trucoValorDaMao;
				trucoJogadores[3].pontos += trucoValorDaMao;

				trucoMensagem.push(`\n\n${trucoJogadores[1].nome} e ${trucoJogadores[3].nome} ganharam esse jogo, somando ${trucoValorDaMao} na pontuação! 👍

					${trucoJogadores[0].nome} e ${trucoJogadores[2].nome} (${trucoJogadores[0].pontos}) X (${trucoJogadores[1].pontos}) ${trucoJogadores[1].nome} e ${trucoJogadores[3].nome}`);

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
				if (trucoMaodeFerro == false) {
					exec(ctx,trucomostrouteclado)
				} else {
					exec(ctx,trucomostroutecladomaodeferro)
				}
			}
		}
	}

	// Terceira Rodada
	if (trucoRodada.length == 3) {

		// Se o time 0 ganhou a terceira
		if (trucoRodada[2] == 0) {
			trucoJogadores[0].pontos += trucoValorDaMao;
			trucoJogadores[2].pontos += trucoValorDaMao;

			trucoMensagem.push(`\n\n${trucoJogadores[0].nome} e ${trucoJogadores[2].nome} ganharam esse jogo, somando ${trucoValorDaMao} na pontuação! 👍

				${trucoJogadores[0].nome} e ${trucoJogadores[2].nome} (${trucoJogadores[0].pontos}) X (${trucoJogadores[1].pontos}) ${trucoJogadores[1].nome} e ${trucoJogadores[3].nome}`);

			trucoCartasNaMesa = [];
			trucoMaiorValorVencedor = [];

			exec(ctx, trucoproximarodada);
		}

		// Se o time 1 ganhou a terceira
		if (trucoRodada[2] == 1) {
			trucoJogadores[1].pontos += trucoValorDaMao;
			trucoJogadores[3].pontos += trucoValorDaMao;

			trucoMensagem.push(`\n\n${trucoJogadores[1].nome} e ${trucoJogadores[3].nome} ganharam esse jogo, somando ${trucoValorDaMao} na pontuação! 👍

				${trucoJogadores[0].nome} e ${trucoJogadores[2].nome} (${trucoJogadores[0].pontos}) X (${trucoJogadores[1].pontos}) ${trucoJogadores[1].nome} e ${trucoJogadores[3].nome}`);
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
				trucoJogadores[2].pontos += trucoValorDaMao;

				trucoMensagem.push(`\n\n${trucoJogadores[0].nome} e ${trucoJogadores[2].nome} ganharam esse jogo, por terem feito a primeira. Somando ${trucoValorDaMao} na pontuação! 👍

					${trucoJogadores[0].nome} e ${trucoJogadores[2].nome} (${trucoJogadores[0].pontos}) X (${trucoJogadores[1].pontos}) ${trucoJogadores[1].nome} e ${trucoJogadores[3].nome}`);
				trucoCartasNaMesa = [];
				trucoMaiorValorVencedor = [];

				exec(ctx, trucoproximarodada);
			}

			if (trucoRodada[0] == 1) {
				trucoJogadores[1].pontos += trucoValorDaMao;
				trucoJogadores[3].pontos += trucoValorDaMao;

				trucoMensagem.push(`\n\n${trucoJogadores[1].nome} e ${trucoJogadores[3].nome} ganharam esse jogo, por terem feito a primeira. Somando ${trucoValorDaMao} na pontuação! 👍

					${trucoJogadores[0].nome} e ${trucoJogadores[2].nome} (${trucoJogadores[0].pontos}) X (${trucoJogadores[1].pontos}) ${trucoJogadores[1].nome} e ${trucoJogadores[3].nome}`);
				trucoCartasNaMesa = [];
				trucoMaiorValorVencedor = [];

				exec(ctx, trucoproximarodada);
			}

			if (trucoRodada[0] == 3) {
				trucoMensagem.push(`\n\nAs 3 rodadas empataram! Ninguém marca ponto! 👍

					${trucoJogadores[0].nome} e ${trucoJogadores[2].nome} (${trucoJogadores[0].pontos}) X (${trucoJogadores[1].pontos}) ${trucoJogadores[1].nome} e ${trucoJogadores[3].nome}`);
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
		trucoMensagem.push(`\n\n 🏆 Vitória da dupla ${trucoJogadores[0].nome} e ${trucoJogadores[2].nome}! 🏆

			Escreva /truco pra entrar em um novo jogo`);
		exec(ctx, trucofim);
	}

	if(trucoJogadores[1].pontos >= 12 ) {
		trucoMensagem.push(`\n\n 🏆 Vitória da dupla ${trucoJogadores[1].nome} e ${trucoJogadores[3].nome}! 🏆

			Escreva /truco pra entrar em um novo jogo`);
		exec(ctx, trucofim);
	}




	// Continuando o jogo
	if (trucoJogadores[0].pontos < 12 && trucoJogadores[1].pontos < 12) {

		// Iniciando uma nova rodada comum
		exec(ctx, trucoiniciativa,trucocontinuarrodada, trucomensagemgeral);
	}
	

	// Rezando itens entre rodadas
	next();
}


const trucomensagemgeral = async (ctx, next) =>  {

	if (trucoJogadores.length > 0) {
		for (var i = 0; i < trucoJogadores.length; i++) {
			await msg(""+trucoMensagem+"",trucoJogadores[i].id);
		}

		trucoMensagem = [];
	}
	

	next();
}

const trucocontinuarrodada = (ctx, next) => {

	trucoContinuar = true;

	var tecladoTrucoContinuar = JSON.stringify({"keyboard":[['▫◻ Continuar ◻▫']],"resize_keyboard":true, "one_time_keyboard":true})

	trucoMensagem.push(`\n\n ---------------- \n\n Aguardando ${trucoJogadores[trucoTurno].nome} continuar a próxima rodada.`);

	axios.get(`${apiUrl}/sendMessage?chat_id=${trucoJogadores[trucoTurno].id}&text=${encodeURI('Continue:')}&reply_markup=${encodeURI(tecladoTrucoContinuar)}`).catch(e => console.log(e))



	next();
}



// const truconovarodada = (ctx, next) => {
// 	exec(trucolimparmesa, trucoiniciativa, trucobaralho, trucoEmbaralhar, trucomanilha, trucoqueimar, trucodistribuircarta, trucomostrouteclado);
// 	next();
// }



const trucofim = (ctx, next) => {

	// Só lembrando que ainda tem o loadingfim e o trucomensagemgeral depois desse cara

	// Rezando itens entre rodadas



	var tecladoTruco = JSON.stringify({"remove_keyboard":true})
	for (var i = 0; i < trucoJogadores.length; i++) {
		axios.get(`${apiUrl}/sendMessage?chat_id=${trucoJogadores[i].id}&text=${encodeURI('Saindo da partida...')}&reply_markup=${encodeURI(tecladoTruco)}`)
		.catch(e => console.log(e))
	}


	trucoComecou = false;
	trucoJogadores = []
	// trucoBaralhoTipo = 'sujo';
	trucoBaralho =[];
	trucoPrimeiroRound = true;
	trucoValorDaMao = 1;

	trucoContinuar = false;
	trucoMaodeFerro = false;

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

	// trucoMensagem = [];


	next();
}


const trucomaodeonze = (ctx, next) => {
	console.log("trucomaodeonze");

	// Continuando o jogo
	if (trucoJogadores[0].pontos == 11 && trucoJogadores[1].pontos == 11) {

		trucoMaodeFerro = true;

		exec(ctx, trucomostroutecladomaodeferro)
		// Mão de ferro

	} else {

			if (trucoJogadores[0].pontos == 11) {
				console.log("quem tem 11 é o time 0");


				// Ninguém pode trucar
				trucoJogadores[0].truco = "";
				trucoJogadores[1].truco = "";
				trucoJogadores[2].truco = "";
				trucoJogadores[3].truco = "";

				trucoEmTruco = true;
				trucoCorrer = 0;
				


				trucoAlvoTruco = [5,0,2];

				trucoMensagem.push(`Mão de 11? 
					❗❗❗ É TRUCO AUTOMÁTICO em cima de ${trucoJogadores[0].nome} e ${trucoJogadores[2].nome} ❗❗❗`)

				msg(`Mão do seu parceiro ${trucoJogadores[2].nome} : ${trucoJogadores[2].mao} `,trucoJogadores[0].id);
				msg(`Mão do seu parceiro ${trucoJogadores[0].nome} : ${trucoJogadores[0].mao} `,trucoJogadores[2].id);

				exec(ctx, trucomostroutecladotruco);

			} else {

				if (trucoJogadores[1].pontos == 11) {

					// Ninguém pode trucar
					trucoJogadores[0].truco = "";
					trucoJogadores[1].truco = "";
					trucoJogadores[2].truco = "";
					trucoJogadores[3].truco = "";

					trucoEmTruco = true;
					trucoCorrer = 0;

					trucoAlvoTruco = [5,1,3];

					trucoMensagem.push(`Mão de 11? 
						❗❗❗ É TRUCO AUTOMÁTICO em cima de ${trucoJogadores[1].nome} e ${trucoJogadores[3].nome} ❗❗❗`)

					msg(`Mão do seu parceiro ${trucoJogadores[1].nome} : ${trucoJogadores[1].mao} `,trucoJogadores[3].id);
					msg(`Mão do seu parceiro ${trucoJogadores[3].nome} : ${trucoJogadores[3].mao} `,trucoJogadores[1].id);

					exec(ctx, trucomensagemgeral, trucomostroutecladotruco);

				} else {
					
					exec(ctx, trucomostrouteclado)
				}
			}




	}

	next();
}



bot.command(['trucoentrar'], async ctx => {

	if (ctx.update.message.from.id == ctx.chat.id) {


		if (debug == false) {

				// Primeiro Jogador entrar

				if (trucoJogadores.length == 0) {
					trucoMensagem = [];

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
		
	} else {
		await ctx.reply(`Não é possível jogar truco dentro de um grupo. Me manda uma mensagem direta.`);
	}
	
})



bot.command(['truco'], async ctx => {

	var trucomensagemtruco = [];


	trucomensagemtruco.push(`♠♥♦♣ Bem-vindos à mesa de truco do Horácio ♠♥♦♣`);
	trucomensagemtruco.push(`

		/trucoentrar para entrar em uma mesa e começar a jogar`);
	trucomensagemtruco.push(`

		/trucoregras a ordem das cartas do truco`);
	trucomensagemtruco.push(`
		/trucolimpo para jogar com baralho limpo`);
	trucomensagemtruco.push(`
		/trucosujo para jogar com baralho sujo`);
	trucomensagemtruco.push(`
		/trucosair para abandonar uma partida`);
	trucomensagemtruco.push(`

	Escreva /chat + uma mensagem, para enviar um mensagem na mesa de truco`);


	if (trucoJogadores.length > 0) {
		var trucomensagemtrucoquem = []

		for (var i = 0; i < trucoJogadores.length; i++) {
			trucomensagemtrucoquem.push(trucoJogadores[0].nome);
		}
		trucomensagemtruco.push(`${trucomensagemtruco} estão na mesa de truco no momento.`);
	}


	await ctx.reply(""+trucomensagemtruco+"");
})


bot.command(['trucolimpo'], async ctx => {
	if (ctx.update.message.from.id == ctx.chat.id) {
		if (trucoComecou == false) {
			trucoBaralhoTipo = 'limpo';

			await ctx.reply("Você trocou o tipo de baralho para LIMPO");

			if (trucoJogadores.length > 0) {
				for (var i = 0; i < trucoJogadores.length; i++) {
					if (trucoJogadores[i].id != ctx.update.message.from.id) {
						await msg(ctx.update.message.from.first_name+" trocou o tipo de baralho para LIMPO ");
					}
				}
			}
			
		} else {
			await ctx.reply(`Já tem uma partida em andamento`);
		}
	} else {
		await ctx.reply(`Não é possível jogar truco dentro de um grupo. Me manda uma mensagem direta.`);
	}

})

bot.command(['trucosujo'], async ctx => {
	if (ctx.update.message.from.id == ctx.chat.id) {
		if (trucoComecou == false) {
			trucoBaralhoTipo = 'sujo';

			await ctx.reply("Você trocou o tipo de baralho para SUJO");

			if (trucoJogadores.length > 0) {
				for (var i = 0; i < trucoJogadores.length; i++) {
					if (trucoJogadores[i].id != ctx.update.message.from.id) {
						await msg(ctx.update.message.from.first_name+" trocou o tipo de baralho para SUJO ");
					}
				}
			}
			
		} else {
			await ctx.reply(`Já tem uma partida em andamento`);
		}
	} else {
		await ctx.reply(`Não é possível jogar truco dentro de um grupo. Me manda uma mensagem direta.`);
	}

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


	// msg direta
	if (ctx.update.message.from.id == ctx.chat.id) {
		// loading
		if (trucoLoading == false) {
			// existe partida
			if (trucoComecou == true) {
				// se é o seu turno
				if (trucoJogadores[trucoTurno].id == ctx.update.message.from.id) {
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
					}
				} else {
					await ctx.reply(`Não é sua vez`);
				}
			} else {
				await ctx.reply(`Não existe uma jogada ativa`);
			}
		} else {
			await ctx.reply(`Servidor ocupado, tente novamente.`);
		}

	}
	
})


bot.hears(["▫❓▫"], async ctx => {

	var trucoRandom = Math.floor((Math.random() * trucoJogadores[trucoTurno].mao.length))

	trucoCartaJogada = trucoJogadores[trucoTurno].mao[trucoRandom];
	var trucoCartaJogadaVisual = trucoCartaJogada;

	// msg direta
	if (ctx.update.message.from.id == ctx.chat.id) {
		// loading
		if (trucoLoading == false) {
			// existe partida
			if (trucoComecou == true) {
				// se é o seu turno
				if (trucoJogadores[trucoTurno].id == ctx.update.message.from.id) {
					// Se ele tem a carta na mão
					if (trucoJogadores[0].pontos == 11 && trucoJogadores[1].pontos == 11) {


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
						await ctx.reply(`Não é mão de ferro`);
					}
				} else {
					await ctx.reply(`Não é sua vez`);
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

						exec(ctx, trucocloading, trucolimparmesa, trucobaralho, trucoEmbaralhar, trucomanilha, trucoqueimar, trucodistribuircarta, trucomaodeonze, trucocloadingfim);
						
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

						exec(ctx, trucocloading, trucolimparmesa, trucobaralho, trucoEmbaralhar, trucomanilha, trucoqueimar, trucodistribuircarta, trucomaodeonze, trucocloadingfim);
						
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



bot.hears(["É Truco ❗❗❗", "É SEIS ❗❗❗", "É NOOOVE ❗❗❗", "DOOOZEEEE ❗❗❗"], async ctx => {
	// msg direta
	if (ctx.update.message.from.id == ctx.chat.id) {

		// loading
		if (trucoLoading == false) {
			// existe partida
			if (trucoComecou == true) {

				var trucoAlvoTrucoVeiode = 5;

				if (ctx.update.message.from.id == trucoJogadores[0].id) {
					trucoAlvoTrucoVeiode = 0;
				}

				if (ctx.update.message.from.id == trucoJogadores[1].id) {
					trucoAlvoTrucoVeiode = 1;
				}

				if (ctx.update.message.from.id == trucoJogadores[2].id) {
					trucoAlvoTrucoVeiode = 2;
				}

				if (ctx.update.message.from.id == trucoJogadores[3].id) {
					trucoAlvoTrucoVeiode = 3;
				}

				// Se o continuar veio do turno certo
				if (trucoJogadores[trucoAlvoTrucoVeiode].truco == "É Truco ❗❗❗") {

					if (ctx.update.message.from.id == trucoJogadores[trucoTurno].id) {
						trucoEmTruco = true;
						trucoCorrer = 0;

						if (trucoAlvoTrucoVeiode == 0 || trucoAlvoTrucoVeiode == 2) {

							trucoJogadores[0].truco = "";
							trucoJogadores[2].truco = "";

							trucoJogadores[1].truco = "É SEIS ❗❗❗";
							trucoJogadores[3].truco = "É SEIS ❗❗❗";

							trucoAlvoTruco = [trucoAlvoTrucoVeiode,1,3];
						}

						if (trucoAlvoTrucoVeiode == 1 || trucoAlvoTrucoVeiode == 3) {

							trucoJogadores[1].truco = "";
							trucoJogadores[3].truco = "";

							trucoJogadores[0].truco = "É SEIS ❗❗❗";
							trucoJogadores[2].truco = "É SEIS ❗❗❗";

							trucoAlvoTruco = [trucoAlvoTrucoVeiode,0,2];
						}

						trucoMensagem.push(`${trucoJogadores[trucoAlvoTruco[0]].nome} bateu na mesa e gritou! \n ❗❗❗ É TRUCO ❗❗❗`)



						exec(ctx, trucocloading, trucomensagemgeral, trucomostroutecladotruco, trucocloadingfim);

					} else {
						await ctx.reply(`Não é seu turno pra pedir truco`);
					}


				} else {
					if (trucoJogadores[trucoAlvoTrucoVeiode].truco == "É SEIS ❗❗❗") {

						trucoEmTruco = true;
						trucoCorrer = 0;

						trucoValorDaMao = 3;


						if (trucoAlvoTrucoVeiode == 0 || trucoAlvoTrucoVeiode == 2) {

							trucoJogadores[0].truco = "";
							trucoJogadores[2].truco = "";

							trucoJogadores[1].truco = "É NOOOVE ❗❗❗";
							trucoJogadores[3].truco = "É NOOOVE ❗❗❗";

							trucoAlvoTruco = [trucoAlvoTrucoVeiode,1,3];
						}

						if (trucoAlvoTrucoVeiode == 1 || trucoAlvoTrucoVeiode == 3) {

							trucoJogadores[1].truco = "";
							trucoJogadores[3].truco = "";

							trucoJogadores[0].truco = "É NOOOVE ❗❗❗";
							trucoJogadores[2].truco = "É NOOOVE ❗❗❗";

							trucoAlvoTruco = [trucoAlvoTrucoVeiode,0,2];
						}


						var trucoAlvoTrucoVeiodeParceiro = trucoAlvoTrucoVeiode-2;

						if (trucoAlvoTrucoVeiodeParceiro == -1) {
							trucoAlvoTrucoVeiodeParceiro = 3
						}

						if (trucoAlvoTrucoVeiodeParceiro == -2) {
							trucoAlvoTrucoVeiodeParceiro = 2
						}


						var tecladoTruco = JSON.stringify({"remove_keyboard":true})
						axios.get(`${apiUrl}/sendMessage?chat_id=${trucoJogadores[trucoAlvoTrucoVeiodeParceiro].id}&text=${encodeURI('Seu parceiro pediu seis!')}&reply_markup=${encodeURI(tecladoTruco)}`).catch(e => console.log(e))

						trucoMensagem.push(`${ctx.update.message.from.first_name} deu berro! \n ❗❗❗❗ É SEEEIIIIIS ❗❗❗❗`)
						exec(ctx, trucocloading, trucomensagemgeral, trucomostroutecladotruco, trucocloadingfim);

					} else {
						if (trucoJogadores[trucoAlvoTrucoVeiode].truco == "É NOOOVE ❗❗❗") {

							trucoEmTruco = true;

							trucoValorDaMao = 6;
							trucoCorrer = 0;

							
							if (trucoAlvoTrucoVeiode == 0 || trucoAlvoTrucoVeiode == 2) {

								trucoJogadores[0].truco = "";
								trucoJogadores[2].truco = "";

								trucoJogadores[1].truco = "DOOOZEEEE ❗❗❗";
								trucoJogadores[3].truco = "DOOOZEEEE ❗❗❗";

								trucoAlvoTruco = [trucoAlvoTrucoVeiode,1,3];
							}

							if (trucoAlvoTrucoVeiode == 1 || trucoAlvoTrucoVeiode == 3) {

								trucoJogadores[1].truco = "";
								trucoJogadores[3].truco = "";

								trucoJogadores[0].truco = "DOOOZEEEE ❗❗❗";
								trucoJogadores[2].truco = "DOOOZEEEE ❗❗❗";

								trucoAlvoTruco = [trucoAlvoTrucoVeiode,0,2];
							}




							var trucoAlvoTrucoVeiodeParceiro = trucoAlvoTrucoVeiode-2;

							if (trucoAlvoTrucoVeiodeParceiro == -1) {
								trucoAlvoTrucoVeiodeParceiro = 3
							}

							if (trucoAlvoTrucoVeiodeParceiro == -2) {
								trucoAlvoTrucoVeiodeParceiro = 2
							}


							var tecladoTruco = JSON.stringify({"remove_keyboard":true})
							axios.get(`${apiUrl}/sendMessage?chat_id=${trucoJogadores[trucoAlvoTrucoVeiodeParceiro].id}&text=${encodeURI('Seu parceiro pediu nove!')}&reply_markup=${encodeURI(tecladoTruco)}`).catch(e => console.log(e))


							trucoMensagem.push(`${ctx.update.message.from.first_name} jogou a cadeira no chão! \n ❗❗❗❗❗ É NOOOOOVE ❗❗❗❗❗`)
							exec(ctx, trucocloading, trucomensagemgeral, trucomostroutecladotruco, trucocloadingfim);

						} else {
							if (trucoJogadores[trucoAlvoTrucoVeiode].truco == "DOOOZEEEE ❗❗❗") {

								trucoEmTruco = true;

								trucoValorDaMao = 9;
								trucoCorrer = 0;


								
								if (trucoAlvoTrucoVeiode == 0 || trucoAlvoTrucoVeiode == 2) {

									trucoJogadores[0].truco = "";
									trucoJogadores[2].truco = "";

									trucoJogadores[1].truco = "";
									trucoJogadores[3].truco = "";

									trucoAlvoTruco = [trucoAlvoTrucoVeiode,1,3];
								}

								if (trucoAlvoTrucoVeiode == 1 || trucoAlvoTrucoVeiode == 3) {

									trucoJogadores[1].truco = "";
									trucoJogadores[3].truco = "";

									trucoJogadores[0].truco = "";
									trucoJogadores[2].truco = "";

									trucoAlvoTruco = [trucoAlvoTrucoVeiode,0,2];
								}



								var trucoAlvoTrucoVeiodeParceiro = trucoAlvoTrucoVeiode-2;

								if (trucoAlvoTrucoVeiodeParceiro == -1) {
									trucoAlvoTrucoVeiodeParceiro = 3
								}

								if (trucoAlvoTrucoVeiodeParceiro == -2) {
									trucoAlvoTrucoVeiodeParceiro = 2
								}


								var tecladoTruco = JSON.stringify({"remove_keyboard":true})
								axios.get(`${apiUrl}/sendMessage?chat_id=${trucoJogadores[trucoAlvoTrucoVeiodeParceiro].id}&text=${encodeURI('Seu parceiro pediu doze!')}&reply_markup=${encodeURI(tecladoTruco)}`).catch(e => console.log(e))


								trucoMensagem.push(`${ctx.update.message.from.first_name} derrubou a mesa!!! \n ❗❗❗❗❗❗ DOOOOOZZZZEEE LADRÃÃÃÃO ❗❗❗❗❗❗`)
								exec(ctx, trucocloading, trucomensagemgeral, trucomostroutecladotruco, trucocloadingfim);

							} 
						}
					}

				}


				// 
				
				
			} else {
				await ctx.reply(`Não existe uma jogada ativa`);
			}
		} else {
			await ctx.reply(`Servidor ocupado, tente novamente.`);
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

					var trucoAlvoTrucoVeiodeDesce = 5;

					if (ctx.update.message.from.id == trucoJogadores[0].id) {
						trucoAlvoTrucoVeiodeDesce = 0;
					}

					if (ctx.update.message.from.id == trucoJogadores[1].id) {
						trucoAlvoTrucoVeiodeDesce = 1;
					}

					if (ctx.update.message.from.id == trucoJogadores[2].id) {
						trucoAlvoTrucoVeiodeDesce = 2;
					}

					if (ctx.update.message.from.id == trucoJogadores[3].id) {
						trucoAlvoTrucoVeiodeDesce = 3;
					}


					// Se a pessoa foi alvo
					if (ctx.update.message.from.id == trucoJogadores[trucoAlvoTruco[1]].id || ctx.update.message.from.id == trucoJogadores[trucoAlvoTruco[2]].id) {

						trucoCorrer = 0;

						var trucoAlvoTrucoVeiodeDesceParceiro = trucoAlvoTrucoVeiodeDesce-2;

						if (trucoAlvoTrucoVeiodeDesceParceiro == -1) {
							trucoAlvoTrucoVeiodeDesceParceiro = 3
						}

						if (trucoAlvoTrucoVeiodeDesceParceiro == -2) {
							trucoAlvoTrucoVeiodeDesceParceiro = 2
						}
						

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

						var tecladoTruco = JSON.stringify({"remove_keyboard":true})
						axios.get(`${apiUrl}/sendMessage?chat_id=${trucoJogadores[trucoAlvoTrucoVeiodeDesceParceiro].id}&text=${encodeURI('Seu parceiro mandou descer!')}&reply_markup=${encodeURI(tecladoTruco)}`).catch(e => console.log(e))

						if (ctx.update.message.from.id == trucoJogadores[trucoTurno].id) {
							trucoMensagem.push(`${ctx.update.message.from.first_name} disse que vai descer!!!`);
						} else {
							trucoMensagem.push(`${ctx.update.message.from.first_name} mandou ${trucoJogadores[trucoTurno].nome} descer!!!`);
						}

						if (trucoMaodeFerro == false) {
							exec(ctx, trucocloading, trucomensagemgeral, trucomostrouteclado, trucocloadingfim);

						} else {
							exec(ctx, trucocloading, trucomensagemgeral, trucomostroutecladomaodeferro, trucocloadingfim);
						}

						
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

bot.hears(["Correr? ✖"], async ctx => {
	// msg direta
	if (ctx.update.message.from.id == ctx.chat.id) {
		// Se o continuar veio do turno certo
		if (trucoEmTruco == true) {

				// existe partida
				if (trucoComecou == true) {

					// Se a pessoa foi alvo
					if (ctx.update.message.from.id == trucoJogadores[trucoAlvoTruco[1]].id || ctx.update.message.from.id == trucoJogadores[trucoAlvoTruco[2]].id) {
						
						
						trucoCorrer += 1;
						
						if (trucoCorrer == 1) {
							trucoMensagem.push(`${ctx.update.message.from.first_name} acha melhor correr...`);
							exec(ctx, trucomensagemgeral);
						}
		
						if (trucoCorrer >= 2) {
							trucoEmTruco = false;

							var trucoAlvoTrucoCorrer1 = trucoAlvoTruco[1]-1;
							var trucoAlvoTrucoCorrer2 = trucoAlvoTruco[2]-1;

							if (trucoAlvoTrucoCorrer1 < 0) {

								trucoAlvoTrucoCorrer1 = 3;

							}


								trucoJogadores[trucoAlvoTrucoCorrer1].pontos += trucoValorDaMao;
								trucoJogadores[trucoAlvoTrucoCorrer2].pontos += trucoValorDaMao;

								trucoMensagem.push(`\n\n${trucoJogadores[trucoAlvoTruco[1]].nome} e ${trucoJogadores[trucoAlvoTruco[2]].nome} correram! 🐔🐔🐔

									${trucoJogadores[trucoAlvoTrucoCorrer1].nome} e ${trucoJogadores[trucoAlvoTrucoCorrer2].nome} ganharam esse jogo, somando ${trucoValorDaMao} na pontuação! 👍

									${trucoJogadores[0].nome} e ${trucoJogadores[2].nome} (${trucoJogadores[0].pontos}) X (${trucoJogadores[1].pontos}) ${trucoJogadores[1].nome} e ${trucoJogadores[3].nome}`);

								trucoCartasNaMesa = [];
								trucoMaiorValorVencedor = [];

								exec(ctx, trucoproximarodada);
							}
						
					}
					
				} else {
					await ctx.reply(`Não existe uma jogada ativa`);
				}
			

		} else {
			await ctx.reply(`Não é hora disso`);
		}
	}


})



bot.command(['mao'], async ctx => {
	// msg direta
	if (ctx.update.message.from.id == ctx.chat.id) {

		if (trucoJogadores.length > 0) {
			// Se o continuar veio do turno certo
			if (ctx.update.message.from.id == trucoJogadores[trucoTurno].id) {

				// loading
				if (trucoLoading == false) {
					// existe partida
					if (trucoComecou == true) {
						if (trucoEmTruco == false) {

							if (trucoMaodeFerro == false) {
								exec(ctx, trucomostrouteclado)	
							} else {
								exec(ctx, trucomostroutecladomaodeferro)
							}
							
							
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
	}

})

bot.command('chat', async ctx => {

	if (ctx.update.message.from.id == ctx.chat.id) {

		if (trucoJogadores.length > 1) {

			if (trucoJogadores[0].id == ctx.update.message.from.id || trucoJogadores[1].id == ctx.update.message.from.id || trucoJogadores[2].id == ctx.update.message.from.id || trucoJogadores[3].id == ctx.update.message.from.id) {

				var mimic = ctx.update.message.text

				var mimic = mimic.replace("/chat", "");
				
				for (var i = 0; i < trucoJogadores.length; i++) {
					if (trucoJogadores[i].id != ctx.update.message.from.id) {
						await msg(ctx.update.message.from.first_name+" disse: "+mimic,trucoJogadores[i].id);
					}
				}
				

			} else {
				await ctx.reply(`Você precisa estar jogando truco pra mandar mensagem pra galera`);
			}

		} else {
			await ctx.reply(`Ninguém está jogando truco agora`);
		}
	}


})


bot.command('trucoregras', async ctx => {

	if (ctx.update.message.from.id == ctx.chat.id) {
		await ctx.reply(`Ordem de força:

			[Zap! ♣] [Escopeta ♥] [Espadilha ♠] [Pica-Fumo ♦]
			[3] [2] [A] [K] [J] [Q] [7] [6] [5] [4]

			`);
	}
})

bot.command('trucosair', async ctx => {

	if (ctx.update.message.from.id == ctx.chat.id) {

		if (trucoJogadores.length > 0) {

			if (trucoJogadores[0].id == ctx.update.message.from.id || trucoJogadores[1].id == ctx.update.message.from.id || trucoJogadores[2].id == ctx.update.message.from.id || trucoJogadores[3].id == ctx.update.message.from.id) {

				
				

				if (trucoLoading == false) {
					for (var i = 0; i < trucoJogadores.length; i++) {
						await msg(ctx.update.message.from.first_name+" abandonou a partida :(", trucoJogadores[i].id);
					}


					exec(ctx, trucocloading, trucofim, trucocloadingfim);

				}
				

			} else {
				await ctx.reply(`Você precisa estar dentro de uma partida, para sair`);
			}

		} else {
			await ctx.reply(`Ninguém está jogando truco agora`);
		}
	}
})



// ------------------ BOLO -------------------

var funcionarios = ["Kiliano", "Otávio", "Mimi", "Emerson", "Rodrigo", "Isabel", "Jonathas", "Rogério", "Murilo", "Arnaldo", "Sarah", "Camilla", "Marina", "Marcelo", "Tony"];

bot.command('bolo', async ctx => {
	
	if (funcionarios.length > 0) {
		var currentIndex = funcionarios.length, temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = funcionarios[currentIndex];
			funcionarios[currentIndex] = funcionarios[randomIndex];
			funcionarios[randomIndex] = temporaryValue;
		}

		var funcionariossorteio = funcionarios[0];
		funcionarios.splice(0, 1);

		await ctx.reply(`🍰 Quem ganha bolo é.... ${funcionariossorteio}!! 🍰`);
	} else {
		await ctx.reply(`🍰 Cabou o bolo 🍰`);
	}

})

// ---------------- Sistema de Membros -----------------

var membrosJson = [
{ 
  "id": "309",
  "title": "0808080",
  "date": "2018-10-04T05:00:00.000Z",
  "customFields":[ 
       { "teste": "teste", "key": "00-id", "value": "123456" },
       { "teste": "teste", "key": "01-nome", "value": "Kiliano" },
       { "teste": "teste", "key": "02-random", "value": "848484" },
       { "teste": "teste", "key": "03-creditos", "value": "500" },
       { "teste": "teste", "key": "04-vitoriastruco", "value": "5" },
       { "teste": "teste", "key": "05-notificacaotruco", "value": "0" }
     ] 

},

{ 
  "id": "319",
  "title": "0808080",
  "date": "2018-10-04T05:00:00.000Z",
  "customFields":[ 
       { "teste": "teste", "key": "00-id", "value": idKiliano },
       { "teste": "teste", "key": "01-nome", "value": "Kiliano Teste" },
       { "teste": "teste", "key": "02-random", "value": "848484" },
       { "teste": "teste", "key": "03-creditos", "value": "500" },
       { "teste": "teste", "key": "04-vitoriastruco", "value": "5" },
       { "teste": "teste", "key": "05-notificacaotruco", "value": "0" }
     ] 
}
]


bot.command(['membros','pontos','perfil'], async ctx => {
	
	if (membrosJson.length > 0) {


		var membrosAnalizar = 0;

		// Checar se o id existe
		for (var i = 0; i < membrosJson.length; i++) {
			console.log(membrosJson[i].customFields[0]);
			if (membrosJson[i].customFields[0].value == ctx.update.message.from.id) {
				console.log("achou!");
				
				membrosAnalizar = membrosJson[i];

			} else {
				console.log("nao achou um perfil");
			}
		} 


		if (membrosAnalizar == 0) {
			await ctx.reply(`Não achei um perfil pra você. Já estou criando um...`);
			membrosJson.push({
				"title": ctx.update.message.from.first_name,
				"customFields":[ 
				       { "teste": "teste", "key": "00-id", "value": ctx.update.message.from.id },
				       { "teste": "teste", "key": "01-nome", "value": ctx.update.message.from.first_name },
				       { "teste": "teste", "key": "02-random", "value": Math.floor((Math.random() * 999999999999999999)) },
				       { "teste": "teste", "key": "03-creditos", "value": 500 },
				       { "teste": "teste", "key": "04-vitoriastruco", "value": 0 },
				       { "teste": "teste", "key": "05-notificacaotruco", "value": 0 }
				 ] 
			})
		} else {
			await ctx.reply(`Achei seu perfil ${membrosAnalizar.customFields[1].value}. Você tem ${membrosAnalizar.customFields[3].value}`);
		}

		console.log(membrosJson);



		
	}

	// await ctx.reply(`Ninguém está jogando truco agora`);
})


// Loop
bot.startPolling()