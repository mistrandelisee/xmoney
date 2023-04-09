

const db =require('../models/index.js');
var debug = require('debug')('xmoney:sync');

module.exports.syncAll=()=>{
    var debugAll = debug
    db.sequelize.sync({'alter':true},{'logging':false})
    .then( (res) => { 
        debugAll('synchronize ok ')
       return res
     })
    .catch((e)=>{
        debugAll('ERROR :%O',e)
        return e
    })
        
}