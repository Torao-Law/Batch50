// const digits = [1, 2, 3, 4, 5];
// function Increase1(array) {
//     for (let i = 10; i > array.length; i--) {
//         console.log(array[i]);
//     }
// }
// Increase1(digits);

// // melakuka iterasi pada setiap element sebuah array
// digits.forEach((data) => {
//   console.log(data * 2)
// })

// console.log(digits);


// const namafunction = () => { }

// mop()
// digits.map(function (data) {
//   console.log(digits)
//   console.log(data * 2)
// })
// const double = digits.map(function (data) {
//   return data * 2
// })
// console.log(digits);
// console.log(double);


// fitler
// const digits = [1, 2, 3, 4, 5];
// const oddArray = digits.filter(digits => digits % 2 == 0)
// console.log(oddArray);

// const digits = [1, 2, 3, 4, 5];

// const reduce = digits.reduce((prev, current) => prev + current)
// console.log(reduce);


// custom hof
// function multiple(data) {
//   return function (x) {
//     console.log(data, x);
//     return data * x
//   }
// }

// const data = multiple(5)
// console.log(data(10))


// callback ?

// function hello() {
//   return "Hello world"
// }


// function sayHello(name, callback) {
//   return `${name} ${callback()}`
// }

// console.log(sayHello("Maruli", hello));


// custom hof with callback
// function number(a) {
//   console.log(`Ini nomor ke ${a}`)
// }

// function repeat(num, action) {
//   for(let i = 0; i <= num; i++) {
//     action(i)
//   }
// }

// repeat(3, number)