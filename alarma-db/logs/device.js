'use strict'

module.exports = function setupDevice (DeviceModel,UserModel){


  function findZones (zones) {
    return DeviceModel.findByAll({
      where:{
        zones
      }
    })
  }

    async function findByUser(username) {
        return DeviceModel.findAll({
          include: [{
            attributes: [],
            model: UserModel,
            where: {
              username
            }
          }],
          raw: true
        })
      }

  function findByVersion (version) {
    return DeviceModel.findByAll({
      where:{
        version
      }
    })
  }

  function findByState (state) {
    return DeviceModel.findByAll({
      where:{
        state
      }
    })
  }


  function findAll () {
    return DeviceModel.findAll()
  }


  async function update (device) {
    const cond = {
      where: {
        uuid: device.uuid
      }
    }

    const existingDevice = await DeviceModel.findOne(cond)

    if (existingDevice) {
      const updated = await DeviceModel.update(device, cond)
      return updated ? DeviceModel.findOne(cond) : existingDevice
  }}

  async function create (device,username) {
    console.log(device,username);
    const user = await UserModel.findOne({
      where: { username }
    }).catch((err) => {console.log(err)})
    if (user) {
      Object.assign(device, { userId:user.id })
      const result = await DeviceModel.create(device)
      return result.toJSON()
    }
  }

  async function findByUuid(uuid) {
  try {
    return DeviceModel.findOne({
      where:{
        uuid
      }})
  } catch (e) {
    return null;
  }
  return null

  }


  return {
    findZones,
    findByVersion,
    findByState,
    findAll,
    update,
    findByUuid,
    create
  }
}
