export class Periodo {
  constructor(
    private _index: number,
    private _saldoDevedor: number,
    private _valorParcela: number,
    private _valorJuros: number,
    private _valorAmortizacao: number
  ) {}

  public get index(): number {
    return this._index;
  }

  public get saldoDevedor(): number {
    return this._saldoDevedor;
  }

  public get valorParcela(): number {
    return this._valorParcela;
  }

  public get valorJuros(): number {
    return this._valorJuros;
  }

  public get valorAmortizacao(): number {
    return this._valorAmortizacao;
  }
}