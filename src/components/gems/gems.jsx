import { Card } from "./card";
import { Hero } from "./hero";
import { Nav } from "./nav";
import "./sass/app.scss";

export const Gems = () => {
  return (
    <div className="gems-body">
      <Nav />
      <Hero />
    <div className="cards-group">
      <Card/>
    </div>
    </div>
  )
};
