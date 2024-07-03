document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('projects')) {
        document.getElementById('projects').innerHTML = localStorage.getItem('projects');
    }

    const savedTheme = localStorage.getItem('theme') || 'light-theme';
    document.body.className = savedTheme;
});

function createProject() {
    const projectName = document.getElementById('projectName').value.trim();
    if (projectName) {
        const projectContainer = document.createElement('div');
        projectContainer.className = 'project';
        projectContainer.innerHTML = `
            <h2>${projectName}</h2>
            <div class="project-buttons">
                <button class="edit-btn" onclick="editProject(this)">Edit</button>
                <button class="remove-btn" onclick="removeProject(this)">Remove</button>
            </div>
            <div class="task-form">
                <input type="text" placeholder="Task Name">
                <input type="date">
                <button onclick="addTask(this)">Add Task</button>
            </div>
            <div class="tasks"></div>
        `;
        document.getElementById('projects').appendChild(projectContainer);
        document.getElementById('projectName').value = '';
        saveProjects();
    }
}

function addTask(button) {
    const taskForm = button.parentElement;
    const taskName = taskForm.querySelector('input[type="text"]').value.trim();
    const taskDate = taskForm.querySelector('input[type="date"]').value;
    if (taskName && taskDate) {
        const taskContainer = document.createElement('div');
        taskContainer.className = 'task';
        taskContainer.innerHTML = `
            <span>${taskName} - ${taskDate}</span>
            <div class="task-buttons">
                <button class="edit-btn" onclick="editTask(this)">Edit</button>
                <button class="remove-btn" onclick="removeTask(this)">Remove</button>
                <button onclick="completeTask(this)">Complete</button>
            </div>
        `;
        taskForm.nextElementSibling.appendChild(taskContainer);
        taskForm.querySelector('input[type="text"]').value = '';
        taskForm.querySelector('input[type="date"]').value = '';
        saveProjects();
    }
}


function completeTask(button) {
    const task = button.parentElement.parentElement;
    task.classList.toggle('complete');
    saveProjects();
}


function removeProject(button) {
    const project = button.parentElement.parentElement;
    project.remove();
    saveProjects();
}

function editProject(button) {
    const project = button.parentElement.parentElement;
    const newName = prompt('Edit Project Name:', project.querySelector('h2').innerText);
    if (newName) {
        project.querySelector('h2').innerText = newName;
        saveProjects();
    }
}

function removeTask(button) {
    const task = button.parentElement.parentElement;
    task.remove();
    saveProjects();
}

function editTask(button) {
    const task = button.parentElement.parentElement;
    const taskDetails = task.querySelector('span').innerText.split(' - ');
    const newName = prompt('Edit Task Name:', taskDetails[0]);
    const newDate = prompt('Edit Task Date:', taskDetails[1]);
    if (newName && newDate) {
        task.querySelector('span').innerText = `${newName} - ${newDate}`;
        saveProjects();
    }
}

function saveProjects() {
    localStorage.setItem('projects', document.getElementById('projects').innerHTML);
}

function toggleTheme() {
    const currentTheme = document.body.className;
    const newTheme = currentTheme === 'light-theme' ? 'dark-theme' : 'light-theme';
    document.body.className = newTheme;
    localStorage.setItem('theme', newTheme);
}
