import * as React from 'react';

import { makeStyles } from '@material-ui/core';

import MatBreadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "stretch",
    flexDirection: "row",
    paddingTop: "10px",
    paddingBottom: "10px",
    flex: 1,
  },
  stretch: {
    flexGrow: 1,
    shrink: 1,
  },
});

interface IBreadcrumbsProps {
  onSave?: () => void;
  onBack?: () => void;
  disabled?: boolean;
  title?: string;
  subtitle?: string;
}

export const Breadcrumbs = ({
  onSave,
  onBack,
  disabled,
  title = 'Title',
  subtitle = 'Subtitle',
}: IBreadcrumbsProps) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <MatBreadcrumbs className={classes.stretch} aria-label="breadcrumb">
        <Link onClick={onBack} color="inherit">{title}</Link>
        <Typography color="textPrimary">{subtitle}</Typography>
      </MatBreadcrumbs>
      <Button
        onClick={onSave}
        color="primary"
        disabled={disabled}
        variant="contained"
      >
        Save
      </Button>
    </Box>
  );
};

export default Breadcrumbs;