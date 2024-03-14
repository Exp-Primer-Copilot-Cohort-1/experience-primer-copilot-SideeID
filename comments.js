// Create web server 

var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var comments = require('./comments');
var mime = require('mime');

var server = http.createServer(function(req, res) {
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    if (pathname === '/') {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        fs.readFile('./index.html', function(err, data) {
            res.end(data);
        });
    } else if (pathname === '/getComments') {
        var json = JSON.stringify(comments);
        res.end(json);
    } else if (pathname === '/addComment') {
        var comment = urlObj.query;
        comments.push(comment);
        var json = JSON.stringify(comments);
        res.end(json);
    } else {
        static(pathname, res);
    }
}