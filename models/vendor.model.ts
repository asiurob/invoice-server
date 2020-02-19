import mongo from 'mongoose'

const schema = new mongo.Schema({

    vendedor: { type: String, required: [ true, 'El nombre del vendedor es necesario' ] },
    iden:    { type: Number, required: [ true, 'Necesita un identificador' ] },
    addedAt: { type: Date, default: Date.now }

}, { collection: 'vendors' })

export const VendorModel = mongo.model( 'Vendor', schema )