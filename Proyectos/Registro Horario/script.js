let users = JSON.parse(localStorage.getItem('users')) || [
    { username: 'administrador', password: 'admin123', name: 'Administrador' }
];
let records = JSON.parse(localStorage.getItem('records')) || {};

// Función para iniciar sesión
function login(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        window.location.href = 'dashboard.html';
    } else {
        document.getElementById('error').textContent = 'Usuario o contraseña incorrectos';
    }
}

// Función para registrar un nuevo usuario
function registerUser(event) {
    event.preventDefault();
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;

    const existingUser = users.find(user => user.username === newUsername);
    if (existingUser) {
        document.getElementById('registerError').textContent = 'Usuario ya registrado';
        return;
    }

    const newUser = { username: newUsername, password: newPassword, name: newUsername };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('loggedInUser', JSON.stringify(newUser));
    window.location.href = 'dashboard.html';
}

// Función para cargar el dashboard
function loadDashboard() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
        window.location.href = 'index.html';
    }

    document.getElementById('welcomeMessage').textContent = `Bienvenido, ${loggedInUser.name}`;
    loadHistory(loggedInUser.username);

    if (loggedInUser.username === 'administrador') {
        document.getElementById('adminControls').style.display = 'block';
    }
}

// Función para registrar horas
function registerTime(type) {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const now = new Date();
    const time = now.toLocaleTimeString();
    const date = now.toLocaleDateString();

    if (!records[loggedInUser.username]) {
        records[loggedInUser.username] = [];
    }

    records[loggedInUser.username].push({ date, time, type });
    localStorage.setItem('records', JSON.stringify(records));
    alert(`Hora de ${type === 'entry' ? 'entrada' : 'salida'} registrada a las ${time}`);

    loadHistory(loggedInUser.username);
}

// Función para cargar el historial
function loadHistory(username) {
    const userRecords = records[username] || [];
    const historyTable = document.getElementById('historyTable');
    historyTable.innerHTML = '';

    userRecords.forEach(record => {
        const row = document.createElement('tr');
        const dateCell = document.createElement('td');
        dateCell.textContent = record.date;
        row.appendChild(dateCell);

        const timeCell = document.createElement('td');
        timeCell.textContent = record.time;
        row.appendChild(timeCell);

        const typeCell = document.createElement('td');
        typeCell.textContent = record.type === 'entry' ? 'Entrada' : 'Salida';
        row.appendChild(typeCell);

        historyTable.appendChild(row);
    });
}

// Función para generar PDFs
function generatePDF(type) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    doc.text(`Registro ${type}`, 10, 10);

    let y = 20;
    Object.keys(records).forEach(username => {
        doc.text(`Usuario: ${username}`, 10, y);
        y += 10;

        records[username].forEach(record => {
            doc.text(`Fecha: ${record.date} - Hora: ${record.time} - Tipo: ${record.type === 'entry' ? 'Entrada' : 'Salida'}`, 10, y);
            y += 10;
        });

        y += 10;
    });

    doc.save(`registro_${type}.pdf`);
}

// Función para eliminar todos los registros
function deleteAllRecords() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser.username !== 'administrador') {
        alert('No tienes permisos para realizar esta acción.');
        return;
    }

    records = {};
    localStorage.setItem('records', JSON.stringify(records));
    alert('Todos los registros han sido eliminados.');
    loadHistory(loggedInUser.username);
}

// Función para mostrar/ocultar contraseña
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    if (input.type === 'password') {
        input.type = 'text';
    } else {
        input.type = 'password';
    }
}

// Inicialización del dashboard
if (document.body.id === 'dashboard') {
    window.onload = loadDashboard;
}
