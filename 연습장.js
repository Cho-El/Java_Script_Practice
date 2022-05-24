//반복문------------------------------------------------------
// for(let i = 1; i < 11; i ++){
//     console.log(i)
// }

// 선언 없이 변수를 쓰는 경우 전역변수로 생성이 된다.------------
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

// 배열 ------------------------------------------------------
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

// 함수 표현문 -> 선언 이후 호출 가능---------------------------
//say hello() -> 함수 표현문의 경우 먼저 호출이 불가능
sayhello = function(){
    console.log('Hello');
}
sayhello();

// 화살표 함수------------------------------------------------
let add = (num1, num2) => {
    return num1 + num2;
};
console.log(add(4,6));

add = (num1, num2) => (
    num1 * num2
)// 중괄호를 일반괄호로 바꿔주므로써 return문을 생략 가능하다.
console.log(add(4,6));

add = (num1, num2) => num1 % num2
console.log(add(4,6));

// object----------------------------------------------------
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
// 축약형-----------------------------------------------------
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

// 변수 호이스팅----------------------------------------------
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
const newUser = Object.assign({}, user) // {} -> 초기 값, 여기dp user를 병합
newUser.name = 'Tom'
console.log(`user의 name은 ${user.name}`)
console.log(`newUser의 name은 ${newUser.name}`)
console.log(newUser)

const newUser2 = Object.assign({gender : 'male'}, user)
console.log(`newUser2의 name은 ${newUser2.name}`)
console.log(newUser2)

const newUser3 = Object.assign({name : 'maelong'}, user) // 덮어쓴다.
console.log(`newUser3의 name은 ${newUser3.name}`)
console.log(newUser3)


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

// 문자열 메소드 -------------------------------------------------
let str = 'abCdEfg'
str.length // 길이
str.toUpperCase() // str을 바꿔주진 않음 대문자로 바꾼 값을 반환
str.toLowerCase()
console.log(str)
str.indexOf('a')
// indexof를 통해 if문 사용시 주의 사항
if(str.indexOf('a') > -1){ // 반환 값이 0이 되므로 if문이 실행되지 않을 수 있으므로 기준은 -1로
    console.log('a가 포함된 문장입니다.')
}
// str.slice(n,m) // n부터 m-1 인덱스 까지 반환, 값이 한개 있는경우 그 숫자부터 끝까지
// str.substring(n,m) // n과 m-1 인덱스의 문자열 반환 하며, 순서를 바꿔도 같은 방식으로 동작, 음수는 0으로 인식
// str.substr(n,m) // n인덱스부터 m개 반환
// str.trim() // 앞 뒤 공백 제거
// str.repeat(n) // 문자열을 n번 반복

function hasCola(str){
    if(str.indexOf('콜라') > -1){
        console.log('금칙어 존재')
    }
    else{
        console.log('통과')
    }
}
// 배열 메소드 ---------------------------------------------------
//arr.splice(n,m) -> n인덱스부터 m개를 지운다.
//arr.splice(n,m,x1,x2) -> n인덱스부터 m개를 지운 후 그 자리에 x1과 x2를 집어넣는다.
let arr3 = [1,2,3,4,5]
let result2 = arr3.splice(1,2)
console.log(arr3)
console.log(result2)
//arr.slice(n,m) -> n부터 m까지 반환 파이썬의 slice랑 같다
//arr.concat(arr2, arr3) -> arr에 arr2와 arr3를 합쳐서 새배열로 반환
//arr.forEach(fn) : 배열 반복
let arr4 = ['mike', 'tom','jane']
arr.forEach((name, index) => {// 반복문
    console.log(`${index}, ${name}`)
})
//arr.indexOf(n,m) // index m부터 n을 탐색
//arr.lastIndexOf(n) // 마지막으로 n이 발견되는 index를 반환
//arr.includes(n) // n을 포함하고 있는지를 확인 false나 true를 반환
//arr.find(fn) // 첫번 째 true값을 반환하고 없는 경우 undefined를 반환(하나만 찾는다.)
//arr.findIndex(fn) // 
let arr5 = [1,2,3,4,5]
const result = arr.find((item) => {
    return item % 2 === 0 // 이 값이 트루일 때 멈춘다.
})
console.log(arr5[0] % 2 === 0)

let userlist = [
    {name: 'mike', age: 30},
    {name: 'elice', age: 20},
    {name: 'tom', age: 10},
]

const result3 = userlist.find((user) => {
    if (user.age < 19){
        return true
    }
    return false
})

console.log(result3)
//arr.filter(fn) // fn조건을 만족하는 여러 개의 요소를 배열로 반환
// const result3 = userlist.filter((user) => {
//     if (user.age < 19){
//         return true
//     }
//     return false
// })
// arr.reverse() // 배열을 역순으로 재정렬
// arr.map(fn) // 함수를 받아 특정 기능을 시행하고 새로운 배열을 반환한다.
let newuserlist = userlist.map((user,index) => {
    return Object.assign({}, user, {
        id: index + 1,
        isAdult: user.age > 19,
    })
})
// arr.join(' ')
// arr.split(',')
// arr.isArray() -> 배열인지 확인하기 위해서는 써야한다. 객체로 뜸 typeof 쓰면
console.log(newuserlist)
//arr.sort() -> a,b 두개의 원소를 파라미터로 입력받는 경우, 함수가 리턴하는 값이 0보다 작으면
// a가 b보다 앞에 오도록 정렬, 클 경우 b가 앞에 오도록 정렬
let arr6 = [13,5,4,2,3]
arr6.sort()
console.log(arr6)// 잘못나오는 이유는 문자열로 들어갔기 때문
arr6.sort((a,b) => a-b)
console.log(arr6)
// user_symbol.sortBy()
// reduce (누적 계산값, 현재값) = {return 계산값}
let arr7 = [1,2,3,4,5]
let result4 = 0
arr7.forEach((num) => {
    result4 += num
})
console.log(result4)
result4 = arr7.reduce((prev,cur) => {
    return prev + cur
}, 0)// 초기 값 0

result4 = userlist.reduce((prev, cur) => {
    if (cur.age > 19){
        prev.push(cur.name)
    }
    return prev
}, [])

// 구조 분해 할당 ---------------------------------------------------
// a = [1,2,3]
// let [u1,u2,u3]= a
// console.log(u1,u2,u3)
let a1 = 1;
let b1 = 2;
[a1, b1] = [b1, a1]
console.log(a1,b1)
// a1 = {
//     type : 'english',
//     age: 15,
// };
// const {type, age} = a1;
// console.log(type);
// console.log(age);

// 나머지 매개변수, 전개 구문 ----------------------------------------
function add2(...nums){// 나머지 매개변수 파이썬의 *arg, **kwargs와 비슷
    let result = 0;
    nums.forEach((num) => (result += num))
    //nums.reduce((prev, cur) => prev + cur)
    console.log(result)
}
add2(1,2,3)
add2(1,2,3,4,5,6,7)

function User6(name, age, ...skill){// 마지막에 있어야한다. 나머지 매개변수는
    this.name = name;
    this.age = age;
    this.skill = skill;
}

const u1 = new User6('mike',3,'fejife',';232','fji')
console.log(u1['skill'][0])

// 전개 구문 : 배열 -> 쓰지 않는 경우 합칠 때 Object assign을 쓰자
let array1 = [1,2,3]
let array2 = [4,5,6]
result4 = [0,...array1, ...array2,7,8,9]
console.log(result)