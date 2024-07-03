document.addEventListener('DOMContentLoaded', function() {
    loadClientesTable();
});

function loadClientesTable() {
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    let tableBody = document.querySelector('#clientesTable tbody');
    tableBody.innerHTML = '';

    clientes.forEach(cliente => {
        let row = document.createElement('tr');

        row.innerHTML = `
            <td>${cliente.nombreFiscal}</td>
            <td>${cliente.cif}</td>
            <td>${cliente.nombreComercial}</td>
            <td>${cliente.grupoTarifa}</td>
            <td>${cliente.direccion}</td>
            <td>${cliente.codigoPostal}</td>
            <td>${cliente.poblacion}</td>
            <td>${cliente.provincia}</td>
            <td>${cliente.pais}</td>
            <td>${cliente.telefono}</td>
            <td>${cliente.emailCompras}</td>
            <td>${cliente.emailContabilidad}</td>
        `;

        tableBody.appendChild(row);
    });
}

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];

    doc.setFontSize(18);
    doc.text('Listado de Clientes', 14, 22);
    doc.setFontSize(12);
    doc.setTextColor(100);

    let pageHeight = doc.internal.pageSize.height;
    let startY = 30;
    let rowHeight = 10;
    let colWidths = [30, 20, 30, 20, 40, 20, 30, 30, 20, 30, 40, 40];

    let headers = ['Nombre Fiscal', 'CIF/NIF', 'Nombre Comercial', 'Grupo Tarifa', 'Dirección', 'Código Postal', 'Población', 'Provincia', 'País', 'Teléfono', 'Email Compras', 'Email Contabilidad'];

    // Print headers
    headers.forEach((header, index) => {
        doc.text(header, 14 + colWidths.slice(0, index).reduce((a, b) => a + b, 0), startY);
    });

    // Print rows
    clientes.forEach((cliente, rowIndex) => {
        let currentY = startY + rowHeight * (rowIndex + 1);

        if (currentY + rowHeight > pageHeight) {
            doc.addPage();
            currentY = 30;
        }

        [
            cliente.nombreFiscal, cliente.cif, cliente.nombreComercial, cliente.grupoTarifa,
            cliente.direccion, cliente.codigoPostal, cliente.poblacion, cliente.provincia,
            cliente.pais, cliente.telefono, cliente.emailCompras, cliente.emailContabilidad
        ].forEach((text, colIndex) => {
            doc.text(text, 14 + colWidths.slice(0, colIndex).reduce((a, b) => a + b, 0), currentY);
        });
    });

    doc.save('listado_clientes.pdf');
}
