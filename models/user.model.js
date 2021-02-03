import {Schema, model } from 'mongoose';

const UserSchema = new Schema({
    name: String,
    username: String,
    password: String,
    role: {
      type: String,
      enum: ['admin', 'editor']
    },
    active: { type: Boolean, default: false }
  }, {
    timestamps: true, 
    versionKey: false
});


export default model('users', UserSchema);