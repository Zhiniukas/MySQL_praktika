const apiUrl = "http://localhost:5000/cars";
const addCarForm = document.querySelector("form#add-car-form");

addCarForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const carName = document.querySelector("#name-input").value.trim();
  const carPrice = document.querySelector("#price-input").value.trim();
  const carImageUrl = document.querySelector("#url-input").value.trim();
  const carNumberplate = document
    .querySelector("#numberplate-input")
    .value.trim();

  const newPost = JSON.stringify({
    carName,
    carImageUrl,
    carPrice,
    carNumberplate,
  });
  console.log(newPost);
  // todo: trycatch
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: newPost, // HTTP REQUESTO PAGRINDINIS TURINYS (BODY)
  });

  if (response.ok) {
    document.body.style.backgroundColor = "green";
  }
});
