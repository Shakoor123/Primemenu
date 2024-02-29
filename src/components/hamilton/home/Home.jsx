import React, { useEffect, useState } from "react";
import "./Home.css";
import { Button, Chip } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addLocation } from "../../../redux/locationSlice";
import { createurltrackerusingCode } from "../../../helper/apiCalls";
import { Link, useNavigate } from "react-router-dom";
export default function Home() {
  const [place, setPlace] = useState("");
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  function success(pos) {
    var crd = pos.coords;
    getLocationName(crd.latitude, crd.longitude)
      .then((data) => {
        createNewEntryforUrltracker(data);
        var locationName = data?.display_name;
        var placesArray = locationName.split(",");
        var splitedplaces = placesArray[0].split(" ");
        if (splitedplaces.length > 0) {
          setPlace(`${splitedplaces[0]}`);
        } else {
          setPlace(`${placesArray[0]}`);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        createNewEntryforUrltracker();
      });
    setCount(count + 1);
  }
  function errors(err) {
    createNewEntryforUrltracker();
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  async function getLocationName(latitude, longitude) {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
        {
          headers: {
            "accept-language": "en-US,en;q=0.9", // Specify English language preference
          },
        }
      );
      return response.data;
    } catch (error) {
      return "Error fetching location";
    }
  }
  const createNewEntryforUrltracker = async (location) => {
    var userId = window.location.pathname.split("/")[2];
    if (!location && userId) {
      const res = await createurltrackerusingCode({
        code: "home",
        user_id: userId,
      });
      dispatch(addLocation({ user_id: userId }));
      localStorage.setItem(
        "primemenu-data",
        JSON.stringify({ user_id: userId })
      );
      return;
    } else {
      var data = {
        code: "home",
        user_id: userId,
        location: {
          name: location?.display_name,
          location_data: location.address,
          city: location?.address?.town || location?.address?.suburb,
          district: location?.address?.state_district,
          state: location?.address?.state,
          country: location?.address?.country,
          latitude: location?.lat,
          longitude: location?.lon,
        },
      };
      localStorage.setItem("primemenu-data", JSON.stringify(data));
      dispatch(addLocation(data));
      const res = await createurltrackerusingCode(data);
      return;
    }
  };
  useEffect(() => {
    checkLocationPermission();
  }, []);
  const checkLocationPermission = () => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "prompt") {
            //If prompt then the user will be asked to give permission
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
          }
        });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="h-home">
      <div className="h-header">
        <img
          src="/images/hamilton/Hamilton-logo.png"
          alt=""
          className="h-logo"
        />
        {place && (
          <div className="h-header-place">
            <svg
              width="15"
              height="14"
              viewBox="0 0 15 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 13.0015C3.04708 10.1673 8.47775 6.46925 13.8577 13.0015"
                stroke="#4B4B4B"
                stroke-linecap="round"
              />
              <path
                d="M12.205 5.04049C12.205 7.53421 10.1181 9.58099 7.51215 9.58099C4.90624 9.58099 2.81934 7.53421 2.81934 5.04049C2.81934 2.54678 4.90624 0.5 7.51215 0.5C10.1181 0.5 12.205 2.54678 12.205 5.04049Z"
                stroke="#4B4B4B"
              />
            </svg>
            {place}
          </div>
        )}
      </div>
      <div className="h-schoolSection">
        <div className="h-schoolSection-top">
          <div className="h-contents">
            <span className="h-title">Hamilton</span>
            <span className="h-subtitle">Montessori School</span>
            <span className="h-text" style={{ marginBottom: "18px" }}>
              Enrich the quality of your kid's academic life!
            </span>
          </div>
          <svg
            width="57"
            height="65"
            viewBox="0 0 57 65"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-cable"
          >
            <path
              d="M19.2258 26.0646C19.2275 26.7982 19.2616 27.5193 19.3257 28.2214C20.0893 36.58 24.7883 43.0943 31.2982 44.8174C35.3301 45.8848 39.1014 44.7836 41.6464 41.7963C44.2533 38.7373 44.8754 34.3883 43.1945 30.9747C41.9439 28.4339 38.3158 24.1892 28.041 24.3916C24.7727 24.4525 21.828 25.0124 19.2258 26.0646ZM95.333 55.418L94.1835 55.3063C96.8342 29.1359 85.9921 15.8097 76.4307 9.23903C62.3666 -0.42495 43.6312 -0.483032 33.1437 4.37011C23.3524 8.90071 19.6059 17.3857 19.2535 24.8359C21.8684 23.8503 24.7959 23.3242 28.019 23.2639C38.9304 23.0632 42.8652 27.702 44.2359 30.4858C46.1086 34.2902 45.4253 39.1258 42.5348 42.518C39.6883 45.8583 35.4826 47.0932 30.9961 45.9062C24.0143 44.0579 18.982 37.1557 18.1751 28.3217C18.1225 27.7488 18.0896 27.1652 18.0763 26.5721C15.9662 27.5853 14.1016 28.9487 12.4941 30.6578C4.58347 39.0666 5.44298 53.1834 5.4528 53.3249L4.30043 53.3999C4.25942 52.8022 3.39355 38.6691 11.6392 29.8988C13.4784 27.9422 15.63 26.4142 18.0798 25.3192C18.2906 17.3941 22.1555 8.2066 32.6487 3.35065C43.7022 -1.76299 62.5185 -1.69983 77.0955 8.31712C86.9088 15.0603 98.0386 28.7057 95.333 55.418Z"
              fill="#2D2B39"
            />
            <path
              d="M1.62135 59.957C1.62135 59.957 0.325087 52.403 4.50942 52.69C8.69348 52.9769 7.62531 59.957 7.62531 59.957"
              fill="#FF7550"
            />
            <path
              d="M0.0185061 64.8477C0.0185061 64.8477 -0.173711 60.1012 0.680825 59.2167C1.53536 58.3322 8.23002 58.5715 8.79998 59.2167C9.36967 59.8623 9.63444 64.8477 9.63444 64.8477H0.0185061Z"
              fill="#2D2B39"
            />
            <path
              d="M43.0855 42.8501C43.0855 45.0586 41.4185 46.8496 39.3618 46.8496C37.3056 46.8496 35.6387 45.0586 35.6387 42.8501C35.6387 40.6416 37.3056 38.8506 39.3618 38.8506C41.4185 38.8506 43.0855 40.6416 43.0855 42.8501Z"
              fill="#3C88A7"
            />
            <path
              d="M63.4338 27.0258C63.2601 24.7427 60.6624 22.7679 58.5412 24.2402C56.4201 25.7126 56.9891 29.3876 59.5608 30.1918C62.1326 30.9963 63.6112 29.3578 63.4338 27.0258Z"
              fill="#FF7550"
            />
            <path
              d="M62.7556 50.5307C62.8817 49.7051 58.5818 48.4439 58.5818 48.4439C58.5818 48.4439 59.154 44.2609 58.6023 43.7878C57.9476 43.2266 55.5346 47.113 55.5346 47.113C55.5346 47.113 52.0529 45.32 51.279 46.0372C50.5051 46.7544 53.793 49.7008 53.793 49.7008C53.793 49.7008 50.8537 52.2613 51.0429 53.1854C51.2321 54.1096 55.0734 52.9094 55.0734 52.9094C55.0734 52.9094 56.8682 56.3689 57.6527 56.3246C58.4372 56.2803 58.2332 52.0182 58.2332 52.0182C58.2332 52.0182 62.5813 51.6706 62.7556 50.5307Z"
              fill="#FFB533"
            />
          </svg>
        </div>
        <video autoPlay muted loop className="h-schoolSection-bottom">
          <source src="https://primeadsbucket.s3.amazonaws.com/primeads-videos/video.mp4" />
        </video>
        {/* <img
          src="/images/hamilton/schoolImage.png"
          alt=""
          className="h-schoolSection-bottom"
        /> */}
      </div>
      <div className="h-schoolSection">
        <div className="h-schoolSection-top">
          <div className="h-contents">
            <span className="h-title">Image gallery</span>
            <span className="h-text">on facebook </span>
          </div>
        </div>
        <div className="h-galleryImages">
          <img
            src="/images/hamilton/gallery1.png"
            alt=""
            className="h-gallery-left"
          />
          <div className="h-gallery-right">
            <img src="/images/hamilton/gallery2.png" alt="" />
            <img src="/images/hamilton/gallery3.png" alt="" />
          </div>
        </div>
      </div>
      <div className="h-schoolSection">
        <div className="h-bgCard">
          <div className="h-contents" style={{ marginLeft: "0" }}>
            <span className="h-lighttitle">Explore more on</span>
            <span className="h-title">our Website</span>
            <span className="h-text">
              The Best montessori Online Teaching Institution & Nursery
            </span>
            <Link to="/m/e0dcd8d4" target="_blank">
              <Button
                variant="contained"
                sx={{
                  maxWidth: "130px",
                  height: "42px",
                  fontSize: "15px",
                  textTransform: "capitalize",
                  backgroundColor: "#3E596E",
                }}
                className="h-prmarybutton"
              >
                Visit Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="h-schoolSection">
        <div className="h-bgCard h-teacherbg">
          <div
            className="h-contents"
            style={{ marginLeft: "0", maxWidth: "230px" }}
          >
            <span className="h-lighttitle">You too can become</span>
            <span className="h-title">a Montessori Teacher</span>
            <span className="h-text">
              Join our 6 months span course & change the way the future
              generation learn things.
            </span>
            <Link
              to="/m/b71285a0"
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              {" "}
              <Button
                variant="contained"
                sx={{
                  maxWidth: "130px",
                  height: "42px",
                  fontSize: "15px",
                  textTransform: "capitalize",
                  backgroundColor: "#45A647",
                }}
                className="h-prmarybutton"
              >
                Enquire Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="h-schoolSection">
        <img
          src="/images/hamilton/register-banner.png"
          alt=""
          className="h-banner-image"
        />
      </div>
      <div className="h-schoolSection">
        <div className="h-cta-wrapper">
          <div className="h-cta-item">
            <img
              src="/images/hamilton/location.svg"
              alt=""
              className="h-cta-image"
            />{" "}
            <span className="h-title">Find Us</span>
            <span className="h-text">
              We're nearby. Find us on Google Maps.
            </span>
            <Link
              to="/m/f97e762b"
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              {" "}
              <Button
                variant="contained"
                sx={{
                  maxWidth: "135px",
                  height: "42px",
                  fontSize: "14px",
                  textTransform: "capitalize",
                  backgroundColor: "#3E596E",
                }}
                className="h-prmarybutton"
              >
                Check on Map
              </Button>
            </Link>
          </div>
          <div className="h-cta-item">
            <img
              src="/images/hamilton/whatsapp.svg"
              alt=""
              className="h-cta-image"
            />
            <span className="h-title">WhatsApp</span>
            <span className="h-text">Simple, chat with us on Whatsapp.</span>
            <Link to="/m/b71285a0" target="_blank">
              <Button
                variant="contained"
                sx={{
                  maxWidth: "135px",
                  height: "42px",
                  fontSize: "14px",
                  textTransform: "capitalize",
                  backgroundColor: "#3E596E",
                }}
                className="h-prmarybutton"
              >
                Chat with us
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="h-footer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="38"
          height="17"
          viewBox="0 0 38 17"
          fill="none"
        >
          <path
            d="M5.69478 12.7136H4.875V6.63773C4.875 5.47651 5.81636 4.53516 6.97758 4.53516H9.57135C10.7326 4.53516 11.6739 5.47651 11.6739 6.63773V11.28C11.6739 12.0717 11.0321 12.7136 10.2403 12.7136H9.33975C9.23419 12.7136 9.14861 12.628 9.14861 12.5224V7.46962C9.14861 6.91174 8.69636 6.45949 8.13848 6.45949C7.58061 6.45949 7.12836 6.91174 7.12836 7.46961V11.28C7.12836 12.0717 6.48652 12.7136 5.69478 12.7136Z"
            fill="#FF9033"
          />
          <path
            d="M5.69478 12.7136H4.875V6.63773C4.875 5.47651 5.81636 4.53516 6.97758 4.53516H9.57135C10.7326 4.53516 11.6739 5.47651 11.6739 6.63773V11.28C11.6739 12.0717 11.0321 12.7136 10.2403 12.7136H9.33975C9.23419 12.7136 9.14861 12.628 9.14861 12.5224V7.46962C9.14861 6.91174 8.69636 6.45949 8.13848 6.45949C7.58061 6.45949 7.12836 6.91174 7.12836 7.46961V11.28C7.12836 12.0717 6.48652 12.7136 5.69478 12.7136Z"
            fill="url(#paint0_linear_4677_8944)"
          />
          <path
            d="M1.13538 12.7136H0.191143C0.0855778 12.7136 0 12.628 0 12.5224V6.63773C0 5.47651 0.941354 4.53516 2.10258 4.53516H5.09049C6.25171 4.53516 7.19307 5.47651 7.19307 6.63773V11.28C7.19307 12.0717 6.55123 12.7136 5.75949 12.7136H4.81526C4.70969 12.7136 4.62411 12.628 4.62411 12.5224V7.48707C4.62411 6.91955 4.16405 6.45949 3.59653 6.45949C3.02902 6.45949 2.56895 6.91955 2.56895 7.48707V11.28C2.56895 12.0717 1.92712 12.7136 1.13538 12.7136Z"
            fill="#00B1FF"
          />
          <path
            d="M3.68038 3.84265C4.05877 3.83492 4.42646 3.71561 4.73731 3.49969C5.04815 3.28376 5.28831 2.98084 5.42765 2.62893C5.56698 2.27702 5.59929 1.8918 5.52052 1.52159C5.44174 1.15139 5.2554 0.812692 4.98486 0.548003C4.71432 0.283315 4.37164 0.104423 3.99982 0.033773C3.628 -0.0368771 3.24359 0.00386166 2.89483 0.150878C2.54607 0.297894 2.2485 0.544639 2.03944 0.860153C1.83039 1.17567 1.71916 1.5459 1.71973 1.92439C1.72143 2.17941 1.77361 2.43156 1.87327 2.66631C1.97293 2.90105 2.11809 3.11373 2.30037 3.29207C2.48265 3.47041 2.69845 3.61089 2.93531 3.70539C3.17217 3.79988 3.4254 3.84653 3.68038 3.84265Z"
            fill="#00B1FF"
          />
          <path
            d="M8.26827 3.84265C8.64666 3.83492 9.01435 3.71561 9.3252 3.49969C9.63604 3.28376 9.8762 2.98084 10.0155 2.62893C10.1549 2.27702 10.1872 1.8918 10.1084 1.52159C10.0296 1.15139 9.84329 0.812692 9.57275 0.548003C9.30221 0.283315 8.95953 0.104423 8.58771 0.033773C8.21589 -0.0368771 7.83148 0.00386166 7.48272 0.150878C7.13396 0.297894 6.83639 0.544639 6.62733 0.860153C6.41828 1.17567 6.30705 1.5459 6.30762 1.92439C6.30932 2.17941 6.3615 2.43156 6.46116 2.66631C6.56082 2.90105 6.70598 3.11373 6.88826 3.29207C7.07054 3.47041 7.28634 3.61089 7.5232 3.70539C7.76006 3.79988 8.01329 3.84653 8.26827 3.84265Z"
            fill="#FF9033"
          />
          <path
            d="M23.403 12.6687H22.4587C22.3532 12.6687 22.2676 12.5831 22.2676 12.4775V6.59281C22.2676 5.43159 23.2089 4.49023 24.3702 4.49023H27.3581C28.5193 4.49023 29.4606 5.43159 29.4606 6.59281V11.2351C29.4606 12.0268 28.8188 12.6687 28.0271 12.6687H27.0828C26.9773 12.6687 26.8917 12.5831 26.8917 12.4775V7.44215C26.8917 6.87463 26.4316 6.41457 25.8641 6.41457C25.2966 6.41457 24.8365 6.87463 24.8365 7.44215V11.2351C24.8365 12.0268 24.1947 12.6687 23.403 12.6687Z"
            fill="#4E627A"
          />
          <path
            d="M36.6156 4.53447L37.5598 4.53447C37.6654 4.53447 37.751 4.62005 37.751 4.72562L37.751 10.6103C37.751 11.7715 36.8096 12.7129 35.6484 12.7129L32.6605 12.7129C31.4993 12.7129 30.5579 11.7715 30.5579 10.6103L30.5579 5.96805C30.5579 5.17631 31.1997 4.53447 31.9915 4.53447L32.9357 4.53447C33.0413 4.53447 33.1269 4.62005 33.1269 4.72562L33.1269 9.76098C33.1269 10.3285 33.5869 10.7886 34.1544 10.7886C34.722 10.7886 35.182 10.3285 35.182 9.76098L35.182 5.96805C35.182 5.17631 35.8239 4.53447 36.6156 4.53447Z"
            fill="#4E627A"
          />
          <path
            d="M21.2153 8.7261C21.2153 8.75055 21.2153 8.89796 21.1891 9.16619C21.1797 9.26261 21.0979 9.33513 21.001 9.33513H15.1232C15.2195 9.80171 15.4975 10.2127 15.8977 10.4803C16.3458 10.7728 16.8759 10.9195 17.4133 10.8996C17.7914 10.9095 18.1681 10.8514 18.525 10.7282C19.08 10.5072 19.7652 10.5034 20.1736 10.9395L20.5299 11.3201C20.5971 11.3919 20.5992 11.5035 20.5307 11.574C19.7928 12.3326 18.7339 12.7108 17.354 12.7085C16.5268 12.7256 15.707 12.552 14.9601 12.2016C14.3043 11.8814 13.7534 11.386 13.3704 10.772C12.9907 10.1451 12.7957 9.42664 12.8071 8.69692C12.7958 7.9749 12.9855 7.2636 13.3556 6.64007C13.7211 6.03123 14.2508 5.53389 14.886 5.2032C15.5515 4.86546 16.2885 4.68682 17.0373 4.68175C17.7861 4.67668 18.5255 4.84533 19.1957 5.17402C19.821 5.49463 20.3365 5.98929 20.678 6.59631C21.0508 7.24485 21.2366 7.98126 21.2153 8.7261ZM17.0761 6.39209C16.5979 6.37781 16.1302 6.53167 15.7568 6.82607C15.1879 7.29657 15.7533 8.01495 16.4915 8.01495H19.0401C18.9773 7.55691 18.7435 7.13829 18.3842 6.84065C18.0188 6.53825 17.5533 6.3786 17.0761 6.39209Z"
            fill="#4E627A"
          />
          <path
            d="M14.2804 15.2975C14.2804 15.3434 14.2774 15.3847 14.2713 15.4214H13.3423C13.35 15.5131 13.3821 15.585 13.4386 15.637C13.4952 15.689 13.5648 15.715 13.6474 15.715C13.7666 15.715 13.8515 15.6637 13.902 15.5613H14.2483C14.2116 15.6836 14.1413 15.7845 14.0373 15.864C13.9333 15.942 13.8056 15.981 13.6543 15.981C13.5319 15.981 13.4218 15.9543 13.324 15.9007C13.2276 15.8457 13.1519 15.7685 13.0969 15.6691C13.0434 15.5697 13.0166 15.455 13.0166 15.325C13.0166 15.1935 13.0434 15.0781 13.0969 14.9787C13.1504 14.8793 13.2253 14.8028 13.3217 14.7493C13.418 14.6958 13.5289 14.669 13.6543 14.669C13.7751 14.669 13.8829 14.695 13.9777 14.747C14.074 14.799 14.1482 14.8732 14.2002 14.9695C14.2537 15.0643 14.2804 15.1736 14.2804 15.2975ZM13.9479 15.2058C13.9463 15.1232 13.9165 15.0574 13.8584 15.0085C13.8003 14.958 13.7292 14.9328 13.6451 14.9328C13.5656 14.9328 13.4983 14.9573 13.4432 15.0062C13.3897 15.0536 13.3568 15.1201 13.3446 15.2058H13.9479Z"
            fill="#4E627A"
          />
          <path
            d="M15.2167 15.9604L14.9552 15.5659L14.7236 15.9604H14.3795L14.7947 15.3227L14.3749 14.6897H14.7373L14.9965 15.0819L15.2305 14.6897H15.5745L15.1571 15.3227L15.5791 15.9604H15.2167Z"
            fill="#4E627A"
          />
          <path
            d="M16.1274 14.9534V15.5682C16.1274 15.611 16.1373 15.6423 16.1572 15.6622C16.1786 15.6806 16.2138 15.6897 16.2627 15.6897H16.4118V15.9604H16.21C15.9393 15.9604 15.804 15.8289 15.804 15.5659V14.9534H15.6526V14.6897H15.804V14.3754H16.1274V14.6897H16.4118V14.9534H16.1274Z"
            fill="#4E627A"
          />
          <path
            d="M17.8241 15.2975C17.8241 15.3434 17.821 15.3847 17.8149 15.4214H16.8859C16.8936 15.5131 16.9257 15.585 16.9823 15.637C17.0388 15.689 17.1084 15.715 17.191 15.715C17.3103 15.715 17.3951 15.6637 17.4456 15.5613H17.7919C17.7552 15.6836 17.6849 15.7845 17.5809 15.864C17.4769 15.942 17.3493 15.981 17.1979 15.981C17.0755 15.981 16.9654 15.9543 16.8676 15.9007C16.7712 15.8457 16.6955 15.7685 16.6405 15.6691C16.587 15.5697 16.5602 15.455 16.5602 15.325C16.5602 15.1935 16.587 15.0781 16.6405 14.9787C16.694 14.8793 16.7689 14.8028 16.8653 14.7493C16.9616 14.6958 17.0725 14.669 17.1979 14.669C17.3187 14.669 17.4265 14.695 17.5213 14.747C17.6176 14.799 17.6918 14.8732 17.7438 14.9695C17.7973 15.0643 17.8241 15.1736 17.8241 15.2975ZM17.4915 15.2058C17.4899 15.1232 17.4601 15.0574 17.402 15.0085C17.3439 14.958 17.2728 14.9328 17.1887 14.9328C17.1092 14.9328 17.0419 14.9573 16.9869 15.0062C16.9333 15.0536 16.9005 15.1201 16.8882 15.2058H17.4915Z"
            fill="#4E627A"
          />
          <path
            d="M18.7626 14.6713C18.914 14.6713 19.0363 14.7195 19.1296 14.8158C19.2229 14.9106 19.2695 15.0437 19.2695 15.2149V15.9604H18.9484V15.2585C18.9484 15.1576 18.9232 15.0804 18.8727 15.0268C18.8223 14.9718 18.7534 14.9443 18.6663 14.9443C18.5776 14.9443 18.5073 14.9718 18.4553 15.0268C18.4048 15.0804 18.3796 15.1576 18.3796 15.2585V15.9604H18.0584V14.6897H18.3796V14.8479C18.4224 14.7929 18.4767 14.7501 18.5424 14.7195C18.6097 14.6874 18.6831 14.6713 18.7626 14.6713Z"
            fill="#4E627A"
          />
          <path
            d="M19.4923 15.3204C19.4923 15.192 19.5176 15.0781 19.568 14.9787C19.62 14.8793 19.6904 14.8028 19.779 14.7493C19.8677 14.6958 19.9664 14.669 20.0749 14.669C20.1575 14.669 20.2363 14.6874 20.3112 14.7241C20.3861 14.7592 20.4458 14.8066 20.4901 14.8663V14.263H20.8158V15.9604H20.4901V15.7723C20.4503 15.835 20.3945 15.8855 20.3227 15.9237C20.2508 15.9619 20.1674 15.981 20.0726 15.981C19.9656 15.981 19.8677 15.9535 19.779 15.8985C19.6904 15.8434 19.62 15.7662 19.568 15.6668C19.5176 15.5659 19.4923 15.4504 19.4923 15.3204ZM20.4924 15.325C20.4924 15.247 20.4771 15.1805 20.4465 15.1255C20.4159 15.0689 20.3746 15.0261 20.3227 14.997C20.2707 14.9664 20.2148 14.9511 20.1552 14.9511C20.0956 14.9511 20.0405 14.9657 19.9901 14.9947C19.9396 15.0238 19.8983 15.0666 19.8662 15.1232C19.8356 15.1782 19.8203 15.244 19.8203 15.3204C19.8203 15.3969 19.8356 15.4642 19.8662 15.5223C19.8983 15.5789 19.9396 15.6224 19.9901 15.653C20.0421 15.6836 20.0971 15.6989 20.1552 15.6989C20.2148 15.6989 20.2707 15.6844 20.3227 15.6553C20.3746 15.6247 20.4159 15.5819 20.4465 15.5269C20.4771 15.4703 20.4924 15.403 20.4924 15.325Z"
            fill="#4E627A"
          />
          <path
            d="M22.8917 14.6897L22.1049 16.5613H21.7631L22.0384 15.9283L21.5292 14.6897H21.8893L22.2173 15.5773L22.5499 14.6897H22.8917Z"
            fill="#4E627A"
          />
          <path
            d="M23.629 15.981C23.5067 15.981 23.3966 15.9543 23.2987 15.9007C23.2009 15.8457 23.1236 15.7685 23.0671 15.6691C23.012 15.5697 22.9845 15.455 22.9845 15.325C22.9845 15.195 23.0128 15.0804 23.0693 14.981C23.1275 14.8816 23.2062 14.8051 23.3056 14.7516C23.405 14.6965 23.5159 14.669 23.6382 14.669C23.7605 14.669 23.8714 14.6965 23.9708 14.7516C24.0702 14.8051 24.1482 14.8816 24.2047 14.981C24.2628 15.0804 24.2919 15.195 24.2919 15.325C24.2919 15.455 24.2621 15.5697 24.2024 15.6691C24.1443 15.7685 24.0648 15.8457 23.9639 15.9007C23.8645 15.9543 23.7529 15.981 23.629 15.981ZM23.629 15.7012C23.6871 15.7012 23.7414 15.6874 23.7919 15.6599C23.8439 15.6309 23.8851 15.588 23.9157 15.5315C23.9463 15.4749 23.9616 15.4061 23.9616 15.325C23.9616 15.2042 23.9295 15.1117 23.8653 15.0475C23.8026 14.9817 23.7254 14.9489 23.6336 14.9489C23.5419 14.9489 23.4646 14.9817 23.4019 15.0475C23.3408 15.1117 23.3102 15.2042 23.3102 15.325C23.3102 15.4458 23.34 15.5391 23.3996 15.6049C23.4608 15.6691 23.5373 15.7012 23.629 15.7012Z"
            fill="#4E627A"
          />
          <path
            d="M25.7271 14.6897V15.9604H25.4037V15.7998C25.3624 15.8549 25.3081 15.8985 25.2408 15.9306C25.175 15.9612 25.1032 15.9764 25.0252 15.9764C24.9258 15.9764 24.8379 15.9558 24.7614 15.9145C24.685 15.8717 24.6246 15.8098 24.5802 15.7287C24.5374 15.6461 24.516 15.5483 24.516 15.4351V14.6897H24.8371V15.3892C24.8371 15.4902 24.8623 15.5682 24.9128 15.6232C24.9633 15.6767 25.0321 15.7035 25.1192 15.7035C25.2079 15.7035 25.2775 15.6767 25.328 15.6232C25.3784 15.5682 25.4037 15.4902 25.4037 15.3892V14.6897H25.7271Z"
            fill="#4E627A"
          />
          <path
            d="M26.365 14.8869C26.4063 14.8196 26.4598 14.7669 26.5256 14.7287C26.5929 14.6904 26.6693 14.6713 26.755 14.6713V15.0085H26.6701C26.5692 15.0085 26.4927 15.0322 26.4407 15.0796C26.3903 15.127 26.365 15.2096 26.365 15.3273V15.9604H26.0439V14.6897H26.365V14.8869Z"
            fill="#4E627A"
          />
          <path
            d="M27.8389 14.8755C27.8802 14.8143 27.9368 14.7646 28.0087 14.7264C28.0821 14.6881 28.1654 14.669 28.2587 14.669C28.3672 14.669 28.4651 14.6958 28.5523 14.7493C28.641 14.8028 28.7105 14.8793 28.761 14.9787C28.813 15.0765 28.839 15.1905 28.839 15.3204C28.839 15.4504 28.813 15.5659 28.761 15.6668C28.7105 15.7662 28.641 15.8434 28.5523 15.8985C28.4651 15.9535 28.3672 15.981 28.2587 15.981C28.1639 15.981 28.0805 15.9627 28.0087 15.926C27.9383 15.8878 27.8817 15.8388 27.8389 15.7792V15.9604H27.5178V14.263H27.8389V14.8755ZM28.511 15.3204C28.511 15.244 28.4949 15.1782 28.4628 15.1232C28.4322 15.0666 28.3909 15.0238 28.339 14.9947C28.2885 14.9657 28.2334 14.9511 28.1738 14.9511C28.1157 14.9511 28.0607 14.9664 28.0087 14.997C27.9582 15.0261 27.9169 15.0689 27.8848 15.1255C27.8542 15.1821 27.8389 15.2486 27.8389 15.325C27.8389 15.4015 27.8542 15.468 27.8848 15.5246C27.9169 15.5812 27.9582 15.6247 28.0087 15.6553C28.0607 15.6844 28.1157 15.6989 28.1738 15.6989C28.2334 15.6989 28.2885 15.6836 28.339 15.653C28.3909 15.6224 28.4322 15.5789 28.4628 15.5223C28.4949 15.4657 28.511 15.3984 28.511 15.3204Z"
            fill="#4E627A"
          />
          <path
            d="M30.272 14.6897V15.9604H29.9485V15.7998C29.9073 15.8549 29.853 15.8985 29.7857 15.9306C29.7199 15.9612 29.6481 15.9764 29.5701 15.9764C29.4707 15.9764 29.3828 15.9558 29.3063 15.9145C29.2298 15.8717 29.1694 15.8098 29.1251 15.7287C29.0823 15.6461 29.0609 15.5483 29.0609 15.4351V14.6897H29.382V15.3892C29.382 15.4902 29.4072 15.5682 29.4577 15.6232C29.5081 15.6767 29.577 15.7035 29.6641 15.7035C29.7528 15.7035 29.8224 15.6767 29.8728 15.6232C29.9233 15.5682 29.9485 15.4902 29.9485 15.3892V14.6897H30.272Z"
            fill="#4E627A"
          />
          <path
            d="M31.0751 15.981C30.9711 15.981 30.8778 15.9627 30.7952 15.926C30.7127 15.8878 30.6469 15.8365 30.598 15.7723C30.5506 15.7081 30.5246 15.637 30.52 15.559H30.8434C30.8495 15.6079 30.8732 15.6484 30.9145 15.6806C30.9573 15.7127 31.0101 15.7287 31.0728 15.7287C31.1339 15.7287 31.1813 15.7165 31.215 15.692C31.2501 15.6676 31.2677 15.6362 31.2677 15.598C31.2677 15.5567 31.2463 15.5261 31.2035 15.5062C31.1622 15.4848 31.0957 15.4619 31.004 15.4374C30.9091 15.4145 30.8312 15.3908 30.77 15.3663C30.7104 15.3418 30.6584 15.3044 30.614 15.2539C30.5712 15.2035 30.5498 15.1354 30.5498 15.0498C30.5498 14.9794 30.5697 14.9152 30.6094 14.8571C30.6507 14.799 30.7088 14.7531 30.7838 14.7195C30.8602 14.6858 30.9497 14.669 31.0521 14.669C31.2035 14.669 31.3243 14.7073 31.4145 14.7837C31.5047 14.8586 31.5544 14.9603 31.5636 15.0888H31.2563C31.2517 15.0383 31.2303 14.9986 31.192 14.9695C31.1553 14.9389 31.1056 14.9236 31.0429 14.9236C30.9848 14.9236 30.9397 14.9343 30.9076 14.9557C30.877 14.9771 30.8617 15.007 30.8617 15.0452C30.8617 15.088 30.8832 15.1209 30.926 15.1438C30.9688 15.1652 31.0353 15.1874 31.1255 15.2103C31.2173 15.2333 31.293 15.257 31.3526 15.2814C31.4122 15.3059 31.4635 15.3441 31.5063 15.3961C31.5506 15.4466 31.5736 15.5139 31.5751 15.598C31.5751 15.6714 31.5544 15.7371 31.5132 15.7952C31.4734 15.8533 31.4153 15.8992 31.3388 15.9329C31.2639 15.965 31.176 15.981 31.0751 15.981Z"
            fill="#4E627A"
          />
          <path
            d="M32.0015 14.5383C31.945 14.5383 31.8976 14.5207 31.8593 14.4855C31.8226 14.4488 31.8043 14.4037 31.8043 14.3502C31.8043 14.2967 31.8226 14.2523 31.8593 14.2172C31.8976 14.1805 31.945 14.1621 32.0015 14.1621C32.0581 14.1621 32.1048 14.1805 32.1415 14.2172C32.1797 14.2523 32.1988 14.2967 32.1988 14.3502C32.1988 14.4037 32.1797 14.4488 32.1415 14.4855C32.1048 14.5207 32.0581 14.5383 32.0015 14.5383ZM32.1598 14.6897V15.9604H31.8387V14.6897H32.1598Z"
            fill="#4E627A"
          />
          <path
            d="M33.1812 14.6713C33.3326 14.6713 33.455 14.7195 33.5482 14.8158C33.6415 14.9106 33.6882 15.0437 33.6882 15.2149V15.9604H33.367V15.2585C33.367 15.1576 33.3418 15.0804 33.2913 15.0268C33.2409 14.9718 33.1721 14.9443 33.0849 14.9443C32.9962 14.9443 32.9259 14.9718 32.8739 15.0268C32.8234 15.0804 32.7982 15.1576 32.7982 15.2585V15.9604H32.4771V14.6897H32.7982V14.8479C32.841 14.7929 32.8953 14.7501 32.9611 14.7195C33.0283 14.6874 33.1017 14.6713 33.1812 14.6713Z"
            fill="#4E627A"
          />
          <path
            d="M35.1748 15.2975C35.1748 15.3434 35.1717 15.3847 35.1656 15.4214H34.2367C34.2443 15.5131 34.2764 15.585 34.333 15.637C34.3896 15.689 34.4592 15.715 34.5417 15.715C34.661 15.715 34.7459 15.6637 34.7963 15.5613H35.1427C35.106 15.6836 35.0356 15.7845 34.9317 15.864C34.8277 15.942 34.7 15.981 34.5486 15.981C34.4263 15.981 34.3162 15.9543 34.2183 15.9007C34.122 15.8457 34.0463 15.7685 33.9912 15.6691C33.9377 15.5697 33.911 15.455 33.911 15.325C33.911 15.1935 33.9377 15.0781 33.9912 14.9787C34.0448 14.8793 34.1197 14.8028 34.216 14.7493C34.3124 14.6958 34.4232 14.669 34.5486 14.669C34.6694 14.669 34.7772 14.695 34.872 14.747C34.9684 14.799 35.0425 14.8732 35.0945 14.9695C35.148 15.0643 35.1748 15.1736 35.1748 15.2975ZM34.8422 15.2058C34.8407 15.1232 34.8109 15.0574 34.7528 15.0085C34.6946 14.958 34.6235 14.9328 34.5394 14.9328C34.4599 14.9328 34.3926 14.9573 34.3376 15.0062C34.2841 15.0536 34.2512 15.1201 34.239 15.2058H34.8422Z"
            fill="#4E627A"
          />
          <path
            d="M35.8955 15.981C35.7915 15.981 35.6982 15.9627 35.6156 15.926C35.533 15.8878 35.4673 15.8365 35.4184 15.7723C35.371 15.7081 35.345 15.637 35.3404 15.559H35.6638C35.6699 15.6079 35.6936 15.6484 35.7349 15.6806C35.7777 15.7127 35.8305 15.7287 35.8932 15.7287C35.9543 15.7287 36.0017 15.7165 36.0354 15.692C36.0705 15.6676 36.0881 15.6362 36.0881 15.598C36.0881 15.5567 36.0667 15.5261 36.0239 15.5062C35.9826 15.4848 35.9161 15.4619 35.8243 15.4374C35.7295 15.4145 35.6516 15.3908 35.5904 15.3663C35.5308 15.3418 35.4788 15.3044 35.4344 15.2539C35.3916 15.2035 35.3702 15.1354 35.3702 15.0498C35.3702 14.9794 35.3901 14.9152 35.4298 14.8571C35.4711 14.799 35.5292 14.7531 35.6042 14.7195C35.6806 14.6858 35.7701 14.669 35.8725 14.669C36.0239 14.669 36.1447 14.7073 36.2349 14.7837C36.3251 14.8586 36.3748 14.9603 36.384 15.0888H36.0767C36.0721 15.0383 36.0507 14.9986 36.0124 14.9695C35.9757 14.9389 35.926 14.9236 35.8633 14.9236C35.8052 14.9236 35.7601 14.9343 35.728 14.9557C35.6974 14.9771 35.6821 15.007 35.6821 15.0452C35.6821 15.088 35.7035 15.1209 35.7464 15.1438C35.7892 15.1652 35.8557 15.1874 35.9459 15.2103C36.0377 15.2333 36.1134 15.257 36.173 15.2814C36.2326 15.3059 36.2839 15.3441 36.3267 15.3961C36.371 15.4466 36.394 15.5139 36.3955 15.598C36.3955 15.6714 36.3748 15.7371 36.3336 15.7952C36.2938 15.8533 36.2357 15.8992 36.1592 15.9329C36.0843 15.965 35.9964 15.981 35.8955 15.981Z"
            fill="#4E627A"
          />
          <path
            d="M37.1454 15.981C37.0414 15.981 36.9481 15.9627 36.8655 15.926C36.7829 15.8878 36.7172 15.8365 36.6683 15.7723C36.6209 15.7081 36.5949 15.637 36.5903 15.559H36.9137C36.9198 15.6079 36.9435 15.6484 36.9848 15.6806C37.0276 15.7127 37.0804 15.7287 37.1431 15.7287C37.2042 15.7287 37.2516 15.7165 37.2853 15.692C37.3204 15.6676 37.338 15.6362 37.338 15.598C37.338 15.5567 37.3166 15.5261 37.2738 15.5062C37.2325 15.4848 37.166 15.4619 37.0742 15.4374C36.9794 15.4145 36.9015 15.3908 36.8403 15.3663C36.7807 15.3418 36.7287 15.3044 36.6843 15.2539C36.6415 15.2035 36.6201 15.1354 36.6201 15.0498C36.6201 14.9794 36.64 14.9152 36.6797 14.8571C36.721 14.799 36.7791 14.7531 36.8541 14.7195C36.9305 14.6858 37.02 14.669 37.1224 14.669C37.2738 14.669 37.3946 14.7073 37.4848 14.7837C37.575 14.8586 37.6247 14.9603 37.6339 15.0888H37.3266C37.322 15.0383 37.3006 14.9986 37.2623 14.9695C37.2256 14.9389 37.1759 14.9236 37.1132 14.9236C37.0551 14.9236 37.01 14.9343 36.9779 14.9557C36.9473 14.9771 36.932 15.007 36.932 15.0452C36.932 15.088 36.9534 15.1209 36.9963 15.1438C37.0391 15.1652 37.1056 15.1874 37.1958 15.2103C37.2876 15.2333 37.3633 15.257 37.4229 15.2814C37.4825 15.3059 37.5338 15.3441 37.5766 15.3961C37.6209 15.4466 37.6439 15.5139 37.6454 15.598C37.6454 15.6714 37.6247 15.7371 37.5835 15.7952C37.5437 15.8533 37.4856 15.8992 37.4091 15.9329C37.3342 15.965 37.2463 15.981 37.1454 15.981Z"
            fill="#4E627A"
          />
          <defs>
            <linearGradient
              id="paint0_linear_4677_8944"
              x1="6.882"
              y1="5.73685"
              x2="8.31558"
              y2="5.40235"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#E36903" />
              <stop offset="1" stop-color="#FF9033" stop-opacity="0" />
            </linearGradient>
          </defs>
        </svg>
        <span className="h-footer-text">Made in India | A DMS product</span>
        <svg
          width="360"
          height="5"
          viewBox="0 0 360 5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.3">
            <path d="M0 1.5H133.534M226.356 1.5H359.89" stroke="#BBBBBB" />
            <rect x="176.837" width="5" height="5" fill="#BBBBBB" />
          </g>
        </svg>
      </div>
      <div className="h-sticky-footer">
        <Link
          to="/m/f97e762b"
          target="_blank"
          style={{ textDecoration: "none" }}
        >
          <div className="h-sticky-footer-item">
            <img src="/images/hamilton/sticky-location.svg" alt="" />
            <span className="h-sticky-footer-text">Location</span>
          </div>
        </Link>
        <Link
          to="/m/b71285a0"
          target="_blank"
          style={{ textDecoration: "none" }}
        >
          <div className="h-sticky-footer-item">
            <img src="/images/hamilton/sticky-whatsapp.svg" alt="" />
            <span className="h-sticky-footer-text">Contact</span>
          </div>
        </Link>
        <Link
          to="/m/e0dcd8d4"
          target="_blank"
          style={{ textDecoration: "none" }}
        >
          <div className="h-sticky-footer-item">
            <img src="/images/hamilton/sticky-notifiction.svg" alt="" />
            <span className="h-sticky-footer-text">Notification</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
