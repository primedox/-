document.addEventListener('DOMContentLoaded', function () {
    // Табы
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function (event) {
            event.preventDefault();
            const pageId = this.getAttribute('data-page');
            showPage(pageId);
        });
    });

    function showPage(pageId) {
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => page.classList.remove('active'));
        document.getElementById(pageId).classList.add('active');

        tabs.forEach(tab => tab.classList.remove('active'));
        document.querySelector(`.tab[data-page="${pageId}"]`).classList.add('active');
    }

    // Модальные окна (Информация)
    window.openModal = function (modalId) {
        document.getElementById(modalId + 'Modal').style.display = 'block';
    }

    window.closeModal = function (modalId) {
        document.getElementById(modalId + 'Modal').style.display = 'none';
    }
   // Модальные окна (Товары)
    window.openProductModal = function (modalId) {
        document.getElementById(modalId + 'Modal').style.display = 'block';
    }

    window.closeProductModal = function (modalId) {
        document.getElementById(modalId + 'Modal').style.display = 'none';
    }

    // Баннер (GSAP)
    const bannerSlider = document.querySelector('.banner-slider');
    const bannerItems = document.querySelectorAll('.banner-item');
    const bannerWidth = bannerItems[0].offsetWidth; // Ширина одного элемента
    const bannerCount = bannerItems.length;
    let currentBanner = 0;
    gsap.set(bannerSlider, { x: 0 });

    function animateBanner() {
        currentBanner++;
        if (currentBanner >= bannerCount) {
            currentBanner = 0;
        }
        gsap.to(bannerSlider, {
            duration: 0.5,
            x: -currentBanner * bannerWidth,
            ease: "power2.inOut",
            onComplete: () => {
                if (currentBanner === bannerCount - 1) {
                    gsap.set(bannerSlider, { x: 0 }); // Вернуть в начало без анимации
                    currentBanner = 0;
                }
            }
        });
    }

    setInterval(animateBanner, 3000); // Менять баннер каждые 3 секунды

    // Форма
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Предотвратить стандартную отправку формы
        const formData = new FormData(this); // Получить данные формы

        fetch('send.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text()) // Обработать ответ сервера как текст
        .then(data => {
            alert(data); // Показать сообщение от сервера (например, "Сообщение отправлено!")
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при отправке сообщения.'); // Сообщение об ошибке
        });
    });
});