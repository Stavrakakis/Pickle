import "../test-globals.ts";

import Channel from "../../Channels/Channel";

describe("Channel", () => {
    it("constructor should correctly set properties", () => {
        let channel = new Channel("bristol", "Bristol");

        expect(channel.id).to.equal("bristol");
        expect(channel.name).to.equal("Bristol");
    });
});