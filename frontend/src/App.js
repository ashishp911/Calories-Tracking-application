import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import EntriesComponent from './components/entriesComponent';
import Navbar from './components/Navbar';


function App() {
  return (
    <div>
      <Navbar/>
      <EntriesComponent/>
    </div>
  );
}

export default App;
