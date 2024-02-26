import boom  from '@hapi/boom'
import { NaturalEventSchema } from 'models'
import  { connectToCluster } from 'models'
import { customFetch } from 'utils-nasa'
import dayjs from 'dayjs'

/**
 * Save the first event into the database
 */
const saveFirstEvents = async () =>{
    try{
        const url = 'https://eonet.gsfc.nasa.gov/api/v2.1/events'
        const method = 'get'
        const responseData =  await customFetch(url, method)
        const connection = await connectToCluster()
        const Event = connection.model('NaturalEvent', NaturalEventSchema)
        const event = new Event(responseData.events[0])
        await event.save()
        return event
    }catch (error) {
        console.error("saveFirstEvents::error", error)
        if(boom.isBoom(error)){
            throw error
        }
        throw boom.internal(error)
    }
}

/**
 * Sync all events into the database
 * @param event
 * @param context
 */
const syncEvents = async (event, context) => {
    try {
        const days= event?.queryStringParameters?.days ?? 1
        const url = `https://eonet.gsfc.nasa.gov/api/v2.1/events?days=${days}`
        const method = 'get'
        const responseData = await customFetch(url, method)
        const eventsUpated = await createOrUpdateEvent(responseData.events)
        return eventsUpated
    } catch (error) {
        console.error("syncEvents::error", error)
        if(boom.isBoom(error)){
            throw error
        }
        throw boom.internal(error)
    }

}

/**
 * Create or update the event into the database
 * @param events
 */
const createOrUpdateEvent = async (events) => {
    try {
        const connection = await connectToCluster()
        const Event = connection.model('NaturalEvent', NaturalEventSchema)
        let options = { upsert: true, new: true, setDefaultsOnInsert: true }
        const operations = events.map(event => ({
            updateOne: {
              filter: { id: event.id }, 
              update: {
                $setOnInsert: { id: event?.id, title: event?.title, description: event?.description, link: event?.link, categories: event?.categories, sources: event?.sources},
                $addToSet: { geometries: { $each: event?.geometries } } 
              },
              upsert: true 
            }
          }))
        const result = await Event.bulkWrite(operations, options)
        return result
    } catch (error) {
        console.error("createOrUpdateEvent::error", error)
        if(boom.isBoom(error)){
            throw error
        }
        throw boom.internal(error)
    }
}

/**
 * List of all the events
 */
const listAllEvents = async() =>{
    try {
        const connection = await connectToCluster()
        const Event = connection.model('NaturalEvent', NaturalEventSchema)
        const events = await Event.find()
        if(events.length === 0){
            throw boom.notFound('List of events not found')
        }
        return events
    } catch (error) {
        console.error("listAllEvents::error", error)
        if(boom.isBoom(error)){
            throw error
        }
        throw boom.internal(error)
    }
}
/**
 *  List of event by a date
 * @param event
 */
const listEventsByDate = async( event ) =>{
    try {
        const date = event?.queryStringParameters?.date
        if( !date ){
            throw boom.badRequest("date is required.")
        }
        const startOfDay = dayjs(date).startOf('d')
        const endOfDay = dayjs(date).endOf('d')
        const query = {
            'geometries.date':{
                $gte: startOfDay,
                $lte: endOfDay
            }
        }
        const connection = await connectToCluster()
        const Event = connection.model('NaturalEvent', NaturalEventSchema)
        const events = await Event.find(query)
        if( events.length == 0 ){
            throw boom.badData(`There are no events for the date ${date}`)
        }
        return events
    } catch (error) {
        console.error("listEventsByDate::error", error)
        if(boom.isBoom(error)){
            throw error
        }
        throw boom.internal(error)
    }
}

export {
    saveFirstEvents, 
    syncEvents,
    listAllEvents,
    listEventsByDate
}