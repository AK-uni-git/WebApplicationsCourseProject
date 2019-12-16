import React from 'react';

const Post = ({user, title, content }) => {
    return(
      <div className="post">
        <h3>User name: {user}</h3>
        <h4>Post title: {title}</h4>
        <p>{content}</p>
      </div>
    )
}

export default Post;