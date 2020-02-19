//Dependencias
import mongo from 'mongoose'
import { DB, DBPORT, DBHOST } from "../global/environment"

export default class Database {

    private static _instance: Database
    private db: string
    private dbPort: Number
    private dbHost: string
    private uri: string

    private constructor () {
        this.db = DB
        this.dbPort = DBPORT
        this.dbHost = DBHOST
        this.uri = `${ this.dbHost }:${ this.dbPort }/${ this.db }`
    }

    public static get instance() {
        return this._instance || ( this._instance = new Database() )
    }

    public connect () {
        mongo.connect( this.uri, { useNewUrlParser: true, useCreateIndex: true }, ( err: any ) => {
            if( err ) return console.log( err.message ) 

            console.log( `Conectado a la base ${ this.db }` )
        })
    }
}