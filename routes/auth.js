var express = require('express');
var router = express.Router();
const db =require('../models/index.js');
const user_dao =require('../models/dao/users.js');
var debug = require('debug')('xmoney:routes:users');


var {encryptText} = require('../utilities/util.js');
const {AppError,values} = require('../utilities/error.js')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register',async function(req, res, next) {
  //debug('%o',req.body)
  var  user=req.body.user;
  if (user) {
    // First, we start a transaction from your connection and save it into a variable
    const transaction = await db.sequelize.transaction();
    try {
      const result = await user_dao.register({user,transaction,commit:true});
      res.status(201).send(result);
    } catch (error) {
      // If the execution reaches this line, an error was thrown.
      // We rollback the transaction.
      await transaction?.rollback();
      debug('-----error')
      console.error(error);
      let code=values.DEFAULT_SYS_ERR_CODE;
      if(error?.hasOwnProperty('statusCode')){code=error?.statusCode()}
      res.status(  code);
      res.send({message:error?.message})
    }
    
  }else{  res.status(500).send({error:"Invalid request format"})}
});

router.post('/login',async function(req, res, next) {
  debug('#########################LOGIN START')
  debug('%o',req.body)
  var  user=req.body.user;
  if (user) {
    // First, we start a transaction from your connection and save it into a variable
    const transaction = await db.sequelize.transaction();
    try {
      const result = await user_dao.login({user,transaction,commit:true});
      res.status(201).send(result);
    } catch (error) {
      // If the execution reaches this line, an error was thrown.
      // We rollback the transaction.
      await transaction?.rollback();
      debug('-----error')
      console.error(error);
      let code=values.DEFAULT_SYS_ERR_CODE;
      if(error?.hasOwnProperty('statusCode')){code=error?.statusCode()}
      res.status(  code);
      res.send({message:error?.message})
    }
    
  }else{  res.status(500).send({error:"Invalid request format"})}
  debug('#########################LOGIN END')
});
router.post('/logout',async function(req, res, next) {
  debug('#########################LOGOUT START')
  debug('%o',req.body)
  var  user=req.body.user;
  if (user) {
    // First, we start a transaction from your connection and save it into a variable
    const transaction = await db.sequelize.transaction();
    try {
      const result = await user_dao.logout({user,transaction,commit:true});
      res.status(201).send(result);
    } catch (error) {
      // If the execution reaches this line, an error was thrown.
      // We rollback the transaction.
      await transaction?.rollback();
      debug('-----error')
      console.error(error);
      let code=values.DEFAULT_SYS_ERR_CODE;
      if(error?.hasOwnProperty('statusCode')){code=error?.statusCode()}
      res.status(  code);
      res.send({message:error?.message})
    }
    
  }else{  res.status(500).send({error:"Invalid request format"})}
  debug('#########################LOGOUT END')
});

module.exports = router;
