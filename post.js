document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    fetch('posts.json')
        .then(response => response.json())
        .then(data => {
            const post = data.posts[postId];
            if (post) {
                document.getElementById('post-title').innerText = post.title;
                document.getElementById('post-content-title').innerText = post.title;
                document.getElementById('post-image').src = post.image;
                document.getElementById('post-image').alt = post.title;
                
                const shareURL = `https://euquerobrindes.com.br/post.html?id=${postId}`;
                createShareLinks(shareURL);
            } else {
                document.getElementById('post-content-title').innerText = 'Post não encontrado';
            }
        })
        .catch(error => console.error('Erro ao carregar post:', error));
});

function createShareLinks(url) {
    const shareLinks = document.getElementById('share-links');
    shareLinks.innerHTML = `
        <a href="https://api.whatsapp.com/send?text=${encodeURIComponent(url)}" target="_blank" title="Compartilhar no WhatsApp"><i class="fab fa-whatsapp"></i></a>
        <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}" target="_blank" title="Compartilhar no Twitter"><i class="fab fa-twitter"></i></a>
        <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}" target="_blank" title="Compartilhar no Facebook"><i class="fab fa-facebook-f"></i></a>
        <a href="https://www.instagram.com/?url=${encodeURIComponent(url)}" target="_blank" title="Compartilhar no Instagram"><i class="fab fa-instagram"></i></a>
        <a href="#" onclick="copyToClipboard('${url}'); return false;" title="Copiar Link"><i class="fas fa-link"></i></a>
    `;
}

function copyToClipboard(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
}

function claimGift() {
    window.location.href = "https://www.euquerobrindesgratis.com.br/";
}
