import { populateCarsList } from "./populateCarsList.js";

const ENDPOINT = "cars.json";

async function getCars(api) {
  try {
    const response = await fetch(api);

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
}

const carList = await getCars(ENDPOINT);

populateCarsList(carList);

const onClick = (event) => {
  if (event.target.nodeName === "BUTTON") {
    console.log(event.target.id);
  }
};
window.addEventListener("click", onClick);
