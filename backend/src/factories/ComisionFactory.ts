// factories/ComisionFactory.ts

import { IComisionStrategy } from '../interfaces/IComisionStrategy';
import { ComisionBasica } from '../strategies/ComisionBasica';
import { ComisionMedia } from '../strategies/ComisionMedia';
import { ComisionAlta } from '../strategies/ComisionAlta';
import { ComisionPremium } from '../strategies/ComisionPremium';

export class ComisionFactory {
  // Crea estrategia segun sumatoria mensual de ventas
  static crearEstrategia(montoTotal: number): IComisionStrategy {
    if (montoTotal <= 600) {
      return new ComisionBasica();
    } else if (montoTotal <= 800) {
      return new ComisionMedia();
    } else if (montoTotal <= 1000) {
      return new ComisionAlta();
    } else {
      return new ComisionPremium();
    }
  }
}