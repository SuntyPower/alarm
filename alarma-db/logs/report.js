'use strict'

module.exports = function setupReport (DeviceModel , ReportModel) {



  async function findByDeviceUuid (uuid) {
      return ReportModel.findAll({
        attributes: [ 'type' ],
        group: [ 'type' ],
        include: [{
          attributes: [],
          model: DeviceModel,
          where: {
            uuid
          }
        }],
        raw: true
      })
    }


      //ultimas 20 reports  de la alarma
    async function findByTypeDeviceUuid (type, uuid) {
      return ReportModel.findAll({
        attributes: [ 'id', 'type', 'zone','events', 'createdAt' ],
        where: {
          type
        },
        limit: 20,
        order: [[ 'createdAt', 'DESC' ]],
        include: [{
          attributes: [],
          model: DeviceModel,
          where: {
            uuid
          }
        }],
        raw: true
      })
    }



    async function create (uuid, report) {
      console.log("ENTRANDO EN LA MATRIX");
      console.log(uuid, report);
      const device = await DeviceModel.findOne({
        where: { uuid: uuid }
      }).catch((err) => {console.log(err)})
      if (device) {
        console.log("SALIENDO DE LA MATRIX")
        console.log("DISPOSITIVO ",device.id);
        Object.assign(report, { deviceId: device.id })
        const result = await ReportModel.create(report)
        return result.toJSON()
      }
    }

        async function findAll () {
        return ReportModel.findAll({
          order: [['createdAt', 'DESC']],
          raw: true
        })
      }

    return {
      create,
      findByDeviceUuid,
      findByTypeDeviceUuid,
      findAll
    }
  }
