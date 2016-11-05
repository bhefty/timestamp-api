'use strict'

const express = require('express')
const path = require('path')
const app = express()

app.get('/:date', function(req, res) {
    let timestamp = req.params.date
    
    let valid = ((new Date(timestamp)).getTime() > 0) || +timestamp > 0
    
    if (valid) {
        let unix, natural
        if (isNaN(+timestamp)) {
            unix = Date.parse(timestamp) / 1000
            natural = timestamp
        } else {
            unix = timestamp
            natural = ((new Date(timestamp * 1000)).toDateString()).substring(4)
        }
        
        let result = {
            unix: unix,
            natural: natural
        }
        res.json(result)
    } else {
        res.json({ unix: null, natural: null })
    }
    
})

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.listen(8080, function() {
    console.log('Example app listening on port 8080!')
})