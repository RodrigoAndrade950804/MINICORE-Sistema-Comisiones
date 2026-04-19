// strategies/ComisionPremium.ts

import { IComisionStrategy } from '../interfaces/IComisionStrategy';

export class ComisionPremium implements IComisionStrategy {
  calcular(monto: number): number {
    return monto * 0.15; // 15%
  }

  getTipo(): string {
    return "Comisión Premium";
  }

  getRango(): string {
    return "$1,000+";
  }
}