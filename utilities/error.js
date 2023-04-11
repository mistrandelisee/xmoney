const DEFAULT_SYS_ERR_CODE=501;
class AppError extends Error {  
    constructor (message) {
        super(message)
        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name
        this.status = DEFAULT_SYS_ERR_CODE
    }

    statusCode() {
        return this.status
    }

    dupliacte_found() {
        this.status=208;

        return this;
    }
}

const values={DEFAULT_SYS_ERR_CODE}
module.exports = {AppError,values}  