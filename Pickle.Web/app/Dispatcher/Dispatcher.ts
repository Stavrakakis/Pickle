/// <reference path="../../typings/flux/flux.d.ts" />

import flux = require("flux");
import Action = require("../Actions/Action");

class Dispatcher extends flux.Dispatcher<Action> {}

var dispatcher = new Dispatcher();

export = dispatcher;
