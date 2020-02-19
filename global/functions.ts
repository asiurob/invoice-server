import { CostumerModel } from "../models/costumer.model"

import { VendorModel } from "../models/vendor.model"

import { ChannelModel } from "../models/sell-channel.model"

// Funciones 
export const uploadFile = (file: any ): Promise < string > => {

    return new Promise((resolve: any, reject: any) => {

        // Si no es un JSON, rechamamos la promesa, contrario copiamos el archivo
        if (file.mimetype === 'application/json') {
            file.mv(`./uploads/${ file.name }`, (err: any) => {
                if (err) {
                    reject(`No pudo ser copiado el archivo ${ file.name }`)
                } else {
                    resolve(file.name)
                }
            })
        } else {
            reject(`El archivo ${ file.name } no tiene el formato correcto (${ file.mimetype })`)
        }
    })
}

const getCostumer = async ( cliente: any ) => {

    const count = await CostumerModel.countDocuments({ iden: cliente.__id })
    if( count === 0 ) {
        try {
            const model = new CostumerModel({
                iden: cliente.__id,
                razonSocial: cliente.razonSocial
            })
            const saved = await model.save()
            return saved._id
        } catch( error ) {
            return null
        }
    } else {
        try{
            const doc: any = await CostumerModel.findOne().where( 'iden', cliente.__id )
            return doc._id ? doc._id : null
        }catch( error ) {
            return null
        }      
    }
}

const getVendor = async ( apv: any ) => {
    
    const count = await VendorModel.countDocuments({ iden: apv.__id })
    if( count === 0 ) {
        try {
            const model = new VendorModel({
                iden: apv.__id,
                vendedor: apv.vendedor
            })
            const saved = await model.save()
            return saved._id
        } catch( error ) {
            return null
        }
    } else {
        try{
            const doc: any = await VendorModel.findOne().where( 'iden', apv.__id )
            return doc._id ? doc._id : null
        }catch( error ) {
            return null
        }      
    }
}

const getChannel = async ( canal: any ) => {
    
    const count = await ChannelModel.countDocuments({ iden: canal.__id })
    if( count === 0 ) {
        try {
            const model = new ChannelModel({
                iden: canal.__id,
                nombreCanalVenta: canal.nombreCanalVenta
            })
            const saved = await model.save()
            return saved._id
        } catch( error ) {
            return null
        }
    } else {
        try{
            const doc: any = await ChannelModel.findOne().where( 'iden', canal.__id )
            return doc._id ? doc._id : null
        }catch( error ) {
            return null
        }      
    }
}

export const buildJSON = async ( json: any ) => {
    
        const costumer = await getCostumer( json.cliente )
        if( costumer ) { json.cliente = costumer }
        
        const channel = await getChannel( json.canalVenta )
        if( channel ) { json.canalVenta = channel }

        const vendor = await getVendor( json.apv )
        if( vendor ) { json.apv = vendor }

        return json
}
