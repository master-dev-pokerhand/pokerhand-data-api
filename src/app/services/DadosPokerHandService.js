import api from './api';

class DadosPokerHandService {
  async obtemLinkJogos() {
    const paginaInicial = await api.get('/poker-game');
    const regex = /(?<=<a href=").*?(?=">jogos)/gi;
    return this.aplicaRegexNaPagina(paginaInicial.data, regex);
  }

  async obtemLinkSubJogosJogoAtual(conteudoPagina) {
    const regex = /(?<=<a href=")\/poker-game\/arquivo\/arquivos.*?(?=">)/gi;
    return this.aplicaRegexNaPagina(conteudoPagina, regex);
  }

  async obtemLinksArquivosSubJogo(conteudoPagina) {
    const regex = /(?<=<a href=")\/poker-game\/arquivo\/arquivo.*?(?=">)/gi;
    return this.aplicaRegexNaPagina(conteudoPagina, regex);
  }

  async aplicaRegexNaPagina(conteudoPagina, regex) {
    if (!conteudoPagina || !conteudoPagina.match(regex)) {
      return null;
    }
    return (await conteudoPagina.match(regex)) || null;
  }

  async obtemConteudoECookiesPaginaInicial(url) {
    const linksSubJogosJogoAtual = await api.get(url);
    if (!linksSubJogosJogoAtual) {
      return null;
    }
    const cookies = linksSubJogosJogoAtual.headers['set-cookie'];

    return [cookies, linksSubJogosJogoAtual];
  }

  async obtemConteudoECookiesJogoAtual(url, cookie) {
    const infosSubJogoAtual = await api.get(url, {
      headers: {
        Cookie: cookie,
      },
    });

    const cookieState = infosSubJogoAtual.headers['set-cookie'][0];
    return [cookieState, infosSubJogoAtual];
  }

  async obtemSubJogosJogoAtual(jogoAtual) {
    const [
      ,
      linksSubJogosJogoAtual,
    ] = await this.obtemConteudoECookiesPaginaInicial(jogoAtual);

    if (!linksSubJogosJogoAtual) {
      return null;
    }

    const subJogosJogoAtual = await this.obtemLinkSubJogosJogoAtual(
      linksSubJogosJogoAtual.data
    );

    return subJogosJogoAtual;
  }

  async obtemLinksArquivosSubJogoAtual(subJogoAtual, cookiesConcatenados) {
    const [
      cookieState,
      infosSubJogoAtual,
    ] = await this.obtemConteudoECookiesJogoAtual(
      subJogoAtual,
      cookiesConcatenados
    );

    if (!infosSubJogoAtual) {
      return null;
    }

    const linksArquivosSubJogoAtual = await this.obtemLinksArquivosSubJogo(
      infosSubJogoAtual.data
    );

    return [cookieState, linksArquivosSubJogoAtual];
  }
}

export default new DadosPokerHandService();
