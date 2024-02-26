import mongoose, { Schema } from "mongoose"

/**
 * @type {module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultSchemaOptions, {description: {type: StringConstructor, required: boolean}, id: {type: StringConstructor, required: boolean}, title: {type: StringConstructor, required: boolean}}, HydratedDocument<FlatRecord<{description: {type: StringConstructor, required: boolean}, id: {type: StringConstructor, required: boolean}, title: {type: StringConstructor, required: boolean}}>, {}>>}
 */
const CategorySchema = new Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: false },
})

export {
    CategorySchema
}    