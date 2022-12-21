const apiUrl = "http://localhost:5000/cars";

const insertcarTitle = (carTitle) => {
  const addCar = document.createElement("div");
  const userName = document.createElement("a");
  const userDetails = populateDetailsList(carTitle);

  addCar.className = "carTitle";
  carUrl.className = "carUrl";
  carPlace.classname = "carPlate";

  link = document.createTextNode(`${carTitle.name} ${carTitle.surname}`);

  userName.append(link);
  userName.title = "Delete";
  userName.href = `${apiUrl}/${carTitle.id}`;

  addCar.append(userName, userDetails);
  return addCar;
};

const populateDetailsList = (details) => {
  const result = document.createElement("div");

  details.forEach((detail) => {
    if (detail.key !== "id" || detail.key !== "date") {
      const fieldName = document.createElement("div");
      const fieldValue = document.createElement("div");

      fieldValue.className = "detailsValue";
      fieldName.className = "detailsField";
      fieldName.append(detail.key);
      fieldValue.append(detail.value);

      result.append(fieldName, fieldValue);
    }
  });

  return result;
};

const populateCarsList = (cars) => {
  console.log(cars);
  const cardList = document.querySelector("#car-grid");
  const populatedCards = document.createElement("div");

  cars.forEach(function (car) {
    populatedCards.append(insertcarTitle(car));
  });

  cardList.append(populatedCards);
};

export { populateCarsList };
