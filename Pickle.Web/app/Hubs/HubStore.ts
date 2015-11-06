/// <reference path="../typings/flux/flux.d.ts" />
/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/signalr/signalr.d.ts" />
/// <reference path="../Socket/ChatSocket.ts" />

import events = require("events");
import $ = require("jquery");

import IHubStore from "./IHubStore";
import HubApiModel from "./Models/HubApiModel";

export default class HubStore extends events.EventEmitter implements IHubStore {
    
    constructor() {

        super();
    }

    public getHubs(): JQueryPromise<Array<HubApiModel>> {
        let uri = "/api/hubs";

        return $.get(
            uri,
            (result: Array<HubApiModel>): Array<HubApiModel> => {
                return result;
            });
        };
}

