
import Action = require('../Actions/Action')
import Channel from "./Channel";

export default class ChannelsLoadedEvent extends Action{

    constructor() {
        super(Action.Source.View)
    }
}
