window.addEventListener("DOMContentLoaded", () => {
    // global variables
    let tilesArr = []
    
    setupGameBoard()

    // TEST - how to track amount of pieces on the board
    let red = document.getElementsByClassName("red").length
    console.log(`Number of Red pieces: ${red}`)
    let blk = document.getElementsByClassName("blk").length
    console.log(`Number of Blk pieces: ${blk}`)
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
            let mvDirArr = [mvUpRight, mvUpLeft, mvDownRight, mvDownLeft]
            let dblMvDirArr = [mvUpRight, mvUpLeft, mvDownRight, mvDownLeft]
            let movesAvail = []
            // check available moves
            for(let i = 0; i < mvDirArr.length; i++) {
                if(tilesArr[mvDirArr[i]] == null) {
                    continue
                } else if(tilesArr[mvDirArr[i]].className == "gameTile" && tilesArr[mvDirArr[i]].firstChild == null) {
                    movesAvail.push(tilesArr[mvDirArr[i]])
                } else if(tilesArr[mvDirArr[i]].className == "gameTile" && tilesArr[mvDirArr[i]].firstChild != null && tilesArr[mvDirArr[i]].firstChild.className != target.path[0].className) {
                    // space is occupied by enemy
                    console.log("Space occupied by enemy")
                    dblMvDirArr = [dblMvDirArr[0] - 7, dblMvDirArr[1] - 9, dblMvDirArr[2] + 9, dblMvDirArr[3] +7]
                    // do another loop with double directional values
                    for(let j = 0; j < dblMvDirArr.length; j++) {
                        if(tilesArr[dblMvDirArr[i]] == null) {
                            continue
                        } else if(tilesArr[dblMvDirArr[i]].className == "gameTile" && tilesArr[dblMvDirArr[i]].firstChild == null) {
                            movesAvail.push(tilesArr[dblMvDirArr[i]])
                        }
                    }
                }
            }
            
            if(movesAvail.length == 0){
                console.log("No moves available")
            }

            console.log(movesAvail) // TEST - printout to see if movesAvail is correct

            // iterate through movesAvail and setup event listeners
            for(let i = 0; i < movesAvail.length; i++) {
                // movesAvail[i].addEventListener("click", (newTarget) => {
                //     newTarget.path[0].appendChild(target.path[0])
                // }, {once: true})
                movesAvail[i].addEventListener("click", divEventAdd, true)
            }
        })
        tileDiv.appendChild(newImg)
    }

    function divEventAdd(newTarget) {
        // add logic to handle a player piece moving to this location
        // newTarget.path[0].appendChild(target.path[0])
        console.log(newTarget)
        divEventRemove()
    }

    function divEventRemove() {
        for(let i = 0; i < tilesArr.length; i++) {
            tilesArr[i].removeEventListener("click", divEventAdd, true)
        }
    }
})

// TODO: figure out how to handle zero moves
// TODO: figure out jumps