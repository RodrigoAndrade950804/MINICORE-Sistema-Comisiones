// strategies/ComisionAlta.ts

import { IComisionStrategy } from '../interfaces/IComisionStrategy';

export class ComisionAlta implements IComisionStrategy {
  calcular(monto: number): number {
    return monto * 0.10; // 10%
  }

  getTipo(): string {
    return "Comisión Alta";
  }

  getRango(): string {
    return "$801 - $1,000";
  }
}