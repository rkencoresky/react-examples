import React, { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { Box } from "@mui/material";
import Select from "react-select";
import "ag-grid-enterprise";
import { _mockedGridData } from "../../../data/_mockedGridData";

const defaultColsDefs = {
  minWidth: 200,
  filter: false,
  editable: false,
  sortable: false,
};

const dropdownOptions = [
  {
    label: "Move",
    value: "Move",
  },
  {
    label: "Delete",
    value: "Delete",
  },
  {
    label: "Edit",
    value: "Edit",
  },
];
const CellDropdown = (p) => {
  const cellDefs = p;

  console.log("call edit >> ", cellDefs);
  return <Select options={dropdownOptions} />;
};
const AGGrid = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: 500, width: "100%" }), []);
  const [rowData, setRowData] = useState(_mockedGridData);

  const keys = _mockedGridData[0];
  const mappedCols = Object.keys(keys).map((key) => {
    return {
      ...defaultColsDefs,
      colId: key,
      field: key,
      headerName: key.toUpperCase(),
    };
  });
  const columnDefs = [
    {
      // ...defaultColsDefs,
      colId: "action",
      field: "action",
      headerName: "Action",
      editable: true,
      // cellEditorPopup: true,
      // cellEditor: CellDropdown,
      // cellEditorPopupPosition: "over",
      // singleClickEdit: true,
      // stopEditingWhenCellsLoseFocus: true,

      cellEditor: "agRichSelectCellEditor",
      cellEditorPopup: true,
      cellEditorParams: {
        values: ["English", "Spanish", "French", "Portuguese", "(other)"],
        formatValue: (value) => value?.toUpperCase(),
        cellRenderer: (p) => {
          return <div>hello</div>;
        },
        searchDebounceDelay: 500,
      },
    },
    ...mappedCols,
  ];

  // console.log(
  //   "call edit >> ",
  //   gridRef.current.api.columnApi.getColumn("total").visible
  // );

  console.log(
    "call ag-grid  >> ",
    gridRef?.current?.columnApi?.getColumn("bronze").visible
  );

  return (
    <div style={containerStyle}>
      <div style={{ height: "100%", boxSizing: "border-box" }}>
        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            onCellClicked={(params) => {
              console.log("params  >> ", params);

              // if (params.column.colDef.field === "...") {
              //   params.api.contextMenuFactory.showMenu(
              //     params.node,
              //     params.column,
              //     params.value,
              //     params.event
              //   );
              // }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AGGrid;
