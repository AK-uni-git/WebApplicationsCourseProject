import React, {useState, useEffect} from 'react';
import './App.css';

const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log("Effect suoritettiin.");
    getPosts();
  }, []);

  const getPosts = async () => {
    const response = await fetch(
      "api/posts"
    );
    const data = await response.json();
    setPosts(data);
    console.log(data);
  };
/*     // create a new XMLHttpRequest
    var xhr = new XMLHttpRequest()

    // get a callback when the server responds
    xhr.addEventListener('load', () => {
      console.log(xhr.response);
    })
    // open the request with the verb and the url
    xhr.open('GET', `api/posts`)
    // send the request
    xhr.send() 
  }*/
  

  return (
    <div className="App">
      <div className="nav">
        <h1>SpämBook</h1>
      </div>
      {posts.map(post => (
        <Post key={post.content} user={post.name} title={post.title} content={post.content}/>
      ))}
      <p>Hello there!</p>
    </div>
  );
}

const Post = ({user, title, content }) => {
  return(
    <div className="post">
      <h3>User name: {user}</h3>
      <h4>Post title: {title}</h4>
      <p>{content}</p>
    </div>
  )
}

export default App;
