/// <reference path="../typings/jquery/jquery.d.ts" />

import jquery = require("jquery");

import HubApiModel from "./Models/HubApiModel";

interface IHubStore {

    getHubs(): JQueryPromise<Array<HubApiModel>>;
}

export default IHubStore;

