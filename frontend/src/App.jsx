import { useState } from "react";
import axios from 'axios';
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";



function App() {
  const [code, setCode] = useState('');
  const [output,setOutput] = useState('');
  const handleSubmit = async () => {
    const payload = {
      language: "cpp",
      code,
    };
  
    try {
      const {data} = await axios.post("http://localhost:5000/run", payload);
      setOutput(data.output);
      // console.log(output);
    } catch (error) {
      console.log(error.response);
    }
  };
  console.log(code);
  return (
    <div
      style={{
        backgroundImage: `url("")`,
      }}
    >
      <h1>Online Code Compiler</h1>
      <textarea
        cols="80"
        rows="10"
        value={code}
        onChange={(e) => {
          setCode(e.target.value);
        }}
      ></textarea>
      <br></br>
      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
      <p>{output}</p>
    </div>
  );
}

export default App;
