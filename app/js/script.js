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