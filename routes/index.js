
/*
 * GET home page.
 */


exports.index = function(req, res, obj){
	res.render('index', { title: 'Pacman' });
};