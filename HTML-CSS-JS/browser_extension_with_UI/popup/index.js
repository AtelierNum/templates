function moveCount(amount){
    const countEl = document.getElementById("count");
    const value = parseInt(countEl.innerText);
    document.getElementById("count").innerText = value + amount;
}

document.getElementById("incrementer").addEventListener("click",(e) => {
    moveCount(1);
})

document.getElementById("decrementer").addEventListener("click",(e) => {
    moveCount(-1);
})