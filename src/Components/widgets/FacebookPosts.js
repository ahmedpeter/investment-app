import React from 'react';
import { FacebookProvider, EmbeddedPost } from 'react-facebook';

function FacebookPosts() {
    return (
        <FacebookProvider appId="1977006595789087">
        <EmbeddedPost href="http://www.facebook.com" width="500" />
      </FacebookProvider>
    )
}

export default FacebookPosts
