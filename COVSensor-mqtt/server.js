'use strict'

const debug = require('debug')('COVSensor:mqtt')
const mosca = require('mosca')
const redis = require('redis')
const db=require('COVSensor-db')
const {parsePayload}=require('./utils')
//inicializar bd


const backend = {
  type: 'redis',
  redis,
  return_buffers: true
}

const settings = {
  port: 1883,
  backend
}

const server = new mosca.Server(settings)

server.on('clientConnected', client => {
  clients.set(client.id,null)
  debug(`Client Connected: ${client.id}`)
})

server.on('clientDisconnected', client => {
  debug(`Client Disconnected: ${client.id}`)
})

let User,Arduino,Alarm;   //stores de la base de datos
const clients=new Map();

server.on('ready',async () => {
  const services=await db("mongodb+srv://USER_COVSENSOR:123@cluster0.cbbrw.mongodb.net/covsensor-db?retryWrites=true&w=majority").catch(handleFatalError);
  User=services.storeUser;
  Alarm=services.storeAlarm;
  Arduino=services.storeArduino;
  AirBomb=services.storeAirBomb;
  Sensor=services.storeSensor;
  console.log(`server is running`)
})

server.on('published', async (packet, client) => {
  debug(`Received: ${packet.topic}`)

  switch (packet.topic) {
    case 'metricsClosedSpace/connected':
    case 'metricsClosedSpace/disconnected':
      debug(`Payload: ${packet.payload}`)
      break
    case 'metricsClosedSpace/message':
      debug(`Payload: ${packet.payload}`)

      const payload = parsePayload(packet.payload)
      console.log('ESTE ES LA DATA',payload)

      if (payload) {
        payload.connected = true;       
        let arduino;
        try {
          arduino = await Arduino.createOrUpdate(payload)
        } catch (e) {
          return handleError(e)
        }

        debug(`Arduino ${arduino._id} saved`)

        // Notify Agent is Connected
        if (!clients.get(client.id)) {
          clients.set(client.id, arduino)
          server.publish({
            topic: 'arduinos/connected',
            payload: JSON.stringify({
              "arduino": {
                _id:arduino._id
              }
            })
          })
        }
      }
      break
  }
})


server.on('error', handleFatalError)

function handleFatalError (err) {
  console.error(`'[fatal error]' ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

function handleError (err) {
  console.error(`[error] ${err.message}`)
  console.error(err.stack)
}
process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)