'use strict'

module.exports = function setupMetricSpace (MetricSpaceModel) {

  // HU23, HU24, HU25, HU26- Get level concentration by day, week, month
  function listAllMetricSpace() {
    return MetricSpaceModel.find();
  }

  function listDayMetricSpace() {
    return MetricSpaceModel.find({
        $expr: {
            $eq: [
                {
                $dayOfMonth: "$creatAt"
                },
                {
                $dayOfMonth: new Date("2022-05-12")
                }
            ]
        }
    })
  }

  function listMonthMetricSpace() {
    return MetricSpaceModel.find({
        $expr: {
            $eq: [
                {
                $month: "$creatAt"
                },
                {
                $month: new Date("2022-05-12")
                }
            ]
        }
    })
  }

  function listWeekMetricSpace() {
    return MetricSpaceModel.find({
        $expr: {
            $eq: [
                {
                $week: "$creatAt"
                },
                {
                $week: new Date("2022-05-12")
                }
            ]
        }
    })
  }





    return{
        listAllMetricSpace,
        listDayMetricSpace,
        listMonthMetricSpace,
        listWeekMetricSpace
    }
}