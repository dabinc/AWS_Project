var mysql = require('mysql');
var http = require('http');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const config = {
	host    : "10.0.0.12",
        user    : "root",
        password: "It12345!",
        port    : 3306
}
var connection = mysql.createConnection(config);

connection.connect(function(err) {
        if (err) {
                console.error("Database connection failed : " + err.stack);
                return;
        }

        console.log('Connected to database.');
});

connection.changeUser({
    database : 'project'
}, (err) => {
    if (err) {
      console.log('Error in changing database', err);
      return;
    }
    // Do another query
});

//app.get('', (req, res) => {
//	res.sendFile(__dirname + '/main.html')
//})

app.set('view engine', 'ejs');
//app.engine('html',require('ejs').renderFile);


app.get('/main3.js', function (req, res, next) {
//    res.render('main3.js')  
	var output = '';
	connection.query('select * from board;', function (err, rows, fields) {
        if (!err) {
            for(let i=0; i <rows.length; ++i)
            {              
                var board_id = rows[i]['board_id'];
                var title = rows[i]['title'];
                var content = rows[i]['content'];
                var time = rows[i]['time'];

                output += '<tr><td>' + board_id + '</td>' +
			    '<td>' + title + '</td>' +
			    '<td>' + content + '</td>' +
			    '<td>' + time + '</td></tr>';
	    }
		//console.log(output);
		res.send(output);
		
            	res.render('board.html', {'output': output}, function(err, html){
			if (err){
				console.log(err)
			}
			res.end(html)
		});
		
            }else{
                res.statusCode=302
                res.setHeader("Location","http://13.125.125.45/404.html");
                res.end();
            }
    }); return (output);
	connection.end();
}).listen(3000);

 app.engine('html',require('ejs').renderFile);
app.get('/board.html.js', function(req, res) {
	res.render('board.html')
});

