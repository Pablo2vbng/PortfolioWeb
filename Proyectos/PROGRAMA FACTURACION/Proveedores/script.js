document.addEventListener('DOMContentLoaded', function() {
    const { jsPDF } = window.jspdf;
    const listProveedoresBtn = document.getElementById('listProveedoresBtn');
    const backToProveedoresBtn = document.getElementById('backToProveedoresBtn');
    const backToDashboardBtn = document.getElementById('backToDashboardBtn');
    const proveedoresTable = document.getElementById('proveedoresTable');
    const printListPdfBtn = document.getElementById('printListPdfBtn');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    let proveedores = []; // Variable global para almacenar los proveedores cargados

    // Evento para navegar a la lista de proveedores
    if (listProveedoresBtn) {
        listProveedoresBtn.addEventListener('click', function() {
            window.location.href = 'listado_proveedores.html';
        });
    }

    // Evento para volver a la página de proveedores
    if (backToProveedoresBtn) {
        backToProveedoresBtn.addEventListener('click', function() {
            window.location.href = 'alta_proveedores.html';
        });
    }

    // Evento para volver al dashboard
    if (backToDashboardBtn) {
        backToDashboardBtn.addEventListener('click', function() {
            window.location.href = '../dashboard.html';
        });
    }

    // Evento para imprimir PDF de listado de proveedores
    if (printListPdfBtn) {
        printListPdfBtn.addEventListener('click', function() {
            generatePDFProveedoresTable();
        });
    }

    // Evento para buscar proveedores por nombre, CIF o población
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim().toLowerCase();
            if (searchTerm === '') {
                loadProveedoresTable(proveedores); // Cargar todos los proveedores si el término de búsqueda está vacío
            } else {
                const filteredProveedores = proveedores.filter(proveedor =>
                    proveedor.nombreFiscal.toLowerCase().includes(searchTerm) ||
                    proveedor.cifNif.toLowerCase().includes(searchTerm) ||
                    proveedor.poblacion.toLowerCase().includes(searchTerm)
                );
                loadProveedoresTable(filteredProveedores); // Cargar proveedores filtrados
            }
        });
    }

    // Cargar proveedores en la tabla al cargar la página de listado_proveedores.html
    function loadProveedoresTable(proveedoresData) {
        proveedores = proveedoresData || JSON.parse(localStorage.getItem('proveedores')) || [];

        // Limpiar la tabla antes de agregar los nuevos datos
        proveedoresTable.innerHTML = '';

        // Encabezado de la tabla
        let thead = document.createElement('thead');
        let headerRow = document.createElement('tr');
        ['ID', 'Nombre', 'CIF/NIF', 'Población', 'Teléfono', 'Correo de Compras', 'Acciones'].forEach(headerText => {
            let th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        proveedoresTable.appendChild(thead);

        // Cuerpo de la tabla
        let tbody = document.createElement('tbody');
        proveedores.forEach(proveedor => {
            let row = document.createElement('tr');

            // Campos de proveedor
            ['id', 'nombreFiscal', 'cifNif', 'poblacion', 'telefono', 'correoCompras'].forEach(key => {
                let td = document.createElement('td');
                td.textContent = proveedor[key] || '-';
                row.appendChild(td);
            });

            // Botones de acciones
            let actionTd = document.createElement('td');
            let deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Eliminar';
            deleteBtn.addEventListener('click', function() {
                deleteProveedor(proveedor.id);
            });
            actionTd.appendChild(deleteBtn);

            let editBtn = document.createElement('button');
            editBtn.textContent = 'Editar';
            editBtn.addEventListener('click', function() {
                editProveedor(proveedor.id);
            });
            actionTd.appendChild(editBtn);

            let printBtn = document.createElement('button');
            printBtn.textContent = 'Imprimir';
            printBtn.addEventListener('click', function() {
                imprimirProveedor(proveedor.id);
            });
            actionTd.appendChild(printBtn);

            row.appendChild(actionTd);
            tbody.appendChild(row);
        });
        proveedoresTable.appendChild(tbody);
    }

    // Función para eliminar proveedor
    function deleteProveedor(proveedorId) {
        let proveedores = JSON.parse(localStorage.getItem('proveedores')) || [];
        proveedores = proveedores.filter(proveedor => proveedor.id !== proveedorId);
        localStorage.setItem('proveedores', JSON.stringify(proveedores));
        loadProveedoresTable(); // Recargar la tabla después de eliminar
    }

    // Función para editar proveedor
    function editProveedor(proveedorId) {
        let proveedor = JSON.parse(localStorage.getItem('proveedores')).find(proveedor => proveedor.id === proveedorId);
        localStorage.setItem('proveedorEdit', JSON.stringify(proveedor));
        window.location.href = 'alta_proveedores.html'; // Redirigir a la página de edición
    }

    // Función para imprimir proveedor (PDF individual)
    function imprimirProveedor(proveedorId) {
        let proveedor = JSON.parse(localStorage.getItem('proveedores')).find(proveedor => proveedor.id === proveedorId);
        let doc = new jsPDF();
        let y = 20;
        Object.entries(proveedor).forEach(([key, value]) => {
            doc.text(`${key}: ${value}`, 20, y);
            y += 10;
        });
        doc.save('proveedor.pdf');
    }

    // Generar PDF de listado de proveedores con diseño específico
    function generatePDFProveedoresTable() {
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
        const headers = ['ID', 'Nombre', 'CIF/NIF', 'Población', 'Teléfono', 'Correo de Compras'];
        const columnWidths = [20, 40, 30, 40, 30, 50]; // Ancho de columna predeterminado
        let x = 14;
        doc.setFontSize(16);
        doc.setTextColor(headerColor);
        doc.text("Listado de Proveedores", 14, 50);

        doc.setFontSize(12);
        doc.setFillColor(headerColor); // Encabezado azul
        doc.rect(14, 55, 264, 10, 'F');

        x = 14;
        headers.forEach((header, index) => {
            doc.setTextColor(lightGrey);
            doc.text(header, x + 1, 63);
            x += columnWidths[index]; // Ajustar de acuerdo al ancho de columna
        });

        // Datos de proveedores
        let y = 70;
        const tbody = proveedoresTable.querySelector('tbody');
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

        doc.save('listado_proveedores.pdf');
    }

    // Cargar tabla de proveedores al cargar la página
    loadProveedoresTable(JSON.parse(localStorage.getItem('proveedores')));

});
