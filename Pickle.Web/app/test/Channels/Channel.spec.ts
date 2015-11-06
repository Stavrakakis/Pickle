import "../test-globals.ts";

import Channel from "../../Channels/Channel";

describe("Channel", () => {
    it("constructor should correctly set properties", () => {
        let channel = new Channel("bristol", "test-hub", "Bristol");

        expect(channel.id).to.equal("bristol");
        expect(channel.hubId).to.equal("test-hub");
        expect(channel.name).to.equal("Bristol");
    });
});