




# platziverse-coordinator

## Usage

``` js
const Platziversecoordinator = require('platziverse-coordinator')

const coordinator = new Platziversecoordinator({
  name: 'myapp',
  username: 'admin',
  interval: 2000
})

coordinator.addMetric('rss', function getRss () {
  return process.memoryUsage().rss
})

coordinator.addMetric('promiseMetric', function getRandomPromise () {
  return Promise.resolve(Math.random())
})

coordinator.addMetric('callbackMetric', function getRandomCallback (callback) {
  setTimeout(() => {
    callback(null, Math.random())
  }, 1000)
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
```