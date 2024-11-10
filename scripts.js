function addDarkModeToggle()
{
    const body = document.body;
    const darkModeBtn = document.createElement('button');
    darkModeBtn.innerHTML = '🌙';
    darkModeBtn.className = 'dark-mode-toggle';
    document.querySelector('nav').appendChild(darkModeBtn);

    darkModeBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        darkModeBtn.textContent = body.classList.contains('dark-mode') ? '🌞' : '🌙';
    });
}

// Shopping cart functionality
let cart = [];

function addToCart(product) {
    cart.push(product);
    updateCartCount();
    showNotification('Đã thêm vào giỏ hàng!');
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = 'notification';
    document.body.appendChild(notification);


    setTimeout(() => {
        notification.remove();
    }, 3000);
}
 
// Lazy loading cho ảnh
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

