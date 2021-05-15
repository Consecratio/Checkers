window.addEventListener("DOMContentLoaded", () => {
    // global variables
    let tilesArr = []
    
    setupGameBoard()
    
    
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
                    // appendChild div with class gameTile and a player piece
                    newDiv.className = "gameTile"
                    tilesArr.push(newDiv)
                    boardContainer.appendChild(newDiv)
                    setupPieces(newDiv)
                } else {
                    // appendChild div with class noAccess and 
                    newDiv.className = "noAccess"
                    boardContainer.appendChild(newDiv)
                }
            }
        }
    }

    function setupPieces(tileDiv) {
        let newImg = document.createElement("img")

        // if pieces tile should have a piece set it to red or black
        // reds on top half, blk on bottom half
        if (tilesArr.length < 13) {
            // red pieces
            newImg.src = "./img/redPiece.png"
            newImg.addEventListener("click", () => {
                // do something on click
                console.log("I've been clicked!")
            })
            tileDiv.appendChild(newImg)
        } else if (tilesArr.length > 20) {
            // black pieces
            newImg.src = "./img/blkPiece.png"
            newImg.addEventListener("click", () => {
                // do something on click
                console.log("I've been clicked!")
            })
            tileDiv.appendChild(newImg)
        }
    }
})