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
    /* https://medium.com/@catquarks/making-ajax-requests-with-react-48be0285d396 */
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "api/posts", true)
      xhr.onload = function(e){
        if (xhr.readyState === 4){
          if (xhr.status === 200){
            var data = JSON.parse(xhr.response);
            setPosts(data);
          } else {
            console.error(xhr.statusText);
          }
        }
      }
      xhr.send();
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
