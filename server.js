const express = require("express");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

var users = [];

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/submit", function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var age = req.body.age;
    var password = req.body.password;
    
    // server validation
    if (!name || !email || !age || !password) {
        res.send("<h1>Error</h1><p>All fields required</p><a href='/'>Go back</a>");
        return;
    }
    
    if (password.length < 6) {
        res.send("<h1>Error</h1><p>Password must be 6+ chars</p><a href='/'>Go back</a>");
        return;
    }
    
    var user = { name: name, email: email, age: age };
    users.push(user);
    
    // send to result page with user data
    var url = "/result.html?name=" + encodeURIComponent(name) + 
              "&email=" + encodeURIComponent(email) + 
              "&age=" + encodeURIComponent(age) +
              "&users=" + encodeURIComponent(JSON.stringify(users));
    res.redirect(url);
});

app.listen(3000, function() {
    console.log("Server on http://localhost:3000");
});
