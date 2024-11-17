import "./Graph.css";
import { useNavigate } from "react-router-dom";
import backgroundImage from "./winter.jpg";
import GasVolumeGraph from "./GasVolumeGraph.png";
import ErrorGraph from "./ErrorGraph.png";
import chatbot from "./chatbot.png";
import blueBackground from "./bluebg.png";
//    //<div className="Insights-hero-background" style={{ background: `url(${backgroundImage}) 50% / cover no-repeat` }}></div>
import eogWord from "./eog.png";
import eogSymbol from "./eogSymbol.png";
function Graph() {

  const navigate = useNavigate();

  const handleSubmit = () => {
    // You can perform other logic here (e.g., form validation) before navigating
    navigate("/");  // Navigate to the Graph page
  }; 

  return (
    <div className="Graph">
      <div className="Header-container">
        <h1 className="Title-text">RESULTS</h1>
      </div>
      <div className="Small-header-container">
        <h1 className="Small-title-text">LEASE OPERATOR</h1>
      </div>
      <div
        className="chatbot-image-background"
        style={{ background: `url(${chatbot}) 50% / cover no-repeat` }}
      ></div>
      <div
        className="EOG-image-background"
        style={{ background: `url(${eogWord}) 50% / cover no-repeat` }}
      ></div>
      <div
        className="EOG-symbol-image-background"
        style={{ background: `url(${eogSymbol}) 50% / cover no-repeat` }}
      ></div>
      <div
        className="App-image-background"
        style={{ background: `url(${blueBackground}) 50% / cover no-repeat` }}
      ></div>
      <div className="White-line"></div>
      <div className="App-hero-background-purple"></div>
      <div className="Graph-Purple-container"></div>
      <div className="Graph2-Purple-container"></div>
      <div className="Graph-container">
        <h1 className="Graph-text">Gas Volume Graph</h1>
      </div>
      <div className="Custom-ButtonContainer">
        <button onClick={handleSubmit} className="Custom-Button">Need info from another well?</button>
      </div>

      <div
        className="Gas-Vol-image-background"
        style={{ background: `url(${GasVolumeGraph}) 50% / cover no-repeat` }}
      ></div>

      <div
        className="Error-image"
        style={{ background: `url(${ErrorGraph}) 50% / cover no-repeat` }}
      ></div>

      <div className="Graph2-container">
        <h1 className="Graph2-text">Set Point Difference</h1>
      </div>

      <div className="Sol-Purple-container"></div>
      <div className="Sol2-Purple-container"></div>

      <div className="Sol-text-container ">
        <h1 className="Sol-text">SOLUTIONS</h1>
      </div>
      <div className="Sol1-text-container ">
        <h1 className="Sol1-text">METHANOL PUMP on/off</h1>
      </div>
      <div className="Sol2-text-container ">
        <h1 className="Sol2-text">TURN OFF VALVE on/off</h1>
      </div>
    </div>
  );
}

export default Graph;
