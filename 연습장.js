//반복문-----------------------------------
// for(let i = 1; i < 11; i ++){
//     console.log(i)
// }

// 선언 없이 변수를 쓰는 경우 전역변수로 생성이 된다.-----------
function foo(){
    let x = "foo";
    function bar(){
        x += 'dd'
        console.log("bar : " + x);
        x = 'feji'
    }   
    bar();
    console.log("bar2 : " + x);

}

// 배열 -----------------------------------------------------
let students = ['철수', '영희', '영수']
let arr = [ // 배열의 경우 문자 뿐 아니라 숫자, 객체, 함수 등도 포함이 가능하다.
    '민수',
    3,
    false,
    {
        name: 'Mike',
        age: 30,
    },
    function(){
        console.log('Test')
    }
]
students.push('성윤') // 파이썬의 push
console.log(students)
students.pop() // 파이썬의 pop
console.log(students)
students.unshift('성민') // 파이썬의 insert(0, 값)
console.log(students)
students.shift() // 파이썬의 deque의 popleft()
console.log(students)


// 함수 선언문 -> 어디서든 호출 가능 -> 호이스팅 기능 덕임
sayhello();
function sayhello(){
    console.log('Hello');
}

// 함수 표현문 -> 선언 이후 호출 가능--------
//say hello() -> 함수 표현문의 경우 먼저 호출이 불가능
sayhello = function(){
    console.log('Hello');
}
sayhello();

// 화살표 함수------------------------------
let add = (num1, num2) => {
    return num1 + num2;
};
console.log(add(4,6));

add = (num1, num2) => (
    num1 * num2
)
console.log(add(4,6));

add = (num1, num2) => num1 % num2
console.log(add(4,6));

// object----------------------------------
const superman = {
    name : 'clark',
    age : 33,
}
console.log(superman.name)
console.log(superman.age)
console.log(superman)
superman.haircolor = 'red'
superman['hobby'] = 'football'
delete superman.age
console.log(superman)

// for(let key in superman){
//     console.log(key)
//     console.log(superman[key]) 
//     console.log(superman.key) // 여기서 점으로 사용 불가 key라는 변수로 인식하기 때문
// }

// 객체 리터럴 -> 이 경우 안에 있는 변수들은 var나 let으로 선언을 하지 않아도 된다.
let makeObject = (name, age) => {
    return {
        name : name,
        age : age,
        hobby : 'football',
    };
}
// 축약형-----------------------------------------------
// function makeObject(name, age){
//     return {
//         name,
//         age,
//         hobby : 'football',
//     };
// }

const Mike = makeObject('Mike', 30);

for(let key in Mike){
    let result = key + '은/는 ' + Mike[key] + '입니다.'
    // result = `${key}은/는 ${Mike[key]}입니다.`
    console.log(result)
}

foo();
// console.log("global : " + x);

// 변수 호이스팅--------------------------------------
let age = 30

function showAge(){
    console.log(age)
    // let age = 20 // 문제 발생 -> 호이스팅은 스코프 단위로 일어난다.
    // 고로 여기서 선언한 age에서 호이스팅이 발생하여 TDZ에 있는 console.log(age)줄의 오류를 발생시키는 것이다.
}
showAge()

var num = 30
function showAge2(){
    console.log(num)
    var num = 10// TDZ에 구애받지 않아서 오류가 발생하지 않음
}
showAge2()

/*
var -> 함수 스코프 -> 함수 내에서만 유효
let, const -> 블록 스코프 -> 코드 블록 내에서만 유효하며 외부에서는 접근이 불가능하다.
ex) 함수, if문, for문, while문, try catch문 등

변수의 생성과정

var
1. 선언 및 초기화 단계 -> 할당 전에 호출하면 에러를 내지 않고 undified가 나온다.
2. 할당 단계
let
1. 선언 단계
2. 초기화 단계
3. 할당 단계

const
1. 선언 + 초기화 + 할당 -> 고로 선언과 동시에 할당을 해주어야 오류가 안난다.
*/

// 생성자 함수----------------------------------------
function User(name, age){ // 생성자 함수의 첫 글자는 대문자인게 관례
    // this = {} -> new를 사용하는 경우 만들어진다.

    this.name = name // 파이썬 class의 self와 비슷한 역할
    this.age = age
    this.sayName = function(){ // method
        console.log(this.name)
    }
    this.sayage = function(){
        console.log(this.age)
    }
    // return this -> new를 사용하는 경우 만들어진다.
} //

let user1 = new User('mike', 30)
let user2 = new User('Jane', 22)
let user3 = new User('Tom',17)
// new를 쓰는 경우 this = {}, 와 return이 생략되어 있다.

let user5 = new User('Han', 40)
user5.sayName()
user5.sayage()

// Computed property와 메소드 ------------------------------------
let a = 'age'
const user = {
    name : 'Mike',
    [a] : 30, // age : 30 -> Computed property
    [1 + 4] : 5,
    ['안녕' + '하세요'] : 'Hello' // 이런식으로 식을 넣는 것도 가능
}
console.log(user)

// 객체에서 사용할 수 있는 method
// Object.assign() 객체 복제-> 파이썬에서의 deepcopy느낌
const newUser = Object.assign({}, user)
newUser.name = 'Tom'
console.log(`user의 name은 ${user.name}`)
console.log(`newUser의 name은 ${newUser.name}`)

const newUser2 = Object.assign({gender : 'male'}, user)
console.log(`newUser2의 name은 ${newUser2.name}`)
console.log(newUser2)

const newUser3 = Object.assign({name : 'maelong'}, user) // 덮어쓴다.
console.log(`newUser3의 name은 ${newUser.name}`)

const user11 = {
    name : 'Mike'
}
const info1 = {
    age: 30,
}
const info2 = {
    gender : 'male',
}

const newUser11 = Object.assign(user11, info1, info2) // 여러개 병합도 가능
console.log(newUser11)

console.log(Object.keys(user))// key 배열로 반환
console.log(Object.values(user)) // value 배열로 반환
console.log(Object.entries(user)) // key, value 배열로 반환

const arr2 =
[
    ['name','mike'],
    ['age',30],
    ['gender', 'male', 4, 5], // 이런 식으로 key와 value보다 더 많은 값이 들어가면 뒤 내용은 무시
]
const newarr2 = Object.fromEntries(arr2) // key, value 배열을 객체로
console.log(newarr2)

// Symbol --------------------------------------------------------

const symbola = Symbol()  // 유일한 식별자 이며 new를 붙이지 않는다. -> 유일성 보장
const id = Symbol('id') // 안의 설명은 Symbol 생성에 어떤 영향도 미치지 않는다.
const user_symbol = {
    name : 'mike',
    age : 30,
    [id] : 'myid'
}
console.log(user_symbol)
console.log(user_symbol[id])

// 심볼이 키인 경우 아래 메소드 실행시 심볼 키는 건너 띈다.
console.log(Object.keys(user_symbol))
console.log(Object.values(user_symbol))
console.log(Object.entries(user_symbol))
var cnt = 0
for(let a in user_symbol){// symbol은 건너 뜀
    console.log(cnt ++)
}

// user_symbol.showName = function(){}
const showName = Symbol('show name')
const showName2 = Symbol('show name1')
user_symbol[showName] = function(){// 다른 사람이 만들어놓은 property를 덮어 쓸 일이 없다.
    console.log(this.name)
}
user_symbol['gender'] = 'male'
user_symbol[showName2] = 3
user_symbol[showName]()
console.log(user_symbol)
console.log(user_symbol[showName2])
// user_symbol.description // 이름을 알 수 잇음
console.log(Object.getOwnPropertySymbols(user_symbol))

// Symbol.for() -> 이름이 같으면 같은 객체를 가르켜야 할 때가 존재 -> 전역 변수와 비슷
/*
전역 심볼
하나의 심볼만 보장받을 수 있음
없으면 만들고, 있으면 가져오기 때문
Symbol 함수는 매번 다른 Symbol 값을 생성하지만,
Symbol.for 메소드는 하나를 생성한 뒤 키를 통해 같은 Symbol을 공유한다.
*/
const id1 = Symbol.for('id')
const id2 = Symbol.for('id')
console.log(id1 === id2)
console.log(Symbol.keyFor(id1))

user_symbol[id1] = 4
console.log(user_symbol)
user_symbol[id2] = 5 // 같은 심볼을 가르키면서 값을 변경함
console.log(user_symbol)

// 숫자와 수학---------------------------------------------------
// toString(n) -> n진수 string으로 반환
// Math.round(), Math.ceil(), Math.floor() -> 소숫점을 각각 반올림, 올림, 내림을 하여 숫자로 반환
// toFixed(n) -> 소숫점 n + 1자리에서 반올림하여 String으로 반환
// Number(n) -> string n을 숫자로 변환
// isNaN(x) -> x가 NaN인지 검사 -> NaN숫자가 아니다. 
let x = Number('x')
console.log(x)
console.log(isNaN(x))
// parseInt() -> 문자열을 숫자로 반환해주는데, 문자랑 혼용되어 있어도 동작을 한다.
