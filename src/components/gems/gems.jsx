import { Hero } from "./hero";
import { Nav } from "./nav";
import "./sass/app.scss";
import img1 from "./assets/img1.webp";
import img2 from "./assets/img2.webp";
import img3 from "./assets/img3.webp";
import img4 from "./assets/img4.webp";
import img5 from "./assets/img5.webp";
import img6 from "./assets/img6.webp";
export const Gems = () => {
  return (
    <div className="gems-body">
      <Nav />
      <Hero />
      <div className="card-list">
        <div className="card">
          <div className="left">
            <div className="contents">
              <div className="text">
                <h2>
                  Explore more on <br></br>
                  <span>Our Website.</span>
                </h2>
                <p>The Best montessori Online Teaching Institution & Nursery</p>
              </div>
              <button className="btn-card">Visit now</button>
            </div>
          </div>
          <div className="right" id="card1">
            {" "}
          </div>
        </div>
        <div className="card">
          <div className="left">
            <div className="contents">
              <div className="text">
                <h2>
                  <span>Enroll now!</span>
                </h2>
                <p>The Best montessori Online Teaching Institution & Nursery</p>
              </div>
              <button className="btn-card">Enroll now</button>
            </div>
          </div>
          <div className="right" id="card2">
            {" "}
          </div>
        </div>
        <div className="image-card"> </div>
      </div>
      <div className="gallary-section">
        <div className="heading">
          <h2>Gallary</h2>
          <p>Glimpses of the good old days</p>
        </div>
        <div className="image-grid">
          <div className="row">
            <img src={img1} alt="" />
            <img src={img2} alt="" />
          </div>
          <div className="row">
            <img src={img3} alt="" />
            <img src={img4} alt="" />
          </div>
          <div className="row">
            <img src={img5} alt="" />
            <img src={img6} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};
