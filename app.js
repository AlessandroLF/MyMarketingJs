const http = require("http");
const path = require("path");
const fs = require("fs");
const index = require("./index");

const server = http.createServer((req, res) => {
  let contentType = "text/html";
  if(req.url === "/"){
    res.writeHead(200, { "Content-Type": contentType });
    index(res);
  }else{
    let filePath = path.join( __dirname, "public", req.url);
    let extname = path.extname(filePath);
    switch (extname) {
      case ".js":
        contentType = "text/javascript";
        break;
      case ".css":
        contentType = "text/css";
        break;
      case ".json":
        contentType = "application/json";
        break;
      case ".png":
        contentType = "image/png";
        break;
      case ".jpg":
        contentType = "image/jpg";
        break;
    }

    // Check if contentType is text/html but no .html file extension
    if (contentType == "text/html" && extname == "") filePath += ".html";

    // log the filePath
    console.log("Request: " + filePath);

    fs.readFile(filePath, (err, content) => {
      if (err) {
        if (err.code == "ENOENT") {
          // Page not found
          fs.readFile(
            path.join(__dirname, "public", "404.html"),
            (err, content) => {
              res.writeHead(404, { "Content-Type": "text/html" });
              res.end(content, "utf8");
            }
          );
        } else {
          //  Some server error
          res.writeHead(500);
          res.end(`Server Error: ${err.code}`);
        }
      } else {
        // Success
        res.writeHead(200, { "Content-Type": contentType });
        res.end(content, "utf8");
      }
    });
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));