const express = require("express");
const app = express();

app.use(express.static(__dirname + "/build"));

app.use(express.json());

//Global post strorage
let posts = [];

class Post {
  constructor(userName, titleName, postContent) {
    this.name = userName;
    this.title = titleName;
    this.content = postContent;
  }
}



app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
  //res.send("Nothing to see here. This is just a stupid api.\n" + JSON.stringify(posts) );
});

app.get("/api/posts", (req, res) => {
  res.json(posts);
  res.end();
});


app.post("/api/post", (req, res) => {
  let newpost = new Post(req.user, req.title, req.content);
  console.log("Received new post:", req.body);
  games.push(newpost);
  res.end();
});


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`App is listening on port ${port}...`));

//Filler content.
post1 = new Post("Make", "cool text", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.");
post2 = new Post("Joni", "Cool info", "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.");
post3 = new Post("Lorem", "Lorem Ipsum", "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");

posts.unshift(post1);
posts.unshift(post2);
posts.unshift(post3);