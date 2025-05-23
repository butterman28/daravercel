import React from 'react';
import { PostProvider } from './postcontext';
const CombinedProvider = ({ children }) => {
    return (
          <PostProvider>
          {children}
          </PostProvider>
    );
  };
  
  export default CombinedProvider;
  