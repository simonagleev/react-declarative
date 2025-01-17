import * as React from "react";
import { forwardRef } from 'react';
import { makeStyles } from "../../../../styles";

import Paper from "@mui/material/Paper";

import classNames from "../../../../utils/classNames";

import AutoSizer, { IChildParams } from "../../../common/AutoSizer";

import IListProps, { IListState, IListCallbacks } from '../../../../model/IListProps';
import IAnything from '../../../../model/IAnything';
import IRowData from '../../../../model/IRowData';

import Actions from "./Actions";
import Filters from "./Filters";

const AUTOSIZER_DELAY = 50;

interface IContainerProps<FilterData = IAnything, RowData extends IRowData = IAnything> extends
  Omit<IListProps<FilterData, RowData>, keyof {
    ref: never;
    limit: never;
    autoReload: never;
  }>,
  IListState<FilterData, RowData>,
  IListCallbacks<FilterData, RowData> {
  className?: string;
  style?: React.CSSProperties;
  children: (s: IChildParams<IContainerProps<FilterData, RowData>>) => any;
  ready: () => void;
  ref?: (instance: HTMLDivElement) => void
}

const useStyles = makeStyles({
  root: {},
  container: {
    display: "flex",
    alignItems: "stretch",
    justifyContent: "stretch",
    flexDirection: "column",
    overflow: 'hidden',
  },
  stretch: {
    flex: 1,
  },
  noElevation: {
    background: "transparent",
  },
});

export const Container = <
  FilterData extends IAnything = IAnything,
  RowData extends IRowData = IAnything,
>(props: IContainerProps<FilterData, RowData>, ref: any) => {

  const classes = useStyles();

  const {
    className,
    style,
    filters = [],
    actions = [],
    heightRequest = (v) => v,
    widthRequest = (v) => v,
    title = '',
    filterLabel = '',
    filterData,
    handleFilter,
    handleDefault,
    children,
    isMobile,
    ready,
    keepFlow,
    toggleFilters,
    onFilterChange,
    handleFiltersCollapsed,
    sizeByParent = true,
  } = props;

  const sizer = {
    ...(!sizeByParent && {
      target: document.documentElement,
    })
  };

  return (
    <AutoSizer
      className={classNames(classes.root, className)}
      heightRequest={heightRequest}
      widthRequest={widthRequest}
      keepFlow={keepFlow}
      delay={AUTOSIZER_DELAY}
      style={style}
      payload={props}
      {...sizer}
    >
      {({ height, width, payload }) => (
        <div ref={ref} style={{ height, width }} className={classes.container}>
          {Array.isArray(actions) && !!actions.length && (
            <Actions<FilterData> title={title} filterData={filterData!} actions={actions} />
          )}
          <Paper className={classNames(classes.container, classes.stretch, {
            [classes.noElevation]: isMobile,
          })}>
            {Array.isArray(filters) && !!filters.length && (
              <Filters<FilterData>
                filterData={filterData!}
                toggleFilters={toggleFilters}
                onFilterChange={onFilterChange}
                change={handleFilter}
                onCollapsedChange={handleFiltersCollapsed}
                clean={handleDefault as any}
                label={filterLabel}
                filters={filters}
                ready={ready}
              />
            )}
            <div className={classNames(classes.container, classes.stretch)}>
              <AutoSizer payload={payload}>
                {children}
              </AutoSizer>
            </div>
          </Paper>
        </div>
      )}
    </AutoSizer>
  )
};

export default forwardRef(Container) as typeof Container;
