import boom from '@hapi/boom'
import { listCategories, pruebaAxios, syncCategories, saveFirstEvents, syncEvents,listAllEvents, listEventsByDate } from './lib/index.js'
import {responseData} from 'utils-nasa'

/**
 * Sync all the categories
 */
const syncCategoriesHandler = async () => { 
    try{
        const categoriesResponse = await syncCategories()
        return responseData(categoriesResponse,{clientMessage:'Recuperado con exito'})
    }catch (error) {
        if(boom.isBoom(error)){
            return responseData( error.output.payload,{ statusCode: error.output.statusCode } )
        }
        return responseData( "Internal Error",{ statusCode: error.output.statusCode } )
    }
}

/**
 * List of all the categories
 */
const listCategoriesHandler = async () => {
    try{
        const categoriesResponse = await listCategories()
        return responseData(categoriesResponse,{clientMessage:'Recuperado con exito'})
    }catch (error) {
        if(boom.isBoom(error)){
            return responseData( error.output.payload,{ statusCode: error.output.statusCode } )
        }
        return responseData( "Internal Error",{ statusCode: error.output.statusCode } )
    }
}

/**
 *  Save the first event
 */
const saveEventsHandler = async () =>{
    try {
        const responseEvents = await saveFirstEvents()
        return responseData(responseEvents,{clientMessage:'Recuperado con exito'})
    } catch (error) {
        if(boom.isBoom(error)){
            return responseData( error.output.payload,{ statusCode: error.output.statusCode } )
        }
        return responseData( "Internal Error",{ statusCode: error.output.statusCode } )
    }
}

/**
 * Save all the events
 * @param event
 * @param context
 */
const syncEventsHandler = async (event,context) => {
    try {
        const responseEvents = await syncEvents(event,context)
        return responseData(responseEvents,{clientMessage:'Recuperado con exito'})
    } catch (error) {
        if(boom.isBoom(error)){
            return responseData( error.output.payload,{ statusCode: error.output.statusCode } )
        }
        return responseData( "Internal Error",{ statusCode: error.output.statusCode } )
    }
}

/**
 * List of all events
 */
const listAllEventsHandler = async() =>{
    try {
        const response = await listAllEvents()
        return responseData(response,{clientMessage:'Recuperado con exito'})
    } catch (error) {
        if(boom.isBoom(error)){
            return responseData( error.output.payload,{ statusCode: error.output.statusCode } )
        }
        return responseData( "Internal Error",{ statusCode: error.output.statusCode } )
    }
}

/**
 * List of all the events by the date
 * @param event
 */
const listEventByDateHandler = async( event ) =>{
    try {
        const response = await listEventsByDate(event)
        return responseData(response,{clientMessage:'Recuperado con exito'})
    } catch (error) {
        if(boom.isBoom(error)){
            return responseData( error.output.payload,{ statusCode: error.output.statusCode } )
        }
        return responseData( "Internal Error",{ statusCode: error.output.statusCode } )
    }
}

export {
    pruebaAxios,
    syncCategoriesHandler,
    listCategoriesHandler,
    saveEventsHandler,
    syncEventsHandler,
    listAllEventsHandler,
    listEventByDateHandler
}
