export default class ChatMessage {

    private _channelId: string;
    private _username: string;
    private _message: string;

    constructor(channelId: string, username: string, message: string) {
        this._channelId = channelId;
        this._username = username;
        this._message = message;
    }

    public get channelId(): string {
        return this._channelId;
    };

    public get username(): string {
        return this._username;
    }

    public get message(): string {
        return this._message;
    }
}
