const bcrypt = require('bcrypt');
module.exports.encryptText = async(text) =>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(text, salt);
}
async function checkFirstLoading(req, res,next){
    if(!isLoading){
       next(); //If all confs have load already exists, proceed to page
    }
    else {
        await Loadconfs(); 
        next();
    }
 }
function checkSignIn(req, res,next){
    if(req.session.user){
       next(); 
       //console.log('user'+ JSON.stringify(req.session));    //If session exists, proceed to page
    } else {
        eMessage = 'Prima Login';
        //console.log('No user'+ JSON.stringify(req.session));
        res.redirect('/');
    }
 } 