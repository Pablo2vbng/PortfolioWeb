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

    // Función para inicializar datos de proveedores en LocalStorage
    function inicializarProveedores() {
        if (!localStorage.getItem('proveedores')) {
            console.log('Inicializando proveedores en LocalStorage...');
            const proveedores = [
                { id: 1, nombreFiscal: "Leonardo DiCaprio", cifNif: "12345678A", poblacion: "Hollywood Hills", telefono: "600000001", correoCompras: "leonardo@titanic.com" },
                { id: 2, nombreFiscal: "Scarlett Johansson", cifNif: "23456789B", poblacion: "Avengers Tower", telefono: "600000002", correoCompras: "scarlett@avengers.com" },
                { id: 3, nombreFiscal: "Tom Hanks", cifNif: "34567890C", poblacion: "Greenbow", telefono: "600000003", correoCompras: "tom@forrestgump.com" },
                { id: 4, nombreFiscal: "Meryl Streep", cifNif: "45678901D", poblacion: "Mamma Mia Island", telefono: "600000004", correoCompras: "meryl@mammamia.com" },
                { id: 5, nombreFiscal: "Robert Downey Jr.", cifNif: "56789012E", poblacion: "Stark Industries", telefono: "600000005", correoCompras: "robert@starkindustries.com" },
                { id: 6, nombreFiscal: "Jennifer Lawrence", cifNif: "67890123F", poblacion: "Hunger Games Arena", telefono: "600000006", correoCompras: "jennifer@mockingjay.com" },
                { id: 7, nombreFiscal: "Dwayne Johnson", cifNif: "78901234G", poblacion: "Jumanji Jungle", telefono: "600000007", correoCompras: "dwayne@jumanji.com" },
                { id: 8, nombreFiscal: "Emma Watson", cifNif: "89012345H", poblacion: "Hogwarts", telefono: "600000008", correoCompras: "emma@hogwarts.com" },
                { id: 9, nombreFiscal: "Will Smith", cifNif: "90123456I", poblacion: "Bel-Air", telefono: "600000009", correoCompras: "will@belair.com" },
                { id: 10, nombreFiscal: "Gal Gadot", cifNif: "01234567J", poblacion: "Themyscira", telefono: "600000010", correoCompras: "gal@wonderwoman.com" }
            ];
            localStorage.setItem('proveedores', JSON.stringify(proveedores));
        } else {
            console.log('Proveedores ya inicializados en LocalStorage.');
        }
    }

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

    // Inicializar datos de proveedores y cargar la tabla al cargar la página
    inicializarProveedores();
    loadProveedoresTable(JSON.parse(localStorage.getItem('proveedores')));

});
