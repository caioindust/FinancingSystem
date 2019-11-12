import { Periodo } from './../models';
import { Sistema } from './../sistema';

export class Price extends Sistema {
  public get sistema(): string {
    return 'Price';
  };

  private _valorPrestacao: number = 0;
  public get valorDasPrestacoes() : number {
    return this._valorPrestacao;
  }

  private _tabela: Periodo[] = [];
  public get tabela(): Periodo[] {
    return this._tabela;
  }

  constructor(
    valor: number, 
    taxaJuros: number,
    periodo: number
  ) {    
    super(valor, taxaJuros, periodo);
    this.Init();
  }

  private Init() {
    this._valorPrestacao = this.valor * this.FRC(this.taxaJuros, this.periodo);

    for(let t = 0; t<= this.periodo; t++) {
      this._tabela.push(
        new Periodo(
          t,
          this.ValorSaldoDevedorNoPeriodoT(t),
          (t==0 ? 0: this._valorPrestacao),
          (t==0 ? 0: this.ValorParcelaDeJurosDoPeridoT(t)),
          (t==0 ? 0: this.ValorDaParcelaDeAmortizacaoDoPeriodoT(t))
        )
      )
    }
  }

  public ValorSaldoDevedorNoPeriodoT(t: number) : number {
    return this._valorPrestacao * this.FVA(this.taxaJuros, this.periodo - t);
  }

  public ValorSaldoDevedorNoPeriodoTMenosUm(t: number) : number {
    return this.ValorSaldoDevedorNoPeriodoT(t-1);
  }

  public ValorParcelaDeJurosDoPeridoT(t: number) : number {    
    return this.taxaJuros * this.ValorSaldoDevedorNoPeriodoTMenosUm(t);
  }

  public ValorDaPrimeiraAmortizacao() : number {    
    return this._valorPrestacao - this.taxaJuros * this.ValorSaldoDevedorNoPeriodoT(0);
  }

  public ValorDaParcelaDeAmortizacaoDoPeriodoT(t: number) : number {    
    return this.ValorDaPrimeiraAmortizacao() * Math.pow(1 + this.taxaJuros, t - 1);
  }

  public ValorDasAmortizacoesAcumutadasAteOPeriodoT(t: number) : number {
    return this._valorPrestacao * (this.FVA(this.taxaJuros,this.periodo ) - this.FVA(this.taxaJuros,this.periodo - t));
  }

  public ValorDasAmortizacoesAcumutadasEntreOPeriodoTeK(t: number, k: number) : number {
    return this._valorPrestacao * (this.FVA(this.taxaJuros,this.periodo - t ) - this.FVA(this.taxaJuros,this.periodo - t - k));
  }
     
  public ValorDoJurosAcumuladosAteOPeriodoT(t: number): number {
    // Validar com o Claudio essa formula
    //return this._valorPrestacao * (t - this.FVA(this.taxaJuros,this.periodo ) - this.FVA(this.taxaJuros,this.periodo - t));
    return this._valorPrestacao * (t - (this.FVA(this.taxaJuros,this.periodo ) - this.FVA(this.taxaJuros,this.periodo - t)));
  }

  public ValorDoJurosAcumuladosEntreOPeriodoTeK(t: number, k: number): number {    
    return this._valorPrestacao * k - this.ValorDasAmortizacoesAcumutadasEntreOPeriodoTeK(t,k);
  }

  // Fator de Recuperação de Capital 
  private FRC(taxaJuros: number, periodo: number): number {
    let fator = this.Fator(taxaJuros,periodo)
    return (fator * taxaJuros) / (fator - 1);
  }

  // Fator de valor atual de uma série de pagamentos
  private FVA(taxaJuros: number, periodo: number): number {
    let fator = this.Fator(taxaJuros,periodo)
    return (fator - 1) / (fator * taxaJuros);
  }

  // Validar o nome desse metodo
  private Fator(taxaJuros: number, periodo: number): number {
    return  Math.pow((1 + taxaJuros),periodo);
  }
}