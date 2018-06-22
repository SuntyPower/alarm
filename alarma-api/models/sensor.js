import mongoose, { Schema } from 'mongoose'

const { ObjectId } = Schema.Types

const SensorSchema = Schema({
  type: {type: String},
  zone: {type: String},
  triggered: {type: Boolean},
  active: {type: Boolean},
  createdAt: { type: Date, default: Date.now, required: true },
  device: { type: ObjectId, ref: 'Device', required: true }
})

export default mongoose.model('Sensor', SensorSchema)
