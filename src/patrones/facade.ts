// class ProductLibrary {
//   public simpleProduct(a: number = 0, b: number = 0): number {
//     return a * b;
//   }

//   public complexProduct(...numbers: number[]): number {
//     return numbers.reduce((acc, result) => acc * result);
//   }
// }

// class AdditionalLibrary {
//   public simpleAddition(a: number = 0, b: number = 0): number {
//     return a + b;
//   }

//   public complexAddition(...numbers: number[]): number {
//     return numbers.reduce((acc, result) => acc + result);
//   }
// }

// class Facade {
//   constructor(protected productLibrary: ProductLibrary, protected additionalLibrary: AdditionalLibrary) {}

//   public powAndAdd(base: number, power: number, deltas: number[]) {
//     const myNumbers: number[] = [];

//     for (let i = 0; i < power; i++) {
//       myNumbers.push(base);
//     }
//     return this.productLibrary.complexProduct(...myNumbers) + this.additionalLibrary.complexAddition(...deltas);
//   }
// }

// function clientCode(facade: Facade) {
//   console.log(facade.powAndAdd(3, 5, [1, 2, 3]));
// }

// clientCode(new Facade(new ProductLibrary(), new AdditionalLibrary()));