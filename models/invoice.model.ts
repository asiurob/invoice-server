import mongo from 'mongoose'

const schema = new mongo.Schema({

    __updatedAt: { type: Date },
    __createdAt: { type: Date },
    __fechaLiquidacionFactura: { type: String },
    __fechaCancelacion: { type: String },
    cliente: { type: mongo.Schema.Types.ObjectId, ref: 'Costumer' },
    canalVenta: { type: mongo.Schema.Types.ObjectId, ref: 'Channel' },
    billNumber: { 
        type: String, 
        required: [true, 'Se requiere el identificador'], 
        unique: [true, 'Ya existe esta factura']
    },
    sucursal: { type: String },
    vendedor: { type: String },
    apv: { type: mongo.Schema.Types.ObjectId, ref: 'Vendor' },
    at: { type: Date },
    status: { type: String },
    detail: [
        {   
            times: { type: Number },
            item: {
                __id: { type: Number },
                __updatedAt: { type: Date },
                __createdAt: { type: Date },
                kind: { type: String },
                serialNumber: { type: String },
                inventoryDate: { type: Date },
                brand: { type: String },
                model: { type: String },
                descriptionModel: { type: String },
                color: { type: String },
                price: { type: Number },
                cost: { type: Number },
                subsidy: { type: Number },
                ivaImporte: { type: Number },
                utilidad: { type: Number },
                importeTotal: { type: Number },
                creditNote: { type: Number },
                houseCredit: { type: Number },
                incentive: { type: Number },
                caracteristicasAdicionales: [
                    {
                        __id: { type: Number },
                        nombreCaracteristica: { type: String },
                        valorCaracteristica: { type: String }
                    }
                ]
            }
        }
    ]
}, { collection: 'invoices' } )

export const InvoiceModel = mongo.model( 'Invoice' , schema )