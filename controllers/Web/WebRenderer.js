const __ = require('../../helper/Response');

class Web {
    index(req, res){
        return res.render('../views/index.ejs');
    }
}

Web = new Web();
module.exports = Web;