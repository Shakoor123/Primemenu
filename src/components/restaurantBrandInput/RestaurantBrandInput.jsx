import React, { useEffect, useState } from "react";
import "./RestaurantBrandInput.css";
const RestaurantBrandInput = (setPage) => {
  const [name, setName] = useState("");
  useEffect(() => {
    let data = localStorage.getItem("engage-primeads");
    if (data) {
      setName(JSON.parse(data).name);
    }
  }, [localStorage.getItem("engage-primeads")]);
  const deletecookie = () => {
    localStorage.removeItem("engage-primeads");
    setPage.setPage(1);
    setName("");
  };
  const overlayStyle1 = {
    content: "",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.8)", // Adjust the opacity as needed
    pointerEvents: "none",
    zIndex: 100, // Allow clicks to go through the overlay
  };
  return (
    <>
      <div class="restaurant">
        <div class="resBody">
          {name && (
            <div className="topAn">
              <span>{name ? name : ""} </span>
            </div>
          )}

          <img src="/images/logo.png" alt="" class="resLogo" />
          <img
            src="/images/restaurant-back.svg"
            alt=""
            style={{ alignSelf: "flex-start" }}
            onClick={() => {
              setPage.setPage(1);
            }}
          />
          {/* <div class="menuCard rescolor1">
            <div class="menuCardLeft">
              <h3 class="menuTitle">Dine-in menu</h3>
              <span class="menuText">
                Order it yourself from the wide range of food on our
                restaurant's digital menu
              </span>
              <a
                href="https://food-order.in/hotel-aryaas
              "
                class="menuButton"
              >
                View items
              </a>
            </div>
            <img src="/images/dosa.png" alt="" class="menuImage" />
          </div>
          <div class="menuCard rescolor2">
            <div class="menuCardLeft">
              <h3 class="menuTitle">Offers & Discounts</h3>
              <span class="menuText">
                Use the brand code to explore what every brand offers. Find the
                brand code from the restaurant TV commercials
              </span>
              <a
                href="https://wa.me/919526157373?text=Would like to know more information"
                class="menuButton"
              >
                Discover
              </a>
            </div>
            <img
              src="/images/discounts.png"
              alt=""
              class="menuImage"
            />
          </div> */}
          <img src="/images/sfscard.png" alt="" style={{ width: "100%" }} />

          <div className="rbi-form">
            <input
              type="text"
              placeholder="Explore with Brand code"
              className="rbi-input"
            />
            <img src="/images/search.png" alt="" className="search" />
          </div>
          <div className="codes">
            <span className="code-item">SFSHome</span>
            <span className="code-item">Casedel</span>
            <span className="code-item">Aryaas</span>
          </div>
          <div class="secondMenu">
            <a
              style={{ textDecoration: "none" }}
              href="https://wa.me/919526151000?text=Call me back and explain me how I can advertise here"
              class="secondMenuItem rescolor1"
            >
              <img src="/images/advertise.png" alt="" class="secondMenuImage" />
              <span class="menuTitle">
                Home and
                <br /> Villas
              </span>
              <span class="menuText">Advertise to premium community</span>
            </a>
            <a
              style={{ textDecoration: "none" }}
              href="https://goo.gl/maps/BiWJ4m7QDKworFvH8"
              class="secondMenuItem rescolor4"
            >
              <img src="/images/rate_us.png" alt="" class="secondMenuImage" />
              <span class="menuTitle">
                Health & <br /> fitness
              </span>
              <span class="menuText">
                Rate us through the Google rating system
              </span>
            </a>
          </div>
          <div class="secondMenu">
            <a
              style={{ textDecoration: "none" }}
              href="https://wa.me/919526157373?text=Would like to book party halls"
              class="secondMenuItem rescolor3"
            >
              <img src="/images/partyhall.png" alt="" class="secondMenuImage" />
              <span class="menuTitle">
                Education & <br /> Training
              </span>
              <span class="menuText">Reserve your seats and tables</span>
            </a>
            <a
              style={{ textDecoration: "none" }}
              href="https://wa.me/919526157373?text=Would like to book rooms"
              class="secondMenuItem rescolor2"
            >
              <img
                src="/images/book_a_hotel.png"
                alt=""
                class="secondMenuImage"
              />
              <span class="menuTitle">
                Fun and <br /> Leisure
              </span>
              <span class="menuText">
                Book your room for a stay at this location
              </span>
            </a>
          </div>
          <div class="menuCard rescolor2">
            <div class="menuCardLeft">
              <h3 class="menuTitle">How this works?</h3>
              <span class="menuText">
                Use the brand code to explore what every brand offers. Find the
                brand code from the restaurant TV commercials
              </span>
              <a
                href="https://wa.me/919526157373?text=Would like to know more information"
                class="menuButton"
              >
                Discover
              </a>
            </div>
            <img src="/images/questians.png" alt="" class="menuImage" />
          </div>
          <div class="resFooter">
            <img src="/images/resFooter1.png" />
            <div className="resfooterItem">
              <a style={{ textDecoration: "none" }} href="https://primeads.ai/">
                <img
                  src="/images/engageFooter.svg"
                  alt=""
                  class="resFooterImage"
                />
              </a>
              <span class="resFooterText">Made in India | Fuelled by DMS</span>
            </div>
            <img src="/images/resFooter2.png" />
            <img
              src="/images/resFooter3.png"
              style={{ mixBlendMode: "multiply" }}
            />
            {name && (
              <span className="resLogOut" onClick={deletecookie}>
                Log Out
              </span>
            )}
            <span class="resFooterText1">
              More excitement on the way. Stay Tuned KOCHI
            </span>
          </div>
        </div>
        <div style={overlayStyle1}></div>
      </div>
      <h2 className="resPc">Available on mobile only</h2>
    </>
  );
};

export default RestaurantBrandInput;
