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

