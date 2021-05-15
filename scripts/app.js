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
        // TEST - give the tiles a number
        let tileNum = 1
        // END TEST - give tiles a number
        
        for (let i = 0; i < 4; i++) {
            // first row of divs starting with a black square
            for (let j = 0; j < 8; j++) {
                let newDiv = document.createElement("div")
                let newImg = document.createElement("img") // TEST - setup images with pieces
                if (j % 2 == 0) {
                    // appendChild div with class gameTile and a player piece
                    newDiv.className = "gameTile"
                    // TEST - give tiles a number
                    // newDiv.innerText = tileNum
                    tileNum++
                    tilesArr.push(newDiv)
                    // END TEST - give tiles a number
                    boardContainer.appendChild(newDiv)
                    // TEST - setup images with pieces
                    if (tileNum < 14) {
                        // red pieces
                        newImg.src = "./img/redPiece.png"
                        newDiv.appendChild(newImg)
                    } else if (tileNum > 21) {
                        // black pieces
                        newImg.src = "./img/blkPiece.png"
                        newDiv.appendChild(newImg)
                    }
                    // END TEST - setup images with pieces
                } else {
                    // appendChild div with class noAccess and 
                    newDiv.className = "noAccess"
                    boardContainer.appendChild(newDiv)
                }
            }
            // second row of divs starting with a red square
            for (let k = 0; k < 8; k++) {
                let newDiv = document.createElement("div")
                let newImg = document.createElement("img") // TEST - setup images with pieces
                if (k % 2 == 1) {
                    // appendChild div with class gameTile and a player piece
                    newDiv.className = "gameTile"
                    // TEST - give tiles a number
                    // newDiv.innerText = tileNum
                    tileNum++
                    tilesArr.push(newDiv)
                    // END TEST - give tiles a number
                    boardContainer.appendChild(newDiv)
                    // TEST - setup images with pieces
                    if (tileNum < 14) {
                        // red pieces
                        newImg.src = "./img/redPiece.png"
                        newDiv.appendChild(newImg)
                    } else if (tileNum > 21) {
                        // black pieces
                        newImg.src = "./img/blkPiece.png"
                        newDiv.appendChild(newImg)
                    }
                    // END TEST - setup images with pieces
                } else {
                    // appendChild div with class noAccess and 
                    newDiv.className = "noAccess"
                    boardContainer.appendChild(newDiv)
                }
            }
        }
    }
})