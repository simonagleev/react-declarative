import {
  ListTyped,
  FieldType,
  TypedField,
  SelectionMode,
  IColumn,
  IListAction,
  ActionType,
  ColumnType,
  DisplayMode,
  ListHandlerPagination,
  ListHandlerSortModel,
  RowId,
  useList,
  useOne,
} from 'react-declarative';

import Delete from '@mui/icons-material/Delete';
import Add from '@mui/icons-material/Add';

import mock from './mock/list';
import sleep from '../utils/sleep';
import { useState } from 'react';

const filters: TypedField[] = [
  {
    type: FieldType.Text,
    name: 'firstName',
    title: 'First name',
  },
  {
    type: FieldType.Text,
    name: 'lastName',
    title: 'Last name',
  }
];

const columns: IColumn[] = [
  {
    type: ColumnType.Text,
    field: 'id',
    headerName: 'ID',
    secondary: true,
    width: 'max(calc(100vw - 650px), 200px)',
  },
  /*{
    type: ColumnType.Text,
    field: 'firstName',
    headerName: 'First Name',
    width: 'max(calc(100vw - 650px), 200px)',
  },*/
  {
    type: ColumnType.Compute,
    headerName: 'Full name',
    primary: true,
    compute: ({ firstName, lastName }) => `${firstName} ${lastName}`,
    width: '200px',
  },
  {
    type: ColumnType.Component,
    headerName: 'Component',
    element: () => (
      <div>
        Custom cell Component
      </div>
    ),
    width: '200px',
  },
  {
    type: ColumnType.Action,
    headerName: 'Actions',
    sortable: false,
    width: '150px',
  },
];

const actions: IListAction[] = [
  {
    type: ActionType.Add,
  },
  {
    type: ActionType.Menu,
    options: [
      {
        action: 'add-action',
        label: 'Create new row',
        icon: Add,
      },
      {
        action: 'update-now',
      },
      {
        action: 'auto-reload',
      },
      {
        action: 'mobile-view',
      },
      {
        action: 'list-action',
        label: 'Pick list',
      },
      {
        action: 'one-action',
        label: 'Pick one',
      },
    ],
  }
];

const rowActions = [
  {
    label: 'Remove action',
    action: 'remove-action',
    icon: Delete,
  },
];

interface IRowData {
  id: string;
  lastName: string;
  firstName: string;
  color: string;
  age: string;
}

interface IFilterData {
  firstName: string;
  lastName: string;
}

export const ListPage = () => {

  const [selectedRows, setSelectedRows] = useState<RowId[]>([]);

  const handler = async ({
    firstName,
    lastName,
  }: IFilterData, {
    limit,
    offset,
  }: ListHandlerPagination, sort: ListHandlerSortModel) => {

    console.log({limit, offset, sort})

    // return mock;

    await sleep(3_000);

    let rows = await Promise.resolve(mock) as IRowData[];

    if (firstName) {
      rows = rows.filter((row) => row.firstName.includes(firstName));
    }

    if (lastName) {
      rows = rows.filter((row) => row.lastName.includes(lastName));
    }

    const { length: total } = rows;

    rows = rows.slice(offset, limit + offset);

    return {
      rows,
      total,
    };

    //await sleep(3_000)

    // return [];
  };

  const pickList = useList<IRowData>({
    columns,
    handler,
    selectedRows,
  });

  const pickOne = useOne({
    fields: [
      {type: FieldType.Text, columns: '6', title: 'Firstname', defaultValue: 'Петр', name: 'f'},
      {type: FieldType.Text, columns: '6', title: 'Lastname', name: 'l'},
    ],
  });

  const heightRequest = () => window.innerHeight - 100;

  const handleColumnMenuClick = (action: string) => {
    alert(action);
  };

  const handleRowActionsClick = (row: any, action: string) => {
    alert(JSON.stringify({ row, action }, null, 2));
  };

  const handleAction = (action: string) => {
    if (action === 'list-action') {
      pickList({
        title: 'List picker'
      }).then(console.log);
    } else if (action === 'one-action') {
      pickOne({
        title: 'One picker'
      }).then(console.log);
    }
    alert(action);
  };

  const handleClick = (row: any) => {
    // alert(JSON.stringify({ row }, null, 2));
    setSelectedRows((rows) => [...rows, row.id]);
  };

  const handleSelectedRows = (selectedRows: RowId[]) => {
    setSelectedRows(selectedRows);
  };

  return (
    <ListTyped<IFilterData, IRowData>
      ref={(listApi) => (window as any).listApi = listApi}
      title="List Component"
      filterLabel="Filters"
      heightRequest={heightRequest}
      rowActions={rowActions}
      actions={actions}
      filters={filters}
      columns={columns}
      handler={handler}
      selectionMode={SelectionMode.Multiple}
      onColumnMenuAction={handleColumnMenuClick}
      onRowAction={handleRowActionsClick}
      onRowClick={handleClick}
      onAction={handleAction}
      onSelectedRows={handleSelectedRows}
      displayMode={DisplayMode.Mobile}
      selectedRows={selectedRows}
    />
  );
};

/*
rowMark={row => row.color}
      rowAvatar={(row) => ({
        alt: row.firstName,
        src: 'https://avatars.githubusercontent.com/u/19227776?s=400&u=9eb4f0056f36228804b7e4c2e4d02358d5786bb4&v=4',
      })}
*/

export default ListPage;
