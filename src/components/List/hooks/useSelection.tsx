import React, { forwardRef } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

import useProps from "./useProps";

import { RowId } from '../../../model/IRowData';

const SelectionContext = createContext<IState>(null as never);

export const useSelection = () => useContext(SelectionContext);

interface ISelectionProviderProps {
    children: React.ReactNode;
    selectedRows: RowId[];
    ref: React.Ref<ISelectionReloadRef>;
}

interface IState {
    selection: Set<RowId>;
    setSelection: (s: Set<RowId>) => void;
}

export interface ISelectionReloadRef {
    reload: () => void;
}

export const SelectionProvider = forwardRef(({
    children,
    selectedRows,
}: ISelectionProviderProps, ref: any) => {

    const [selection, setSelection] = useState(new Set<RowId>());

    const { onSelectedRows } = useProps();

    const handleSelectionChange = (selection: IState['selection'] = new Set()) => {
        onSelectedRows && onSelectedRows([...selection]);
        setSelection(new Set(selection));
    };

    const value = {
        selection,
        setSelection: handleSelectionChange,
    };

    useEffect(() => {
        if (typeof ref === 'function') {
            ref({
                reload: handleSelectionChange,
            })
        } else if (ref) {
            ref.current = {
                reload: handleSelectionChange,
            };
        }
    }, [ref]);

    useEffect(() => {
        let isOk = true;
        const pendingSelection = new Set(selectedRows);
        selection.forEach((row) => {
            if (!pendingSelection.has(row) && isOk) {
                isOk = false;
            }
        });
        pendingSelection.forEach((row) => {
            if (!selection.has(row) && isOk) {
                isOk = false;
            }
        });
        if (!isOk) {
            handleSelectionChange(pendingSelection);
        }
    }, [selectedRows, selection]);

    return (
        <SelectionContext.Provider value={value}>
            {children}
        </SelectionContext.Provider>
    );
});

export default useSelection;
