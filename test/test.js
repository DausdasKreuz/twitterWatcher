let chai = require('chai'),
    expect = chai.expect,
    {parseNumber, transformData} = require("../helpers.js");

describe("#parseNumber", function() {

    it("Should replace a K with three zeros", function() {
        let result = parseNumber("30K");

        expect(result).to.be.a("number").equal(30000);
    });

    it("Should correctly parse numbers with spaces in between", function() {
        let result = parseNumber("30 000");

        expect(result).to.be.a("number").equal(30000);
    });

    it("Should remove any punctuation signs", function() {
        let result = parseNumber("30.000,000");

        expect(result).to.be.a("number").equal(30000000);
    });

    it("Should apply all above replacements at the same time", function() {
        let result = parseNumber("30.000,000 K");

        expect(result).to.be.a("number").equal(30000000000);
    });

});

describe("#transformData", function() {

    it("Should transform an object with all properties", function() {
        let initialData = {
            followers_count: "30",
            following_count: "40 K",
            total_tweets: "2.100",
            bio: "whatever bio"
        };

        let data = transformData(initialData);

        expect(data).to.have.property("followers_count").equal(30);
        expect(data).to.have.property("following_count").equal(40000);
        expect(data).to.have.property("total_tweets").equal(2100);
        expect(data).to.have.property("bio").equal("whatever bio");
    });

    it("Should transform an object with just one property and ignore the rest", function() {
        let initialData = {
            followers_count: "30"
        };

        let data = transformData(initialData);

        expect(data).to.have.property("followers_count").equal(30);
        expect(data).not.to.have.property("following_count");
        expect(data).not.to.have.property("total_tweets");
    });

});
