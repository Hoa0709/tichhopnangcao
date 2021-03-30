var fs=require('fs');
var express = require('express');
var app = express();

//var bodyParser = require('body-parser');
app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
    var data=fs.readFileSync('data.json', 'utf8');
    var db = JSON.parse(data);
    res.json(db);

});

app.get('/:id', function(req, res) {
    var data=fs.readFileSync('data.json', 'utf8');
    var db = JSON.parse(data);
    var pfind= db.filter((p) => {
		return p.id==parseInt(req.params.id);

	})
    pfind.length<1?res.json({message:`not find id: ${req.params.id}`}):res.json(pfind);
    
});
app.post('/', function(req, res){
    var data = fs.readFileSync('data.json', 'utf8');
    var db = JSON.parse(data);
    var newId = 0;
    var n = req.query.name;
    //if(n.length<1) n = req.body.name;
    console.log(req.body.name);
    db.length<1 ? newId = 1 : newId = parseInt(db[db.length-1].id)+1;
    db.push({
        name: req.query.name,
        id: newId
        
    });
    //fs.writeFile('data.json', db);
    fs.writeFile ("data.json", JSON.stringify(db), function(err) {
        if (err) throw err;
        console.log('complete');
        }
    );
    res.json(db);

});
app.put('/:id', function(req, res) {
    var data=fs.readFileSync('data.json', 'utf8');
    var db = JSON.parse(data);
    var x = -1;
    for (let index = 0; index < db.length; index++) {
		if(req.params.id==db[index].id){
            x = index;
			db[index].name = req.query.name;
			break;

		}

	}
    if(x==-1){
        res.json({message:`not find id:${req.params.id}`})
    }else{
        res.json(db);
        fs.writeFile ("data.json", JSON.stringify(db), function(err) {
            if (err) throw err;
            console.log('complete');

        });
    }
       
});
app.delete('/:id',function(req,res) {
    var data=fs.readFileSync('data.json', 'utf8');
    var db = JSON.parse(data);
    var dbdel= db.filter((p) => {
		return p.id!==parseInt(req.params.id);

	})
	if(dbdel.length==db.length){
        res.json({message:`not find id: ${req.params.id}`})
    }else{
        res.json(dbdel);
        fs.writeFile ("data.json", JSON.stringify(dbdel), function(err) {
            if (err) throw err;
            console.log('complete');

        });
    }
    
})


app.listen(8080);