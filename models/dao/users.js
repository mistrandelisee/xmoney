

const db =require('../index.js');
const { Op } = require("sequelize");
var debug = require('debug')('xmoney:user_dao:users');
var {encryptText,compareWithEncryptedText} = require('../../utilities/util');
const {AppError,values} = require('../../utilities/error')
var user_dao={};
user_dao.register = async (inputs) => {
    const {user,transaction,commit} = inputs;
    if (!!user.password) { user.password=await encryptText(user.password); }
      user.token=await encryptText(new Date().toJSON());
      const email=user.email;

      // check if user is already
      const found_user=await findUser( {
                                  where:{
                                      'email':email,
                                      'is_deleted':false}
                                }) ;
      debug('--------..%o',found_user)
      if (found_user === null) {
        

      } else {
        const err= new AppError(`existing user with email ${email}`).dupliacte_found() ;
        throw err;
      }
      //insert
      const newuser = await db.utilisateur.create(user, { transaction,returning:true })
      if(commit) await transaction.commit();
      return {ssid:newuser.token, message:'user account created successfully',/*ok:newuser,*/}
}
user_dao.login = async (inputs) => {
  const {user,transaction,commit} = inputs;
  const {password,email,token} =  user;
  if((!password || !email) ){ throw new AppError(`Missing email or password`) ;}


   // find user by email
  const found_user=await findUser( {
                      where:{
                          'email':email,
                          'is_deleted':false}
                    }) ;
  debug('--------..%o',found_user)



  if (found_user === null) {
    const err= new AppError(`no existing user with email ${email}`);
    err.status=404; throw err ;
  }

  if (! compareWithEncryptedText(password, found_user.password)) {
    const err= new AppError(`Credentials not matching check your email or password`);
    err.status=404; throw err ;
  }
  const new_token=await encryptText(new Date().toJSON());
  const result= await updateUser({
    values:{email:found_user.email,token:new_token},
    where:{'id_utilisateur':found_user.id_utilisateur},
    transaction
  });
  if(commit) await transaction.commit();
  return {ssid:new_token, message:'logged In',/*ok:result*/}
}
user_dao.logout = async (inputs) => {
  const {user,transaction,commit} = inputs;
  const {token} =  user;
  if((!token) ){ throw new AppError(`Missing token`) ;}


   // find user by token
  const found_user=await findUser( {
                      where:{
                          'token':token,
                          'is_deleted':false}
                    }) ;
  debug('--------..%o',found_user)



  if (found_user === null) {
    const err= new AppError(`no existing session`);
    err.status=404; throw err ;
  }
  const result= await updateUser({
    values:{token:null},
    where:{'id_utilisateur':found_user.id_utilisateur},
    transaction
  });
  if(commit) await transaction.commit();
  return {ssid:null, message:'logged out',/*ok:result*/}
}

user_dao.getAgents = async (inputs) => {
  // const {user,transaction,commit} = inputs;
  const {token} =  user;
  if((!token) ){ throw new AppError(`Missing token`) ;}


   // find user by token
  const found_user=await findUser( {
                      where:{
                          'token':token,
                          'is_deleted':false}
                    }) ;
  debug('--------..%o',found_user)



  if (found_user === null) {
    const err= new AppError(`no existing session`);
    err.status=404; throw err ;
  }
  const result= await updateUser({
    values:{token:null},
    where:{'id_utilisateur':found_user.id_utilisateur},
    transaction
  });
  if(commit) await transaction.commit();
  return {ssid:null, message:'logged out',/*ok:result*/}
}
user_dao.findbyId= async (inputs) => {
  const {user,transaction,commit} = inputs;
  const uid=user?.id;
  const attributes= user.attributes || { exclude: ['password','token','is_deleted'] };// exclude pass by default
  debug('####################uid  ',uid)
  const found_user=await db.utilisateur.findOne({
    attributes,
    where:{
      'id_utilisateur':uid,
      'is_deleted':false},
    returning:true })//returning is to avoid exiting process on error...consider that the code will be run in try/catch block
    return found_user;
}

const findUser= async (inputs) => {
      const found_user=await db.utilisateur.findOne({
        where:inputs?.where 
        /*:{
          'email':email,
          'is_deleted':false
        }*/,
        returning:true })//returning is to avoid exiting process on error...consider that the code will be run in try/catch block
        return found_user;
}
const updateUser= async (inputs)=>{
  const {values,where,transaction}=inputs;
  const result=db.utilisateur.update( values /*{username:user.username,token:token}*/ ,{
                            where /*:{'username':user.username},*/ ,
                            transaction,
                            returning:true
                          }
                  )
  return result;
}
const findAll= async (inputs) => {
  let {include,where,attributes}=inputs;
  /**
   * include:[db.zone],
   * attributes: { exclude: ['password'] }
   */
  attributes= attributes || { exclude: ['password','token'] };// exclude pass by default
  const found_users=await db.utilisateur.findAll({
    attributes,
    include,
    where,
    returning:true })//returning is to avoid exiting process on error...consider that the code will be run in try/catch block
    return found_users;
}


user_dao.findUser=findUser;


module.exports = user_dao;