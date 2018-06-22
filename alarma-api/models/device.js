import mongoose, { Schema } from 'mongoose'

const DeviceSchema = new Schema({
  _id: Schema.Types.ObjectId,
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  name: {type: String},
  version: {type: String, default: '1.0.0'},
  state: {type: Number},
  reports: [{type: Schema.Types.ObjectId, ref: 'Sensor', default: []}]
})

export default mongoose.model('Device', DeviceSchema)
