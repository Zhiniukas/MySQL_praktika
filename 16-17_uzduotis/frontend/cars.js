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

async function deleteCar(id) {
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

let carList = await getCars(ENDPOINT);

const onClick = (event) => {
  if (event.target.nodeName === "BUTTON") {
    carList = removeObjectWithId(carList, event.target.id);
    populateCarsList(carList);
  }
};

populateCarsList(carList);

function removeObjectWithId(arr, id) {
  return arr.filter((obj) => obj.id !== id);
}

window.addEventListener("click", onClick);
