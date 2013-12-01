var db              = require('./db'),
    util            = require('./util'),
    express         = require('express'),
    Bitcoin         = require('bitcoinjs-lib'),
    crypto          = require('crypto'),
    http            = require('http'),
    btc             = require('./btc'),
    async           = require('async'),
    _               = require('underscore');

var eh = util.eh,
    mkrespcb = util.mkrespcb,
    pybtctool = util.pybtctool;

var app = express();

app.configure(function() {
     app.set('views',__dirname + '/views');                                                  
     app.set('view engine', 'jade'); app.set('view options', { layout: false });             
     app.use(express.bodyParser());                                                          
     app.use(express.methodOverride());                                                      
     app.use(app.router);                                                                    
     app.use(express.static(__dirname + '/public'));                                         
});

app.post('/pushtx',btc.pushTx)
app.get('gettx',btc.getTx)
app.post('gettx',btc.getTx)
app.get('history',btc.getOutputs)
app.post('history',btc.getOutputs)

app.listen(3191);

return app;
