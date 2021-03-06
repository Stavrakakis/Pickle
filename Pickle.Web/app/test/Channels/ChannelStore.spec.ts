import "../test-globals.ts";
import $ = require("jquery");
import sinon = require("sinon");

import * as tsUnit from "../../../node_modules/tsunit.external/tsUnit.ts";

import Dispatcher from "../../Dispatcher/Dispatcher";

import Channel from "../../Channels/Channel";
import ChannelStore from "../../Channels/ChannelStore";
import SendMessageAction from "../../Channels/SendMessageAction";
import ChatMessageApiModel from "../../Channels/Models/ChatMessageApiModel";
import ChannelStoreEvents from "../../Channels/ChannelStoreEvents";

describe("ChannelStore", () => {

    let signalRFake: SignalR;
    let hubConnectionFake: HubConnection;
    let testChannel: Channel;

    beforeEach(() => {
        
        testChannel = new Channel("1", "test-hub", "test-channel");
        
        //ARGH TypeScript!

        signalRFake = tsUnit.FakeFactory.getFake<SignalR>({});

        hubConnectionFake = tsUnit.FakeFactory.getFake<HubConnection>({});
        hubConnectionFake.start = (): any => { };

        signalRFake.chatHub = {
            client: { broadcastMessage: (hubId: string, channelId: string, name: string, message: string): void => { } },
            server: {
                send: (hubId: string, channelId: string, message: string): any => { }
            }
        };

        signalRFake.hub = hubConnectionFake;

        $.connection = signalRFake;
    });
        
    it("constructor should register with the dispatcher", () => {
        
        let registerSpy = sinon.spy(Dispatcher, "register");
        
        let channelStore = new ChannelStore($);
        
        expect(registerSpy.calledOnce).to.be.true;

        channelStore.dispose();
    });

    it("constructor should start hub connection", () => {

        let connectionSpy = sinon.spy(hubConnectionFake, "start");

        let channelStore = new ChannelStore($);

        expect(connectionSpy.calledOnce).to.be.true;

        channelStore.dispose();
    });

    it("constructor should emit a NEW_MESSAGE event on the hub broadcastMessage callback", () => {

        let onNewMessage = sinon.spy();
        let channelStore = new ChannelStore($);

        channelStore.addListener(ChannelStoreEvents.NEW_MESSAGE, onNewMessage);
        
        signalRFake.chatHub.client.broadcastMessage(testChannel.hubId, testChannel.id, "username", "message");

        let expectedCallParameter = new ChatMessageApiModel(testChannel.hubId, testChannel.id, "username", "message");

        expect(onNewMessage.calledOnce).to.be.true;
        expect(onNewMessage.calledWith(expectedCallParameter)).to.be.true;

        channelStore.dispose();
    });

    // API Calls

    it("getMessagesForChannel calls the correct API endpoint", () => {
        let getSpy = sinon.spy();

        $.get = getSpy;

        let channelStore = new ChannelStore($);

        channelStore.getMessagesForChannel(testChannel);
        
        expect(getSpy.calledOnce).to.be.true;

        expect(getSpy.calledWith("/api/hub/test-hub/1/messages", sinon.match.any)).to.be.true;

        channelStore.dispose();
    });

    it("getChannels calls the correct API endpoint", () => {
        let getSpy = sinon.spy();

        $.get = getSpy;

        let channelStore = new ChannelStore($);

        channelStore.getChannels();

        expect(getSpy.calledOnce).to.be.true;

        expect(getSpy.calledWith("/api/channels", sinon.match.any)).to.be.true;

        channelStore.dispose();
    });

    it("getChannelsForHub calls the correct API endpoint", () => {
        let getSpy = sinon.spy();

        $.get = getSpy;

        let channelStore = new ChannelStore($);

        channelStore.getChannelsForHub("test-hub");

        expect(getSpy.calledOnce).to.be.true;

        expect(getSpy.calledWith("/api/hub/test-hub/channels", sinon.match.any)).to.be.true;

        channelStore.dispose();
    });

    it("sendMessageToApi calls the correct API endpoint", () => {

        let ajaxSpy = sinon.mock();

        $.ajax = ajaxSpy;

        ajaxSpy.returns({ then: () => { return { fail: () => { }}}, fail: () => { } });

        let channelStore = new ChannelStore($);

        Dispatcher.dispatch(new SendMessageAction(testChannel, "message"));

        expect(ajaxSpy.calledOnce).to.be.true;

        expect(ajaxSpy.calledWith({
            url: "/api/hub/test-hub/1/messages",
            type: "POST",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({ message: "message" })
        })).to.be.true;

        channelStore.dispose();
    });

});