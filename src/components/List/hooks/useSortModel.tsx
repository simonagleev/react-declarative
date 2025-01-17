import React from 'react';
import { createContext, useContext, useState } from 'react';

import { IListSortItem } from '../../../model/IListProps';

import useProps from "./useProps";

const SortModelContext = createContext<IState>(null as never);

export const useSortModel = () => useContext(SortModelContext);

interface ISortModelProviderProps {
    children: React.ReactNode;
}

interface IState {
    sortModel: Map<string, IListSortItem>;
    setSortModel: (s: Map<string, IListSortItem>) => void;
}

export const SortModelProvider = ({
    children,
}: ISortModelProviderProps) => {
    const [sortModel, setSortModel] = useState(new Map<string, IListSortItem>());

    const {
        handleSortModel,
    } = useProps();

    const handleSortModelChange = (sortModel: IState['sortModel']) => {
        handleSortModel && handleSortModel([...sortModel.values()]);
        setSortModel(new Map(sortModel));
    };

    const value = {
        sortModel,
        setSortModel: handleSortModelChange,
    };

    return (
        <SortModelContext.Provider value={value}>
            {children}
        </SortModelContext.Provider>
    );
};

export default useSortModel;
