const express = require('express');
var hbs = require('hbs');
var fs = require('fs');

var app = express();


app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.use((req, res, next) => {
    var now = new Date().toString();
    var logger = `${now}: ${req.method}, ${req.url} `;
    console.log(logger);
    fs.appendFile('server.log', logger, (error)=>{
        if (error) {
            console.log('Error is logging to Server.log');
        };
    })
    next();
})

//
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
//
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res)=>{
    res.render('home.hbs', {
        pageTitle: 'Home Page',
    currentYear : new Date().getFullYear()
});
    });

app.get('/about', (req, res)=>{
    res.render('about.hbs', {
        pageTitle : "About",
        currentYear : new Date().getFullYear()
});
});

app.get('/bad', (req, res)=> {
    res.send({
    Bad: 'Bad Request'
    });
});

app.listen(3000, ()=>{
    console.log ('Server is running on Port 3000')
});