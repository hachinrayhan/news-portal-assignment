const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
}

const displayCategories = categories => {
    const categoryUl = document.getElementById('category-ul');
    categories.forEach(category => {
        const categoryItem = document.createElement('li');
        categoryItem.classList.add('list-group-item', 'border-0');
        categoryItem.setAttribute('onclick', `loadNews(${category.category_id})`)
        categoryItem.innerText = category.category_name;
        categoryUl.appendChild(categoryItem);
    })
}

const loadNews = catId => {
    console.log(catId);
}

loadCategories();