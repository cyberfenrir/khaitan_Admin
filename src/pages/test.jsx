import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const ReusableTable = ({ columnDefs, rowData, paginationPageSize = 5, height = 400 }) => {
  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    resizable: true,
  }), []);

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div 
        className="ag-theme-alpine" 
        style={{ height: height, width: '100%' }}
      >
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={paginationPageSize}
        />
      </div>
    </div>
  );
};

ReusableTable.propTypes = {
  columnDefs: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowData: PropTypes.arrayOf(PropTypes.object).isRequired,
  paginationPageSize: PropTypes.number,
  height: PropTypes.number,
};

export default ReusableTable;