import { Router, Request, Response } from 'express'
import fs from 'fs'
import { buildJSON, uploadFile } from '../global/functions'
import { InvoiceModel } from '../models/invoice.model'


const InvoiceRoute = Router()

InvoiceRoute.post('/', (req: Request, res: Response) => {
    const files: any = req.files
    // Validamos si hay archivos enviados
    if (!files) { return res.status(400).json({ message: 'No se encontraron archivos' }) }

    // Borramos los archivos de la carpeta y limpiamos base de datos
    const path = './uploads'
    fs.readdirSync(path).map((d: any) => fs.unlinkSync(`${ path }/${ d }`));

    ( async () => await InvoiceModel.remove({}) )()

    // Si el archivo enviado es un arreglo, lo barremos
    if ( Array.isArray(files.invoices) ) {
        
        const proms:Array< Promise< any > > = files.invoices
        .map( ( invoice: any ) => uploadFile( invoice ) )

        Promise.allSettled( proms )
        .then( ( results: any ) => {
            results.filter( ( res: any ) => res.value )
            .map( ( res: any ) => res.value )
            .forEach( ( doc: string ) => {
                fs.readFile( `${ path }/${ doc }`, 'utf8', ( err, data ) => {
                    if( !err ) {
                        const invoiceJSON = JSON.parse( data );
    
                        ( async () => {
                            const json = await buildJSON( invoiceJSON )
                            
                            const model = new InvoiceModel( json )
    
                            try {
                                const saved = await model.save()
                            } catch( e ){ console.log( e ) }
    
                        } )()       
                    }
                })
            })
            res.status( 201 ).json({ message: 'La base de datos de facturas, ha sido actualizada' })
        } )

    } else {
        // Si es un solo archivo lo procesamos
        const invoice = files.invoices
        uploadFile( invoice )
        .then( (  name: string ) => {

            fs.readFile( `${ path }/${ name }`, 'utf8', ( err, data ) => {
                if( !err ) {
                    const invoiceJSON = JSON.parse( data );

                    ( async () => {
                        const json = await buildJSON( invoiceJSON )
                        
                        const model = new InvoiceModel( json )

                        try {
                            const saved = await model.save()
                            res.status( 201 ).json({ message: 'La base de datos de facturas, ha sido actualizada' })
                        } catch( e ){
                            res.status( 500 ).json({ message: 'Ocurrió un error en la base de datos', e })
                        }

                    } )()       
                }
            })
        })
        .catch( ( message: string ) => res.status( 403 ).json( { message } ) )
    }
})

InvoiceRoute.get('/:required', ( req: Request, res: Response ) => {

    const required = req.params.required

    if( required === 'utility' ) {
        InvoiceModel.aggregate([
                // Disolver el arreglo
                { $unwind: "$detail" },
                // Operaciones
                { 
                    $project: {
                        _id : 0,
                        billNumber: 1,
                        utilidadBruta: {
                            $add: [
                                {
                                    $subtract: [ 
                                        "$detail.item.utilidad", 
                                        "$detail.item.cost" 
                                    ]
                                },
                                {
                                    $subtract: [ 
                                        "$detail.item.incentive", 
                                        "$detail.item.houseCredit" 
                                    ]
                                }
                            ]
                            
                        }
                    } 
                },     
                // Ordenar
                { $sort: { billNumber: 1 } }
        ])
        .exec( ( err: any, data: any ) => {
            if( err ) return res.status( 500 ).json({ message: 'Ocurrió un error en la base de datos', err })
    
            res.status( 200 ).json({ data })
        })
    } else if( required === 'features' ) {
        InvoiceModel.aggregate([

            { $unwind: "$detail" },

            {
                $project: {
                    _id: 0,
                    billNumber: 1,
                    featuresCount: {
                        $size: "$detail.item.caracteristicasAdicionales"
                    } 
                }
            },
            { $sort: { billNumber: 1 } }
        ])
        .exec( ( err: any, data: any ) => {
            if( err ) return res.status( 500 ).json({ message: 'Ocurrió un error en la base de datos', err })
    
            res.status( 200 ).json({ data })
        })
    } else {
        res.status( 400 ).json({ message: 'La opción requerida no está disponible'})
    }


})


export default InvoiceRoute