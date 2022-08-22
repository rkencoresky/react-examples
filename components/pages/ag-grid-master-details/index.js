"use strict";

import React, { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import { _mockedGridData } from "../../../data/_mockedGridData";

const AGGrid = () => {
  const gridRef = useRef();

  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: 500, width: "100%" }), []);
  const [rowData, setRowData] = useState();

  const [columnDefs, setColumnDefs] = useState([
    {
      field: "country",
      rowGroup: true,
      hide: false,
    },
    { field: "year", sortable: false },
    { field: "athlete" },
  ]);

  const detailCellRendererParams = useMemo(() => {
    return {
      detailGridOptions: {
        columnDefs: [
          { field: "sport" },
          { field: "gold" },
          { field: "silver" },
          { field: "bronze" },
        ],
        defaultColDef: {
          flex: 1,
          editable: true,
        },
        onCellEditingStopped: (value) => console.log(value),
      },
      getDetailRowData: (params) => {
        const { age, athlete, country, date, ...rest } = params.data;
        params.successCallback([rest]);
      },
    };
  }, []);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      sortable: true,
      filter: true,
      resizable: true,
      editable: true,
    };
  }, []);
  const autoGroupColumnDef = useMemo(() => {
    return {
      headerName: "Athlete",
      headerCheckboxSelection: true,
      field: "athlete",
      minWidth: 250,
      cellRenderer: "agGroupCellRenderer",
      cellRendererParams: {
        checkbox: true,
      },
    };
  }, []);

  const onGridReady = useCallback((params) => {
    setRowData(_mockedGridData);
  }, []);

  function getContextMenuItems() {
    var result = [
      {
        name: "Csv Export",
        subMenu: [
          {
            name: "Selected",
            action: () => {
              onBtnExportToCsv();
            },
          },
          {
            name: "All",
            action: () => {
              onBtnExportToCsv(true);
            },
          },
        ],
      },
      {
        name: "Excel Export",
        subMenu: [
          {
            name: "Selected",
            action: () => {
              onBtnExportToExcel();
            },
          },
          {
            name: "All",
            action: () => {
              onBtnExportToExcel(true);
            },
          },
        ],
      },
    ];
    return result;
  }

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className={"ag-theme-alpine"}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          autoGroupColumnDef={autoGroupColumnDef}
          animateRows={true}
          onGridReady={onGridReady}
          rowSelection="multiple"
          groupSelectsChildren={true}
          suppressRowClickSelection={true}
          suppressAggFuncInHeader={true}
          rememberGroupStateWhenNewData={true}
          getContextMenuItems={getContextMenuItems}
          masterDetail={true}
          detailCellRendererParams={detailCellRendererParams}
          onRowEditingStopped={console.log}
          onCellEditingStopped={console.log}
          detailRowHeight={200}
          onCellValueChanged={console.log}
        />
      </div>
    </div>
  );
};

export default AGGrid;
