import "./App.css";

import backgroundImage from "./winter.jpg";
//    //<div className="Insights-hero-background" style={{ background: `url(${backgroundImage}) 50% / cover no-repeat` }}></div>
import eogWord from "./eog.png";
import eogSymbol from "./eogSymbol.png";

import Form from "./Form.js";

function App() {
  return (
    <div className="App">
      <div className="Header-container">
        <h1 className="Title-text">Hydrate Predicter</h1>
      </div>
      <div className="Small-header-container">
        <h1 className="Small-title-text">LEASE OPERATOR</h1>
      </div>
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
        style={{ background: `url(${backgroundImage}) 50% / cover no-repeat` }}
      ></div>
      <div className="White-line"></div>
      <div className="App-hero-background-purple"></div>

      <div className="Beyond-text-container">
        <h1 className="Beyond-title-text">Generate Insights</h1>
      </div>

      <Form />
    </div>
  );
}

export default App;
