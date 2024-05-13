export interface Songlist {
  id: any;
  nome: string;
  private: boolean;
  descricao: string;
  avaliacao: number;
}

export interface Pagination {
  page: number;
  rowsPerPage: number;
  isLastPage: boolean;
  isFirstPage: boolean;
  totalItems: number;
  paginationOptions: number[];
}

export interface AddMusicaObject {
  nome: string;
  descricao: string;
  linkAudio: string;
  genero: string;
  cifras: any[];
}

export interface RepertorioRequest {
  nome: string;
  descricao: string;
  privado: boolean,
  genero: string;
  musicas: any[];
}