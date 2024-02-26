import boom from '@hapi/boom'
import {customFetch} from './customFetch.js'
import { connectToCluster, CategorySchema } from 'models'



const pruebaAxios = async () => {
  const url = 'https://eonet.gsfc.nasa.gov/api/v2.1/events'
  const method = 'get'
  return await customFetch(url, method)
}

const syncCategories = async () => {
  try {
    const url = 'https://eonet.gsfc.nasa.gov/api/v2.1/categories'
    const method = 'get'
    const responseData =  await customFetch(url, method)
    const connection = await connectToCluster()
    const Category = connection.model('Category', CategorySchema)
    const categories = await Category.insertMany(responseData.categories)
    return categories
  } catch (error) {
    console.error('syncCategories::error', error)
    if (boom.isBoom(error)) {
      throw error
    }
    throw boom.internal(error)
  } 
  
}

const listCategories = async () => {
  try {
    const connection = await connectToCluster()
    const Category = connection.model('Category', CategorySchema)
    const categories = await Category.find()
    if(categories.length === 0){
      throw boom.notFound('List of categories not found')
    }
    return categories
  } catch (error) {
    console.error('listCategories::error', error)
    if (boom.isBoom(error)) {
      throw error
    }
    throw boom.internal(error)
  }
  
}



export {
  pruebaAxios,
  syncCategories,
  listCategories
}