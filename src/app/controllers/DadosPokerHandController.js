import parser from 'xml2json';
import api from '../services/api';

import DadosPokerHandService from '../services/DadosPokerHandService';

class DadosPokerHandController {
  async index(req, res) {
    const linkJogos = await DadosPokerHandService.obtemLinkJogos();
    if (!linkJogos) {
      return res.status(400).json({
        erro:
          'O site não retornou o conteudo esperado, deve estar offline ou sofreu alteração',
      });
    }

    const responseJson = [];

    for (const jogoAtual of linkJogos) {
      const subJogosJogoAtual = await DadosPokerHandService.obtemSubJogosJogoAtual(
        jogoAtual
      );

      for (const subJogoAtual of subJogosJogoAtual) {
        const [
          cookies,
        ] = await DadosPokerHandService.obtemConteudoECookiesPaginaInicial(
          jogoAtual
        );
        const [JSESSIONID] = cookies;
        const cookiesConcatenados = cookies.join(`;`);

        let [
          cookieState,
          // eslint-disable-next-line prefer-const
          linksArquivosSubJogoAtual,
        ] = await DadosPokerHandService.obtemLinksArquivosSubJogoAtual(
          subJogoAtual,
          cookiesConcatenados
        );

        for (const linkArquivoAtual of linksArquivosSubJogoAtual) {
          const cookieRequisicaoAtual = `${JSESSIONID}; ${cookieState}`;

          const link = await api.get(linkArquivoAtual, {
            headers: {
              Cookie: cookieRequisicaoAtual,
            },
          });

          const jsonAtual = parser.toJson(link.data);
          const jsonFormatado = JSON.parse(jsonAtual);
          responseJson.push(jsonFormatado);

          // eslint-disable-next-line prefer-destructuring
          cookieState = link.headers['set-cookie'][0];
        }
      }
    }
    return res.send(responseJson);
  }
}

export default new DadosPokerHandController();
