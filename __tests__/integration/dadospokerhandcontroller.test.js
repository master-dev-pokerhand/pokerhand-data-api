import request from 'supertest';
import app from '../../src/app';

describe('DadosPokerHand', () => {
  it('Ao acessar o site obtemos uma resposta', async () => {
    const response = await request(app).get('/dados-pokerhand');
    expect(response).not.toBeNull();
  }, 1000000000);
});
