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
        default:"627c881c7a8d43c4cfd5b59f"
        },
})
