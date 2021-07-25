import { API } from "../../backend";

export const getAllProducts = () => {
  if (typeof window !== "undefined") {
    return fetch(`${API}/products`, {
      method: "GET",
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .catch((err) => console.log(err));
  }
};
