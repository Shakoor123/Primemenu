import bannerImage from "./assets/bannerImage.jpg";
export const Hero = () => {
  return (
    <div className="hero">
      <div className="top">
        <h1>
          <span className="title">Gems</span>
          <br></br>Modern Academy
        </h1>
        <h3>The future belongs to the curious</h3>
      </div>
      <img className="bottom" src={bannerImage} alt="" />
    </div>
  );
};
