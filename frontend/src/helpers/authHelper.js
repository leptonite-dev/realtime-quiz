import Cookies from "js-cookie";

export const authenticate = async () => {
  const authToken = Cookies.get("authToken");

  if (!authToken) return false;

  const res = await fetch("http://localhost:1234/auth", {
    method: "GET",
    headers: {
      authorization: authToken,
    },
  });

  if (res.status === 200) {
    const resObj = await res.json();
    return resObj;
  } else if (res.status === 401) {
    return false;
  }
};
