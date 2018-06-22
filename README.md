# Nervans Security Api server

Servidor de la API de Nervans

### Requisitos

Necesita node y npm, base de datos mongodb y redis


## API

Todos los comandos disponibles de la API


Device api calls


<code>GET /api/devices</code> find all devices from the current user
<code> GET /api/devices/:id find device by id
 <code>GET /api/devices/:id/reports find all reports from the device with :id
 <code>GET /api/devices/:id/lastReports return last 10 reports from device :id
 <code>GET /api/devices/:id/zones find diferent zones of the device


 <code>POST /api/devices/create create new device to the current user
 <code>POST /api/devices/report/create new report body.params{sensor, _id}

 DELETE /api/devices/:id delete device by id

```

## Authors

* **Guillermo O Anselmi**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
