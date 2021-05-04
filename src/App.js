import './App.css';
import { useContext } from 'react';

import { DrizzleContext } from "@drizzle/react-plugin"
import ReadString from './components/ReadString';
import SetString from './components/SetString';


function App(props) {

 
  const drizzleData = useContext(DrizzleContext.Context)
  // console.log("context", DrizzleContext)
  


  if (!drizzleData.initialized) return "Loading Drizzle...";
  return <div className="App">
  <h1 className="App-h1"> WM Pet Shop</h1>  
  <SetString></SetString>   
  <br/>

  <ReadString></ReadString>
  
  </div>;
}

export default App;
