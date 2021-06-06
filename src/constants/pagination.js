export const LIMIT = 10;

export const ROWS_PER_PAGE_OPTIONS = [5, 10, 15];

export const SORT_ASC = 1;
export const SORT_DESC = -1;

export const SORT_BY_ID = "id";
export const SORT_BY_CREATED_AT = "createdAt";
export const SORT_BY_UPDATED_AT = "updatedAt";

export const DEFAULT_PAGING = {
  totalRecords: 0,
  page: 0,
  limit: LIMIT,
  first: 0,
  sortField: SORT_BY_CREATED_AT,
  sortOrder: SORT_DESC, // -1: DESC, 1: ASC
  rowsPerPageOptions: ROWS_PER_PAGE_OPTIONS,
};
