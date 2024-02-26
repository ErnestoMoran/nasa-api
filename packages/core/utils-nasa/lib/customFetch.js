import axios from 'axios'

/**
 *
 * @param url
 * @param method
 * @param params
 * @param data
 * @param headers
 * @returns {Promise<any>}
 */
const customFetch = async (url, method,params,data,headers) =>{
    try {
        const response = await axios({
            method,
            url,
            headers,
            params,
            data
        })
        console.log('Response', response.data)
        return response.data
    }catch (error) {
        console.error('CustomFetch ERROR',error)
        throw new Error('CustomFetch ERROR')
    }
}

export { customFetch }