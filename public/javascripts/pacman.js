var Pac = Pac || {};
var canvas = document.getElementById('pacman');

Pac = 
{
	//vars globais
	canvas 			: $(canvas),
	ctx 			: canvas.getContext('2d'),
	tamanhoBoneco 	: 10,
	tamanhoPasso 	: 5,
	velocidadeBoneco: 300,
	alturaCenario 	: $(canvas).height(),
	larguraCenario	: $(canvas).width(),
	posicaoBoneco1	: {s:'b',x:0,y:0},
	posicaoBoneco2	: {s:'b',x:$(canvas).width()-10,y:0},

	//inicializador do projeto
	init : function()
	{
		Pac.movimentaBoneco();
	},

	//metodo que desenha o cenario
	movimentaBoneco : function()
	{
		setInterval(function()
		{
			Pac.limpaTela();

			if(Pac.posicaoBoneco1.s == 'b')
				Pac.posicaoBoneco1 = {s:'b', x:Pac.posicaoBoneco1.x, y:Pac.posicaoBoneco1.y+Pac.tamanhoBoneco};

			Pac.boneco(Pac.posicaoBoneco1.x,Pac.posicaoBoneco1.y);

		}, Pac.velocidadeBoneco);

	},

	//metodo com o desenho de 1 box do cenario
	boneco : function(x, y)
	{
	    this.ctx.beginPath(); // inicia um desenho.
	    this.ctx.fillStyle = 'blue'; // especifica a cor de preenchimento.
	    this.ctx.strokeStyle = 'red'; // especifica a cor de contorno.
	    this.ctx.rect(x, y, this.tamanhoBoneco, this.tamanhoBoneco); // especifica um retângulo.
	    this.ctx.stroke(); // contorna o desenho (dois retângulos).
	    this.ctx.fill(); // preenche o desenho (dois retângulos).    

	},

	limpaTela : function() {
		this.ctx.beginPath();
	    this.ctx.fillStyle = $(canvas).css('background-color');
		this.ctx.rect(0, 0, this.alturaCenario, this.larguraCenario);
		this.ctx.closePath();
		this.ctx.fill();
	}	
}

$(function()
{
	Pac.init();
});
