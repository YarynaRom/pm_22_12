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
// Асинхронна функція для завантаження даних з data.json
async function loadSkills() {
    try {
        // Завантажуємо файл data.json
        const response = await fetch("http://127.0.0.1:8080", {
            cache: "no-store",
        });
        if (!response.ok) {
            throw new Error("Помилка при завантаженні даних");
        }
        const data = await response.json();

        // Знаходимо секцію навичок у HTML
        const skillsSection = document.getElementById("skill-text");
        skillsSection.innerHTML = ""; // Очищаємо поточний вміст

        // Розподіляємо навички по колонках
        const columnCount = 2; // Кількість колонок
        const columns = Array.from({ length: columnCount }, () =>
            document.createElement("div")
        );
        columns.forEach((col) => col.classList.add("skills-column"));

        // Додаємо кожну навичку
        data.skills.forEach((skill, index) => {
            // Створюємо елемент для навички
            const skillDiv = document.createElement("div");
            skillDiv.classList.add("skill");

            // Додаємо прогрес-бар
            const progressBar = document.createElement("div");
            progressBar.classList.add("progress-bar");

            const progress = document.createElement("div");
            progress.classList.add("progress");
            // progress.style.width = ${skill.progress}%; // Ширина залежить від прогресу
            progress.setAttribute("data-progress", skill.progress);

            // Додаємо назву навички
            const skillName = document.createElement("span");
            skillName.classList.add("skill-name");
            skillName.textContent = skill.name;

            // Збираємо елементи разом
            progressBar.appendChild(progress);
            skillDiv.appendChild(skillName);
            skillDiv.appendChild(progressBar);

            // Додаємо навичку до відповідної колонки
            columns[index % columnCount].appendChild(skillDiv);
        });

        // Додаємо всі колонки в секцію
        columns.forEach((col) => skillsSection.appendChild(col));

        setTimeout(() => {
            const progressBars = document.querySelectorAll(".progress");

            progressBars.forEach((bar) => {
                const progress = bar.getAttribute("data-progress"); // Отримуємо значення з data-progress
                bar.style.width = progress + "%"; // Встановлюємо ширину для анімації
            });
        }, 500);
    } catch (error) {
        console.error("Помилка завантаження даних:", error);
    }
}

// Викликаємо функцію при завантаженні сторінки
document.addEventListener("DOMContentLoaded", loadSkills);