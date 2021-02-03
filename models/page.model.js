import {Schema, model } from 'mongoose';

const PageSchema = new Schema({
    name: String,
    slug: String,
    active: { type: Boolean, default: false }
}, {
    timestamps: true, 
    versionKey: false
});

export default model('pages', PageSchema);