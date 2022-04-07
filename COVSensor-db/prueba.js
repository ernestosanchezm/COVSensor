'use strict'

// const debug = require('debug')('platziverse:db:setup')
const inquirer = require('inquirer')
const main = require('./')
require('dotenv').config() // variables globales

async function setup () {  
  return await main(process.env.DB_URI).catch(handleFatalError);
}

function handleFatalError (err) {
  console.error(`[fatal error] ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

setup().then((stores)=>{
    const myUser={
        userName:'username_prueba',
        name:'name_prueba',
        lastName:'lastName_prueba',
        eMail:'eMail_prueba',
        psw:'psw_prueba',
        isAdmin:true
    };
    
    stores.storeUser.add(myUser);
});
