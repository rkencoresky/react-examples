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
      // ignore search filter
      // getQuickFilterText: (params) => {
      //   return "";
      // },
    },
    { field: "year", sortable: false },
    { field: "athlete" },
    { field: "sport" },

    { field: "year", sortable: false },
    { field: "athlete" },
    { field: "sport" },

    { field: "year", sortable: false },
    { field: "athlete" },
    { field: "sport" },
    { field: "year", sortable: false },
    { field: "athlete" },
    { field: "sport" },
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
    // fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
    //   .then((resp) => resp.json())
    //   .then((data) => setRowData(data));

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
    // api.updateRowData({ update: selectedRows });

    // OR-Another Approach for update
    // var updatedItems = [];
    // selectedRows.forEach(function (oldItem) {
    //   oldItem.country = "AAA";
    //   updatedItems.push(oldItem);
    // });
    // api.applyTransaction({ update: updatedItems });

    // api.deselectAll();
  }

  function onBtClearSelection() {
    gridRef.current.api.deselectAll();
  }

  function onBtnExportToCsv(isExportAll = false) {
    var api = gridRef.current.api;

    if (isExportAll) {
      api.exportDataAsCsv();
    } else {
      var selectedRows = api.getSelectedRows();
      if (!selectedRows || selectedRows.length === 0) {
        window.alert("No Items selected ");
        return;
      }
      api.exportDataAsCsv({ onlySelected: true });
    }
  }

  function onBtnExportToExcel(isExportAll = false) {
    var api = gridRef.current.api;

    if (isExportAll) {
      api.exportDataAsExcel();
    } else {
      var selectedRows = api.getSelectedRows();
      if (!selectedRows || selectedRows.length === 0) {
        window.alert("No Items selected ");
        return;
      }
      api.exportDataAsExcel({ onlySelected: true });
    }
  }

  //  for option icon
  function createFlagImg(flag) {
    return (
      '<img border="0" width="15" height="10" src="https://flags.fmcdn.net/data/flags/mini/' +
      flag +
      '.png"/>'
    );
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

  function sortByAthleteDesc() {
    var api = gridRef.current;
    api.columnApi.applyColumnState({
      state: [{ colId: "athlete", sort: "desc" }],
      defaultState: { sort: null },
    });

    api.columnApi.applyColumnState({
      state: [{ colId: "athlete", sort: "asc" }],
      defaultState: { sort: null },
    });
  }

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById("filter-text-box").value
    );

    // gridRef.current.api.setQuickFilter(
    //   " Sushil " + document.getElementById("filter-text-box").value
    // );
  }, []);

  console.log(
    "call edit >> ",
    gridRef?.current?.columnApi?.getColumn("bronze").visible
  );

  // console.log(
  //   "call row >> ",
  //   gridRef?.current?.columnApi?.getColumn("bronze").visible
  // );

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
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
            var api = gridRef.current;
            api.columnApi.applyColumnState({
              state: [{ colId: "year", sort: "desc" }],
              defaultState: { sort: null },
            });
          }}
        >
          Desc Year
        </button>

        <button
          style={{ margin: 10, padding: 5 }}
          onClick={() => {
            var api = gridRef.current;
            api.columnApi.applyColumnState({
              state: [{ colId: "year", sort: "asc" }],
              defaultState: { sort: null },
            });
          }}
        >
          Asc Year
        </button>

        <button
          style={{ margin: 10, padding: 5 }}
          onClick={() => {
            var api = gridRef.current;
            api.columnApi.applyColumnState({
              defaultState: { sort: null },
            });
          }}
        >
          Reset Sort
        </button>

        <input
          type="text"
          id="filter-text-box"
          placeholder="Filter..."
          onInput={onFilterTextBoxChanged}
        />

        <button
          style={{ margin: 10, padding: 5 }}
          onClick={() => {
            gridRef.current.api.setQuickFilter("Sushil");
          }}
        >
          Search Sushil
        </button>

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
        ></AgGridReact>
      </div>
    </div>
  );
};

export default AGGrid;
