
const COVSensorCoordinator= require('./')

const coordinator = new COVSensorCoordinator({
  name: 'myapp',
  username: 'admin',
  interval: 2000
})

coordinator.connect()

// This coordinator only
coordinator.on('connected', handler)
coordinator.on('disconnected', handler)
coordinator.on('message', handler)

//Other coordinator
coordinator.on('coordinator/connected', handler)
coordinator.on('coordinator/disconnected', handler)
coordinator.on('coordinator/message', handler)

function handler (payload) {
  console.log(payload)
}

setTimeout(() => coordinator.disconnect(), 20000)
