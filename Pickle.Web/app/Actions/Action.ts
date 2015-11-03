class Action {

    private _source: Action.Source

    constructor( source: Action.Source ) {
        this._source = source
    }
    
    getSource() {
        return this._source
    }
}

module Action {

    export enum Source {
        View,
        Server
    }
}

export = Action
