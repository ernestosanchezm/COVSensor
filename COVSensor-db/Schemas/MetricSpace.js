'use strict'
const { Schema } = require('mongoose')

module.exports = new Schema({
    value: { type: Number,
         required: true 
        },
    creatAt: { 
        type: Date,
         default: Date.now(),
         require:true
        },
    id_ClosedSpace: {
        type: Schema.Types.ObjectId,
        ref: 'closedSpace',
        required:true,
        default:"626ac1be2cb9854d7462db10"
        },
})
