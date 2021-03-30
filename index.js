var express = require('express');
var app = express();
var methodOverride = require('method-override');

app.set('view engine', 'ejs');

var users = [
	{id: 1001, name: "Nguyen A", subject: "Math", grade: "7"}, 
	{id: 1002, name: "Nguyen B", subject: "Math", grade: "8"},
	{id: 1003, name: "Nguyen C", subject: "Math", grade: "4"}, 
	{id: 1004, name: "Nguyen D", subject: "Math", grade: "5"}, 
	{id: 1005, name: "Nguyen E", subject: "Math", grade: "6"}, 
	{id: 1006, name: "Nguyen F", subject: "Math", grade: "7"}, 
	{id: 1007, name: "Nguyen G", subject: "Math", grade: "3"}, 
	{id: 1008, name: "Nguyen H", subject: "Math", grade: "8"}, 
	{id: 1009, name: "Nguyen I", subject: "Math", grade: "3"}, 
	{id: 1010, name: "Nguyen K", subject: "Math", grade: "2"}, 
	{id: 1011, name: "Nguyen J", subject: "Math", grade: "6"}
];



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
//app.use(methodOverride('_method'));
app.use(methodOverride(function (req, res) {
	if (req.body && typeof req.body === 'object' && '_method' in req.body) {
	  // look in urlencoded POST bodies and delete it
	  var method = req.body._method
	  delete req.body._method
	  return method
	}
  }))

app.get('/', function(req, res) {
    res.render('home',{users: users});
});

app.get('/search', (req,res) => {
	
	var id_search = req.query.id;
	console.log(req.query);
	var result = users.filter((user) => {
		return user.id==id_search
	})

	res.render('search', {
		users: result
	});
});

app.get('/add', function(req, res) {
	res.render('add');

});
app.post('/', function(req, res) {
	var newId = 1000;
	if(users.length>1) newId = parseInt(users[users.length-1].id)+1;
	console.log(req.body);
	//users.push(req.body);
	users.push({
		id : newId,
		name : req.body.name,
		subject : req.body.subject,
		grade : req.body.grade
	});
	res.render('home',{users: users});

});

app.put('/', function(req, res) {
	console.log(req.body);
    for (let index = 0; index < users.length; index++) {
		if(req.body.id==users[index].id){
			users[index].name = req.body.name;
			users[index].subject = req.body.subject;
			users[index].grade = req.body.grade;
			break;

		}

	}
	
    res.render('home',{users: users});
});

app.get('/update', function(req, res) {
    var id_ud = req.query.id;
	var result = users.filter((user) => {
		return user.id==id_ud
	})

	res.render('update', {
		users: result
	});
});
app.delete('/', function(req, res) {
	var id_del = req.body.id;
	console.log(req.body);
	var result = users.filter((user) => {
		return user.id!==parseInt(id_del)
	})

	users = result;
	console.log(id_del);
	console.log(result);	
    res.render('home',{users: users});
});

app.listen(3000);