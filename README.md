# Nervans Security Api server

Servidor de la API de Nervans

### Requisitos

Necesita node y npm, base de datos mongodb y redis


## API

Todos los comandos disponibles de la API


Device api calls

  ```
GET /api/devices  
  ```
find all devices from the current user
```
GET /api/devices/:id
```
find device by id
```
GET /api/devices/:id/reports
```
find all reports from the device with :id
```
GET /api/devices/:id/lastReports
```
return last 10 reports from device :id
```
GET /api/devices/:id/zones
```
find diferent zones of the device

```
POST /api/devices/create
```
create new device to the current user

```
POST /api/devices/report/create
```
new report body.params{_id, sensor)

```
DELETE /api/devices/:id
```
delete device by id


## Authors

* **Guillermo O Anselmi**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
