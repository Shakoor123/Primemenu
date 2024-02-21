import React, { useState } from "react";
import "./RestaurantUserInput.css";
const RestaurantUserInput = (setPage) => {
  const backgroundImageStyle = {
    background: `url("/images/aryaas-bg.png")`,
    backgroundSize: "cover", // You can adjust this as needed
  };
  const overlayStyle = {
    content: "",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)", // Adjust the opacity as needed
    pointerEvents: "none",
    zIndex: 1, // Allow clicks to go through the overlay
  };
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [ccode, setCcode] = useState("+91");

  let cookie = {
    name,
    phone: ccode + phone,
  };

  const restoLogin = () => {
    if (!name || !phone) {
      alert("please input details");
      return;
    }
    localStorage.setItem("engage-primeads", JSON.stringify(cookie));
    setName("");
    setPhone("");
    window.location.href = "https://food-order.in/aryaas-regent";
  };

  return (
    <>
      <div className="rui" style={backgroundImageStyle}>
        <div className="rui-wrapper" style={{ zIndex: 10 }}>
          <img src="/images/logo.png" alt="" class="resLogo" />
          <span className="rui-headding">
            A<br /> New way
            <br /> to{" "}
            <span className="rui-bold">
              ORDER
              <br /> FOOD
            </span>{" "}
            and
            <br /> MORE
          </span>
          <div className="rui-form">
            <input
              type="text"
              placeholder="Name"
              className="rui-input-name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <div className="rui-form-row">
              <input
                type="text"
                placeholder="+91"
                value={ccode}
                onChange={(e) => {
                  setCcode(e.target.value);
                }}
                className="rui-input-contry"
              />
              <input
                type="text"
                placeholder="Phone"
                className="rui-input-name"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </div>
            <button className="rui-btn" onClick={restoLogin}>
              Proceed
            </button>
          </div>
          <span
            className="rui-footer-skip"
            onClick={() => {
              setPage.setPage(1);
            }}
          >
            {"Skip >>"}
          </span>
          <span className="rui-footer-text">
            Order it yourself from the wide range of food on our restaurant's
            digital menu
          </span>
        </div>
        <img
          src="/images/engageFooter.svg"
          alt=""
          class="resFooterImage ruifooterImage"
        />
      </div>
      <div style={overlayStyle}></div>
    </>
  );
};

export default RestaurantUserInput;
