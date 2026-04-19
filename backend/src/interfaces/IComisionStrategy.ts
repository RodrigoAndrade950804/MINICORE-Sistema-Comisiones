// interfaces/IComisionStrategy.ts

export interface IComisionStrategy {
  calcular(monto: number): number;
  getTipo(): string;
  getRango(): string;
}