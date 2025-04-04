document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('clienteForm');
    const printPdfBtn = document.getElementById('printPdfBtn');
    const listClientesBtn = document.getElementById('listClientesBtn');
    const printListPdfBtn = document.getElementById('printListPdfBtn');
    const backToClientesBtn = document.getElementById('backToClientesBtn');
    const backToDashboardBtn = document.getElementById('backToDashboardBtn');

    // Helper function to validate CIF/NIF
    function validateCifNif(value) {
        const regex = /^[A-Z0-9]{8}[A-Z0-9]$/;
        return regex.test(value);
    }

    // Generate a new client ID
    function generateClientId() {
        const baseId = 4300000;
        const dateNow = Date.now();
        return baseId + (dateNow % 10000);
    }

    // Register a new client
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const cliente = {
                id: generateClientId(),
                nombreFiscal: form.nombreFiscal.value,
                cifNif: form.cifNif.value,
                nombreComercial: form.nombreComercial.value,
                grupoTarifa: form.grupoTarifa.value,
                direccion: form.direccion.value,
                codigoPostal: form.codigoPostal.value,
                poblacion: form.poblacion.value,
                provincia: form.provincia.value,
                pais: form.pais.value,
                telefono: form.telefono.value,
                telefono2: form.telefono2.value,
                correoCompras: form.correoCompras.value,
                correoContabilidad: form.correoContabilidad.value,
                comentarios: form.comentarios.value,
                tipoIva: form.tipoIva.value,
                comercial: form.comercial.value,
                descuentoComercial: form.descuentoComercial.value,
                descuentoProntoPago: form.descuentoProntoPago.value,
                formaPago: form.formaPago.value,
                entidadBancaria: form.entidadBancaria.value,
                iban: form.iban.value,
                comentariosBancarios: form.comentariosBancarios.value,
                bloqueo: form.bloqueo.value
            };

            // Validate CIF/NIF
            if (!validateCifNif(cliente.cifNif)) {
                alert('CIF/NIF no válido');
                return;
            }

            let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
            clientes.push(cliente);
            localStorage.setItem('clientes', JSON.stringify(clientes));

            alert('Cliente registrado correctamente');
            form.reset();
        });
    }

    // Print PDF with client data
    if (printPdfBtn) {
        printPdfBtn.addEventListener('click', function() {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            doc.text('Datos del Cliente', 10, 10);
            doc.text(`Nombre Fiscal: ${form.nombreFiscal.value}`, 10, 20);
            doc.text(`CIF/NIF: ${form.cifNif.value}`, 10, 30);
            doc.text(`Nombre Comercial: ${form.nombreComercial.value}`, 10, 40);
            doc.text(`Grupo Tarifa Clientes: ${form.grupoTarifa.value}`, 10, 50);
            doc.text(`Dirección: ${form.direccion.value}`, 10, 60);
            doc.text(`Código Postal: ${form.codigoPostal.value}`, 10, 70);
            doc.text(`Población: ${form.poblacion.value}`, 10, 80);
            doc.text(`Provincia: ${form.provincia.value}`, 10, 90);
            doc.text(`País: ${form.pais.value}`, 10, 100);
            doc.text(`Teléfono: ${form.telefono.value}`, 10, 110);
            doc.text(`Teléfono 2: ${form.telefono2.value}`, 10, 120);
            doc.text(`Correo electrónico Compras: ${form.correoCompras.value}`, 10, 130);
            doc.text(`Correo electrónico Contabilidad: ${form.correoContabilidad.value}`, 10, 140);
            doc.text(`Comentarios: ${form.comentarios.value}`, 10, 150);
            doc.text(`Tipo de IVA: ${form.tipoIva.value}`, 10, 160);
            doc.text(`Comercial: ${form.comercial.value}`, 10, 170);
            doc.text(`Descuento comercial: ${form.descuentoComercial.value}`, 10, 180);
            doc.text(`Descuento pronto pago: ${form.descuentoProntoPago.value}`, 10, 190);
            doc.text(`Forma de pago: ${form.formaPago.value}`, 10, 200);
            doc.text(`Entidad Bancaria: ${form.entidadBancaria.value}`, 10, 210);
            doc.text(`IBAN: ${form.iban.value}`, 10, 220);
            doc.text(`Comentarios de datos Bancarios: ${form.comentariosBancarios.value}`, 10, 230);
            doc.text(`Bloqueo: ${form.bloqueo.value}`, 10, 240);

            doc.save('cliente.pdf');
        });
    }

    // Navigate to listado_clientes.html
    if (listClientesBtn) {
        listClientesBtn.addEventListener('click', function() {
            window.location.href = 'listado_clientes.html';
        });
    }

    // Print PDF with clients list
    if (printListPdfBtn) {
        printListPdfBtn.addEventListener('click', function() {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            let clientes = JSON.parse(localStorage.getItem('clientes')) || [];

            doc.text('Listado de Clientes', 10, 10);
            clientes.forEach((cliente, index) => {
                doc.text(`${index + 1}. ${cliente.nombreFiscal} - ${cliente.cifNif}`, 10, 20 + (index * 10));
            });

            doc.save('listado_clientes.pdf');
        });
    }

    // Navigate back to clientes.html
    if (backToClientesBtn) {
        backToClientesBtn.addEventListener('click', function() {
            window.location.href = 'nombreclientes.html';
        });
    }

    // Navigate back to dashboard.html
    if (backToDashboardBtn) {
        backToDashboardBtn.addEventListener('click', function() {
            window.location.href = '../dashboard.html';
        });
    }

    // Functionality for listado_clientes.html
    if (window.location.pathname.includes('listado_clientes.html')) {
        const clientesContainer = document.getElementById('clientesContainer');
        const filterForm = document.getElementById('filterForm');

        // Load and display clients
        function loadClientes() {
            clientesContainer.innerHTML = '';
            let clientes = JSON.parse(localStorage.getItem('clientes')) || [];

            clientes.forEach(cliente => {
                const clienteDiv = document.createElement('div');
                clienteDiv.classList.add('cliente');
                clienteDiv.innerHTML = `
                    <p><strong>Nombre Fiscal:</strong> ${cliente.nombreFiscal}</p>
                    <p><strong>Dirección:</strong> ${cliente.direccion}</p>
                    <p><strong>Código Postal:</strong> ${cliente.codigoPostal}</p>
                    <p><strong>Población:</strong> ${cliente.poblacion}</p>
                    <p><strong>Teléfono:</strong> ${cliente.telefono}</p>
                    <p><strong>Correo electrónico:</strong> ${cliente.correoCompras}</p>
                    <p><strong>CIF/NIF:</strong> ${cliente.cifNif}</p>
                `;
                clientesContainer.appendChild(clienteDiv);
            });
        }

        loadClientes();

        // Filter clients based on search criteria
        if (filterForm) {
            filterForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const criteria = filterForm.criteria.value.toLowerCase();
                const value = filterForm.value.value.toLowerCase();

                let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
                clientesContainer.innerHTML = '';

                clientes.filter(cliente => cliente[criteria].toLowerCase().includes(value)).forEach(cliente => {
                    const clienteDiv = document.createElement('div');
                    clienteDiv.classList.add('cliente');
                    clienteDiv.innerHTML = `
                        <p><strong>Nombre Fiscal:</strong> ${cliente.nombreFiscal}</p>
                        <p><strong>Dirección:</strong> ${cliente.direccion}</p>
                        <p><strong>Código Postal:</strong> ${cliente.codigoPostal}</p>
                        <p><strong>Población:</strong> ${cliente.poblacion}</p>
                        <p><strong>Teléfono:</strong> ${cliente.telefono}</p>
                        <p><strong>Correo electrónico:</strong> ${cliente.correoCompras}</p>
                        <p><strong>CIF/NIF:</strong> ${cliente.cifNif}</p>
                    `;
                    clientesContainer.appendChild(clienteDiv);
                });
            });
        }
    }

    function backToDashboard() {
        window.location.href = '../dashboard.html';
    }

    function backToAddClientes() {
        window.location.href = 'nombreclientes.html';
    }

    document.addEventListener('DOMContentLoaded', function() {
        loadClientes();
    });
});
