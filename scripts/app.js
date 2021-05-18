window.addEventListener("DOMContentLoaded", () => {
    // global variables
    let tilesArr = []
    let pieceToMove
    let enemiesToJump = []
    let enemiesLoc = []
    let playerTurn = "blk"
    
    setupGameBoard()

    // track amount of pieces on the board
    let red = document.getElementsByClassName("red").length
    console.log(`Number of Red pieces: ${red}`) // DELETE
    let blk = document.getElementsByClassName("blk").length
    console.log(`Number of Blk pieces: ${blk}`) // DELETE

    document.getElementById("player1").innerText = `Black Pieces: ${blk}`
    document.getElementById("player2").innerText = `Red Pieces: ${red}`
    
    // ~ FUNCTIONS ~ //

    function trackScore() {
        red = document.getElementsByClassName("red").length
        console.log(`Number of Red pieces: ${red}`)
        blk = document.getElementsByClassName("blk").length
        console.log(`Number of Blk pieces: ${blk}`)

        if(red == 0) {
            document.getElementById("winningPlayer").innerText = "Black wins!"
            document.getElementById("gameOver").style.display = "flex"
        } else if(blk == 0) {
            document.getElementById("winningPlayer").innerText = "Red wins!"
            document.getElementById("gameOver").style.display = "flex"
        }
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

        newImg.addEventListener("click", chipFunc)
        tileDiv.appendChild(newImg)
    }

    function chipFunc(target) {
        // clear board of event listeners to stop player from moving to location they can't move to
        divEventRemove()
        if(playerTurn == target.path[0].className) {
            // find location on board
            let loc = Number(target.path[1].id)
    
            // possible movements
            let directionalArr = [-7, -9, 9, 7]
            // TEST - might not be needed
            let mvUpRight = loc - 7
            let mvUpLeft = loc - 9
            let mvDownRight = loc + 9
            let mvDownLeft = loc + 7
            // ETST - might not be needed
            let mvDirArr = []
            let dblMvDirArr = []
            let movesAvail = []
    
            // check if piece is kinged
            let pieceKinged = false
    
            if(pieceKinged == false && target.path[0].className == 'red') {
                mvDirArr = [mvDownRight, mvDownLeft]
                dblMvDirArr = [mvDownRight, mvDownLeft]
                // flip directionalArr
                directionalArr = [directionalArr[2], directionalArr[3], directionalArr[0], directionalArr[1]]
            } else if(pieceKinged == false && target.path[0].className == 'blk') {
                mvDirArr = [mvUpRight, mvUpLeft]
                dblMvDirArr = [mvUpRight, mvUpLeft]
            }
    
            // find available moves
            for(let i = 0; i < mvDirArr.length; i++) {
                if(tilesArr[mvDirArr[i]] == null) {
                    continue
                } else if(tilesArr[mvDirArr[i]].className == "gameTile" && tilesArr[mvDirArr[i]].firstChild == null) {
                    movesAvail.push(tilesArr[mvDirArr[i]])
                } else if(tilesArr[mvDirArr[i]].className == "gameTile" && tilesArr[mvDirArr[i]].firstChild != null && tilesArr[mvDirArr[i]].firstChild.className != target.path[0].className) {
                    // space is occupied by enemy
                    // double distance to see if spot past enemy is open
                    console.log(tilesArr[mvDirArr[i] + directionalArr[i]])
                    if(tilesArr[mvDirArr[i] + directionalArr[i]] == null) {
                        continue
                    } else if(tilesArr[mvDirArr[i] + directionalArr[i]].className == "gameTile" && tilesArr[mvDirArr[i] + directionalArr[i]].firstChild == null) {
                        movesAvail.push(tilesArr[mvDirArr[i] + directionalArr[i]])
                        // push enemy object and location to an array
                        enemiesToJump.push(tilesArr[mvDirArr[i]].firstChild)
                        enemiesLoc.push(tilesArr[mvDirArr[i] + directionalArr[i]])
                    }
                }
            }
            
            if(movesAvail.length == 0){
                console.log("No moves available")
            } else {
                pieceToMove = target.path[0]
                availableLocations(movesAvail)
            }
    
            console.log(movesAvail) // TEST - printout to see if movesAvail is correct
    
            // iterate through movesAvail and setup event listeners
            for(let i = 0; i < movesAvail.length; i++) {
                movesAvail[i].addEventListener("click", divEventAdd, true)
            }
        }
    }

    function divEventAdd(newTarget) {
        // add logic to handle a player piece moving to this location
        newTarget.path[0].appendChild(pieceToMove)
        for(let i = 0; i < enemiesLoc.length; i++) {
            if(newTarget.path[0] == enemiesLoc[i]) {
                enemiesToJump[i].remove()
                enemiesToJump = []
                enemiesLoc = []
            }
        }

        // change player's turn
        if(playerTurn == "blk") {
            playerTurn = "red"
        } else {
            playerTurn = "blk"
        }
        // check for winners
        trackScore()
        // remove event listeners
        divEventRemove()
    }

    function divEventRemove() {
        for(let i = 0; i < tilesArr.length; i++) {
            tilesArr[i].removeEventListener("click", divEventAdd, true)
            tilesArr[i].classList.remove("toMove")
        }
    }

    function availableLocations(movesAvail) {
        for(let i = 0; i < movesAvail.length; i++) {
            movesAvail[i].classList.add("toMove")
        }
    }
})

// MVP
// [] A functional menu for starting the game
// [X] Having win conditions
// [X] Having players "consume" or "jump" enemy pieces
// [X] Limiting player movements so player cannot go out of bounds of the board,
//    or to a space they shouldn't be allowed to occupy (like moving backwards at the beginning)
// [] Allowing players to be "Kinged" to let their pieces go in reverse direction
// [X] Alternating turns between Player 1 and Player 2