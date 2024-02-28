import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import { useSelector } from "react-redux";
import { createurltrackerusingCode } from "../../helper/apiCalls";

export default function Urlmapper() {
  var mappercode = window.location.pathname.split("/")[2];
  var navigate = useNavigate();
  var location = useSelector((state) => state?.location?.location);
  // console.log("location", location);
  // window.location.replace(res?.data?.destination_url);
  useEffect(() => {
    const createEntryForUrl = async () => {
      var primemenuData = JSON.parse(localStorage.getItem("primemenu-data"));
      console.log(primemenuData);
      if (primemenuData?.location) {
        const res = await createurltrackerusingCode({
          user_id: primemenuData?.user_id,
          code: mappercode,
          location: primemenuData?.location,
        });
        console.log(res);
        if (res?.data?.destination_url) {
          window.location.replace(res?.data?.destination_url);
        }
      } else {
        const res = await createurltrackerusingCode({
          user_id: primemenuData?.user_id,
          code: mappercode,
        });
        if (res?.data?.destination_url) {
          window.location.replace(res?.data?.destination_url);
        }
      }
    };
    createEntryForUrl();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <ReactLoading
        type={"bubbles"}
        color={"#F68712"}
        height={80}
        width={100}
      />
    </div>
  );
}
