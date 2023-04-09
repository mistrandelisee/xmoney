var express = require('express');
var router = express.Router();
const db =require('../models/index.js');
var debug = require('debug')('xmoney:routes:users');


var {encryptText} = require('../utilities/util');
const {AppError,values} = require('../utilities/error')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register',async function(req, res, next) {
  //debug('%o',req.body)
  var  user=req.body.user;
  if (user) {
    // First, we start a transaction from your connection and save it into a variable
    const t = await db.sequelize.transaction();
    try {

      if (!!user.password) { user.password=await encryptText(user.password); }
      user.token=await encryptText(new Date().toJSON());
      const email=user.email;

      // check if user is already
      const found_user=await db.utilisateur.findOne({
                                                  where:{
                                                    'email':email,
                                                    'is_deleted':false
                                                  },
                                                  returning:true })
      debug('--------..%o',found_user)
      if (found_user === null) {
        //insert
        const newuser = await db.utilisateur.create(user, { transaction: t,returning:true })
        await t.commit();
        res.status(201).send({ssid:newuser.token, message:'user account created successfully',
          //ok:newuser,
          })

      } else {
        const err= new AppError(`existing user with email ${email}`).dupliacte_found() ;
        throw err;
      }
      
      
    } catch (error) {
      debug('-----error')
      console.error(error);
      // If the execution reaches this line, an error was thrown.
      // We rollback the transaction.
      if(t) {
        await t.rollback();
      }
      let code=values.DEFAULT_SYS_ERR_CODE;
      if(error?.hasOwnProperty('statusCode')){code=error?.statusCode()}
      res.status(  code);
      res.send({message:error?.message})
    }
    
}else{  res.status(500).send({error:"Invalid request format"})
}
});

module.exports = router;
