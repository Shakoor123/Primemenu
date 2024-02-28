import axios from "axios";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const createurltrackerusingCode = async (data) => {
  try {
    const res = await axios.post(apiUrl + `urlnavigate/code_validate`, data);
    return res;
  } catch (err) {
    return { message: "create new urltracker error", err };
  }
};

export { createurltrackerusingCode };
