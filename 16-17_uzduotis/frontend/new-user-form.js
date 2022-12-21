const usersUrl = "localhost:5000/users";
const membershipsUrl = "localhost:5000/memberships";
const newUserForm = document.querySelector("form#new-user-form");

async function getMemberships(api) {
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

const populateSelectField = (listData, idTag) => {
  const optionList = document.querySelector(idTag);

  listData.forEach((record) => {
    const option = record;
    const element = document.createElement("option");
    element.textContent = option;
    element.value = option;
    optionList.appendChild(element);
  });
};

const membershipList = await getMemberships(membershipsUrl).membership_name;
console.log(membershipList);

populateSelectField(membershipList, "#membership-select");

// userFormClear.addEventListener("clear", async (event) => {
//   event.preventDefault();
//   document.getElementById("#user-form").reset();
// }

newUserForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.querySelector("#firstName-input").value.trim();
  const lastName = document.querySelector("#lastName-input").value.trim();
  const email = document.querySelector("#email-input").value.trim();
  const membershipName = document.querySelector("#membershipName-input").value;

  const newPost = { name, lastName, email, membershipName };
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
