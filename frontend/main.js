var data = document.getElementById('data');
var courseName = document.getElementById('courseName');
var courseCat = document.getElementById('courseCat');
var coursePrice = document.getElementById('coursePrice');
var courseDesc = document.getElementById('courseDesc');
var addBtn = document.getElementById('click');
var updBtn = document.getElementById('update');
var clearbtn = document.getElementById('clearbtn');
var search = document.getElementById('search');
let courses = [];
var courseId;

clearbtn.onclick= function(){
    clear();
}

search.onkeyup = async function () {
    // POST request using fetch()
    await fetch(`http://localhost:3000/courseByName`, {
        // Adding method type
        method: "POST",
        // Adding body or contents to send
        body: JSON.stringify({ "text": search.value }),
        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        // Converting to JSON
        .then(response => response.json())
        // Displaying results to console
        .then(json => {
            if (json.message == 'success') {
                showData(json.courses)

            }
        });
}

addBtn.onclick = function () {
    inputData();
    clear();
}

updBtn.onclick = function () {
    updateData()
    addBtn.style.visibility = "visible";
    updBtn.style.visibility = "hidden";
    clear();
}

function updateData() {

    var courseUpdate = {
        id: courseId,
        name: courseName.value,
        cat: courseCat.value,
        price: coursePrice.value,
        description: courseDesc.value,
    }

    crudOperation('update', 'PUT', courseUpdate)

}
function deleteCourse(id) {
    crudOperation('delete', 'DELETE', { id })
}

let update = (i) => {
    addBtn.style.visibility = "hidden";
    updBtn.style.visibility = "visible";
    courseName.value = courses[i].name;
    courseCat.value = courses[i].cat;
    coursePrice.value = courses[i].price;
    courseDesc.value = courses[i].description;


    courseId = courses[i].id;
    updateData();
}

async function getData() {
    var response = await fetch(`http://localhost:3000/courses`);
    var data = await response.json();
    courses = data.courses;
    showData(courses);
}
getData();
function showData(array) {

    var result = ``;
    for (var i = 0; i < array.length; i++) {
        result += `
            <tr>
                <td>${array[i].id}</td>
                <td>${array[i].name}</td>
                <td>${array[i].cat}</td>
                <td>${array[i].price}</td>
                <td>${array[i].description}</td>
                <td>
            <button  onclick="update(${i})" type="button"   class="btn btn-outline-secandrey btn-info">update</button>
            <button  onclick="deleteCourse(${array[i].id})" type="button"  class="btn btn-outline-secandrey btn-danger">delete</button>
                </td>
            </tr>
        `;
    }
    data.innerHTML = result;

}
function inputData() {

    var course = {
        name: courseName.value,
        cat: courseCat.value,
        price: coursePrice.value,
        description: courseDesc.value,
    }



    crudOperation('addCourse', 'POST', course)


}

function clear() {
    courseName.value="";
    courseCat.value="";
    coursePrice.value="";
    courseDesc.value="";
}



async function crudOperation(endPoint, method, data) {


    // POST request using fetch()
    await fetch(`http://localhost:3000/${endPoint}`, {
        // Adding method type
        method: method,
        // Adding body or contents to send
        body: JSON.stringify(data),
        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        // Converting to JSON
        .then(response => response.json())
        // Displaying results to console
        .then(json => {
            if (json.message == 'success') {
                getData();

            }
        });
}