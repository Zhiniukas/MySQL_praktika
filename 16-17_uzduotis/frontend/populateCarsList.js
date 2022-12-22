const createElementWithParams = (tagName, params) => {
  const element = document.createElement(tagName);

  Object.assign(element, params);

  return element;
};

const populateCarsList = (members) => {
  const createMembersList = document.querySelector("#cars-grid");
  const elementList = document.createElement("div");

  elementList.className = "carList";

  members.forEach((member) => {
    const rowElement = document.createElement("div");
    const carTitle = createElementWithParams("div", {
      textContent: member.title,
    });
    const carPrice = createElementWithParams("div", {
      textContent: member.price,
    });
    const carNumberplate = createElementWithParams("div", {
      textContent: member.numberplates,
    });
    const imgdata = createElementWithParams("div");
    const img = document.createElement("img");
    const carDeleteButton = createElementWithParams("button");

    carTitle.className = "carTitle";
    carPrice.className = "carPrice";
    carNumberplate.className = "carNumberplate";
    carDeleteButton.className = "carDeleteButton";

    carDeleteButton.setAttribute("id", `${member.id}`);
    carDeleteButton.append("Delete");

    rowElement.className = "record";

    img.src = member.image;
    imgdata.append(img);
    rowElement.append(
      carTitle
      // carNumberplate,
      // carPrice,
      // imgdata,
      //carDeleteButton
    );
    elementList.append(rowElement);
  });

  createMembersList.append(elementList);
};

export { populateCarsList };
