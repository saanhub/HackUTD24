import "./App.css";

import backgroundImage from "./winter.jpg";
//    //<div className="Insights-hero-background" style={{ background: `url(${backgroundImage}) 50% / cover no-repeat` }}></div>

function App() {
  return (
    <div className="App">
      <div
        className="App-image-background"
        style={{ background: `url(${backgroundImage}) 50% / cover no-repeat` }}
      ></div>
      <div className="App-hero-background-purple"></div>
    </div>
  );
}

export default App;
