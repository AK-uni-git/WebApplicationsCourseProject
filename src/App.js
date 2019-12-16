import React, {useState, useEffect} from 'react';
import NewPostMenu from "./components/NewPostMenu.js";
import Post from "./components/Post.js";
import './App.css';


const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const response = await fetch(
      "api/posts"
    );
    const data = await response.json();
    setPosts(data);
  };

  return (
    <div className="App">
      <div className="logo">
        <h1>SpämBüük</h1>
      </div>
      <div className="SecondBanner">
        <p className="biggerParagraph">Posts:</p>
        <NewPostMenu updatePosts = {getPosts}/> 
      </div>
      
      {posts.map(post => (
        <Post key={post.content} user={post.name} title={post.title} content={post.content}/>
      ))}
    </div>
  );
}

export default App;
