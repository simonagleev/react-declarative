import * as React from "react";
import { useRef } from 'react';

import { makeStyles } from '../../../../styles';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import IListProps, { IListState, IListCallbacks } from '../../../../model/IListProps';
import IAnything from '../../../../model/IAnything';
import IRowData from '../../../../model/IRowData';

import DesktopBodyRow from "./components/DesktopBodyRow";
import DesktopHeadRow from "./components/DesktopHeadRow";

import Container from "../Container";

const PAGINATION_HEIGHT = 52;

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    background: theme.palette.background.paper,
  },
  noBorder: {
    border: 'none !important',
  },
}));

interface IDesktopProps<FilterData = IAnything, RowData extends IRowData = IAnything> extends
  Omit<IListProps<FilterData, RowData>, keyof {
    ref: never;
    limit: never;
    autoReload: never;
  }>,
  IListState<FilterData, RowData>,
  IListCallbacks<FilterData, RowData> {
  className?: string;
  style?: React.CSSProperties;
}

export const Desktop = <
  FilterData extends IAnything = IAnything,
  RowData extends IRowData = IAnything,
  >(props: IDesktopProps<FilterData, RowData>) => {

  const classes = useStyles();

  const outerRef = useRef<HTMLDivElement>(null);

  const {
    limit,
    offset,
    loading,
    total,
    columns = [],
  } = props;

  const {
    handleLimitChange,
    handlePageChange,
  } = props;

  const handleDirtyLimitChange = (e: any) => handleLimitChange(e.target.value);

  const handleDirtyPageChange = (_: any, newPage: number) => handlePageChange(newPage);

  const handleScrollTop = () => outerRef.current && outerRef.current.scrollTo(0, 0);

  const renderPlaceholder = () => (
    <TableCell className={classes.noBorder} colSpan={columns.length + 1 || 1} align="center">
      <Stack direction="row" alignItems="center" justifyContent="center" gap={1}>
        {loading && <CircularProgress size={28} />}
        <Typography variant="body1">
          {loading ? "Loading" : "Nothing found"}
        </Typography>
      </Stack>
    </TableCell>
  );

  return (
    <Container<FilterData, RowData>
      {...props}
    >
      {({ height, width, payload: { rows } }) => (
        <Box className={classes.root}>
          <TableContainer ref={outerRef} style={{ height: height - PAGINATION_HEIGHT, width }}>
            <Table stickyHeader>
              <TableHead>
                <DesktopHeadRow<RowData>
                  onSortModelChange={handleScrollTop}
                />
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <DesktopBodyRow<RowData>
                    row={row}
                    key={index}
                  />
                ))}
                {rows.length === 0 && (
                  <TableRow>
                    {renderPlaceholder()}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            width={width}
            component={Box}
            count={total || -1}
            rowsPerPage={limit}
            page={offset / limit}
            onPageChange={handleDirtyPageChange}
            onRowsPerPageChange={handleDirtyLimitChange}
          />
        </Box>
      )}
    </Container>
  );
};

export default Desktop;
