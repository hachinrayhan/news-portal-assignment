const loadCategories = () => {
    try {
        fetch('https://openapi.programming-hero.com/api/news/categories')
            .then(res => res.json())
            .then(data => displayCategories(data.data.news_category))
    }
    catch (error) {
        alert(error);
    }
}

const displayCategories = categories => {
    const categoryUl = document.getElementById('category-ul');
    categories.forEach(category => {
        const categoryItem = document.createElement('li');
        categoryItem.classList.add('list-group-item', 'border-0');
        categoryItem.setAttribute('onclick', `loadNews('${category.category_id}', '${category.category_name}')`)
        categoryItem.innerText = category.category_name;
        categoryUl.appendChild(categoryItem);
    })
}

const loadNews = (catId, catName) => {
    toggleSpinner(true); //start spinner
    fetch(`https://openapi.programming-hero.com/api/news/category/${catId}`)
        .then(res => res.json())
        .then(data => displayNews(data.data, catName))
}

const displayNews = (news, catName) => {
    const newsNumber = news.length;
    const noOfNewsElement = document.getElementById('news-number');
    noOfNewsElement.innerText = `${newsNumber} items found in the category of ${catName}.`;
    const newsSection = document.getElementById('news-section');
    newsSection.innerHTML = '';
    news.forEach(singleNews => {
        const singleNewsDiv = document.createElement('div');
        singleNewsDiv.classList.add('col');
        singleNewsDiv.innerHTML = `
        <div class="card mb-3 p-3">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${singleNews.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${singleNews.title.slice(0, 50)}...</h5>
                        <p class="card-text">${singleNews.details.slice(0, 80)}...</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="d-flex align-items-center">                               
                                <img class="img-fluid rounded-circle w-25 me-2" src="${singleNews.author.img}" alt="">                               
                                <div>
                                    <h6>${singleNews.author.name}</h6>
                                    <p class="m-0">${singleNews.author.published_date}</p>
                                </div>
                            </div>
                            <div>
                                <div class="d-flex align-items-center">
                                    <i class="fa-regular fa-eye me-2"></i>
                                    <span>${singleNews.total_view}</span>
                                </div>
                                <button data-bs-toggle="modal" data-bs-target="#newsDetailModal" onclick="loadDetailNews('${singleNews._id}')"><i class="fa-solid fa-arrow-right-long"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        newsSection.appendChild(singleNewsDiv);
    })
    toggleSpinner(false); //stop spinner
}

/* spinner function */
const toggleSpinner = isLoading => {
    const spinner = document.getElementById('spinner');
    if (isLoading) {
        spinner.classList.remove('d-none');
    }
    else {
        spinner.classList.add('d-none');
    }
}

const loadDetailNews = newsId => {
    fetch(`https://openapi.programming-hero.com/api/news/${newsId}`)
        .then(res => res.json())
        .then(data => displayDetailNews(data.data[0]))
}

const displayDetailNews = detailNews => {
    console.log(detailNews.title);
    const title = document.getElementById('newsDetailModalLabel');
    title.innerText = detailNews.title;
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <img class="img-fluid" src="${detailNews.image_url}" alt="">
        <p>By: ${detailNews.author.name}</p>
        <p>Published Date: ${detailNews.author.published_date}</p>
        <p>${detailNews.details}</p>
    `;
}

loadCategories();
loadNews('01', 'Breaking News');