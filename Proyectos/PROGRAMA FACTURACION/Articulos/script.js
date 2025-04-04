// Función para inicializar datos en LocalStorage
function inicializarDatos() {
    if (!localStorage.getItem('articulos')) {
        const articulos = [
            { referencia: "0001", nombre: "Naruto Uzumaki", tipoIva: "21%", stock: 50, precioCompra: "20.00", pvp: "25.00", tarifa: "netos", ean13: "0000000000001", proveedor: "Proveedor1", familia: "Shonen", imagen: "https://upload.wikimedia.org/wikipedia/en/9/94/Naruto_uzumaki.jpg" },
            { referencia: "0002", nombre: "Goku", tipoIva: "21%", stock: 50, precioCompra: "22.00", pvp: "27.00", tarifa: "netos", ean13: "0000000000002", proveedor: "Proveedor2", familia: "Shonen", imagen: "https://upload.wikimedia.org/wikipedia/en/1/1b/Goku_Adult_Super_Saiyan.png" },
            { referencia: "0003", nombre: "Luffy", tipoIva: "21%", stock: 50, precioCompra: "21.00", pvp: "26.00", tarifa: "netos", ean13: "0000000000003", proveedor: "Proveedor1", familia: "Shonen", imagen: "https://upload.wikimedia.org/wikipedia/en/2/2d/Monkey_D_Luffy.png" },
            { referencia: "0004", nombre: "Eren Yeager", tipoIva: "21%", stock: 50, precioCompra: "23.00", pvp: "28.00", tarifa: "netos", ean13: "0000000000004", proveedor: "Proveedor2", familia: "Shonen", imagen: "https://upload.wikimedia.org/wikipedia/en/7/77/Shingeki_no_Kyojin_-_Eren_Yeager.png" },
            { referencia: "0005", nombre: "Izuku Midoriya", tipoIva: "21%", stock: 50, precioCompra: "19.00", pvp: "24.00", tarifa: "netos", ean13: "0000000000005", proveedor: "Proveedor1", familia: "Shonen", imagen: "https://upload.wikimedia.org/wikipedia/en/4/47/Izuku_Midoriya_character.png" },
            { referencia: "0006", nombre: "Kirito", tipoIva: "21%", stock: 50, precioCompra: "24.00", pvp: "29.00", tarifa: "netos", ean13: "0000000000006", proveedor: "Proveedor2", familia: "Shonen", imagen: "https://upload.wikimedia.org/wikipedia/en/4/4d/Kirito_SAO.png" },
            { referencia: "0007", nombre: "Edward Elric", tipoIva: "21%", stock: 50, precioCompra: "22.50", pvp: "27.50", tarifa: "netos", ean13: "0000000000007", proveedor: "Proveedor1", familia: "Shonen", imagen: "https://upload.wikimedia.org/wikipedia/en/0/01/Edward_Elric.png" },
            { referencia: "0008", nombre: "Light Yagami", tipoIva: "21%", stock: 50, precioCompra: "20.50", pvp: "25.50", tarifa: "netos", ean13: "0000000000008", proveedor: "Proveedor2", familia: "Shonen", imagen: "https://upload.wikimedia.org/wikipedia/en/thumb/6/6f/LightYagami.jpg/220px-LightYagami.jpg" },
            { referencia: "0009", nombre: "Natsu Dragneel", tipoIva: "21%", stock: 50, precioCompra: "21.50", pvp: "26.50", tarifa: "netos", ean13: "0000000000009", proveedor: "Proveedor1", familia: "Shonen", imagen: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Natsu_Dragneel.png/220px-Natsu_Dragneel.png" },
            { referencia: "0010", nombre: "Ichigo Kurosaki", tipoIva: "21%", stock: 50, precioCompra: "23.50", pvp: "28.50", tarifa: "netos", ean13: "0000000000010", proveedor: "Proveedor2", familia: "Shonen", imagen: "https://upload.wikimedia.org/wikipedia/en/7/72/Ichigo_Kurosaki.png" }
        ];

        localStorage.setItem('articulos', JSON.stringify(articulos));
    }
}

// Función para cargar artículos desde LocalStorage
function cargarArticulos() {
    const articulos = JSON.parse(localStorage.getItem('articulos')) || [];
    const tbody = document.querySelector('#articulosTable tbody');
    tbody.innerHTML = '';
    articulos.forEach(articulo => {
        const row = document.createElement('tr');

        Object.keys(articulo).forEach(key => {
            const cell = document.createElement('td');
            if (key === 'imagen') {
                const img = document.createElement('img');
                img.src = articulo[key];
                img.alt = articulo.nombre;
                img.style.width = '50px';
                cell.appendChild(img);
            } else {
                const input = document.createElement('input');
                input.type = 'text';
                input.value = articulo[key];
                input.dataset.key = key;
                input.dataset.referencia = articulo.referencia;
                cell.appendChild(input);
            }
            row.appendChild(cell);
        });

        const acciones = document.createElement('td');
        const eliminarBtn = document.createElement('button');
        eliminarBtn.textContent = 'Eliminar';
        eliminarBtn.onclick = () => eliminarArticulo(articulo.referencia);

        const guardarBtn = document.createElement('button');
        guardarBtn.textContent = 'Guardar';
        guardarBtn.onclick = () => guardarArticulo(articulo.referencia);

        acciones.appendChild(eliminarBtn);
        acciones.appendChild(guardarBtn);
        row.appendChild(acciones);

        tbody.appendChild(row);
    });
}

// Función para eliminar un artículo
function eliminarArticulo(referencia) {
    let articulos = JSON.parse(localStorage.getItem('articulos')) || [];
    articulos = articulos.filter(art => art.referencia !== referencia);
    localStorage.setItem('articulos', JSON.stringify(articulos));
    cargarArticulos();
}

// Función para guardar un artículo
function guardarArticulo(referencia) {
    let articulos = JSON.parse(localStorage.getItem('articulos')) || [];
    const inputs = document.querySelectorAll(`input[data-referencia='${referencia}']`);
    inputs.forEach(input => {
        const key = input.dataset.key;
        const value = input.value;
        articulos = articulos.map(art => {
            if (art.referencia === referencia) {
                return { ...art, [key]: value };
            }
            return art;
        });
    });
    localStorage.setItem('articulos', JSON.stringify(articulos));
    alert('Artículo guardado con éxito');
}

// Función para inicializar datos en LocalStorage
function inicializarDatos() {
    if (!localStorage.getItem('articulos')) {
        const articulos = [
            { referencia: "0001", nombre: "Naruto Uzumaki", tipoIva: "21%", stock: 50, precioCompra: "20.00", pvp: "25.00", tarifa: "netos", ean13: "0000000000001", proveedor: "Proveedor1", familia: "Shonen", imagen: "https://upload.wikimedia.org/wikipedia/en/9/94/Naruto_uzumaki.jpg" },
            { referencia: "0002", nombre: "Goku", tipoIva: "21%", stock: 50, precioCompra: "22.00", pvp: "27.00", tarifa: "netos", ean13: "0000000000002", proveedor: "Proveedor2", familia: "Shonen", imagen: "https://upload.wikimedia.org/wikipedia/en/1/1b/Goku_Adult_Super_Saiyan.png" },
            { referencia: "0003", nombre: "Luffy", tipoIva: "21%", stock: 50, precioCompra: "21.00", pvp: "26.00", tarifa: "netos", ean13: "0000000000003", proveedor: "Proveedor1", familia: "Shonen", imagen: "https://upload.wikimedia.org/wikipedia/en/2/2d/Monkey_D_Luffy.png" },
            { referencia: "0004", nombre: "Eren Yeager", tipoIva: "21%", stock: 50, precioCompra: "23.00", pvp: "28.00", tarifa: "netos", ean13: "0000000000004", proveedor: "Proveedor2", familia: "Shonen", imagen: "https://upload.wikimedia.org/wikipedia/en/7/77/Shingeki_no_Kyojin_-_Eren_Yeager.png" },
            { referencia: "0005", nombre: "Izuku Midoriya", tipoIva: "21%", stock: 50, precioCompra: "19.00", pvp: "24.00", tarifa: "netos", ean13: "0000000000005", proveedor: "Proveedor1", familia: "Shonen", imagen: "https://upload.wikimedia.org/wikipedia/en/4/47/Izuku_Midoriya_character.png" },
            { referencia: "0006", nombre: "Kirito", tipoIva: "21%", stock: 50, precioCompra: "24.00", pvp: "29.00", tarifa: "netos", ean13: "0000000000006", proveedor: "Proveedor2", familia: "Shonen", imagen: "https://upload.wikimedia.org/wikipedia/en/4/4d/Kirito_SAO.png" },
            { referencia: "0007", nombre: "Edward Elric", tipoIva: "21%", stock: 50, precioCompra: "22.50", pvp: "27.50", tarifa: "netos", ean13: "0000000000007", proveedor: "Proveedor1", familia: "Shonen", imagen: "https://upload.wikimedia.org/wikipedia/en/0/01/Edward_Elric.png" },
            { referencia: "0008", nombre: "Light Yagami", tipoIva: "21%", stock: 50, precioCompra: "20.50", pvp: "25.50", tarifa: "netos", ean13: "0000000000008", proveedor: "Proveedor2", familia: "Shonen", imagen: "https://upload.wikimedia.org/wikipedia/en/thumb/6/6f/LightYagami.jpg/220px-LightYagami.jpg" },
            { referencia: "0009", nombre: "Natsu Dragneel", tipoIva: "21%", stock: 50, precioCompra: "21.50", pvp: "26.50", tarifa: "netos", ean13: "0000000000009", proveedor: "Proveedor1", familia: "Shonen", imagen: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Natsu_Dragneel.png/220px-Natsu_Dragneel.png" },
            { referencia: "0010", nombre: "Ichigo Kurosaki", tipoIva: "21%", stock: 50, precioCompra: "23.50", pvp: "28.50", tarifa: "netos", ean13: "0000000000010", proveedor: "Proveedor2", familia: "Shonen", imagen: "https://upload.wikimedia.org/wikipedia/en/7/72/Ichigo_Kurosaki.png" }
        ];

        localStorage.setItem('articulos', JSON.stringify(articulos));
    }
}

// Función para cargar artículos desde LocalStorage
function cargarArticulos() {
    const articulos = JSON.parse(localStorage.getItem('articulos')) || [];
    const tbody = document.querySelector('#articulosTable tbody');
    tbody.innerHTML = '';
    articulos.forEach(articulo => {
        const row = document.createElement('tr');

        Object.keys(articulo).forEach(key => {
            const cell = document.createElement('td');
            if (key === 'imagen') {
                const img = document.createElement('img');
                img.src = articulo[key];
                img.alt = articulo.nombre;
                img.style.width = '50px';
                cell.appendChild(img);
            } else {
                const input = document.createElement('input');
                input.type = 'text';
                input.value = articulo[key];
                input.dataset.key = key;
                input.dataset.referencia = articulo.referencia;
                cell.appendChild(input);
            }
            row.appendChild(cell);
        });

        const acciones = document.createElement('td');
        const eliminarBtn = document.createElement('button');
        eliminarBtn.textContent = 'Eliminar';
        eliminarBtn.onclick = () => eliminarArticulo(articulo.referencia);

        const guardarBtn = document.createElement('button');
        guardarBtn.textContent = 'Guardar';
        guardarBtn.onclick = () => guardarArticulo(articulo.referencia);

        acciones.appendChild(eliminarBtn);
        acciones.appendChild(guardarBtn);
        row.appendChild(acciones);

        tbody.appendChild(row);
    });
}

// Función para eliminar un artículo
function eliminarArticulo(referencia) {
    let articulos = JSON.parse(localStorage.getItem('articulos')) || [];
    articulos = articulos.filter(art => art.referencia !== referencia);
    localStorage.setItem('articulos', JSON.stringify(articulos));
    cargarArticulos();
}

// Función para guardar un artículo
function guardarArticulo(referencia) {
    let articulos = JSON.parse(localStorage.getItem('articulos')) || [];
    const inputs = document.querySelectorAll(`input[data-referencia='${referencia}']`);
    inputs.forEach(input => {
        const key = input.dataset.key;
        const value = input.value;
        articulos = articulos.map(art => {
            if (art.referencia === referencia) {
                return { ...art, [key]: value };
            }
            return art;
        });
    });
    localStorage.setItem('articulos', JSON.stringify(articulos));
    alert('Artículo guardado con éxito');
}

// Función para imprimir el listado de artículos en PDF
function imprimirPDFListado() {
    const articulos = JSON.parse(localStorage.getItem('articulos')) || [];
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('landscape');
    const tableColumn = ["Referencia", "Nombre", "Tipo de IVA", "Stock", "Precio Compra", "PVP", "Tarifa", "EAN13", "Proveedor", "Familia"];
    const tableRows = [];

    articulos.forEach(articulo => {
        const articuloData = [
            articulo.referencia,
            articulo.nombre,
            articulo.tipoIva,
            articulo.stock,
            articulo.precioCompra,
            articulo.pvp,
            articulo.tarifa,
            articulo.ean13,
            articulo.proveedor,
            articulo.familia
        ];
        tableRows.push(articuloData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Listado de Artículos", 14, 15);
    doc.save('listado_articulos.pdf');
}

// Función para buscar artículos
function buscarArticulos() {
    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
    const articulos = JSON.parse(localStorage.getItem('articulos')) || [];
    const resultados = articulos.filter(articulo => 
        articulo.nombre.toLowerCase().includes(searchTerm) ||
        articulo.referencia.toLowerCase().includes(searchTerm) ||
        articulo.familia.toLowerCase().includes(searchTerm)
    );
    mostrarResultadosBusqueda(resultados);
}

// Función para mostrar los resultados de búsqueda
function mostrarResultadosBusqueda(articulos) {
    const tbody = document.querySelector('#articulosTable tbody');
    tbody.innerHTML = '';
    articulos.forEach(articulo => {
        const row = document.createElement('tr');

        Object.keys(articulo).forEach(key => {
            const cell = document.createElement('td');
            if (key === 'imagen') {
                const img = document.createElement('img');
                img.src = articulo[key];
                img.alt = articulo.nombre;
                img.style.width = '50px';
                cell.appendChild(img);
            } else {
                const input = document.createElement('input');
                input.type = 'text';
                input.value = articulo[key];
                input.dataset.key = key;
                input.dataset.referencia = articulo.referencia;
                cell.appendChild(input);
            }
            row.appendChild(cell);
        });

        const acciones = document.createElement('td');
        const eliminarBtn = document.createElement('button');
        eliminarBtn.textContent = 'Eliminar';
        eliminarBtn.onclick = () => eliminarArticulo(articulo.referencia);

        const guardarBtn = document.createElement('button');
        guardarBtn.textContent = 'Guardar';
        guardarBtn.onclick = () => guardarArticulo(articulo.referencia);

        acciones.appendChild(eliminarBtn);
        acciones.appendChild(guardarBtn);
        row.appendChild(acciones);

        tbody.appendChild(row);
    });
}

// Inicializar y cargar datos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    inicializarDatos();
    if (document.getElementById('articulosTable')) {
        cargarArticulos();
    }
    document.getElementById('searchBtn').addEventListener('click', buscarArticulos);
});
