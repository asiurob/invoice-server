import mongo from 'mongoose'

const schema = new mongo.Schema({

    nombreCanalVenta: { type: String, required: [ true, 'El nombre del canal es necesario' ] },
    iden:    { type: Number, required: [ true, 'Necesita un identificador' ] },
    addedAt: { type: Date, default: Date.now }

}, { collection: 'channels' })

export const ChannelModel = mongo.model( 'Channel', schema )