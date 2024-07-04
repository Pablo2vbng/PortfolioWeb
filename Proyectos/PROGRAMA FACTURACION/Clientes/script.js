document.addEventListener('DOMContentLoaded', function() {
    const { jsPDF } = window.jspdf;
    const listClientesBtn = document.getElementById('listClientesBtn');
    const backToClientesBtn = document.getElementById('backToClientesBtn');
    const backToDashboardBtn = document.getElementById('backToDashboardBtn');
    const clientesTable = document.getElementById('clientesTable');
    const printListPdfBtn = document.getElementById('printListPdfBtn');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    let clientes = []; // Variable global para almacenar los clientes cargados

    // Evento para navegar a la lista de clientes
    if (listClientesBtn) {
        listClientesBtn.addEventListener('click', function() {
            window.location.href = 'listado_clientes.html';
        });
    }

    // Evento para volver a la página de clientes
    if (backToClientesBtn) {
        backToClientesBtn.addEventListener('click', function() {
            window.location.href = 'alta_clientes.html';
        });
    }

    // Evento para volver al dashboard
    if (backToDashboardBtn) {
        backToDashboardBtn.addEventListener('click', function() {
            window.location.href = '../dashboard.html';
        });
    }

    // Evento para imprimir PDF de listado de clientes
    if (printListPdfBtn) {
        printListPdfBtn.addEventListener('click', function() {
            generatePDFClientesTable();
        });
    }

    // Evento para buscar clientes por nombre, CIF o población
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim().toLowerCase();
            if (searchTerm === '') {
                loadClientesTable(clientes); // Cargar todos los clientes si el término de búsqueda está vacío
            } else {
                const filteredClientes = clientes.filter(cliente =>
                    cliente.nombreFiscal.toLowerCase().includes(searchTerm) ||
                    cliente.cifNif.toLowerCase().includes(searchTerm) ||
                    cliente.poblacion.toLowerCase().includes(searchTerm)
                );
                loadClientesTable(filteredClientes); // Cargar clientes filtrados
            }
        });
    }

    // Cargar clientes en la tabla al cargar la página de listado_clientes.html
    function loadClientesTable(clientesData) {
        clientes = clientesData || JSON.parse(localStorage.getItem('clientes')) || [];

        // Limpiar la tabla antes de agregar los nuevos datos
        clientesTable.innerHTML = '';

        // Encabezado de la tabla
        let thead = document.createElement('thead');
        let headerRow = document.createElement('tr');
        ['ID', 'Nombre', 'DNI', 'Población', 'Teléfono', 'Correo de Compras', 'Acciones'].forEach(headerText => {
            let th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        clientesTable.appendChild(thead);

        // Cuerpo de la tabla
        let tbody = document.createElement('tbody');
        clientes.forEach(cliente => {
            let row = document.createElement('tr');

            // Campos de cliente
            ['id', 'nombreFiscal', 'cifNif', 'poblacion', 'telefono', 'correoCompras'].forEach(key => {
                let td = document.createElement('td');
                td.textContent = cliente[key] || '-';
                row.appendChild(td);
            });

            // Botones de acciones
            let actionTd = document.createElement('td');
            let deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Eliminar';
            deleteBtn.addEventListener('click', function() {
                deleteCliente(cliente.id);
            });
            actionTd.appendChild(deleteBtn);

            let editBtn = document.createElement('button');
            editBtn.textContent = 'Editar';
            editBtn.addEventListener('click', function() {
                editCliente(cliente.id);
            });
            actionTd.appendChild(editBtn);

            let printBtn = document.createElement('button');
            printBtn.textContent = 'Imprimir';
            printBtn.addEventListener('click', function() {
                imprimirCliente(cliente.id);
            });
            actionTd.appendChild(printBtn);

            row.appendChild(actionTd);
            tbody.appendChild(row);
        });
        clientesTable.appendChild(tbody);
    }

    // Función para eliminar cliente
    function deleteCliente(clienteId) {
        let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
        clientes = clientes.filter(cliente => cliente.id !== clienteId);
        localStorage.setItem('clientes', JSON.stringify(clientes));
        loadClientesTable(); // Recargar la tabla después de eliminar
    }

    // Función para editar cliente
    function editCliente(clienteId) {
        let cliente = JSON.parse(localStorage.getItem('clientes')).find(cliente => cliente.id === clienteId);
        localStorage.setItem('clienteEdit', JSON.stringify(cliente));
        window.location.href = 'alta_clientes.html'; // Redirigir a la página de edición
    }

    // Función para imprimir cliente (PDF individual)
    function imprimirCliente(clienteId) {
        let cliente = JSON.parse(localStorage.getItem('clientes')).find(cliente => cliente.id === clienteId);
        let doc = new jsPDF();
        let y = 20;
        Object.entries(cliente).forEach(([key, value]) => {
            doc.text(`${key}: ${value}`, 20, y);
            y += 10;
        });
        doc.save('cliente.pdf');
    }

    // Generar PDF de listado de clientes con diseño específico
    function generatePDFClientesTable() {
        const doc = new jsPDF({ orientation: 'landscape' });

        // Colores utilizados
        const headerColor = '#326499';
        const lightBlue = 'lightblue';
        const lightGrey = '#f2f2f2';
        const black = '#000000';

        // Texto y línea superior
        doc.setFontSize(18);
        doc.setTextColor(headerColor);
        doc.text("Empresa de Prueba", 14, 20);

        doc.setFontSize(10);
        doc.setTextColor(black);
        doc.text("Dirección de la Empresa", 14, 30);
        doc.text("Tel: 123456789 | Email: empresa@prueba.com", 14, 35);

        doc.setLineWidth(0.5);
        doc.setDrawColor(50, 100, 153); // #326499
        doc.line(14, 40, 282, 40);

        // Encabezado de tabla
        const headers = ['ID', 'Nombre', 'DNI', 'Población', 'Teléfono', 'Correo de Compras'];
        const columnWidths = [20, 40, 30, 40, 30, 50]; // Ancho de columna predeterminado
        let x = 14;
        doc.setFontSize(16);
        doc.setTextColor(headerColor);
        doc.text("Listado de Clientes", 14, 50);

        doc.setFontSize(12);
        doc.setFillColor(headerColor); // Encabezado azul
        doc.rect(14, 55, 264, 10, 'F');

        x = 14;
        headers.forEach((header, index) => {
            doc.setTextColor(lightGrey);
            doc.text(header, x + 1, 63);
            x += columnWidths[index]; // Ajustar de acuerdo al ancho de columna
        });

        // Datos de clientes
        let y = 70;
        const tbody = clientesTable.querySelector('tbody');
        const rows = tbody.querySelectorAll('tr');
        doc.setFontSize(10);
        doc.setTextColor(black);
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            x = 14;
            cells.forEach((cell, index) => {
                if (index !== 6) { // Omitir columna de acciones
                    doc.text(cell.textContent, x + 1, y);
                    x += columnWidths[index]; // Ajustar de acuerdo al ancho de columna
                }
            });
            y += 10;
            if (y > 280) {
                doc.addPage();
                y = 20;
            }
        });

        doc.save('listado_clientes.pdf');
    }

    // Cargar tabla de clientes al cargar la página
    loadClientesTable(JSON.parse(localStorage.getItem('clientes')));

});
