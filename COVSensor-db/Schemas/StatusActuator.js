'use strict'
const { Schema } = require('mongoose')

module.exports = new Schema({
    value: { type: Number,
         required: true 
        },
    creatAt: { 
        type: Date,
         default: Date.now(),
         require:false
        },
    id_ClosedSpace: {
        type: Schema.Types.ObjectId,
        ref: 'closed_space',
        required:false
        },
    type:{
      type:String,
                
    }
})