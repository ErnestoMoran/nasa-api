/**
 * Response object
 * @param body
 * @param options
 * @returns {{headers: (*|{}), body: string, statusCode: (*|number)}}
 */
export const responseData = ( body, options ) => {
    return {
        body: JSON.stringify({
            clientMessage: options?.clientMessage,
            data: body,
            message: options?.message,
            showMessage: options?.showMessage,
        }),
        headers: options?.headers || {},
        statusCode: options?.statusCode || 200,
    }
}
