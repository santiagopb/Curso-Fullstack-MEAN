# FULLSTACK MEAN
PetStore es una aplicación demo operativa realizada como parte del curso de programación Fullstack-Mean. Entre las tecnologías usadas en el proyecto tenemos:
###### Mongodb, Express, Angularjs V1.5.8, Nodejs, Socket.io, Rxjs

## Instalación local
```bash
git clone https://github.com/Curso-Fullstack-MEAN-Octubre2017/santiago.git
cd santiago
npm install
npm start
```

## Arquitectura
![memoria fullstack](https://user-images.githubusercontent.com/14046000/32347811-26f26318-c012-11e7-885e-68b1d750ba39.jpg)

![stack-mean-esquema](https://user-images.githubusercontent.com/14046000/32347984-bcf4cba8-c012-11e7-8d57-f4ce177716bf.jpg)


# Recursos de angular utilizados
```bash
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular-route.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular-resource.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular-animate.min.js"></script>
```

# Organización de los archivos y las carpetas de angular
La estructura queda de la siguiente forma:

- **app**
  - **nombre-componente**
    - nombre-componente.component.js
    - nombre-componente.html
  - **directives**
  - **services**
  - app.config.js
  - app.module.js

![modelo de datos](https://user-images.githubusercontent.com/14046000/32348561-7311532e-c014-11e7-8e4b-8b73ffab619e.jpg)

## Servicio RESTfull API

| Metodo  |  URL  |  Body  |  Response |
|---|---|---|---|
|  GET  |  api/customers  |  <vacío> |   Array{JSON} |
|    |  api/customers/:id  |  <vacío> |  {JSON}|
|    |  api/customers/:id/pets  |  <vacío>  |  Array{JSON}|
|    |  api/pets  |  <vacío>  | Array{JSON} |
|    |  api/pets/:id  |  <vacío>  |  {JSON}|
|    |  api/pets/:id/appointments  |  <vacío>  | Array{JSON} |
|    |  api/vets  |  <vacío>  |  Array{JSON}|
|    |  api/vets/:id  |  <vacío>  | {JSON} |
|    |  api/appointments  |  <vacío> |   Array{JSON} |
|    |  api/appointments/:id  |  <vacío> |  {JSON} |
|    |  api/appointments/:initdate/:enddate  |  <vacío>  |  Array{JSON} |
|  POST  |  api/customers  |  {JSON}  |  {JSON} |
|    |  api/pets  |  {JSON}  |  {JSON} |
|    |  api/vets  |  {JSON}  |  {JSON} |
|    |  api/appointment  |  {JSON}  |  {JSON} |
|  PUT  |  api/customers/:id  |  {JSON}  |  {JSON} |
|    |  api/pets/:id  |  {JSON}  |  {JSON} |
|    |  api/vets/:id  |  {JSON}  |  {JSON}  |
|    |  api/appointments/:id  |  {JSON}  |  {JSON} |
|  DELETE  |  api/customers/:id  |  {JSON}  |  <JSON>  |
|    |  api/pets/:id  |  {JSON}  |  {JSON} |
|    |  api/vets/:id  |  {JSON}  |  <JSON>  |
|    |  api/appointments/:id  |  {JSON}  |  {JSON} |

# Lista de Customers
![listaclientes](https://user-images.githubusercontent.com/14046000/32351779-e6a93ba8-c01e-11e7-9a2c-e4337b6ef7e6.png)

# Detalles Customers 
![detallescliente](https://user-images.githubusercontent.com/14046000/32351827-09d1fa0c-c01f-11e7-83d0-ff742ed8880d.png)

# Detalles Pet con Appointments
![detallesmascota](https://user-images.githubusercontent.com/14046000/32351849-21e6944a-c01f-11e7-920a-aecdc1234c35.png)

# Calendario Cita
![calendariocita](https://user-images.githubusercontent.com/14046000/32351885-3c0471d0-c01f-11e7-8490-8697cdfba9a3.png)

# Detalles Cita
![detallescita](https://user-images.githubusercontent.com/14046000/32351905-4e8b0af8-c01f-11e7-8529-a37e919a6dbc.png)


# Pasos para la implementación de del CRUD de “Customer”

## Schema
https://github.com/Curso-Fullstack-MEAN-Octubre2017/santiago/blob/master/models/appointment.js#L9

## Enlace a la línea de definición de la URL para CRUD de Customers
https://github.com/Curso-Fullstack-MEAN-Octubre2017/santiago/blob/master/app.js#L32

## Customer-list.component.js
https://github.com/Curso-Fullstack-MEAN-Octubre2017/santiago/blob/master/public/app/customer-list/customer-list.component.js#L3

## Customer-list.html
https://github.com/Curso-Fullstack-MEAN-Octubre2017/santiago/blob/master/public/app/customer-list/customer-list.html#L1

## Configuración en el módulo
https://github.com/Curso-Fullstack-MEAN-Octubre2017/santiago/blob/master/public/app/app.module.js#L17

## Ruta Angular
https://github.com/Curso-Fullstack-MEAN-Octubre2017/santiago/blob/master/public/app/app.config.js#L13

## Fichero incluido en el index
https://github.com/Curso-Fullstack-MEAN-Octubre2017/santiago/blob/master/public/index.html#L40

## Servicios Angular con promesas
https://github.com/Curso-Fullstack-MEAN-Octubre2017/santiago/blob/ca44b22811770c6bc5ee154578dda5a1f1cfc58e/public/app/services/customer.service.js#L34

## Validaciones
https://github.com/Curso-Fullstack-MEAN-Octubre2017/santiago/blob/ca44b22811770c6bc5ee154578dda5a1f1cfc58e/public/app/validation/validators.js#L1

## Angular Resource
https://github.com/Curso-Fullstack-MEAN-Octubre2017/santiago/blob/ca44b22811770c6bc5ee154578dda5a1f1cfc58e/public/app/services/customer.service.js#L6


## Eventos
https://github.com/Curso-Fullstack-MEAN-Octubre2017/santiago/blob/ca44b22811770c6bc5ee154578dda5a1f1cfc58e/public/app/appointment-by-month/appointment-by-month.component.js#L80


## Simplificar maquetación con directivas
https://github.com/Curso-Fullstack-MEAN-Octubre2017/santiago/blob/ca44b22811770c6bc5ee154578dda5a1f1cfc58e/public/app/directives/input-validator.directive.js#L6


## OptimisticLocking
https://github.com/Curso-Fullstack-MEAN-Octubre2017/santiago/blob/ca44b22811770c6bc5ee154578dda5a1f1cfc58e/routes/customers.js#L57


## SocketIO
https://github.com/Curso-Fullstack-MEAN-Octubre2017/santiago/blob/ca44b22811770c6bc5ee154578dda5a1f1cfc58e/bin/www#L29


## Rxjs
https://github.com/Curso-Fullstack-MEAN-Octubre2017/santiago/blob/ca44b22811770c6bc5ee154578dda5a1f1cfc58e/public/app/services/customer.service.js#L18

