import "./App.css";

import backgroundImage from "./winter.jpg";
import blueBackground from "./bluebg.png";
//    //<div className="Insights-hero-background" style={{ background: `url(${backgroundImage}) 50% / cover no-repeat` }}></div>
import eogWord from "./eog.png";
import eogSymbol from "./eogSymbol.png";

import { motion } from "framer-motion";

import Form from "./Form.js";

const text = "Generate Insights"; // Define the text variable

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
        style={{ background: `url(${blueBackground}) 50% / cover no-repeat` }}
      ></div>
      <div className="White-line"></div>
      <div className="App-hero-background-purple"></div>

      {/* Animated Text for "Generate Insights" */}
      <div className="Beyond-text-container">
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            className="Beyond-title-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: index * 0.1,
              duration: 0.1,
              repeat: Infinity,
              repeatDelay: 10,
            }}
          >
            {char}
          </motion.span>
        ))}
      </div>

      <Form />
    </div>
  );
}

export default App;
