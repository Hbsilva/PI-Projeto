function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username === 'admin' && password === 'admin') {
        navigateTo('home.html');
    } else {
        document.getElementById('error-message').textContent = "Credenciais inválidas!";
    }
}

function navigateTo(page) {
    window.location.href = page;
}

function getActivities() {
    return JSON.parse(localStorage.getItem('activities')) || [];
}

function saveActivities(activities) {
    localStorage.setItem('activities', JSON.stringify(activities));
}

function addActivity() {
    const location = document.getElementById('location').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const activity = document.getElementById('activity').value;
    const guests = document.getElementById('guests').value;

    if (location && date && time && activity && guests) {
        const activities = getActivities();
        activities.push({
            location,
            date,
            time,
            activity,
            guests,
            completed: false
        });
        saveActivities(activities);
        alert("Atividade adicionada com sucesso!");
        navigateTo('atividades.html');
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

function completeActivity(index) {
    const activities = getActivities();
    activities[index].completed = !activities[index].completed;
    saveActivities(activities);
    displayActivities();
}

function deleteActivity(index) {
    const activities = getActivities();
    activities.splice(index, 1);
    saveActivities(activities);
    displayActivities();
}

if (window.location.pathname.includes('atividades.html')) {
    displayActivities();
}

function displayActivities() {
    const activityList = document.getElementById('activity-list');
    activityList.innerHTML = '';
    const activities = getActivities();
    
    activities.forEach((act, index) => {
        const li = document.createElement('li');
        li.className = 'activity-item';
        li.innerHTML = `
            <div class="activity-details">
                <strong>${act.activity}</strong><br>
                Local: ${act.location}<br>
                Data: ${act.date} | Horário: ${act.time}<br>
                Convidados: ${act.guests}
            </div>
            <div class="activity-actions">
                <button onclick="editActivity(${index})">&#9998;</button>
                <button onclick="deleteActivity(${index})">&#128465;</button>
                <button onclick="completeActivity(${index})">${act.completed ? '✔️' : '✅'}</button>
            </div>
        `;
        activityList.appendChild(li);
    });
}

function editActivity(index) {
    window.location.href = `editar.html?index=${index}`;
}

function loadEditActivity() {
    const urlParams = new URLSearchParams(window.location.search);
    const index = urlParams.get('index');
    const activities = getActivities();

    if (index !== null && activities[index]) {
        const activity = activities[index];
        document.getElementById('edit-location').value = activity.location;
        document.getElementById('edit-date').value = activity.date;
        document.getElementById('edit-time').value = activity.time;
        document.getElementById('edit-activity').value = activity.activity;
        document.getElementById('edit-guests').value = activity.guests;
    } else {
        alert("Atividade não encontrada!");
        navigateTo('atividades.html');
    }
}

function saveEdit() {
    const urlParams = new URLSearchParams(window.location.search);
    const index = urlParams.get('index');
    const activities = getActivities();

    if (index !== null && activities[index]) {
        activities[index] = {
            location: document.getElementById('edit-location').value,
            date: document.getElementById('edit-date').value,
            time: document.getElementById('edit-time').value,
            activity: document.getElementById('edit-activity').value,
            guests: document.getElementById('edit-guests').value,
            completed: activities[index].completed
        };
        saveActivities(activities);
        alert("Atividade editada com sucesso!");
        navigateTo('atividades.html');
    }
}

if (window.location.pathname.includes('editar.html')) {
    loadEditActivity();
}

function registerUser() {
    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const endereco = document.getElementById('endereco').value;
    const senha = document.getElementById('senha').value;

    if (nome && sobrenome && dataNascimento && endereco) {
        const userData = { nome, sobrenome, dataNascimento, endereco, senha};
        localStorage.setItem('user', JSON.stringify(userData));
        alert("Usuário cadastrado com sucesso!");
        window.location.href = 'index.html';
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}