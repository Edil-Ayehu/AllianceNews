// NewsDetails.js
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './newsDetailsStyle.css'; 

import { IoChevronBackOutline } from "react-icons/io5";


const NewsDetails = () => {
  const location = useLocation();
  const { state } = location;

  if (!state) {
    // If state is not available, handle accordingly (e.g., redirect to home or display a message)
    return <p>No data available</p>;
  }

  const { title, imageUrl, details, time } = state;

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

    return `${differenceInHours} hr${differenceInHours !== 1 ? 's' : ''} ago`;
  };

  return (
    <div className="news-details-container">
      <Link to="/home" className="back-link"><IoChevronBackOutline /></Link>
      <h1 className="news-details-title">{title}</h1>
      <img className="news-details-image" src={imageUrl} alt={title} />
      <p className="news-details-details">{details}</p>
      <p>{formatTimeDifference(time)}</p>
    </div>
  );
};

export default NewsDetails;
