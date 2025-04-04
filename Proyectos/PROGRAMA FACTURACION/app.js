document.addEventListener('DOMContentLoaded', () => {
    // Toggle password visibility
    document.querySelectorAll('.toggle-password').forEach(item => {
        item.addEventListener('click', function () {
            const passwordField = this.previousElementSibling;
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                this.innerHTML = '<i class="fas fa-eye-slash"></i>';
            } else {
                passwordField.type = 'password';
                this.innerHTML = '<i class="fas fa-eye"></i>';
            }
        });
    });

    // Función para registrar usuarios
    if (document.getElementById('registerForm')) {
        document.getElementById('registerForm').addEventListener('submit', function (event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const department = document.getElementById('department').value;

            let users = JSON.parse(localStorage.getItem('users')) || [];
            users.push({ username, password, department });
            localStorage.setItem('users', JSON.stringify(users));

            alert('Usuario registrado con éxito');
            window.location.href = 'index.html';
        });
    }

    // Función para iniciar sesión
    if (document.getElementById('loginForm')) {
        document.getElementById('loginForm').addEventListener('submit', function (event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            let users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.username === username && u.password === password);

            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                window.location.href = 'dashboard.html';
            } else {
                alert('Usuario o contraseña incorrectos');
            }
        });
    }

    // Función para cargar el dashboard
    if (document.body.contains(document.getElementById('welcomeMessage'))) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            window.location.href = 'index.html';
        } else {
            document.getElementById('welcomeMessage').innerText = `Bienvenido, ${currentUser.username}`;

            switch (currentUser.department) {
                case 'contabilidad':
                    document.getElementById('contabilidadSection').style.display = 'block';
                    break;
                case 'comercial':
                    document.getElementById('comercialSection').style.display = 'block';
                    break;
                case 'almacen':
                    document.getElementById('almacenSection').style.display = 'block';
                    break;
                case 'administrador':
                    document.getElementById('administradorSection').style.display = 'block';
                    break;
                case 'compras':
                    document.getElementById('comprasSection').style.display = 'block';
                    break;
            }
        }
    }
});
