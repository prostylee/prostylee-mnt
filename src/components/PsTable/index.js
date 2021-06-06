import React from 'react';
import {DataTable} from 'primereact/datatable';
import {useTranslation} from 'react-i18next';
import PropTypes from 'prop-types';

const PsTable = React.forwardRef((props, ref) => {

  const [t] = useTranslation();
  const {pagination, ...otherProps} = props;

  const onPage = (event) => {
    const pg = {
      ...pagination,
      first: event.first,
      page: event.page,
      limit: event.rows
    };
    if (props.pageHandler) {
      props.pageHandler(pg);
    }
  };

  const onSort = (event) => {
    const pg = {
      ...pagination,
      sortField: event.sortField,
      sortOrder: event.sortOrder
    };
    if (props.sortHandler) {
      props.sortHandler(pg);
    }
  };

  return (
    <DataTable ref={ref} className="datatable-responsive"
               dataKey="id"
               paginator={true}
               lazy={true}
               loading={false}
               rows={pagination.limit}
               totalRecords={pagination.totalRecords}
               first={pagination.first}
               sortField={pagination.sortField}
               sortOrder={pagination.sortOrder}
               rowsPerPageOptions={pagination.rowsPerPageOptions}
               paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
               currentPageReportTemplate={t('pagination.currentPageReportTemplate')}
               emptyMessage={t('label.emptyMessage')}
               onPage={onPage}
               onSort={onSort}
               {...otherProps}
    >
      {props.children}
    </DataTable>
  );
});

PsTable.propTypes = {
  sortHandler: PropTypes.func,
  pageHandler: PropTypes.func,
  pagination: PropTypes.object,
};

export default PsTable;
