import { expect  } from 'chai';
import { Price } from '../src/sistemas';

describe('Sistema Price', function() {

  let emprestimo1: Price = new Price(1000,0.03,4);

  it('ValorDasPrestacoes', function() {
    let result = emprestimo1.valorDasPrestacoes.toFixed(2);
    expect (result).to.equal('269.03');
  });

  it('substract', function() {
    let result = C.Difference(5, 2);
    expect (result).to.equal(3);
  });
});