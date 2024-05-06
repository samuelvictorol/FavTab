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
