
import Action = require('../Actions/Action')
import Channel from "./Channel";
/**
 * A Flux Action which is sent to increment the Counter
 * This action is "marked" a view sourced action i.e. an action triggered by user interaction
 */
class ChannelsLoadedEvent extends Action{

    constructor() {
        super(Action.Source.View)
    }
}

export = ChannelsLoadedEvent
