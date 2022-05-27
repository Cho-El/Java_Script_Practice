// 클로저 ----------------------------------------------------
// 함수와 렉시컬 환경의 조합

// setTimeout, setInterval------------------------------------
// setTimeout(function(){
//     console.log(3)
// }, 3000) // 3000 은 3000ms 3초를 의미한다. 이 값을 0이라고 적어도 바로 실행되지 않는다.

// let num = 0;
// function showTime(){
//     console.log(`안녕하세요 접속하신지 ${num++}초가 지났습니다.`);
//     if (num >5){
//         clearInterval(tId)
//     }
// }
// const tId = setInterval(showTime, 1000);// setInterval은 계속 반복한다. id를 반환한다.

// function showName(name){
//     console.log(name)
// }
// const tId2 = setTimeout(showName, 3000, 'mike')
// clearTimeout(tId2)

// call, apply, bind 모두 다 this와 연관------------------------
let mike = {
    name : 'mike'
}
let tom = {
    name: 'tom'
}

function showThisName(){
    console.log(this.name)
}
function update(birthYear, occupation){
    this.birthYear = birthYear
    this.occupation = occupation
}

mike['gender'] = 'male'
mike.gender = 'male'
update.call(mike, 1999, 'singer') // call은 this를 특정값으로 지정할 수 있다.
console.log(mike)
delete mike.gender
console.log(mike)
update.call(tom, 2002, 'teacher')
console.log(tom)

// apply call과 처리하는 방법을 제외하면 모두 같지만, 매개변수를 배열로 받는다.
let nums = [3,10,1,6,4]
let minNum = Math.min(...nums)
let maxNum = Math.max(...nums)
console.log(minNum)
console.log(maxNum)
//call
minNum = Math.min.call(null, ...nums)
maxNum = Math.max.call(null, ...nums)
console.log(minNum)
console.log(maxNum)
//apply
minNum = Math.min.apply(null, nums)
maxNum = Math.max.apply(null, nums)
console.log(minNum)
console.log(maxNum)

// bind 함수의 this값을 영구히 바꿀 수 있습니다.
let updateMike = update.bind(mike)
updateMike(1980, 'police')
console.log(mike)

// 프로토타입---------------------------------------------------
let car = {
    wheels: 4,
    drive(){
        console.log('drive..')
    },
}
let bmw = {
    color: 'red',
    navigation : 1,
}

let benz = {
    color: 'black',
}


let audi = {
    color: 'blue',
}
bmw.__proto__ = car // bmw는 car의 상속을 받는다. -> prototype chain
benz.__proto__ = car
audi.__proto__ = car
console.log(bmw)
console.log(bmw.wheels)

let x5 = {
    color: 'white',
    name: 'x5',
}
x5.__proto__ = bmw
for(p in x5){
    console.log(p)
}
for(p in x5){
    if (x5.hasOwnProperty(p)){// 객체가 직접 가지고 있는 것만 판별
        console.log('o',p)
    }
    else {
        console.log('x',p)
    }
}

// 생성자 함수를 이용한 프로토타입
// 첫번째 방법
let Bmw = function (color) {
    this.color = color
}

// x5 = new Bmw('red')
// z4 = new Bmw('blue')

// x5.__proto__ = car
// z4.__proto__ = car

// for(p in x5){
//     console.log(p)
// }
// for(p in z4){
//     console.log(p)
// }
// 두번째 방법

Bmw.prototype.wheels = 4
Bmw.prototype.drive = function(){
    console.log('drive..')
}

// Bmw.prototype = {
// 이 방식은 constructor가 사라지므로 construct를 수동으로 추가해주거나 하나씩 프로퍼티를 추가해주는 게 좋다
//     constructor : Bmw,
//     wheels : 4,
//     drive(){
//         console.log('drive..')
//     },
//     navigation : 1
// }
x5 = new Bmw('red')
z4 = new Bmw('blue')

for(p in x5){
    console.log(p)
}
for(p in z4){
    console.log(p)
}
// instanceof -> 생성자와 인스턴스의 관계를 보고 true나 false를 반환해준다.
console.log(z4 instanceof Bmw)
console.log(z4.constructor === Bmw)

console.log(z4.constructor)
console.log(Bmw)

// 클로저의 활용을 통해 색깔 고정-------------------------------
Bmw = function (color) {
    const c = color
    this.getColor = function() {
        console.log(c)
    }
}

x5 = new Bmw('red')
x5.getColor()

// 클래스와 상속-----------------------------------------------
class User {
    constructor(name, age){ // 파이썬의 __init__과 비슷 -> 객체를 만들어주는 생성자 매소드
    // new를 통해 호출하면 자동으로 실행된다.
        this.name = name
        this.age = age
    }
    showName(){ // class 내에 정의된 메소드는 User의 프로토타입에 저장된다.
        console.log(this.name)
    }
}
tom = new User('Tom',19) // 클래스는 new없이 실행 불가능하다.

for(const p in tom){// for in 문에서 클래스의 메소드는 제외된다.
    console.log(p)
}

// extends

// 생성자 오버라이딩
class Car { // {}
    constructor(color){
        this.color = color
        this.wheels = 4
    }
    drive(){
        console.log('drive..')
    }
    stop(){
        console.log('stop')
    }
}

class Bmw1 extends Car { // extends로 이루어지는 자식 클래스는 빈 객체를 만들어주고, this를 할당하는 것을 건너 뛴다.
    constructor(color){
        super(color) // 부모 클래스의 constructor를 실행시켜준다, 인수도 받아야한다.
        this.navigation = 1
    }
    park(){
        console.log('park')
    }
}

z4 =  new Bmw1('blue')

// Promise --------------------------------------------------
let pr = new Promise((resolve, reject) => {// resolve는 성공했을 때, reject는 실패했을 때 실행되는 함수
// 어떤 일이 완료된 뒤 실행되는 함수를 callback 함수라고 한다.
    setTimeout(() => {
        // resolve('OK')
        reject(new Error('error...'))
    }, 2000)
})
// pr.then(
//     function(result){ // 이행 되었을 때 실행
//         console.log(result + '가지러 가자.')
//     },
//     function(err){ // 거부 되었을 때 실행
//         console.log('다시 주문해주세요..')
//     }
// )
// catch와 finally를 이용한 방식 이 방식이 더 가독성도 좋고, then함수가 실행되었을 때 에러가 나는 경우도 잡아준다.
pr.then(
    function(result){ // 이행 되었을 때 실행
        console.log(result + '가지러 가자.')
    }
).catch(
    function(err){ // 거부 되었을 때 실행
        console.log('다시 주문해주세요..')
    }
).finally( // 이행 되든 안되든 무조건 실행하는 함수 로딩함수를 없앨 때 사용
    function(){
        console.log('----주문 끝 ----')
    }
)

const movingItem = {
    type: 'tree',
    direction: 0,
    top: 0,
    left: 0,
}
const movingItem2 = {
    type: 'tree',
    direction: 0,
    top: 0,
    left: 0,
}