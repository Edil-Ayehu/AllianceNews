import './newsListStyle.css';

import React, { useState } from 'react';
import { getFirestore, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import UpdateForm from './UpdateForm';


const NewsCard = ({ item, index, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(item);

  const handleDelete = async () => {
    const db = getFirestore();
    try {
      await deleteDoc(doc(db, 'news', item.id));
      // onDelete(index);
      onDelete();
      alert('Item successfully deleted!');
    } catch (error) {
      console.error('Error deleting document: ', error);
      alert('Error deleting item. Please try again.');
    }
  };

  const handleUpdate = async (updatedValues) => {
    const db = getFirestore();
    try {
      await updateDoc(doc(db, 'news', item.id), updatedValues);
      alert('Item successfully updated!');
      setIsEditing(false);
      setCurrentItem(updatedValues);
    } catch (error) {
      console.error('Error updating document: ', error);
      alert('Error updating item. Please try again.');
    }
  };

  const toggleEdit = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  };

  return (
    <div key={index} className="card">
      {isEditing ? (
        <UpdateForm initialValues={currentItem} onUpdate={handleUpdate} onCancel={() => setIsEditing(false)} />
      ) : (
        <>
          <div className="card-header">
            <h3 className='news__title'>{currentItem.title}</h3>
            {/* <p>Category: {currentItem.category}</p> */}
          </div>
          <img className="card-image" src={currentItem.imageUrl} alt="" />
          <div className="card-content">
  <p>{currentItem.details}</p>
  {/* <p>Time: {currentItem.time?.seconds || ''}</p> */}
  {/* <p>Time: {currentItem.time ? currentItem.time.seconds || '' : ''}</p> */}
  <div className="button-container">
    <button onClick={toggleEdit} className="edit-button">Edit</button>
    <button onClick={handleDelete} className="delete-button">Delete</button>
  </div>
</div>
        </>
      )}
    </div>
  );
};

const NewsList = ({ storedValues, onDelete }) => (
  <div className="card-container">
    {storedValues.map((item, index) => (
      <NewsCard key={index} item={item} onDelete={() => onDelete(item.id)} />
    ))}
  </div>
);

export default NewsList;