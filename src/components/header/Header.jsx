import React from "react";
import "./Header.css";
export default function Header() {
  return (
    <div className="header">
      <div className="headerTop">
        <img src="/images/pmenu-logo.svg" alt="" className="left" />
        <div className="right">
          <img src="/images/logo.png" alt="" className="logo" />
        </div>
      </div>
      <div className="headerBottom">
        <span className="title">Welcome </span>
        <span className="text">happy to see you here..</span>
      </div>
    </div>
  );
}
