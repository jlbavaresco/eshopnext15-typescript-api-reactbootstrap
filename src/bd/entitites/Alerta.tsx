export default class Alerta {

    status: string;
    message: String;

    constructor(status : string, message : string
    ) {
        this.status = status;
        this.message = message;
    }
}
