module.exports.checkSession = async (req, res,next)=>{
    if(req.headers.ssid){
       next(); 
       //console.log('user'+ JSON.stringify(req.session));    //If session exists, proceed to page
    } else {
        res.status(500).send({error:"no session"})
    }
}