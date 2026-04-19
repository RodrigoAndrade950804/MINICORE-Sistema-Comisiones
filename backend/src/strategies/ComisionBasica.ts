// strategies/ComisionBasica.ts

import { IComisionStrategy } from '../interfaces/IComisionStrategy';

export class ComisionBasica implements IComisionStrategy {
  calcular(monto: number): number {
    return monto * 0.06; // 6%
  }

  getTipo(): string {
    return "Comisión Básica";
  }

  getRango(): string {
    return "$0 - $600";
  }
}