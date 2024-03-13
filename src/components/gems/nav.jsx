import { useEffect, useState } from "react";
import logo from "./assets/gems-logo.png";
import icon from "./assets/placeholder-2 1.svg";
import ReactLoading from "react-loading";
import { useDispatch } from "react-redux";
import { createurltrackerusingCode } from "../../helper/apiCalls";
import { addLocation } from "../../redux/locationSlice";
import axios from "axios";

export const Nav = () => {
  const [place, setPlace] = useState("");
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  var options = {
    enableHighAccuracy: true,
    timeout: 7000,
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
    setPlace("Disabled");
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

  const requestLocationPermission = () => {
    console.log("button clicked");
    navigator.geolocation.getCurrentPosition(success, errors, options);
  };
  return (
    <nav className="nav">
      <img src={logo} alt="" />
      <button className="btn-nav">
        <img src={icon} alt="" />
        {place ? (
          <span className={place == "Disabled" && "decreseOpacity"}>
            {place}
          </span>
        ) : (
          <div className="loadingWrapper" style={{ marginTop: "-5px" }}>
            <ReactLoading
              type={"bubbles"}
              color={"#F68712"}
              height={20}
              width={60}
              marginBottom={"20px"}
            />
          </div>
        )}
      </button>
    </nav>
  );
};
