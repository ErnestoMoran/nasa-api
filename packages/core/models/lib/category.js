import mongoose, { Schema } from "mongoose"

const CategorySchema = new Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: false },
})

export {
    CategorySchema
}    