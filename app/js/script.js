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
        let savedRating = 0; // Збережений рейтинг для кожного контейнера

        stars.forEach((star, index) => {
            // Подія наведення мишкою
            star.addEventListener("mouseover", () => {
                resetStars();
                highlightStars(index);
            });

            // Подія кліку для фіксації рейтингу
            star.addEventListener("click", () => {
                savedRating = index + 1; // Зберігаємо рейтинг
                console.log(`Рейтинг для цього контейнера: ${savedRating}`);
            });

            // Скидання підсвічування при знятті курсора
            star.addEventListener("mouseout", () => {
                resetStars();
                applySavedRating();
            });
        });

        function resetStars() {
            stars.forEach((star) => star.classList.remove("filled"));
        }

        function highlightStars(endIndex) {
            for (let i = 0; i <= endIndex; i++) {
                stars[i].classList.add("filled");
            }
        }

        function applySavedRating() {
            if (savedRating > 0) {
                highlightStars(savedRating - 1);
            }
        }
    });
});
