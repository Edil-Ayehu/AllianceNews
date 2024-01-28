// NewsDisplay.js
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import './newsDisplayStyle.css';

const NewsDisplay = () => {
  const [newsData, setNewsData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNewsData = () => {
      const db = getFirestore();
      const newsCollection = collection(db, 'news');

      const unsubscribe = onSnapshot(newsCollection, (querySnapshot) => {
        const newsArray = [];
        querySnapshot.forEach((doc) => {
          newsArray.push({ id: doc.id, ...doc.data() });
        });

        // Sort newsArray based on the 'time' field in descending order
        newsArray.sort((a, b) => {
          const timeA = new Date(a.time);
          const timeB = new Date(b.time);
          return timeB - timeA;
        });

        setNewsData(newsArray);
      });

      return () => unsubscribe(); // Cleanup the listener when the component unmounts
    };

    fetchNewsData();
  }, []);

  const formatTimeDifference = (dateTimeString) => {
    const currentTime = new Date();
    const newsTime = new Date(dateTimeString);
    const differenceInSeconds = Math.floor((currentTime - newsTime) / 1000);
  
    if (differenceInSeconds < 60) {
      return `${differenceInSeconds} second${differenceInSeconds !== 1 ? 's' : ''} ago`;
    }
  
    const differenceInMinutes = Math.floor(differenceInSeconds / 60);
  
    if (differenceInMinutes < 60) {
      return `${differenceInMinutes} minute${differenceInMinutes !== 1 ? 's' : ''} ago`;
    }
  
    const differenceInHours = Math.floor(differenceInMinutes / 60);
  
    if (differenceInHours < 24) {
      return `${differenceInHours} hr${differenceInHours !== 1 ? 's' : ''} ago`;
    }
  
    const differenceInDays = Math.floor(differenceInHours / 24);
  
    return `${differenceInDays} day${differenceInDays !== 1 ? 's' : ''} ago`;
  };
  

  const handleCardClick = (item) => {
    // Remove underscores from title, details, and time before navigating
    const formattedItem = {
      title: item.title.replace(/_/g, ' '),
      details: item.details.replace(/_/g, ' '),
      time: formatTimeDifference(item.time).replace(/_/g, ' '),
      ...item,
    };

    // Navigate to the detailed view with formatted item information
    navigate(`/news-details/${item.id}`, { state: formattedItem });
  };

  return (
    <div>
      <h1>Latest News</h1>
      <div className="card-container">
        {newsData.map((newsItem) => (
          <div key={newsItem.id} className="card">
            <div className="card-link" onClick={() => handleCardClick(newsItem)}>
              
              <img className="card-image" src={newsItem.imageUrl} alt="" />
              <h2 className="card-title">{newsItem.title}</h2>
              <p className="card-details">{newsItem.details}</p>
              <p>{formatTimeDifference(newsItem.time)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsDisplay;
