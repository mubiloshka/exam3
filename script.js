let kartochki = document.querySelector('.kartochki');
let searchInput = document.getElementById('searchInput');
let categoryFilter = document.getElementById('categoryFilter');
let sortFilter = document.getElementById('sortFilter');

fetch('https://fakestoreapi.com/products')
.then(response => response.json())
.then(data => {

    function render(products) {
        kartochki.innerHTML = '';
        products.forEach(item => {
            let title = item.title;
            if (title.length > 40) {
                title = title.slice(0, 37) + '...';
            }

            let divCard = document.createElement('div');
            divCard.className = 'card';
            divCard.innerHTML = `
                <img src="${item.image}" class="img" alt="">
                <h2>${title}</h2>
                <p>${item.category}</p>
                <p class="price">$${item.price}</p>
            `;
            kartochki.appendChild(divCard);
        });
    }

    render(data);

    function update() {
        let filtered = data.filter(item => {
            let matchCategory = categoryFilter.value === 'all' || item.category === categoryFilter.value;
            let matchSearch = item.title.toLowerCase().includes(searchInput.value.toLowerCase());
            return matchCategory && matchSearch;
        });

        if (sortFilter.value === 'asc') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortFilter.value === 'desc') {
            filtered.sort((a, b) => b.price - a.price);
        }


        render(filtered);
    }


    categoryFilter.addEventListener('change', update);
    sortFilter.addEventListener('change', update);
    searchInput.addEventListener('input', update);
});
