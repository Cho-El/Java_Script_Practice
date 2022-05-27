// DOM 선언하는 부분
const playground = document.querySelector('.playground > ul')

// Setting
const GAME_ROWS = 20
const GAME_COLS = 10

// variables
let score = 0
let duration = 500 // 떨어지는 시간
let downInterval
let tempMovingItem

const BLOCKS = {
    tree: [
        // 방향키를 돌렸을 때 변화되는 모양 4개
        [[2,1],[0,1],[1,0],[1,1]],
        [],
        [],
        [],
    ]
}
const movingItem = {
    type: 'tree',
    direction: 0,
    top: 0,
    left: 4,
}
// console.log(playground)
init()

// functions
function init(){
    tempMovingItem = {...movingItem};
    for(let i = 0; i < GAME_ROWS; i++){
        prependNewLine()
    }
    renderBlocks()
}

function prependNewLine(){
    const li = document.createElement('li')
    const ul = document.createElement('ul')
    for(let j = 0; j <GAME_COLS ; j ++){
        const matrix = document.createElement('li')
        ul.prepend(matrix)
    }
    li.prepend(ul)
    playground.prepend(li)
}

function renderBlocks(){
    const {type, direction, top, left} = tempMovingItem
    const movingBlocks = document.querySelectorAll('.moving') // 무빙 클래스를 가진 모든 것을 불러온다.
    movingBlocks.forEach(moving =>{
        moving.classList.remove(type, 'moving')
    })
    BLOCKS[type][direction].forEach(block => {
        const x = block[0] + left
        const y = block[1] + top
        const target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : null // 세로가 없는 경우
        const isAvailable = checkEmpty(target) // 가로가 없는경우
        if (isAvailable){
            target.classList.add(type, 'moving') // type을 클래스로 부여
        }
        else {
            tempMovingItem = {...movingItem}
            setTimeout(() =>{
                renderBlocks()
            }, 0)
            renderBlocks()
        }
    })
}
function checkEmpty(target){
    if(!target){
        return false
    }
    return true
}
function moveBlock(moveType, amount){
    tempMovingItem[moveType] += amount
    renderBlocks()
}

// event handling
document.addEventListener('keydown', e => {
    switch(e.keyCode){
        case 39:
            moveBlock('left',1);
            break;
        case 37:
            moveBlock('left',-1); // left
            break;
        case 40:
            moveBlock('top',1); //down
            break;
        default:
            break
    }
})