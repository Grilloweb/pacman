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

	//inicializador do projeto
	init : function()
	{
		Pac.movimentaBoneco();
	},

	//metodo que desenha o cenario
	movimentaBoneco : function()
	{
		var seta = Pac.posicaoBoneco.s;

		$(document).on('keydown', function(e)
		{
			seta = Pac.setas(e.keyCode);

			if(seta == false)
				seta = Pac.posicaoBoneco.s;
		});

		setInterval(function()
		{
			Pac.limpaTela();

			switch (seta || Pac.posicaoBoneco.s)
			{
				case 'e' :
					var x = Pac.posicaoBoneco.x - Pac.tamanhoBoneco;
					if(x < 0)
						x = Pac.larguraCenario - Pac.tamanhoBoneco;
					else
						x = Pac.posicaoBoneco.x - Pac.tamanhoBoneco;

					Pac.posicaoBoneco = {s:seta, x:x, y:Pac.posicaoBoneco.y};
					break;
				case 'c' :
					var y = Pac.posicaoBoneco.y - Pac.tamanhoBoneco;
					if(y < 0)
						y = Pac.alturaCenario - Pac.tamanhoBoneco;
					else
						y = Pac.posicaoBoneco.y - Pac.tamanhoBoneco;

					Pac.posicaoBoneco = {s:seta, x:Pac.posicaoBoneco.x, y:y};
					break;
				case 'd' :
					var x = Pac.posicaoBoneco.x + Pac.tamanhoBoneco;
					if(x >= Pac.larguraCenario)
						x = 0 + Pac.tamanhoBoneco;
					else
						x = Pac.posicaoBoneco.x + Pac.tamanhoBoneco;

					Pac.posicaoBoneco = {s:seta, x:x, y:Pac.posicaoBoneco.y};
					break;
				case 'b' :
					var y = Pac.posicaoBoneco.y + Pac.tamanhoBoneco;
					if(y >= Pac.alturaCenario)
						y = 0 + Pac.tamanhoBoneco;
					else
						y = Pac.posicaoBoneco.y + Pac.tamanhoBoneco;

					Pac.posicaoBoneco = {s:seta, x:Pac.posicaoBoneco.x, y:y};
					break;
			}
			
			console.log(Pac.posicaoBoneco, seta);		

			Pac.boneco(Pac.posicaoBoneco.x,Pac.posicaoBoneco.y);
		
		}, Pac.velocidadeBoneco);
	},

	setas : function(keycode)
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
