document.addEventListener('DOMContentLoaded', function() {
    loadClienteData();
});

function loadClienteData() {
    let cliente = JSON.parse(localStorage.getItem('clienteEdit'));
    if (cliente) {
        document.getElementById('nombreFiscal').value = cliente.nombreFiscal || '';
        document.getElementById('cif').value = cliente.cif || '';
        document.getElementById('nombreComercial').value = cliente.nombreComercial || '';
        document.getElementById('grupoTarifa').value = cliente.grupoTarifa || '';
        document.getElementById('direccion').value = cliente.direccion || '';
        document.getElementById('codigoPostal').value = cliente.codigoPostal || '';
        document.getElementById('poblacion').value = cliente.poblacion || '';
        document.getElementById('provincia').value = cliente.provincia || '';
        document.getElementById('pais').value = cliente.pais || '';
        document.getElementById('telefono').value = cliente.telefono || '';
        document.getElementById('telefono2').value = cliente.telefono2 || '';
        document.getElementById('emailCompras').value = cliente.emailCompras || '';
        document.getElementById('emailContabilidad').value = cliente.emailContabilidad || '';
        document.getElementById('comentarios').value = cliente.comentarios || '';
        document.getElementById('tipoIva').value = cliente.tipoIva || '';
        document.getElementById('comercial').value = cliente.comercial || '';
        document.getElementById('descuentoComercial').value = cliente.descuentoComercial || '';
        document.getElementById('descuentoProntoPago').value = cliente.descuentoProntoPago || '';
        document.getElementById('formaPago').value = cliente.formaPago || '';
        document.getElementById('entidadBancaria').value = cliente.entidadBancaria || '';
        document.getElementById('iban').value = cliente.iban || '';
        document.getElementById('comentariosBancarios').value = cliente.comentariosBancarios || '';
        document.getElementById('bloquear').checked = cliente.bloquear || false;
        document.getElementById('comentariosBloqueo').value = cliente.comentariosBloqueo || '';
    }
}

document.getElementById('editClienteForm').addEventListener('submit', function(event) {
    event.preventDefault();
    saveClienteData();
});

function saveClienteData() {
    let clienteEdit = JSON.parse(localStorage.getItem('clienteEdit'));
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];

    let updatedCliente = {
        id: clienteEdit ? clienteEdit.id : Date.now(),
        nombreFiscal: document.getElementById('nombreFiscal').value,
        cif: document.getElementById('cif').value,
        nombreComercial: document.getElementById('nombreComercial').value,
        grupoTarifa: document.getElementById('grupoTarifa').value,
        direccion: document.getElementById('direccion').value,
        codigoPostal: document.getElementById('codigoPostal').value,
        poblacion: document.getElementById('poblacion').value,
        provincia: document.getElementById('provincia').value,
        pais: document.getElementById('pais').value,
        telefono: document.getElementById('telefono').value,
        telefono2: document.getElementById('telefono2').value,
        emailCompras: document.getElementById('emailCompras').value,
        emailContabilidad: document.getElementById('emailContabilidad').value,
        comentarios: document.getElementById('comentarios').value,
        tipoIva: document.getElementById('tipoIva').value,
        comercial: document.getElementById('comercial').value,
        descuentoComercial: document.getElementById('descuentoComercial').value,
        descuentoProntoPago: document.getElementById('descuentoProntoPago').value,
        formaPago: document.getElementById('formaPago').value,
        entidadBancaria: document.getElementById('entidadBancaria').value,
        iban: document.getElementById('iban').value,
        comentariosBancarios: document.getElementById('comentariosBancarios').value,
        bloquear: document.getElementById('bloquear').checked,
        comentariosBloqueo: document.getElementById('comentariosBloqueo').value,
    };

    let index = clientes.findIndex(cliente => cliente.id === updatedCliente.id);
    if (index !== -1) {
        clientes[index] = updatedCliente;
    } else {
        clientes.push(updatedCliente);
    }

    localStorage.setItem('clientes', JSON.stringify(clientes));
    localStorage.removeItem('clienteEdit');
    window.location.href = 'listado_clientes.html';
}

function backToListadoClientes() {
    window.location.href = 'listado_clientes.html';
}

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
            <td>
                <button onclick="editCliente(${cliente.id})">Editar</button>
                <button onclick="deleteCliente(${cliente.id})">Eliminar</button>
            </td>
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

function goToNuevoCliente() {
    window.location.href = 'nuevo_cliente.html';
}

function editCliente(clienteId) {
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    let cliente = clientes.find(c => c.id === clienteId);
    localStorage.setItem('clienteEdit', JSON.stringify(cliente));
    window.location.href = 'editar_cliente.html';
}

function deleteCliente(clienteId) {
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    clientes = clientes.filter(c => c.id !== clienteId);
    localStorage.setItem('clientes', JSON.stringify(clientes));
    loadClientesTable();
}
