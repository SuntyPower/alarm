import mongoose, { Schema} from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const UserSchema = new Schema({
  _id: Schema.Types.ObjectId,
  firstName: {type: String},
  lastName: {type: String},
  email: {type: String, unique: true, index: true},
  password: {type: String},
  devices: [{type: Schema.Types.ObjectId, ref: 'Device', default: []}]
})
UserSchema.plugin(uniqueValidator)

export default mongoose.model('User', UserSchema)
