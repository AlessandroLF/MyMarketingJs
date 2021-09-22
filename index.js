const https = require("https");
const path = require("path");
const fs = require("fs");
const TOKENF = "110010197565633.2-CMfFMD4V20qgG0ITHhUxZssFh2ae0xnZHGurD0Id";
const TOKEN = "101800225595154.ccZtXqrc68FxVESWfrvLJZR0DAoiFCG";

module.exports = (res) => {
    fs.readFile(path.join(__dirname, "start.html"), (err, content) =>{
        res.write(content);
        res.write("<title>TestBed</title></head><body><h1>Testing</h1><div id='map'></div>");
        const options = {
            hostname: 'api.appcontx.com',
            path: '/page/custom_fields',
            method: 'GET',
            headers: {
                "accept": "application/json",
                "X-ACCESS-TOKEN": TOKEN,
            }
            
        };
        const req = https.request(options, response => {
            console.log(`statusCode: ${response.statusCode}`);
            response.on('data', (chunk) =>{
                //console.log(chunk.toString());
                res.write(chunk.toString());
            });
            response.on('end', () =>{
                res.end();
            });
        });
        req.on('error', e => {
            console.log("error: " + e);
        });
        req.end();
    });
};