#!/usr/bin/env coffee

harp = require 'harp'
harp.server __dirname, port: process.env.PORT or 5000
