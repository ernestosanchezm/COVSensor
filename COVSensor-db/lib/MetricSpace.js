'use strict'
module.exports = function setupMetricSpace (MetricSpaceModel) {
  function add (_metricSpace) {
    const myMetricSpace = new MetricSpaceModel(_metricSpace)
    return myMetricSpace.save()
  }

  return {
    add,   
  }
}
