//반복문
// for in -> 객체의 프로퍼티 키 열거 전용
// for of -> 이터러블 순회 전용 -> String, Array, Map, Set, DOM컬렉션

// 배열.forEach(fn) -> 배열 순회 전용 메서드
// 배열.reduce(누적 계산값, 현재값)
// 배열.filter(fn)
// 배열.map(fn) -> 각 콜백함수에서 return하는 값들로 새로운 배열을 만들어 반환한다.

/*
결론
    1. 배열인 경우 : 배열.forEach()
    2. 객체인 경우 : Object.keys(객체) 사용
*/
Object.prototype.objCustom = function () {};
Array.prototype.arrCustom = function () {};

var iterable = [3, 5, 7];
iterable.foo = "hello";
for (var key in iterable){
    console.log(key); // 0, 1, 2, "foo", "arrCustom", "objCustom" 
}

for (var value of iterable) {
    console.log(value); // 3, 5, 7 
}
