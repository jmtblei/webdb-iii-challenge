const server = require('./api/server');

const port = 5000;
server.listen(port, function() {
    console.log(`\n=== Listening on http://localhost:${port} ===\n`)
})