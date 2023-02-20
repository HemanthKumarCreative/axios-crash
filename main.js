// GET REQUEST
function getTodos() {
  axios("https://crudcrud.com/api/ee5fb260cd484729bf1dd06c6c6fd05d/ecomData")
    .then((res) => showOutput(res))
    .catch((err) => console.error(err));
}

// POST REQUEST
function addTodo(event) {
  event.preventDefault();
  const bookingObject = {
    name: document.getElementById("name").value,
    price: document.getElementById("price").value,
  };

  axios({
    method: "post",
    url: "https://crudcrud.com/api/ee5fb260cd484729bf1dd06c6c6fd05d/ecomData",
    data: bookingObject,
  })
    .then(() => getTodos())
    .catch((err) => console.error(err));
  document.getElementById("myForm").reset();
}

//remove
function removeTodo(event) {
  let id = event.target.parentElement.parentElement.id;
  axios({
    method: "delete",
    url: `https://crudcrud.com/api/ee5fb260cd484729bf1dd06c6c6fd05d/ecomData/${id}`,
  })
    .then(() => getTodos())
    .catch((err) => console.error(err));
}

// Show output in browser
function showOutput(res) {
  document.getElementById("res").innerHTML = ``;
  res.data
    .reverse()
    .slice(0, 5)
    .forEach((element) => {
      document.getElementById("res").innerHTML += `
    <li id="${element._id}"><pre>${element.name} - ${element.price} <button class="btn btn-danger" id="delete" onclick="removeTodo(event)">DELETE</button> <button class="btn btn-warning" id="update" onclick="removeTodo(event)">UPDATE</button></pre></li>
 `;
    });
}

// Event listeners
document.getElementById("post").addEventListener("click", addTodo);

window.addEventListener("DOMContentLoaded", getTodos);
