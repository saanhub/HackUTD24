import "./Graph.css";

import backgroundImage from "./winter.jpg";
import blueBackground from "./bluebg.png";
//    //<div className="Insights-hero-background" style={{ background: `url(${backgroundImage}) 50% / cover no-repeat` }}></div>
import eogWord from "./eog.png";
import eogSymbol from "./eogSymbol.png";

function Graph() {
  return (
    <div className="Graph">
      <div className="Header-container">
        <h1 className="Title-text">RESULTS</h1>
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
        style={{ background: `url(${blueBackground}) 50% / cover no-repeat` }}
      ></div>
      <div className="White-line"></div>
      <div className="App-hero-background-purple"></div>
      <div className="Graph-Purple-container"></div>
      <div className="Graph-container">
        <h1 className="Graph-text">Prediction Graph</h1>
      </div>
    </div>
  );
}

export default Graph;
