const express = require("express");
const fs = require("fs");

const app = express();

//
// Throws an error if the PORT environment variable is missing.
//
// if (!process.env.PORT) {
//     console.log(process.env);

//     throw new Error("Please specify the port number for the HTTP server with the environment variable PORT.");
// }else{
//     console.log("Port: " + process.env.PORT);
// }
process.env.PORT=3000;

//
// Extracts the PORT environment variable.
//
const PORT = process.env.PORT;

//
// Registers a HTTP GET route for video streaming.
//
app.get("/video", (req, res) => {

    //
    // Original video from here:
    // https://sample-videos.com
    //
    const path = process.cwd().toString() +"/videos/SampleVideo_1280x720_1mb.mp4";
    fs.stat(path, (err, stats) => {
        if (err) {
            console.error("An error occurred ");
            res.sendStatus(500);
            return;
        }

        res.writeHead(200, {
            "Content-Length": stats.size,
            "Content-Type": "video/mp4",
        });
        fs.createReadStream(path).pipe(res);
    });
});

//
// Starts the HTTP server.
//
app.listen(PORT, () => {
    console.log(`Microservice listening on port ${PORT}, point your browser at http://localhost:${PORT}/video`);
});
