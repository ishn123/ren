import React,{useState,useEffect} from 'react';
import {
  MRT_GlobalFilterTextField,
  MRT_TableBodyCellValue,
  MRT_TablePagination,
  MRT_ToolbarAlertBanner,
  flexRender,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import "./App.css";
import sampleData from './data/sample.json';
import CustomModal from './CustomModal';
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { day: '2-digit', month: 'short', year: '2-digit' };
  return date.toLocaleDateString('en-GB', options).replace(/ /g, '-');
}
const columns = [
  {
    accessorKey: 'id',
    header: 'id',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'subcategory',
    header: 'Subcategory',
  },
  {
    accessorFn: (row) => formatDate(row.createdAt),
      id: 'createdAt',
    header: 'Created At'
  },
  {
    accessorFn: (row) => formatDate(row.updatedAt),
      id: 'updatedAt',
    header: 'Updated At'
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'sale_price',
    header: 'Sales Price',
  },
];

// Function to format date to "dd-mar-yy"

const App = () => {
  const [data, setData] = useState(sampleData);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
 console.log(data);
  const table = useMaterialReactTable({
    columns,
    data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    //MRT display columns can still work, optionally override cell renders with `displayColumnDefOptions`
    // enableRowSelection: true,
    // initialState: {
    //   pagination: { pageSize: 5, pageIndex: 0 },
    //   showGlobalFilter: true,
    // },
    positionGlobalFilter: 'left', //show the global filter on the left side of the top toolbar
    initialState: {
      showGlobalFilter: true, //show the global filter by default
    },
    //customize the MRT components
    // muiPaginationProps: {
    //   rowsPerPageOptions: [5, 10, 15],
    //   variant: 'outlined',
    // },
    // paginationDisplayMode: 'pages',
  });

  return (
    <Stack sx={{ m: '2rem 5rem' }}>
      <button onClick={openModal} style={{display:"none"}}>Open Modal</button>
      <CustomModal isOpen={modalIsOpen} onRequestClose={closeModal}>
        {/* Content for your modal */}
        {/* <h2>Hello, this is your modal content!</h2>
        <p>You can put any content you want here.</p>
        <button onClick={closeModal}>Close Modal</button> */}
      </CustomModal>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column', alignItems: 'flex-end'
       
        }}
      >
        {/**
         * Use MRT components along side your own markup.
         * They just need the `table` instance passed as a prop to work!
         */}
       
         <MRT_GlobalFilterTextField table={table}  style={{margin:"10px"}}/>
         
        
        {/* <MRT_TablePagination table={table} /> */}
      </Box>
      {/* Using Vanilla Material-UI Table components here */}
      <TableContainer>
  <Table style={{ borderCollapse: 'collapse', fontSize: '0.8rem' }}>
    {/* Table Header */}
    <TableHead>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableCell
              align="center"
              variant="head"
              style={{
                fontWeight: "700",
                borderTop:"1px solid rgba(0, 0, 0, 0.25)",
                borderBottom: "1px solid rgba(0, 0, 0, 0.15)", // Add bottom border to header cell
                padding: '8px' // Adjust padding for header cells
              }}
              key={header.id}
            >
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.Header ??
                      header.column.columnDef.header,
                    header.getContext(),
                  )}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableHead>

    {/* Table Body */}
    <TableBody>
      {table.getRowModel().rows.map((row, rowIndex) => (
        <TableRow key={row.id}>
          {row.getVisibleCells().map((cell, _columnIndex) => (
            <TableCell
              align="center"
              variant="body"
              key={cell.id}
              style={{
                // Add bottom border to body cells
                border: 'none', // Remove border from body cells
                padding: '12px' // Adjust padding for body cells
              }}
            >
              {/* Use MRT's cell renderer that provides better logic than flexRender */}
              <MRT_TableBodyCellValue
                cell={cell}
                table={table}
                staticRowIndex={rowIndex} //just for batch row selection to work
              />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

      <MRT_ToolbarAlertBanner stackAlertBanner table={table} />
    </Stack>
  );
};

export default App;
