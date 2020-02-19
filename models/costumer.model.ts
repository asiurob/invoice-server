import mongo from 'mongoose'

const schema = new mongo.Schema({

    razonSocial: { type: String, required: [ true, 'El nombre es necesario' ] },
    iden:    { type: Number, required: [ true, 'Necesita un identificador' ] },
    addedAt: { type: Date, default: Date.now }

}, { collection: 'costumers' })

export const CostumerModel = mongo.model( 'Costumer', schema )