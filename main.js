const URL = "https://crudcrud.com/api/c7d09b8750514a76b742f67cd31efb5a/ecom";

// GET Products
function getProducts() {
  axios(URL)
    .then((res) => showOutput(res))
    .catch((err) => console.error(err));
  const submitButton = document.getElementById("post");
  submitButton.disabled = true;
}

// ADD Products
function addProduct(event) {
  event.preventDefault();
  const bookingObject = {
    name: document.getElementById("name").value,
    price: document.getElementById("price").value,
  };
  if (bookingObject.name != "" && bookingObject.value != "") {
    axios({
      method: "post",
      url: URL,
      data: bookingObject,
    })
      .then(() => getProducts())
      .catch((err) => console.error(err));
    document.getElementById("myForm").reset();
  }
}

// DELETE Products
function deleteProduct(event) {
  let id = event.target.parentElement.id;
  axios({
    method: "delete",
    url: `${URL}/${id}`,
  })
    .then(() => getProducts())
    .catch((err) => console.error(err));
}

// UPDATE Products
function updateProduct(event) {
  let id = event.target.parentElement.id;
  let li = document.getElementById(id);
  let text = li.childNodes[0].textContent.split("-");
  const bookingObject = {
    name: text[0],
    price: text[1],
  };
  let nameElement = document.getElementById("name");
  nameElement.value = bookingObject.name;
  let priceElement = document.getElementById("price");
  priceElement.valueAsNumber = bookingObject.price;

  deleteProduct(event);
  const submitButton = document.getElementById("post");
  submitButton.disabled = false;
}

// Show output in browser
function showOutput(res) {
  document.getElementById("res").innerHTML = ``;
  res.data
    .reverse()
    .slice(0, 5)
    .forEach((element) => {
      document.getElementById("res").innerHTML += `
    <li class="d-flex align-items-center my-3" id="${element._id}"><div class="mx-3 w-25">${element.name} - ${element.price}</div> <button class="btn btn-danger mx-3" id="delete" onclick="deleteProduct(event)">DELETE</button> <button class="btn btn-warning" id="update" onclick="updateProduct(event)">UPDATE</button></li>
 `;
    });
}

// Event listeners
document.getElementById("post").addEventListener("click", addProduct);
window.addEventListener("DOMContentLoaded", getProducts);
const myForm = document.getElementById("myForm");
myForm.addEventListener("input", updateButton);

function updateButton() {
  const name = document.getElementById("name");
  const price = document.getElementById("price");
  const submitButton = document.getElementById("post");
  if (name.value.length > 0 && price.valueAsNumber >= 0) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}
