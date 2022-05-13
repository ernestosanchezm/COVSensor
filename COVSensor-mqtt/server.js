'use strict'

const debug = require('debug')('COVSensor:mqtt')
const mosca = require('mosca')
const redis = require('redis')
const db=require('covsensor-db')
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

let User,Arduino,Alarm,AirBomb,Sensor,MetricSpace;   //stores de la base de datos
const clients=new Map();
const datosVariables=new Map();

server.on('ready',async () => {
  const services=await db("mongodb+srv://USER_COVSENSOR:123@cluster0.cbbrw.mongodb.net/covsensor-db?retryWrites=true&w=majority").catch(handleFatalError);
  User=services.storeUser;
  Alarm=services.storeAlarm;
  Arduino=services.storeArduino;
  AirBomb=services.storeAirBomb;
  Sensor=services.storeSensor;
  MetricSpace=services.storeMetricSpace;
  console.log(`server is running`)
})

server.on('published', async (packet, client) => {  
  switch (packet.topic) {    
    case 'coordinator/connected':
    case 'coordinator/disconnected':
      console.log(packet.payload);
      break
    case 'coordinator/airbomb/off':
      console.log(String(packet.payload));
      break;
    case 'coordinator/airbomb/on':
      console.log(String(packet.payload));
      break;   
    case 'coordinator/alarm/off':
      console.log(String(packet.payload));
      break;
    case 'coordinator/alarm/on':
      console.log(String(packet.payload));
      break;
    case 'coordinator/message':      
      const payload = parsePayload(packet.payload)
      console.log(payload.metric);
          
      if (payload) {           
        
        try {
          await MetricSpace.add({
            value:payload.metric,      
          });
        } catch (e) {
          return handleError(e)
        }
      }    

      // if (!clients.get(client.id)) {
      //   clients.set(client.id, "123")
      //   server.publish({
      //     topic: 'coordinator/connected',
      //     payload: JSON.stringify({
      //       "arduino": {
      //         _id:"gg"
      //       }
      //     })
      //   })
      // }
      break;   
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