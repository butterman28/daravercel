import React, { createContext, useState, useEffect, useContext } from 'react';
//import { AuthContext } from './AuthContext'; // Adjust the import based on your file structure

// Create the UserContext
export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  //const { isLoggedIn } = useContext(AuthContext);
  //let defcate = ""
  //const [cate, setCate] = useState(defcate);
  const [postData, setPostData] = useState(() => {
    const storedPostData = sessionStorage.getItem('postData');
    return storedPostData ? JSON.parse(storedPostData) : [];
  });

  const [filteredpostData, setFilteredpostData] = useState(() => {
    const storedfilteredpostData = sessionStorage.getItem('filteredpostData');
    return storedfilteredpostData ? JSON.parse(storedfilteredpostData) : [];
  });

  const [podcastData, setPodcastData] = useState(() => {
    const storedPodcastData = sessionStorage.getItem('podcastData');
    return storedPodcastData ? JSON.parse(storedPodcastData) : [];
  });

  const [latestpostData, setLatestPostData] = useState(() => {
    const storedLatestPostData = sessionStorage.getItem('latestpostData');
    return storedLatestPostData ? JSON.parse(storedLatestPostData) : [];
  });
  const fetchpost = async () => {
    const response = await fetch("http://127.0.0.1:8000/post/post")
    if (!response.ok) {
      //throw new Error('Network response was not ok');
    }
    if (response.ok) {
      let data = await response.json();
      setPostData(data);
      //console.log(data)
      //console.log(postData)
      sessionStorage.setItem('postData', JSON.stringify(data));
    }
  }
  const fetchpodcast = async () => {
    const response = await fetch("http://127.0.0.1:8000/podcast/podcast")
    if (!response.ok) {
      //throw new Error('Network response was not ok');
    }
    if (response.ok) {
      let data = await response.json();
      setPodcastData(data);
      console.log(data)
      console.log(podcastData)
      sessionStorage.setItem('podcastData', JSON.stringify(data));
    }
  }
  const fetchlatestpost = async () => {
    const response = await fetch("http://127.0.0.1:8000/post/latestpost")
    if (!response.ok) {
      //throw new Error('Network response was not ok');
    }
    if (response.ok) {
      let data = await response.json();
      setLatestPostData(data);
      //console.log(data)
      //console.log(latestpostData)
      sessionStorage.setItem('latestpostData', JSON.stringify(data));
    }
  }
  const fetchsinglepost = async (id) => {
    const response = await fetch(`http://127.0.0.1:8000/post/post/${id}/`);
    if (!response.ok) {
      //throw new Error('Network response was not ok');
    }
    if (response.ok) {
      let data = await response.json();
      //console.log(data)
      return data
    }
  }
  const fetchsinglepodcast = async (id) => {
    const response = await fetch(`http://127.0.0.1:8000/podcast/podcast/${id}/`);
    if (!response.ok) {
      //throw new Error('Network response was not ok');
    }
    if (response.ok) {
      let data = await response.json();
      //console.log(data)
      return data
    }
  }
  const getItemById = (type, id) => {
    if (type === 'post') {
      return postData.find((item) => item.id === id);
    } else if (type === 'podcast') {
      //return clothingData.find((item) => item.id === id);
    } else if (type === 'comics') {
      //return comicsData.find((item) => item.id === id);
    }
    return null;
  };

  const filterpostByCategory = (category) => {
    if (category === "all") {
      // Show all items
      setFilteredpostData(postData);
      //setCate("All Post");
      //defcate = "All Post"
      sessionStorage.setItem('category', "All Post");
      sessionStorage.setItem('filteredpostData', JSON.stringify(postData));
    } else {
      // Filter items by category
      const filtered = postData.filter((item) => item.category === category);
      setFilteredpostData(filtered);
      //defcate = category
      //setCate(category);
      // console.log(categoryhead)
      //console.log(cate)
      sessionStorage.setItem('category', category);
      sessionStorage.setItem('filteredpostData', JSON.stringify(filtered));
    }
  };


  return (
    <PostContext.Provider
      value={{
        postData,
        podcastData,
        latestpostData,
        fetchpost,
        fetchlatestpost,
        fetchpodcast,
        filterpostByCategory,
        filteredpostData,
        getItemById,
        fetchsinglepost,
        fetchsinglepodcast,
        //setCate,
        //cate,
      }}>
      {children}
    </PostContext.Provider>
  );
};