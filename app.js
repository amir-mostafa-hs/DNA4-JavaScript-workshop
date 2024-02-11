const baseURL = "https://css-js-education.onrender.com";

import { getElement, createElement } from "./utils/Element.util.js";

async function deleteCourse(e) {
  e.preventDefault();

  const id = e.target.getAttribute("data-id");

  await fetch(`${baseURL}/deleteCourse?id=${id}`, {
    method: "DELETE",
  })
    .then((res) => alert(res.status))
    .catch((error) => console.error(error));

  window.location.reload();
}
const deleteCourseForm = getElement("#deleteForm");
deleteCourseForm.addEventListener("submit", deleteCourse);

async function editCourse(e) {
  e.preventDefault();
  // const id = +e.target.getAttribute("data-id");
  const id = parseInt(e.target.getAttribute("data-id"));

  const data = {
    id,
    name: e.target.editName.value,
    slug: e.target.editSlug.value,
    description: e.target.editDescription.value,
  };

  await fetch(`${baseURL}/updateCourse`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => alert(res.status))
    .catch((error) => console.error(error));

  window.location.reload();
}
const editCourseForm = getElement("#editForm");
editCourseForm.addEventListener("submit", editCourse);

function getAllCourses() {
  fetch(`${baseURL}/getAllCourses`)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        const trElem = createElement("tr");

        const thElem = createElement("th", null, item.id);
        thElem.scope = "row";

        const tdElemName = createElement("td", null, item.name);
        const tdElemSlug = createElement("td", null, item.slug);
        const tdElemDescription = createElement("td", null, item.description);

        const tdElemTools = createElement("td", "text-center");

        const editBtn = createElement("button", "btn btn-success me-2", "Edit");
        editBtn.type = "button";
        editBtn.setAttribute("data-bs-toggle", "modal");
        editBtn.setAttribute("data-bs-target", "#editCourse");
        editBtn.addEventListener("click", () => {
          editCourseForm.setAttribute("data-id", item.id);
          editCourseForm.editName.value = item.name;
          editCourseForm.editSlug.value = item.slug;
          editCourseForm.editDescription.value = item.description;
        });

        const deleteBtn = createElement("button", "btn btn-danger", "Delete");
        deleteBtn.type = "button";
        deleteBtn.setAttribute("data-bs-toggle", "modal");
        deleteBtn.setAttribute("data-bs-target", "#deleteCourse");
        deleteBtn.addEventListener("click", () => {
          deleteCourseForm.setAttribute("data-id", item.id);
        });

        tdElemTools.append(editBtn, deleteBtn);

        const table = getElement("#coursesTable");

        trElem.append(
          thElem,
          tdElemName,
          tdElemSlug,
          tdElemDescription,
          tdElemTools
        );
        table.append(trElem);
      });
    })
    .catch((error) => console.error(error));
}
getAllCourses();

const createCourseForm = getElement("#courseForm");
async function createCourse(e) {
  e.preventDefault();

  const data = {
    name: e.target.name.value,
    slug: e.target.slug.value,
    description: e.target.description.value,
  };

  await fetch(`${baseURL}/createCourse`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => alert(res.status))
    .catch((error) => console.error(error));

  window.location.reload();
}
createCourseForm.addEventListener("submit", createCourse);
