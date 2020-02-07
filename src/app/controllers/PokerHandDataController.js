import parser from 'xml2json';

class PokerHandDataController {
  async index(req, res) {
    const str = '<Teste><Amigo>a</Amigo></Teste>';

    const json = parser.toJson(str);
    return res.json(json);
  }
}

export default new PokerHandDataController();
