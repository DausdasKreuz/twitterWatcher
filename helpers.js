function parseNumber(number) {
    return parseInt(number
        .replace(/\s/, "")
        .replace("K", "000")
        .replace(",", "")
        .replace(".", ""));
}

function transformData(data) {
    if (data.followers_count) {
        data.followers_count = parseNumber(data.followers_count);
    }

    if (data.following_count) {
        data.following_count = parseNumber(data.following_count);
    }

    if (data.total_tweets) {
        data.total_tweets = parseNumber(data.total_tweets);
    }

    return data;
}

module.exports = {
    parseNumber,
    transformData
};
