document.addEventListener("DOMContentLoaded", function() {
    let currentPage = 1;
    const postsPerPage = 4;
    let totalPages = 0;

    fetch('posts.json')
        .then(response => response.json())
        .then(data => {
            totalPages = Math.ceil(data.posts.length / postsPerPage);
            renderPosts(data.posts, currentPage);
            renderPagination(totalPages, currentPage);
        })
        .catch(error => console.error('Erro ao carregar posts:', error));

    function renderPosts(posts, page) {
        const postsList = document.getElementById('posts-list');
        postsList.innerHTML = ''; // Limpa os posts existentes
        const start = (page - 1) * postsPerPage;
        const end = start + postsPerPage;
        const paginatedPosts = posts.slice(start, end);

        paginatedPosts.forEach((post, index) => {
            const postElement = document.createElement('div');
            postElement.className = 'content';
            postElement.innerHTML = `
                <h1>${post.title}</h1>
                <img src="${post.image}" alt="${post.title}">
                <div class="button-container">
                    <a href="post.html?id=${start + index}" class="button">EU QUERO</a>
                </div>
            `;
            postsList.appendChild(postElement);
        });
    }

    function renderPagination(total, current) {
        const paginationContainer = document.getElementById('pagination');
        paginationContainer.innerHTML = ''; // Limpa a paginação existente

        if (current > 1) {
            const prevButton = document.createElement('button');
            prevButton.innerText = 'Anterior';
            prevButton.addEventListener('click', () => changePage(current - 1));
            paginationContainer.appendChild(prevButton);
        }

        for (let i = 1; i <= total; i++) {
            const pageButton = document.createElement('button');
            pageButton.innerText = i;
            if (i === current) {
                pageButton.disabled = true;
            }
            pageButton.addEventListener('click', () => changePage(i));
            paginationContainer.appendChild(pageButton);
        }

        if (current < total) {
            const nextButton = document.createElement('button');
            nextButton.innerText = 'Próxima';
            nextButton.addEventListener('click', () => changePage(current + 1));
            paginationContainer.appendChild(nextButton);
        }
    }

    function changePage(page) {
        currentPage = page;
        fetch('posts.json')
            .then(response => response.json())
            .then(data => {
                renderPosts(data.posts, currentPage);
                renderPagination(totalPages, currentPage);
            })
            .catch(error => console.error('Erro ao carregar posts:', error));
    }
});
