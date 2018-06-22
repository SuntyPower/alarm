# Nervans Security Api server

Servidor de la API de Nervans

### Requisitos

Necesita node y npm, base de datos mongodb y redis


## API

Todos los comandos disponibles de la API


Device api calls

* <code>GET /api/devices</code>
find all devices from the current user

* <code>GET /api/devices/:id</code>
find device by id

* <code>GET /api/devices/:id/reports</code>
find all reports from the device with :id

* <code>GET /api/devices/:id/lastReports</code>
return last 10 reports from device :id

* <code>GET /api/devices/:id/zones</code>
find diferent zones of the device

* <code>POST /api/devices/create</code>
create new device to the current user

* <code>POST /api/devices/report/create</code>
new report body.params{_id, sensor)

* <code>DELETE /api/devices/:id</code>
delete device by id


## Authors

* **Guillermo O Anselmi**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
