export interface Repertorio {
  _id: any;
  nome: string;
  private: boolean;
  descricao: string;
  curtidas: number;
  musicas_size: number;
}

export interface Pagination {
  page: number;
  rowsPerPage: number;
  isLastPage: boolean;
  isFirstPage: boolean;
  totalPages: number;
  totalItems: number;
  paginationOptions: number[];
}

export interface AddMusicaObject {
  nome: string;
  criadoPor: string;
  link_audio: string;
  links_musica: any[];
}

export interface RepertorioRequest {
  nome: string;
  login: string;
  descricao: string;
  private: boolean,
  genero: string;
  musicas: any[];
}