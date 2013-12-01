var db              = require('./db'),
    util            = require('./util'),
    Bitcoin         = require('bitcoinjs-lib'),
    async           = require('async'),
    _               = require('underscore');

var eh = util.eh,
    mkrespcb = util.mkrespcb,
    pybtctool = util.pybtctool;

var m = module.exports = {}

m.getTx = function(hash,cb) {
    var scope = {}
    async.series([
        function(cb2) {
            db.Transaction.findOne({ hash: hash },cbsetter(scope,'tx',cb2))
        },
        function(cb2) {
            if (!data) {
                pybtctool('get_tx_data '+hash,eh(cb2,function(d) {
                    try {
                        scope.tx = JSON.parse(d);
                        scope.tx.hash = req.hash
                        db.Transaction.insert(scope.tx,cb2)
                    }
                    catch(e) { cb2(e) }
                }))
            }
            else cb2();
        }
    ],eh(cb2,function() { res.json(scope.tx) }))
}

m.fetchTx = function(req,res) {
    var h = '' + req.param('hash')
    if (h.length != 64) return res.json('invalid hash')
    m.getTx(h,mkrespcb(res,400,function(data) { res.json(data) }))
}

m.pushTx = function(req,res) {
    var tx = '' + req.param('tx')
    pybtctool('pushtx',tx,mkrespcb(res,400,function(x) { res.json(x) }))
}

m.getOutputs = function(req,res) {
    var a = req.param('address')
    pybtctool('history',a,mkrespcb(res,400,function(h) { 
        try { res.json(JSON.parse(h)) }
        catch(e) { res.json(e,500) }
    }))
}
