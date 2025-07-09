document.addEventListener('DOMContentLoaded', () => {
    // Navbar animation
    gsap.from('.gsap-nav', {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    // GSAP Анимации
    // Начальная анимация
    gsap.from('.gsap-header', {
        duration: 1,
        y: -100,
        opacity: 0,
        ease: 'power3.out'
    });

    gsap.from('.gsap-title', {
        duration: 1.2,
        scale: 0.5,
        opacity: 0,
        delay: 0.3,
        ease: 'back.out(1.7)'
    });

    gsap.from('.gsap-subtitle', {
        duration: 1,
        x: -100,
        opacity: 0,
        delay: 0.5,
        ease: 'power3.out'
    });

    gsap.from('.gsap-divider', {
        duration: 1.5,
        scaleX: 0,
        opacity: 0,
        delay: 0.7,
        ease: 'power3.inOut'
    });

    // Анимация формы
    gsap.from('.gsap-form', {
        duration: 1,
        y: 50,
        opacity: 0,
        delay: 0.8,
        ease: 'power3.out'
    });

    gsap.from('.gsap-input', {
        duration: 0.7,
        x: -50,
        opacity: 0,
        stagger: 0.2,
        delay: 1,
        ease: 'power3.out'
    });

    gsap.from('.gsap-calc', {
        duration: 0.7,
        x: 50,
        opacity: 0,
        delay: 1.2,
        ease: 'power3.out'
    });

    gsap.from('.gsap-button', {
        duration: 1,
        scale: 0.5,
        opacity: 0,
        delay: 1.4,
        ease: 'back.out(1.7)'
    });

    // Анимация информационных секций
    gsap.from('.gsap-info', {
        duration: 1,
        y: 50,
        opacity: 0,
        delay: 1.6,
        ease: 'power3.out'
    });

    gsap.from('.gsap-list-item', {
        duration: 0.7,
        x: -50,
        opacity: 0,
        stagger: 0.2,
        delay: 1.8,
        ease: 'power3.out'
    });

    gsap.from('.gsap-trust', {
        duration: 1,
        y: 50,
        opacity: 0,
        delay: 2,
        ease: 'power3.out'
    });

    gsap.from('.gsap-trust-point', {
        duration: 0.7,
        scale: 0.8,
        opacity: 0,
        stagger: 0.2,
        delay: 2.2,
        ease: 'back.out(1.7)'
    });

    // Анимация кнопки при наведении
    const payButton = document.getElementById('pay-button');
    
    // Сначала делаем кнопку видимой
    gsap.set(payButton, {
        opacity: 1,
        scale: 1
    });

    // Затем добавляем анимацию появления
    gsap.from(payButton, {
        duration: 1,
        scale: 0.5,
        opacity: 0,
        delay: 0.5,
        ease: 'back.out(1.7)',
        clearProps: 'all' // Очищаем все свойства после анимации
    });

    // Анимация при наведении
    payButton.addEventListener('mouseenter', () => {
        gsap.to(payButton, {
            duration: 0.3,
            scale: 1.05,
            ease: 'power2.out'
        });
    });

    payButton.addEventListener('mouseleave', () => {
        gsap.to(payButton, {
            duration: 0.3,
            scale: 1,
            ease: 'power2.out'
        });
    });

    // Калькулятор
    const amountInput = document.getElementById('amount');
    const emailInput = document.getElementById('email');
    const baseAmountSpan = document.getElementById('base-amount');
    const commissionSpan = document.getElementById('commission');
    const totalAmountSpan = document.getElementById('total-amount');

    function updateCalculations() {
        const amount = parseFloat(amountInput.value) || 0;
        const commission = Math.round(amount * 0.05);
        const total = amount + commission;

        // Анимация обновления чисел
        gsap.to([baseAmountSpan, commissionSpan, totalAmountSpan], {
            duration: 0.5,
            opacity: 0,
            y: -20,
            ease: 'power2.out',
            onComplete: () => {
                baseAmountSpan.textContent = `${amount.toLocaleString()} ₽`;
                commissionSpan.textContent = `${commission.toLocaleString()} ₽`;
                totalAmountSpan.textContent = `${total.toLocaleString()} ₽`;
                
                gsap.to([baseAmountSpan, commissionSpan, totalAmountSpan], {
                    duration: 0.5,
                    opacity: 1,
                    y: 0,
                    ease: 'power2.out'
                });
            }
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    amountInput.addEventListener('input', updateCalculations);

    payButton.addEventListener('click', () => {
        const amount = parseFloat(amountInput.value) || 0;
        const email = emailInput.value.trim();

        if (!email) {
            gsap.to(emailInput, {
                duration: 0.2,
                x: [-10, 10, -10, 10, 0],
                ease: 'power2.out'
            });
            alert('Пожалуйста, укажите email для связи');
            emailInput.focus();
            return;
        }

        if (!validateEmail(email)) {
            gsap.to(emailInput, {
                duration: 0.2,
                x: [-10, 10, -10, 10, 0],
                ease: 'power2.out'
            });
            alert('Пожалуйста, укажите корректный email адрес');
            emailInput.focus();
            return;
        }

        if (amount < 100) {
            gsap.to(amountInput, {
                duration: 0.2,
                x: [-10, 10, -10, 10, 0],
                ease: 'power2.out'
            });
            alert('Минимальная сумма пополнения: 100 ₽');
            amountInput.focus();
            return;
        }
        
        // Анимация кнопки при нажатии
        gsap.to(payButton, {
            duration: 0.2,
            scale: 0.95,
            ease: 'power2.out',
            onComplete: () => {
                gsap.to(payButton, {
                    duration: 0.2,
                    scale: 1,
                    ease: 'power2.out'
                });
            }
        });

        // Отправка запроса на сервер
        fetch(`http://37.114.41.125:2631/invoice?amount=${amount}`)
            .then(response => response.json())
            .then(data => {
                if (data.url) {
                    // Переходим на страницу оплаты
                    window.location.href = data.url;
                } else {
                    alert('Произошла ошибка при создании счета. Пожалуйста, попробуйте еще раз.');
                }
            })
            .catch(error => {
                console.error('Ошибка:', error);
                alert('Произошла ошибка при создании счета. Пожалуйста, попробуйте еще раз.');
            });
    });

    // Инициализация начальных значений
    updateCalculations();

    // Модальные окна
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    const legalLinks = document.querySelectorAll('.legal-link');

    // Открытие модального окна с анимацией
    legalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = `modal-${link.getAttribute('data-modal')}`;
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                
                // Сбрасываем стили перед анимацией
                gsap.set(modal.querySelector('.modal-content'), {
                    y: -50,
                    opacity: 0
                });
                
                gsap.to(modal.querySelector('.modal-content'), {
                    duration: 0.5,
                    y: 0,
                    opacity: 1,
                    ease: 'power3.out'
                });
            }
        });
    });

    // Закрытие модального окна с анимацией
    function closeModal(modal) {
        if (!modal) return;
        
        gsap.to(modal.querySelector('.modal-content'), {
            duration: 0.3,
            y: -50,
            opacity: 0,
            ease: 'power3.in',
            onComplete: () => {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }

    // Обработчики закрытия
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });

    // Закрытие при клике вне модального окна
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Закрытие при нажатии Esc
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.style.display === 'block') {
                    closeModal(modal);
                }
            });
        }
    });
}); 
