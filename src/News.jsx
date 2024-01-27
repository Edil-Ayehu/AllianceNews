import { useState, useEffect } from 'react';
import './firebaseConfig';
import './index.css';
import { getFirestore, addDoc, collection,deleteDoc, getDocs, doc } from 'firebase/firestore';
import NewsList from './NewsList';

const News = () => {
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [inputValue3, setInputValue3] = useState('');
  const [inputValue4, setInputValue4] = useState('');
  const [inputValue5, setInputValue5] = useState('');
  let [storedValues, setStoredValues] = useState([]);

  const db = getFirestore();

  const saveDataToFirestore = async () => {
    try {
      const docRef = await addDoc(collection(db, 'news'), {
        title: inputValue1,
        imageUrl: inputValue2,
        details: inputValue3,
        category: inputValue4,
        time: inputValue5,
      });
      alert('Data successfully saved to Database');

      // Reset input fields after successful save
      setInputValue1('');
      setInputValue2('');
      setInputValue3('');
      setInputValue4('');
      setInputValue5('');
    } catch (error) {
      console.error('Error writing document: ', error);
    }
  };

  const fetchDataFromFirestore = async () => {
    const querySnapshot = await getDocs(collection(db, 'news'));
    const temporaryArr = [];
    querySnapshot.forEach((doc) => {
      temporaryArr.push({ id: doc.id, ...doc.data() });
    });
    setStoredValues(temporaryArr);
  }; // correct 

  const deleteItem = async (index) => {
    const db = getFirestore();
    const updatedValues = [...storedValues];
    
    try {
      await deleteDoc(doc(db, 'news', updatedValues[index].id));
      updatedValues.splice(index, 1);
      setStoredValues(updatedValues);
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  useEffect(() => {
    fetchDataFromFirestore();
  }, []);

  return (
    <>
    <div className="newsList__container">
      <h1>Alliance College News</h1> <br /><br />
      <NewsList storedValues={storedValues} onDelete={deleteItem} />
    </div>

    <br /><br /><br />

    <div className='input__container'>
      <h1>Create News Entry</h1>
      <input
        type="text"
        placeholder='Enter title'
        value={inputValue1}
        onChange={(e) => setInputValue1(e.target.value)}
      />
      <input
        type="text"
        placeholder='Enter imageUrl'
        value={inputValue2}
        onChange={(e) => setInputValue2(e.target.value)}
      />
      <input
        type="text"
        placeholder='Enter news details'
        value={inputValue3}
        onChange={(e) => setInputValue3(e.target.value)}
      />
      <input
        type="text"
        placeholder='Enter category'
        value={inputValue4}
        onChange={(e) => setInputValue4(e.target.value)}
      />
      <input
        type="datetime-local"
        placeholder='Enter time'
        value={inputValue5}
        onChange={(e) => setInputValue5(e.target.value)}
      />
      <button onClick={saveDataToFirestore}>Save to Firestore</button><br/> <br />
      
      {/* <button onClick={fetchDataFromFirestore}>Fetch from Firestore</button><br/> <br /> <br /> */}
      
    </div>
    </>
  );
}

export default News;
