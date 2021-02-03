import {Schema, model, Types} from 'mongoose';

const SessionSchema = new Schema({
    token: String,
    user: {type: Types.ObjectId, ref: 'users'},
  }, {
    timestamps: true, 
    versionKey: false
});

export default model('sessions', SessionSchema);