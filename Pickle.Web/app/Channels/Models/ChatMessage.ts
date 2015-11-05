export default class ChatMessage {

    private _username: string;
    private _message: string;

    constructor(username: string, message: string) {
        this._username = username;
        this._message = message;
    }
    
    public get username(): string {
        return this._username;
    }

    public get message(): string {
        return this._message;
    }
}
