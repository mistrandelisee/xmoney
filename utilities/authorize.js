const CONSUMER_KEY = 'NOELI_IT';
const user_dao =require('../models/dao/users.js');
module.exports.checkSession = async (req, res,next)=>{
    if(req.headers['consumer-key']==CONSUMER_KEY){
       next(); 
       //console.log('user'+ JSON.stringify(req.session));    //If session exists, proceed to page
    } else {
        res.status(500).send({error:"Unauthorized consumer"})
    }
}
module.exports.checkAutorized = async (req, res,next)=>{
    if(req.headers.ssid){
        const found_user=await user_dao.findUser( {
            where:{
                'token':req.headers.ssid,
                'is_deleted':false}
            }) ;
        if (found_user === null) { res.status(500).send({error:"Invalid session"}) }
        req.autorized_user=found_user;
       next(); 
       //console.log('user'+ JSON.stringify(req.session));    //If session exists, proceed to page
    } else {
        res.status(500).send({error:"no session"})
    }
}