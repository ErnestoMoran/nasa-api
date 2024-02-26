import mongoose, { Schema } from "mongoose"

const GeometrySchema = new Schema({
    date: { type: Date },
    type: { type: String },
    coordinates: { type: Array }
}, {_id: false})

const NaturalEventSchema = new Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: false },
    link: { type: String, required: false },
    categories: { type: Array, required: false },
    sources: { type: Array, required: false },
    geometries: { type:[GeometrySchema], required: true}
}, { timestamps: true })   

const naturalEventModel = mongoose.model('NaturalEvent', NaturalEventSchema) 

export {
    naturalEventModel,
    NaturalEventSchema
}

