"use strict";

import React, { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import { _mockedGridData } from "../../../data/_mockedGridData";

const AGGrid = () => {
  const gridRef = useRef();

  const [isThemeSet, setIsThemeSet] = useState(true);

  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: 500, width: "100%" }), []);
  const [rowData, setRowData] = useState();

  const getRowStyle = (params) => {
    console.log("params >> ", params);

    return { background: "#ccc" };
  };

  const [columnDefs, setColumnDefs] = useState([
    {
      field: "country",
      // rowGroup: true,
      // hide: false,
    },

    { field: "year", sortable: false },
    { field: "athlete" },
    { field: "sport" },
    { field: "silver" },
    { field: "bronze" },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      sortable: true,
      filter: true,
      resizable: true,
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

  function onBtDelete() {
    var api = gridRef.current.api;
    var selectedRows = api.getSelectedRows();
    if (!selectedRows || selectedRows.length === 0) {
      console.log(">> No rows selected!");
      return;
    }
    api.applyTransaction({ remove: selectedRows });
  }

  function onBtnUpdateCountry() {
    var api = gridRef.current.api;
    var selectedRows = api.getSelectedRows();
    if (!selectedRows || selectedRows.length === 0) {
      console.log("No rows selected!");
      return;
    }

    selectedRows.forEach(function (item) {
      item.country = "AAAA";
    });
    api.applyTransaction({ update: selectedRows });
  }

  function onBtClearSelection() {
    gridRef.current.api.deselectAll();
  }

  function getContextMenuItems() {
    var result = [
      {
        name: "Csv Export",
        subMenu: [
          // "csvExport", // default Export-Csv option
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
          // "excelExport", // default Export-Excel option
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

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById("filter-text-box").value
    );
  }, []);

  return (
    <div style={containerStyle}>
      <div
        style={gridStyle}
        // className={isThemeSet ? "ag-theme-alpine-dark" : "ag-theme-alpine"}
        className={"ag-theme-alpine"}
      >
        <button
          style={{ margin: 10, padding: 5 }}
          onClick={() => {
            onBtDelete();
          }}
        >
          Delete
        </button>

        <button
          style={{ margin: 10, padding: 5 }}
          onClick={() => {
            onBtnUpdateCountry();
          }}
        >
          Updated Country to AAAAA
        </button>

        <button
          style={{ margin: 10, padding: 5 }}
          onClick={() => {
            onBtClearSelection();
          }}
        >
          Clear All
        </button>

        <button
          style={{ margin: 10, padding: 5 }}
          onClick={() => {
            const factory = gridRef.current.api.contextMenuFactory;
            // factory.getMenuItems = () => getContextMenuItems(); // must override this method otherwise wont work
            factory.showMenu(
              gridRef.current.node ?? {},
              gridRef.current.column ?? {},
              gridRef.current.value ?? {},
              gridRef.current.event ?? {}
            );
          }}
        >
          Custom-Export Button
        </button>

        <button
          style={{ margin: 10, padding: 5 }}
          onClick={() => {
            setIsThemeSet(!isThemeSet);
            var rowNode1 = gridRef.current.api.getDisplayedRowAtIndex(4);
            // var rowNode2 = gridRef.current.api.getDisplayedRowAtIndex(5);

            // flash whole row, so leave column selection out
            gridRef.current.api.flashCells({
              rowNodes: [rowNode1],
            });
          }}
        >
          flash 4
        </button>

        <input
          type="text"
          id="filter-text-box"
          placeholder="Filter..."
          onInput={onFilterTextBoxChanged}
        />

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
          getRowStyle={getRowStyle}
        ></AgGridReact>
      </div>
    </div>
  );
};

export default AGGrid;
