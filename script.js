const board = document.getElementById("board")
var boardBlocks = []

function createBoard() {
  var table = document.createElement("table")
  for (i = 0; i < 10; i++) {
    row = table.insertRow(i)
    for (x = 0; x < 10; x++) {
      cell = row.insertCell(x)
    }
  }
  board.innerHTML = table.outerHTML
}

var lastPosKarel = 0
function createKarel() {
  cell = document.getElementsByTagName("td")
  cell[lastPosKarel].innerHTML = "🤖"
}

var rotate = 0
var direction = 0
function rotateKarel(dir) {
  if (dir == undefined) {
    deg = direction * -90
    cell[lastPosKarel].style.WebkitTransform = `rotate(${deg}deg)`
  } else {
    var dr = direction + dir
    direction = dr
    deg = dr * -90
    cell[lastPosKarel].style.WebkitTransform = `rotate(${deg}deg)`
  }
}

function updateBoard() {
  for (i = 0; i < boardBlocks.length; i++) {
    if (boardBlocks[i] == undefined) {
    } else if (boardBlocks[i].length > 2) {
      cell[i].style.backgroundColor = boardBlocks[i]
    } else {
      cell[i].innerHTML = boardBlocks[i]
    }
  }
}

const between = (num, min, max) => num >= min && num <= max

function moveKarel() {
  var number = 1
  cell = document.getElementsByTagName("td")
  cell[lastPosKarel].innerHTML = ""
  cell[lastPosKarel].style = "none"

  while (direction > 3) {
    direction -= 4
  }
  switch (direction) {
    case 0:
      if (between(lastPosKarel, 90, 99)) {
      } else {
        lastPosKarel += 10
      }
      break
    case 1:
      if (lastPosKarel % 10 == 9) {
      } else {
        lastPosKarel += number
      }
      break
    case 2:
      if (between(lastPosKarel, 0, 9)) {
      } else {
        lastPosKarel -= 10
      }
      break
    case 3:
      if (lastPosKarel % 10 == 0) {
      } else {
        lastPosKarel -= number
      }
      break
  }

  cell[lastPosKarel].innerHTML = "🤖"
  rotateKarel()
  updateBoard()
}

createBoard()
createKarel()

function placeBlock(block) {
  if (block.length > 2) {
    cell[lastPosKarel].style.backgroundColor = block
  } else {
    cell[lastPosKarel].innerHTML = block
    cell[lastPosKarel].style = "none"
  }
  boardBlocks[lastPosKarel] = block
}

function sleepTimeout() {
  return new Promise((resolve) => {
    setTimeout(resolve, 1250)
  })
}

async function commitCommands(txtArr) {
  document.body.style.pointerEvents = "none"
  document.onkeydown = () => {
    return false
  }
  var inpLen = 0
  for (let i = 0; i < txtArr.length; i++) {
    switch (true) {
      case txtArr[i].toLowerCase().includes("krok"):
        input.focus()
        input.setSelectionRange(inpLen, inpLen + txtArr[i].length)
        inpLen += txtArr[i].length + 1
        var movCom = txtArr[i].split(" ")[1]
        if (movCom == undefined) {
          movCom = 1
        }
        for (x = 0; x < movCom; x++) {
          moveKarel()
          await sleepTimeout()
        }
        break
      case txtArr[i].toLowerCase().includes("vlevobok"):
        var rotCom = txtArr[i].split(" ")[1]
        input.focus()
        input.setSelectionRange(inpLen, inpLen + txtArr[i].length)
        inpLen += txtArr[i].length + 1
        if (rotCom == undefined) {
          rotCom = 1
        }
        for (x = 0; x < rotCom; x++) {
          rotateKarel(1)
          await sleepTimeout()
        }
        break
      case txtArr[i].toLowerCase().includes("poloz"):
        var blockCom = txtArr[i].split(" ")[1]
        input.focus()
        input.setSelectionRange(inpLen, inpLen + txtArr[i].length)
        inpLen += txtArr[i].length + 1
        if (blockCom == undefined) {
          await sleepTimeout()
        } else {
          placeBlock(blockCom)
          await sleepTimeout()
        }
        break
      case txtArr[i].toLowerCase().includes("reset"):
        input.focus()
        input.setSelectionRange(inpLen, inpLen + txtArr[i].length)
        inpLen += txtArr[i].length + 1
        createBoard()
        lastPosKarel = 0
        direction = 0
        createKarel()
        boardBlocks = []
        await sleepTimeout()
        break
    }
  }
  input.blur()
  document.body.style.pointerEvents = "auto"
  document.onkeydown = () => {
    return true
  }
}

var textArr = []
var text = 0
const input = document.getElementById("txt-area")
function getText() {
  text = document.getElementById("txt-area").value
  var textArr = text.split("\n")
  commitCommands(textArr)
}

var button = document.getElementsByTagName("button")[0]
button.addEventListener("click", getText)
