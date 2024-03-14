// Create web server

var http = require('http');
var fs = require('fs');
var url = require('url');

var server = http.createServer(function(request, response) {
    var urlPath = url.parse(request.url).pathname;
    var filePath = '.' + urlPath + '.json';

    fs.exists(filePath, function(exists) {
        if (exists) {
            fs.readFile(filePath, function(error, data) {
                if (error) {
                    response.writeHead(500, {'Content-Type': 'text/plain'});
                    response.end('Server Error');
                } else {
                    response.writeHead(200, {'Content-Type': 'application/json'});
                    response.end(data);
                }
            });
        } else {
            response.writeHead(404, {'Content-Type': 'text/plain'});
            response.end('Not Found');
        }
    });
});

server.listen(3000);

console.log('Server running at http://localhost:3000/');
```

This code creates a web server that listens on port 3000. When a request is made to the server, the request URL is parsed and used to read the appropriate JSON file from the file system. If the file exists, its contents are sent back to the client. If the file doesn't exist, the server responds with a 404 status code.

You can run this code with the following commands:

```bash
$ node comments.js
```

Once the server is running, you can access it by navigating to http://localhost:3000/comments in your web browser.

## 2. Fetching Data with AJAX

Now that we have a server that can serve our comments, let's write a JavaScript function that fetches the comments from the server. This function will be used to load the comments from the server when the page loads and to update the comments when the user submits a new comment.

Here is the JavaScript function that fetches the comments from the server:

```javascript
// Path: fetch-comments.js
// Fetch comments from the server

function fetchComments() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/comments', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var comments = JSON.parse(xhr.responseText);
                console.log(comments);
            } else {
                console.log('Error: ' + xhr.status);
            }
        }
    };
    xhr.send();
}

fetchComments();
```

This