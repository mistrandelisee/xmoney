

const db =require('../models/index.js');
var debug = require('debug')('learn:synchronize:persone');
module.exports.sync=()=>{
    db.personne.sync({'alter':true})
    .then( (res) => { 
        console.log(res);
        debug('res ',res)
       return res
     })
    .catch((e)=>{
        debug('ERROR :%S',e)
        console.log(e);
        return e
    })
        
}
module.exports.syncAll=()=>{
    db.sequelize.sync({'alter':true})
    .then( (res) => { 
        console.log('all res');
        // console.log(res);
        debug('res ',res)
       return res
     })
    .catch((e)=>{
        debug('ERROR :%S',e)
        console.log(e);
        return e
    })
        
}