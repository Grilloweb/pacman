
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
	var meuID = socket.id;
	players.data.push({id: meuID, posicao:false});

	socket.on('movimento', function (data)
	{
		for(var i =0; i < players.data.length; i++)
		{
			if(players.data[i].id == meuID)
				players.data[i].posicao = data;
		}

		var p = true;

		for(var i =0; i < players.data.length; i++)
		{
			if(players.data[i].posicao == false)
			{
				p = false;
				break;
			}
		}

		if(p)
		{
			for(var i =0; i < players.data.length; i++)
			{
				io.sockets.socket(players.data[i].id).emit('movimento2', players);
			}
		}
	});

});
//FINAMIZA a troca de informações

server.listen(3001, function(){
  console.log('Express server listening on port ' + app.get('port'));
});
