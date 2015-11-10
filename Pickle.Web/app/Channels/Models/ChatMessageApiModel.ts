export default class ChatMessageApiModel {

    private _channelId: string;
    private _username: string;
    private _message: string;
    private _hubId: string;
    private _createdDate: Date;

    constructor(hubId: string, channelId: string, username: string, message: string, createdDate: Date) {
        this._channelId = channelId;
        this._username = username;
        this._message = message;
        this._hubId = hubId;
        this._createdDate = createdDate;
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

    public get createdDate(): Date {
        return this._createdDate;
    }
}
