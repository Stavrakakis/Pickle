/// <reference path="../../typings/flux/flux.d.ts" />

import flux = require("flux");
import Action from "../Actions/Action";

class Dispatcher extends flux.Dispatcher<Action> {}

let dispatcher = new Dispatcher();

export default dispatcher;
