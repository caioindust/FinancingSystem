export abstract class Sistema {
    public abstract get sistema(): string;

    public get valor() : number {
      return this._valor;
    }

    public get taxaJuros() : number {
      return this._taxaJuros;
    }

    public get periodo() : number {
      return this._periodo;
    }
    
    constructor(
      private _valor: number, 
      private _taxaJuros: number,
      private _periodo: number
    ) { }
}