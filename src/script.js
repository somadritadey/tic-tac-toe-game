let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let msgContainer = document.querySelector(".message-container");
let msg = document.querySelector("#message");
let newGameBtn = document.querySelector("#new-game");

// there are two players: playerX & playerO
let turnX = true;

// a 2D array containing all the winning patterns
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// reset game
const resetGame = () => {
    turnX = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}
resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);

// on clicking boxes
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnX === true) {
            box.innerText = "X";
            turnX = false;
        }
        else {
            box.innerText = "O";
            turnX = true;
        }
        box.disabled = true; // to avoid clicking on the same box

        // now also making sure to check if already won or not
        checkWinner();
    })
})

const checkWinner = () => {
    for(let pattern of winPatterns) {
        // values of text in that box in each pattern
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if(pos1val != "" && pos2val != "" && pos3val != "") {
            if(pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val);
            }
        }
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}!!`;
    // remove hide
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}
