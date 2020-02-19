//Dependencias
import Server from './classes/server'
import bodyParser from 'body-parser'
import cors from 'cors'
import Database from './classes/database'
import fileUpload from 'express-fileupload'
import InvoiceRoute from './routes/invoice.route'


//Declaraciones
const server   = Server.instance
const database = Database.instance

//helpers
server.app.use( bodyParser.urlencoded({ extended: true }) )
server.app.use( bodyParser.json() )
server.app.use( fileUpload() )

//CORS
server.app.use( cors( { origin: true, credentials: true } ) )

//Rutas
server.app.use('/invoice', InvoiceRoute )

//Iniciar el servidor
server.start( () => {
    console.log( `Servidor iniciado en el puerto ${ server.port }` )
    database.connect()
})

