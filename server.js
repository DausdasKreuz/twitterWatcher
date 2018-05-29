const app = require("express")(),
      Xray = require("x-ray")(),
      MongoClient = require("mongodb").MongoClient,
      dbdata = require("./dbdata.js"),
      {parseNumber, transformData} = require("./helpers.js"),
      mongoConnectString = `mongodb://${dbdata.username}:${dbdata.password}@ds151008.mlab.com:51008/usersdata`;

MongoClient.connect(mongoConnectString, (err, db) => {
    if (err) return console.log(err);

    app.listen(process.env.PORT || 3000, () => {
        console.log("Server working");

        app.get("/api/user/:username", (req, res) => {
            let username = req.params.username;

            Xray(`http://twitter.com/${username}`, {
                username: ".u-linkComplex-target",
                screen_name: ".ProfileHeaderCard-nameLink",
                followers_count: ".ProfileNav-item--followers .ProfileNav-value",
                following_count: ".ProfileNav-item--following .ProfileNav-value",
                photo_url: ".ProfileAvatar-image@src",
                bio: ".ProfileHeaderCard-bio",
                total_tweets: ".ProfileNav-item--tweets .ProfileNav-value"
            })((err, data) => {
                if (err) return console.log(err);

                let formatedData = transformData(data);
                db.collection('users').save({
                    date: Date(),
                    data: formatedData
                }, function(err, dbres) {
                    if (err) return console.log(err);

                    res.json({
                        _id: dbres.ops[0]._id,
                        data: dbres.ops[0].data
                    });
                });
            });
        });

        app.get("/api/log/list", (req, res) => {
            db.collection('users').find().toArray(function(err, data){
                res.json(data);
            });
        });
    });
});
