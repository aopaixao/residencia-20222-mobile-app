export type DadosLivroType = {
  codigoLivro: number,
  nomeLivro: string,
  dataLancamento: string,
  codigoIsbn: number,
  nomeImagem: string,
  nomeArquivoImagem: string,
  urlImagem: string,
  editora: {
    codigoEditora: number,
    nomeEditora: string,
  },
  autor: {
    codigoAutor: number,
    nomeAutor: string
  }
}