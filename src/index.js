const tableBody = document.getElementById("table-body")
function renderSingleDog(dog) {
    const newTr = document.createElement("tr")
    newTr.innerHTML = `
    <tr data-id=${dog.id}>
    <td>${dog.name}</td> 
    <td>${dog.breed}</td> 
    <td>${dog.sex}</td> 
    <td><button id="edit-btn" data-id=${dog.id}>Edit Dog</button></td></tr>
    `
    tableBody.append(newTr)
}

function renderAllDogs(dogsArray) {
    dogsArray.forEach(dog => {
        renderSingleDog(dog)
    });
}

fetch("http://localhost:3000/dogs")
    .then(r => r.json())
    .then(dogsArray => {
        renderAllDogs(dogsArray)
    })

const dogForm = document.getElementById('dog-form')
const BASE_URL = `http://localhost:3000/dogs`
document.addEventListener("click", event => {
    event.preventDefault()
    if(event.target.id === "edit-btn"){
      editDog(event.target.dataset.id)
    } else if(event.target.parentElement.id === 'dog-form'){
      editedDog(event)
    }
})

function editDog(id){
    fetch(`${BASE_URL}/${id}`)
    .then(res => res.json())
    .then(dog => {
      dogForm.name.value = dog.name,
      dogForm.sex.value = dog.sex,
      dogForm.breed.value = dog.breed,
      dogForm.dataset.id = dog.id
    })
}
  
function editedDog(e){
    let dog = {
        name: e.target.parentElement.name.value,
        sex: e.target.parentElement.sex.value,
        breed: e.target.parentElement.breed.value
    }
  
    fetch(`${BASE_URL}/${e.target.parentElement.dataset.id}`, {
        method: 'PATCH',
        headers: {
            "content-type": 'application/json',
            accepts: 'application/json'
        },
        body: JSON.stringify(dog)
    })
    .then(res => res.json())
    .then(dog => {
        let foundDog = document.querySelector(`tr[data-id="${dog.id}"]`)
        foundDog.children[0].innerText = dog.name
        foundDog.children[1].innerText = dog.breed
        foundDog.children[2].innerText = dog.sex
    })
}
  