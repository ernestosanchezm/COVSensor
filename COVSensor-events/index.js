'use strict'

const EventEmitter=require('events')
const os=require('os')
const mqtt=require('mqtt')
const defaults=require('defaults')
const {parsePayload}=require('./utils');
const util=require('util');
const uuid = require('uuid')

const options={
    name:'untitled',
    username:'platzi',
    interval:5000,
    mqtt:{
        host:'mqtt://localhost'
    }   
}

class COVSensorEmitter extends EventEmitter{
    constructor(opts){
        super()
        this._options=defaults(opts,options);
        this._timer=null;
        this._started=false;
        this._client=null;
        this._coordinatorId=null;      
    }
    connect(){
        if(!this._started){
            const opts=this._options;
            this._client=mqtt.connect(opts.mqtt.host);
            this._started=true;

            this._client.subscribe('coordinator/message');
            this._client.subscribe('coordinator/disconnected');
            this._client.subscribe('coordinator/connected');

            this._client.on('connect',()=>{
                this._coordinatorId=uuid.v4();
                this.emit('connected',this._coordinatorId);
                // this._timer=setInterval(async () => {
                // }, opts.interval);

            });
            this._client.on('message',(topic,payload)=>{
                payload=parsePayload(payload);
                console.log(payload);
                let broadcast=false;
                switch(topic){
                    case'coordinator/connected':
                    case'coordinator/disconnected':
                    case'coordinator/message':
                    broadcast = payload && payload.coordinator && payload.coordinator.uuid !== this._coordinatorId;
                    break;                    
                }

                if(broadcast){
                    this.emit(topic,payload);
                }
                
            });

            this._client.on('error',()=>this.disconnect());           
        }
    }
    disconnect(){
        if(this._started){
            clearInterval(this._timer);
            this._started=false;
            this.emit('disconnected');
        }
    }
}

module.exports=COVSensorEmitter