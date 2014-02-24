#!/usr/bin/env coffee

# Configure Express Server
express = require 'express'
app     = express()

app.configure ->
  app.use express.static "#{ __dirname }/pub"

# Start the app
port = process.env.PORT or 3000
app.listen( port )
console.log "Listening on port #{ port }"
