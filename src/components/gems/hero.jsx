import heroimg from "./assets/heroimg.webp";
export const Hero = () => {
  return (
    <div className="hero">
      <div className="top">
        <h1>
          <span className="title">Gems</span>
          <br></br>Modern Academy
        </h1>
        <h3>Enrich the quality of your kid's academic life!</h3>
      </div>
      <img className="bottom" src={heroimg} alt="" />
    </div>
  );
};
