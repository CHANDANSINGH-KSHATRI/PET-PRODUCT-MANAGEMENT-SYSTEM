// tableScript.js
document.addEventListener('DOMContentLoaded', () => {
    fetchDataAndPopulateTable();
});

async function fetchDataAndPopulateTable() {
    try {
        const response = await fetch('http://localhost:3000/fetchProducts');
        const products = await response.json();

        const table = document.getElementById('productTable');
        const headerRow = table.createTHead().insertRow(0);

        // Create table headers
        for (const key in products[0]) {
            if (products[0].hasOwnProperty(key)) {
                const th = document.createElement('th');
                th.innerHTML = key;
                headerRow.appendChild(th);
            }
        }

        // Populate table rows
        products.forEach(product => {
            const row = table.insertRow(-1);
            for (const key in product) {
                if (product.hasOwnProperty(key)) {
                    const cell = row.insertCell();
                    cell.innerHTML = product[key];
                }
            }
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
