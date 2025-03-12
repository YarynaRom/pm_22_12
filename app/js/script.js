const btnRoll = document.getElementsByClassName("roll");
const blockRoll = document.getElementsByClassName("roll-block");
Array.from(btnRoll).forEach((btn, index) => {
    btn.addEventListener("click", () => showOrHide(blockRoll[index]));
});
function showOrHide(block) {
    if (block.style.maxHeight) {
        block.style.maxHeight = null;
    } else {
        block.style.maxHeight = "300vh";
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const starContainers = document.querySelectorAll(".stars-container");

    starContainers.forEach((container) => {
        const stars = container.querySelectorAll(".star");
        let savedRating = 0; // Збережений рейтинг для кожного ряду

        stars.forEach((star, index) => {
            // Наведення мишкою — підсвічуємо всі зірки до наведеної
            star.addEventListener("mouseover", () => {
                resetStars();
                highlightStars(index);
            });

            // Зняття мишки — показуємо збережений рейтинг
            star.addEventListener("mouseout", () => {
                resetStars();
                applySavedRating();
            });

            // Клік — фіксуємо рейтинг
            star.addEventListener("click", () => {
                savedRating = index + 1; // Зберігаємо рейтинг
                console.log(`Рейтинг збережено: ${savedRating}`);
            });
        });

        // Функція для скидання всіх зірок
        function resetStars() {
            stars.forEach((star) => {
                star.classList.remove("hovered", "filled");
            });
        }

        // Функція для підсвічування зірок до наведеної
        function highlightStars(endIndex) {
            for (let i = 0; i <= endIndex; i++) {
                stars[i].classList.add("hovered");
            }
        }

        // Функція для застосування збереженого рейтингу
        function applySavedRating() {
            for (let i = 0; i < savedRating; i++) {
                stars[i].classList.add("filled");
            }
        }
    });
});
function fetchData(url, options = {}) {
    return fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error("Помилка завантаження даних");
            }
            return response.json();
        })
        .then(data => {
            console.log("Отримані дані:", data);
            return data;
        })
        .catch(error => {
            console.error("Помилка:", error);
            throw error;
        });
}

// Асинхронна функція для отримання даних
async function getData() {
    try {
        const data = await fetchData("http://localhost:8080/dist/data.json", { cache: "no-store" });
        console.log("Отримані дані:", data);
        renderData(data);
    } catch (error) {
        console.error("Помилка при отриманні даних:", error);
    }
}

// Функція для рендерингу даних
function renderData(data) {
    if (data.education && Array.isArray(data.education)) {
        renderEducation(data.education);
    } else {
        console.error("Дані education відсутні або некоректні:", data.education);
    }
}

// Функція для рендерингу секції "Освіта"
function renderEducation(education) {
    const container = document.querySelector(".education .roll-block");
    container.innerHTML = ""; // Очищення контейнера

    const educationHTML = education.map(item => `
        <div class="education-item">
            <p><strong>${item.institution}</strong></p>
            <h3>${item.degree}</h3>
            <p><span class="year">${item.year}</span></p>
        </div>
    `).join('');

    container.innerHTML = educationHTML;
}

// Виклик функції для отримання та рендерингу даних
getData().then(res => console.log("Результат:", res));
