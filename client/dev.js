const { createServer } = require("https");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");
const path = require("path");

const port = 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const key = path.join(__dirname, "./scripts/localhost-key.pem");
const cert = path.join(__dirname, "./scripts/localhost.pem");

const httpsOptions = {
  key: fs.readFileSync(key),
  cert: fs.readFileSync(cert),
};

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`ready - started server on url: https://localhost:${port}`);
  });
});
