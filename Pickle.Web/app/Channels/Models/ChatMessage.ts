export default class ChatMessage {

    private _username: string;
    private _message: string;
    private _createdDate: Date;

    constructor(username: string, message: string, createdDate: Date) {
        this._username = username;
        this._message = message;
        this._createdDate = createdDate;
    }
    
    public get username(): string {
        return this._username;
    }

    public get message(): string {
        return this._message;
    }

    public get createdDate(): Date {
        return this._createdDate;
    }
}
