'use strict'

// const debug = require('debug')('platziverse:db:setup')
const inquirer = require('inquirer')
const main = require('./')
require('dotenv').config() // variables globales
const prompt = inquirer.createPromptModule()
async function setup() {
  const answer = await prompt([{
    type: 'confirm',
    name: 'setup',
    message: 'Esta acción destruira la base de datos, esta seguro?'
  }])

  if (!answer.setup) {
    return console.log('No se realizo la acción :)')
  }
  console.log("DB_URI: ", process.env.DB_URI)
  await main(process.env.DB_URI).catch(handleFatalError)
}

function handleFatalError(err) {
  console.error(`[fatal error] ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

setup()