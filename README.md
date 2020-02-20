# Invoice Server

La aplicación tiene como finalidad subir una factura con cierto modelo y extensión .json.
Cualquier otro archivo será descartado.


## Dependencias

- El servidor de Node.js corre bajo la versión 12.6.0
- NPM utiliza la versión 6.13.4
- MongoDB usa la versión 4.0.8

Adicional y para una correcta compilación, debido a que el sistema fue escrito con la ayuda de Typescript,
se recomienda utilizar la versión 3.8.0-beta
```bash
$ npm install -g typescript@3.8.0-beta
```
También agregaremos la dependencia de nodemon
```bash
$ npm install -g nodemon
```

## Instalación e inicio del servidor
Tras clonar el repositorio se debe instalar las dependencias de node_modules de la siguiente forma
```
$ npm install
```

En una terminal adicional ponemos a compilar a Typescript para crear un la carpeta de distribución
```
$ tsc -w
```
Una vez compilado y sin errores podemos iniciar el servidor con nodemon
```
$ nodemon dist
```

## Consumo del endpoint
La única ruta que está en activa es localhost:9000/invoice/ y utilizará dos métodos
- GET
- - Para obtener la utilidad bruta localhost:9000/invoice/utility
- - Para obtener las caracteristicas adicionales localhost:9000/invoice/features
- POST
- - Para subir una o más facturas localhost:9000/invoice