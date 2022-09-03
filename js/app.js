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
        categoryItem.setAttribute('onclick', `loadNews('${category.category_id}')`)
        categoryItem.innerText = category.category_name;
        categoryUl.appendChild(categoryItem);
    })
}

const loadNews = catId => {
    console.log(catId);
    fetch(`https://openapi.programming-hero.com/api/news/category/${catId}`)
        .then(res => res.json())
        .then(data => displayNews(data.data))
}

const displayNews = news => {
    console.log(news);
    const newsSection = document.getElementById('news-section');
    newsSection.innerHTML = '';
    news.forEach(singleNews => {
        console.log(singleNews);
        const singleNewsDiv = document.createElement('div');
        singleNewsDiv.classList.add('col');
        singleNewsDiv.innerHTML = `
        <div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${singleNews.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">This is a wider card with supporting text below as a natural
                            lead-in to additional content. This content is a little bit longer.</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="d-flex">
                                <div>
                                    <img src="..." alt="">
                                </div>
                                <div>
                                <h4>Jane Cooper</h4>
                                <p>Jan 10, 2022</p>
                                </div>
                            </div>
                            <div>
                                <i class="fa-regular fa-eye"></i>
                                <span>1.5M</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        newsSection.appendChild(singleNewsDiv);
    })
}

loadCategories();