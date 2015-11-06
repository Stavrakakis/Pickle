require("./test-globals.ts");

jest.dontMock("../Channels/ChannelStore");

var ChannelStore = require("../Channels/ChannelStore");

var cs = new ChannelStore();
