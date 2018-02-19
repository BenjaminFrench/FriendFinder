var friendsData = require("../data/friends.js");

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });

    app.post("/api/friends", function (req, res) {
        var newfriend = req.body;
        var match;
        var matchQ;
        // parse new friend score array into Ints
        var newfriendScores = newfriend.scores.map(x => parseInt(x));
        
        // Seed difference so first comparison will always be matched first
        var bestDifference = 100;

        // Iterate through all the existing friends and choose a best match
        friendsData.forEach((element, index) => {
            // parse current friend for compare score array into Ints
            matchQ = element.scores.map(x => parseInt(x));

            // find difference by mapping abs value of difference and reduce into one sum
            var difference = matchQ.map( (x, index) => Math.abs(x - newfriendScores[index]) ).reduce( (accumulator, currentValue) => accumulator + currentValue );

            // if the difference is better than the last best one we have a match
            if (difference < bestDifference) {
                match = friendsData[index];
                bestDifference = difference;
            }
        });

        // Add the new friend to the data object in app/data/friends.js
        friendsData.push(newfriend);

        // respond with JSON of matching friend for the new person
        res.json(match);
    });
};