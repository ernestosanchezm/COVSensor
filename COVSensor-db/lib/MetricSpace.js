'use strict'

module.exports = function setupMetricSpace (MetricSpaceModel) {
  function add (_metricSpace) {
    const myMetricSpace = new MetricSpaceModel(_metricSpace)
    return myMetricSpace.save()
  }
  // HU23, HU24, HU25, HU26- Get level concentration by day, week, month
  function listAllMetricSpace() {
    return MetricSpaceModel.find();
  }

  function listDayMetricSpace() {
    //{ $group : { _id : "$item" } } ]
    //console.log(MetricSpaceModel.aggregate( [ { $group : { _id : "$id_ClosedSpace" } } ] ));
    return MetricSpaceModel.aggregate( [ { 
      $group : { 
        _id: { $dateToString: { format: "%Y-%m-%d %H", date: "$creatAt" } },
        value:{$avg: '$value'}
      } 
    } ] );  
  }

  function listMonthMetricSpace() {
    return MetricSpaceModel.aggregate( [ { 
      $group : { 
        _id: { $dateToString: { format: "%Y-%m", date: "$creatAt" } },
        value:{$avg: '$value'}
      } 
    } ] );   
  }

  function listWeekMetricSpace() {
    return MetricSpaceModel.find({
        $expr: {
            $eq: [
                {
                $week: "$creatAt"
                },
                {
                $week: new Date("2022-05-13")
                }
            ]
        }
    })
  }





    return{
        add,
        listAllMetricSpace,
        listDayMetricSpace,
        listMonthMetricSpace,
        listWeekMetricSpace
    }
}
