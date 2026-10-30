"use strict";

const students = [
  { id: 1, name: "Anthony", score: 86 },
  { id: 2, name: "Brian", score: 74 },
  { id: 3, name: "Chao", score: 62 },
  { id: 4, name: "Diana", score: 48 }
];
let nextId = 5;

const form = document.querySelector("#student-form");
const nameInput = document.querySelector("#student-name");
const scoreInput = document.querySelector("#student-score");
const formMessage = document.querySelector("#form-message");
const tableBody = document.querySelector("#student-table");
const searchInput = document.querySelector("#search");
const gradeFilter = document.querySelector("#grade-filter");
const sortBy = document.querySelector("#sort-by");
const summary = document.querySelector("#summary");
const average = document.querySelector("#average");
const emptyState = document.querySelector("#empty-state");

function getGrade(score) {
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  if (score >= 50) return "D";
  return "F";
}

function getVisibleStudents() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const selectedGrade = gradeFilter.value;

  let result = students.filter((student) => {
    const matchesName = student.name.toLowerCase().includes(searchTerm);
    const matchesGrade = selectedGrade === "all" || getGrade(student.score) === selectedGrade;
    return matchesName && matchesGrade;
  });

  if (sortBy.value === "score-high") {
    result = [...result].sort((a, b) => b.score - a.score);
  } else if (sortBy.value === "score-low") {
    result = [...result].sort((a, b) => a.score - b.score);
  } else {
    result = [...result].sort((a, b) => a.name.localeCompare(b.name));
  }
  return result;
}

function renderStudents() {
  tableBody.replaceChildren();
  const visible = getVisibleStudents();

  visible.forEach((student) => {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    const scoreCell = document.createElement("td");
    const gradeCell = document.createElement("td");
    const actionCell = document.createElement("td");
    const gradeBadge = document.createElement("span");
    const deleteButton = document.createElement("button");

    nameCell.textContent = student.name;
    scoreCell.textContent = String(student.score);
    gradeBadge.classList.add("grade", `grade-${getGrade(student.score)}`);
    gradeBadge.textContent = getGrade(student.score);
    gradeCell.appendChild(gradeBadge);

    deleteButton.type = "button";
    deleteButton.classList.add("delete-button");
    deleteButton.dataset.studentId = String(student.id);
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", `Delete ${student.name}`);
    actionCell.appendChild(deleteButton);

    row.append(nameCell, scoreCell, gradeCell, actionCell);
    tableBody.appendChild(row);
  });

  emptyState.hidden = visible.length !== 0;
  summary.textContent = `${students.length} student${students.length === 1 ? "" : "s"} total · ${visible.length} shown`;

  if (students.length === 0) {
    average.textContent = "Class average: —";
  } else {
    const total = students.reduce((sum, student) => sum + student.score, 0);
    average.textContent = `Class average: ${(total / students.length).toFixed(1)}%`;
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = nameInput.value.trim();
  const score = Number(scoreInput.value);

  if (!name) {
    formMessage.textContent = "Enter a student name.";
    nameInput.focus();
    return;
  }
  if (scoreInput.value === "" || !Number.isFinite(score) || score < 0 || score > 100) {
    formMessage.textContent = "Enter a score between 0 and 100.";
    scoreInput.focus();
    return;
  }

  students.push({ id: nextId++, name, score });
  form.reset();
  formMessage.textContent = "";
  renderStudents();
  nameInput.focus();
});

tableBody.addEventListener("click", (event) => {
  const button = event.target.closest(".delete-button");
  if (!button) return;
  const id = Number(button.dataset.studentId);
  const index = students.findIndex((student) => student.id === id);
  if (index !== -1) students.splice(index, 1);
  renderStudents();
});

searchInput.addEventListener("input", renderStudents);
gradeFilter.addEventListener("change", renderStudents);
sortBy.addEventListener("change", renderStudents);

renderStudents();
