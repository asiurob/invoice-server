import express from 'express'
import { PORT } from '../global/environment'
import http from 'http'

export default class Server {

    private static _instance: Server
    public app: express.Application
    public port: number
    private http: http.Server

    private constructor() {

        this.app  = express()
        this.port = PORT
        this.http = new http.Server( this.app )
    }
    public static get instance() {
        return this._instance || ( this._instance = new Server() )
    }
    start( callback: any ) {
        this.http.listen( this.port, callback )
    }

}