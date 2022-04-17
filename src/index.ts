//console.log('Starting');

//setTimeout(() => {
 // console.log('Two seconds have passed');
//}, 2000);

//setTimeout(() => {
  //console.log('Zero seconds have passed');
//}, 0);

// console.log('Finishing');

const printDetails = (details: string[]) => {
  details.forEach((detail) => {
    console.log(detail);
  });
};

const details = ['Daniele', 'Vitale', 'Alumno'];

printDetails(details);

const add = (firstNumber: number, secondNumber: number): number => {
  return firstNumber + secondNumber;
};

const sum = add(3, 4);

console.log(sum);
