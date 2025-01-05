const board = document.getElementById("board")

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
function rotateKarel(direction) {
  if (direction == "") {
    direction = 0
  }
  var deg = direction * -90
  cell[lastPosKarel].style.WebkitTransform = `rotate(${deg}deg)`
  return direction
}

function moveKarel() {
  var number = 1
  cell = document.getElementsByTagName("td")
  cell[lastPosKarel].innerHTML = ""
  cell[lastPosKarel].style = "none"

  while (direction > 3) {
    direction -= 4
  }

  if (direction == "0") {
    if (lastPosKarel >= 90) {
    } else {
      lastPosKarel += 10
    }
  } else if (direction == "1") {
    if (lastPosKarel % 10 == 9) {
    } else {
      lastPosKarel += number
    }
  } else if (direction == "2") {
    if (lastPosKarel == 0) {
    } else {
      lastPosKarel -= 10
    }
  } else if (direction == "3") {
    if (lastPosKarel % 10 == 0) {
    } else {
      lastPosKarel -= number
    }
  }

  console.log(number)
  console.log(cell)
  console.log(lastPosKarel)
  cell[lastPosKarel].innerHTML = "🤖"
  rotateKarel(direction)
}

createBoard()
createKarel()

function getText() {
  var text = document.getElementById("txt-area").value
  console.log(text)
}

var button = document.getElementsByTagName("button")[0]
button.addEventListener("click", getText)

direction = rotateKarel(0)
moveKarel()
