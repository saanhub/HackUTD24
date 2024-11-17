import './Insights.css';
import backgroundImage from './winter.jpg';
//    //<div className="Insights-hero-background" style={{ background: `url(${backgroundImage}) 50% / cover no-repeat` }}></div>

function Insights() {
  return (
    <div className="Insights">
        <div className="Insights-hero-background" style={{ background: `url(${backgroundImage}) 50% / cover no-repeat` }}></div>
        <div className="Insights-hero-background-purple"></div>
    </div>
  );
}

export default Insights;