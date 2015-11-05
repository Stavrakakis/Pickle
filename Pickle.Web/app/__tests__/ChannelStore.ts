require("./test-globals.ts");

jest.dontMock("../Channels/ChannelStore");

import ChannelStore = require("../Channels/ChannelStore");

var Dispatcher = require("../Dispatcher/Dispatcher");
