import './firebaseConfig';
import News from './News';
import NewsDisplay from './NewsDisplay';
import NewsDetails from './NewsDetails';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<NewsDisplay/>}/>
          <Route path='/admin' element={<News/>}/>
          <Route path='/home' element={<NewsDisplay/>}/>
          <Route path="/news-details/:id" element={<NewsDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
