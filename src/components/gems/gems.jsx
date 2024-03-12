import { Hero } from "./hero";
import { Nav } from "./nav";
import "./sass/app.scss";
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
        <div className="image-card">
        {" "} </div>
      </div>
    </div>
  );
};
