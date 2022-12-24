class ResponseHandler {

    public format(code: number, message: string, data?: any) {
        const response = { code, message, data }
        return response
    }
}

export = ResponseHandler