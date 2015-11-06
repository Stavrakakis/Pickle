export default class ChannelApiModel {

    private _id: string;
    private _name: string;
    private _hubId: string;

    constructor(id: string, hubId: string, name: string) {
        this._id = id;
        this._hubId = hubId;
        this._name = name;
    }

    public get id(): string {
        return this._id;
    };

    public get hubId(): string {
        return this._hubId;
    };

    public get name(): string {
        return this._name;
    };
}
