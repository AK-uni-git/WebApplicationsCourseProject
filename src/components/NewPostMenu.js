import React from 'react';
import Popup from "reactjs-popup";

class NewPostMenu extends React.Component {
    /* Sources:
    https://medium.com/@everdimension/how-to-handle-forms-with-just-react-ac066c48bd4f
    https://blog.stvmlbrn.com/2017/04/07/submitting-form-data-with-react.html
    */
    constructor() {
      super();
      this.state = {
        username: '',
        title: '',
        content: '',
        open: false,
      };
      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
    }
  
    openModal() {
      this.setState({ open: true });
    }
    closeModal() {
      this.setState({ open: false });
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
      if (!e.target.checkValidity()) {
        alert("Invalid data!")
        return;
      }
      // get our form data out of state
      const { username, title, content } = this.state;
      //console.log({username, title, content});
      
      fetch('/api/post', {
        method: 'POST',
        body:  JSON.stringify({username, title, content}),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        if (response.status === 406) {
          alert("Your text content is too long. Character limit is 300 characters.")
        }
      });
      this.props.updatePosts();
      this.closeModal();
      
      this.setState ( {
        username: '',
        title: '',
        content: ''
      });
      
    }
  
    render() {
      const { username, title, content } = this.state;
      /* Popup can be found here: https://www.npmjs.com/package/reactjs-popup */
      return (
        <div>
          <button className="newPostButton" onClick={this.openModal}>New Post</button>
          <Popup
            open={this.state.open}
            
            onClose={this.closeModal}
          >
            <p>Please fill in the form and make a new post. <br></br>Character limit is at 300 characters.</p>
            <form onSubmit={this.onSubmit} noValidate>
              <label htmlFor="username">Enter your username</label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={this.onChange}
                required 
              />
              <label htmlFor="title">Enter your post title</label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={this.onChange}
                required 
              />
              <label htmlFor="content">Enter your post content</label>
              <textarea 
                rows="4" 
                cols="50"
                type="text"
                name="content"
                value={content}
                onChange={this.onChange}
                required 
              />
              <button type="submit" className="NewPostSubmitButton" >Submit</button>
            </form>
          </Popup>
        </div>
      );
    }
}

export default NewPostMenu;