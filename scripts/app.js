window.addEventListener("DOMContentLoaded", () => {
    // global variables
    let tilesArr = []
    
    setupGameBoard()

    // TEST - how to track amount of pieces on the board
    let red = document.getElementsByClassName("red").length
    console.log(red)
    // ETST - how to track amount of pieces on the board
    
    // ~ FUNCTIONS ~ //
    function startGame() {
        
    }
    
    // creates divs to represent the gameboard, sets up div classes as well
    function setupGameBoard() {
        let boardContainer = document.getElementById("container")
        
        for (let i = 0; i < 8; i++) {
            // first row of divs starting with a black square
            for (let j = 0; j < 8; j++) {
                let newDiv = document.createElement("div")
                if (j % 2 == i % 2) {
                    // appendChild div with id for it's position on the board and class gameTile and setup player piece
                    newDiv.id = tilesArr.length
                    newDiv.className = "gameTile"
                    tilesArr.push(newDiv)
                    boardContainer.appendChild(newDiv)
                    setupPieces(newDiv)
                } else {
                    // appendChild div with class noAccess and 
                    newDiv.id = tilesArr.length
                    newDiv.className = "noAccess"
                    tilesArr.push(newDiv)
                    boardContainer.appendChild(newDiv)
                }
            }
        }
    }

    function setupPieces(tileDiv) {
        let newImg = document.createElement("img")

        // checks if pieces should have a piece set it to red or black
        // reds on top half, blk on bottom half
        if (tilesArr.length < 24) {
            // red pieces
            newImg.src = "./img/redPiece.png"
            newImg.className = "red"
        } else if (tilesArr.length > 40) {
            // black pieces
            newImg.src = "./img/blkPiece.png"
            newImg.className = "blk"
        } else {
            return
        }

        newImg.addEventListener("click", (target) => {
            // find location on board
            let loc = Number(target.path[1].id)
            let mvUpRight = loc - 7
            let mvUpLeft = loc - 9
            let mvDownRight = loc + 9
            let mvDownLeft = loc + 7
            // check available moves
            if(tilesArr[mvUpRight].className == "gameTile" && tilesArr[mvUpRight].firstChild == null) {
                console.log("Can move up right, to empty spot")
            }
            if(tilesArr[mvUpLeft].className == "gameTile" && tilesArr[mvUpLeft].firstChild == null) {
                console.log("Can move up left, to empty spot")
            }
            if(tilesArr[mvDownRight].className == "gameTile" && tilesArr[mvDownRight].firstChild == null) {
                console.log("Can move down right, to empty spot")
            }
            if(tilesArr[mvDownLeft].className == "gameTile" && tilesArr[mvDownLeft].firstChild == null) {
                console.log("Can move down left, to empty spot")
            } 
            // TODO: figure out how to handle zero moves
            // TODO: figure out jumps
        })
        tileDiv.appendChild(newImg)
    }
})