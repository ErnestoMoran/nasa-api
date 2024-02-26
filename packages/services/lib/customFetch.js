import axios from 'axios'

const customFetch = async (url, method,params,data,headers) =>{
    try {
        const response = await axios({
            method,
            url,
            headers,
            params,
            data,
            timeout: 20000
        })
        return response.data
    }catch (error) {
        console.error('CustomFetch ERROR',error)
        throw new Error('CustomFetch ERROR')
    }
}

export { customFetch }