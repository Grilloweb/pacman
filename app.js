
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();
var server = http.createServer(app);

// all environments
app.set('port', process.env.PORT || 3001);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

//INICIA a troca de informações
var players = {data: []};
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) 
{
	var meuID 				= socket.id;
	var randomColor 		= Math.floor(Math.random()*16777215).toString(16);
	var tamanhoBoneco 		= 10;
	var tamanhoPasso 		= 5;
	var velocidadeBoneco 	= 1000;
	var alturaCenario 		= 400;
	var larguraCenario 		= 400;
	var posicaoBoneco		= {s:'b',x:0,y:0};

	players.data.push({id: meuID, cor:randomColor, posicao:posicaoBoneco});

	socket.on('direcao', function (seta)
	{
		for(var i =0; i < players.data.length; i++)
		{
			if(players.data[i].id == meuID)
				players.data[i].posicao.s = seta;
		}

	});  
	console.log(' AAAAAA ');

	setInterval(function()
	{
		for(var i =0; i < players.data.length; i++)
		{
			var posicao = players.data[i].posicao;

			if(players.data[i].id == meuID)
			{
				switch (posicao.s)
				{
					case 'e' :
						var x = posicao.x - tamanhoBoneco;
						if(x < 0)
							x = larguraCenario - tamanhoBoneco;
						else
							x = posicao.x - tamanhoBoneco;

						players.data[i].posicao = {s:posicao.s, x:x, y:posicao.y};
						break;
					
					case 'c' :
						var y = posicao.y - tamanhoBoneco;
						if(y < 0)
							y = alturaCenario - tamanhoBoneco;
						else
							y = posicao.y - tamanhoBoneco;

						players.data[i].posicao = {s:posicao.s, x:posicao.x, y:y};
						break;
					
					case 'd' :
						var x = posicao.x + tamanhoBoneco;
						if(x >= larguraCenario)
							x = 0 + tamanhoBoneco;
						else
							x = posicao.x + tamanhoBoneco;

						players.data[i].posicao = {s:posicao.s, x:x, y:posicao.y};
						break;
					
					case 'b' :
						var y = posicao.y + tamanhoBoneco;
						if(y >= alturaCenario)
							y = 0 + tamanhoBoneco;
						else
							y = posicao.y + tamanhoBoneco;

						players.data[i].posicao = {s:posicao.s, x:posicao.x, y:y};
						break;
				}

				colisao(players.data[i].posicao);
			}
		}

		socket.emit('movimento', players);
	
	}, velocidadeBoneco);

	var colisao = function(player)
	{
		for(var i =0; i < players.data.length; i++)
		{
			if(players.data[i].id != meuID && players.data[i].posicao.x == player.x && players.data[i].posicao.y == player.y)
			{
				console.log('COLISAO');
			}
		}
	}


});

//FINAMIZA a troca de informações

server.listen(3001, function(){
  console.log('Express server listening on port ' + app.get('port'));
});
