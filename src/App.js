import Teams from './Pages/Teams';
import MainScreen from './Pages/MainScreen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<MainScreen />} />
          <Route  path='/teams' element={<Teams />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
