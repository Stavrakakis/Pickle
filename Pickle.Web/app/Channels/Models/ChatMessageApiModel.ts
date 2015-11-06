export default class ChatMessageApiModel {

    private _channelId: string;
    private _username: string;
    private _message: string;
    private _hubId: string;

    constructor(hubId: string, channelId: string, username: string, message: string) {
        this._channelId = channelId;
        this._username = username;
        this._message = message;
        this._hubId = hubId;
    }

    public get channelId(): string {
        return this._channelId;
    };

    public get hubId(): string {
        return this._hubId;
    };

    public get username(): string {
        return this._username;
    }

    public get message(): string {
        return this._message;
    }
}
