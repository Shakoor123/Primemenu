import React from "react";
import { useState } from "react";
import "./Restaurant.css";
const Restaurant = () => {
  return (
    <>
      {/* {page == 2 && <RestaurantUserInput setPage={setPage} />}
      {page == 3 && <RestaurantBrandInput setPage={setPage} />} */}
      <div class="restaurant">
        <div class="resBody">
          <img src="/images/logo.png" alt="" class="resLogo" />
          <div class="menuCard rescolor1">
            <div class="menuCardLeft">
              <h3 class="menuTitle">Dine-in menu</h3>
              <span class="menuText">
                Order it yourself from the wide range of food on our
                restaurant's digital menu
              </span>
              <span
                class="menuButton"
                onClick={() => {
                  // if (localStorage.getItem("engage-primeads")) {
                  window.location.href =
                    "https://www.food-order.in/aryaas-regent?iden=A1&idel=TABLE&conf=Dine-In";
                  // } else {
                  //   setPage(2);
                  // }
                }}
              >
                View menu
              </span>
            </div>
            <img src="/images/dosa.png" alt="" class="menuImage" />
          </div>
          <div class="menuCard rescolor2">
            <div class="menuCardLeft">
              <h3 class="menuTitle">Deals</h3>
              <span class="menuText">
                Use the brand code to explore what every brand offers. Find the
                brand code from the restaurant TV commercials
              </span>
              <span
                class="menuButton"
                onClick={() => {
                  // setPage(3);
                }}
              >
                Coming Soon
              </span>
            </div>
            <img src="/images/discounts.png" alt="" class="menuImage" />
          </div>
          <div class="secondMenu">
            <a
              style={{ textDecoration: "none" }}
              href="https://wa.me/919526151000?text=Call me back and explain me how I can advertise here"
              class="secondMenuItem rescolor1"
            >
              <img src="/images/advertise.png" alt="" class="secondMenuImage" />
              <span class="menuTitle">
                Advertise <br /> with us
              </span>
              <span class="menuText">Advertise to premium community</span>
            </a>
            <a
              style={{ textDecoration: "none" }}
              href="https://maps.google.com/maps?sca_esv=566856875&rlz=1C1JJTC_enIN1020IN1020&output=search&q=aryaas+regent&source=lnms&entry=mc&sa=X&sqi=2&ved=2ahUKEwifuYP7hLmBAxU3yjgGHZVZBFcQ0pQJegQICxAB"
              class="secondMenuItem rescolor4"
            >
              <img src="/images/rate_us.png" alt="" class="secondMenuImage" />
              <span class="menuTitle">
                Rate <br /> Us
              </span>
              <span class="menuText">
                Rate us through the Google rating system
              </span>
            </a>
          </div>
          <div class="secondMenu">
            <a
              style={{ textDecoration: "none" }}
              href="https://wa.me/919526157373?text= Hi, I would like to book party halls at Aryaas Regent, Kindly let me know the availability and price details"
              class="secondMenuItem rescolor3"
            >
              <img src="/images/partyhall.png" alt="" class="secondMenuImage" />
              <span class="menuTitle">
                Book party <br /> hall
              </span>
              <span class="menuText">Reserve your seats and tables</span>
            </a>
            <a
              style={{ textDecoration: "none" }}
              href="https://wa.me/919526157373?text= Hi, I would like to book rooms at Aryaas Regent, Kindly let me know the availability and price details"
              class="secondMenuItem rescolor2"
            >
              <img
                src="/images/book_a_hotel.png"
                alt=""
                class="secondMenuImage"
              />
              <span class="menuTitle">
                Book hotel <br /> room
              </span>
              <span class="menuText">
                Book your room for a stay at this location
              </span>
            </a>
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
            <span class="resFooterText1">
              More excitement on the way. Stay Tuned KOCHI
            </span>
          </div>
        </div>
      </div>
      <h2 className="resPc">Available on mobile only</h2>
    </>
  );
};

export default Restaurant;
