import React, {useState, useEffect} from 'react';
import Popup from "reactjs-popup";
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

  return (
    <div className="App">
      <div className="logo">
        <h1>SpämBüük</h1>
      </div>
      <div  className="Test">
        <p className="biggerParagraph">Posts:</p>
        <Popup trigger={<button className="newPostButton"> Make a new post</button>} modal closeOnDocumentClick>
          <div className="NewPost">
            <p>Please fill in the form and make a new post</p>
            <UserForm updatePosts = {getPosts}></UserForm>
            <form></form>
          </div>
        </Popup>
      </div>
      
      {posts.map(post => (
        <Post key={post.content} user={post.name} title={post.title} content={post.content}/>
      ))}
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


class UserForm extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      title: '',
      content: '',
    };
  }

  onChange = (e) => {
    /*
      Because we named the inputs to match their
      corresponding values in state, it's
      super easy to update the state
    */
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    // get our form data out of state
    const { username, title, content } = this.state;
    console.log({username, title, content});

    fetch('/api/post', {
      method: 'POST',
      body:  JSON.stringify({username, title, content}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    this.props.updatePosts();
  }

  render() {
    const { username, title, content } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <label htmlFor="username">Enter your username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={this.onChange}
        />
        <label htmlFor="title">Enter your post title</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={this.onChange}
        />
        <label htmlFor="content">Enter your post content</label>
        <input
          type="text"
          name="content"
          value={content}
          onChange={this.onChange}
        />
        <button type="submit" className="NewPostSubmitButton" >Submit</button>
      </form>
    );
  }
}

export default App;
