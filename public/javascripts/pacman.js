var Pac = Pac || {};
var canvas = document.getElementById('pacman');

Pac = 
{
	//vars globais
	canvas 			: $(canvas),
	ctx 			: canvas.getContext('2d'),
	tamanhoBoneco 	: 10,
	tamanhoPasso 	: 5,
	velocidadeBoneco: 100,
	alturaCenario 	: $(canvas).height(),
	larguraCenario	: $(canvas).width(),
	posicaoBoneco	: {s:'b',x:0,y:0},
    socket 			: io.connect('http://10.46.9.59:3001'),

	//inicializador do projeto
	init : function()
	{
		Pac.Seta.init();
		Pac.Pega.init();
		Pac.movimentaBoneco();
	},

	//metodo que desenha o cenario
	movimentaBoneco : function()
	{
		var seta = Pac.posicaoBoneco.s;

		$(document).on('keydown', function(e)
		{
			seta = Pac.posicao(e.keyCode);

			if(seta)
				Pac.Seta.movimento(seta);
		});
	},

	posicao : function(keycode)
	{
		var seta = false;

		switch (keycode)
		{
			case 37 :
				seta = 'e';
				break;
			case 38 :
				seta = 'c';
				break;
			case 39 :
				seta = 'd';
				break;
			case 40 :
				seta = 'b';
				break;
			default : 
				seta = false;
		}

		return seta;
	},

	//metodo com o desenho de 1 box do cenario
	boneco : function(players)
	{
		Pac.limpaTela();

			// console.log(players);
		for(var i =0; i < players.data.length; i++)
		{
			this.ctx.beginPath(); // inicia um desenho.
		    this.ctx.fillStyle = players.data[i].cor; // especifica a cor de preenchimento.
		    this.ctx.strokeStyle = 'red'; // especifica a cor de contorno.
		    this.ctx.rect(players.data[i].posicao.x, players.data[i].posicao.y, this.tamanhoBoneco, this.tamanhoBoneco); // especifica um retângulo.
		    this.ctx.stroke(); // contorna o desenho (dois retângulos).
		    this.ctx.fill(); // preenche o desenho (dois retângulos).    
		}

	},

	limpaTela : function() {
		this.ctx.beginPath();
	    this.ctx.fillStyle = $(canvas).css('background-color');
		this.ctx.rect(0, 0, this.alturaCenario, this.larguraCenario);
		this.ctx.closePath();
		this.ctx.fill();
	},

	Seta :
	{
		init : function()
		{
			// Pac.socket.emit('propriedades', {altura: Pac.alturaCenario, largura: Pac.larguraCenario})
		},

		movimento : function(seta)
		{
			Pac.socket.emit('direcao', seta );
		}
	},

	Pega : 
	{
		init : function()
		{
			Pac.socket.on('movimento', function (players) {
				Pac.boneco(players);
			});

			// Pac.socket.emit('movimento', { posicaoBoneco: data });
		}
	}
}

$(function()
{
	Pac.init();
});
