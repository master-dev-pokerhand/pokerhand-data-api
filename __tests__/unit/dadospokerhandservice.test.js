import DadosPokerHandService from '../../src/app/services/DadosPokerHandService';

describe('DadosPokerHandService', () => {
  it('Ao buscar a pagina inicial retornar conteudo', async () => {
    const response = await DadosPokerHandService.obtemLinkJogos();
    expect(response).toEqual(['/poker-game/arquivo/index']);
  });

  it('Ao buscar a pagina SubJogos do jogo atual seja retornado os links ', async () => {
    const response = await DadosPokerHandService.obtemLinkSubJogosJogoAtual(
      `    <a href="/poker-game/arquivo/arquivos?code=HH20161129">HH20161129</a>
      <br />
      
          <a href="/poker-game/arquivo/arquivos?code=HH20161127">HH20161127</a>
      <br />`
    );
    expect(response).toEqual([
      '/poker-game/arquivo/arquivos?code=HH20161129',
      '/poker-game/arquivo/arquivos?code=HH20161127',
    ]);
  });

  it('Ao buscar os links dos arquivos dos SubJogos, sejam retornados com sucesso', async () => {
    const response = await DadosPokerHandService.obtemLinksArquivosSubJogo(
      `<a href="/poker-game/arquivo/arquivo?id=SEgyMDE2MTAzMCBUMTcxMTU1ODUxNSBObyBMaW1pdCBIb2xkJ2VtICQwLDIzICsgJDAsMDIudHh0LnhtbA==">HH20161030 T1711558515 No Limit Hold&#39;em $0,23 + $0,02.txt.xml</a>
      <br/>

      <a href="/poker-game/arquivo/arquivo?id=SEgyMDE2MTAzMCBUMTcwMzIyMDM5NSBObyBMaW1pdCBIb2xkJ2VtICQwLDUwICsgJDAsMDUudHh0LnhtbA==">HH20161030 T1703220395 No Limit Hold&#39;em $0,50 + $0,05.txt.xml</a>
      <br/>`
    );
    expect(response).toEqual([
      '/poker-game/arquivo/arquivo?id=SEgyMDE2MTAzMCBUMTcxMTU1ODUxNSBObyBMaW1pdCBIb2xkJ2VtICQwLDIzICsgJDAsMDIudHh0LnhtbA==',
      '/poker-game/arquivo/arquivo?id=SEgyMDE2MTAzMCBUMTcwMzIyMDM5NSBObyBMaW1pdCBIb2xkJ2VtICQwLDUwICsgJDAsMDUudHh0LnhtbA==',
    ]);
  });
});
