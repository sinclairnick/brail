import React, { useState } from 'react';
import { Badge, Drawer, IconButton, Stack, Typography } from '@mui/material';
import ErrorOutline from '@mui/icons-material/ErrorOutline';

export type ErrorDrawerProps = {
  getErrors: () => {
    line: number;
    message: string;
    tagName: string;
    formattedMessage: string;
  }[];
};

const useErrorDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return {
    isDrawerOpen,
    setIsDrawerOpen,
  };
};

export const ErrorDrawer = (props: ErrorDrawerProps) => {
  const { getErrors } = props;
  const { isDrawerOpen, setIsDrawerOpen } = useErrorDrawer();
  const errors = getErrors();
  const numErrors = errors.length;

  return (
    <>
      <IconButton
        color={numErrors > 0 ? 'error' : undefined}
        onClick={() => setIsDrawerOpen((x) => !x)}
      >
        <Badge badgeContent={numErrors}>
          <ErrorOutline />
        </Badge>
      </IconButton>
      <Drawer
        anchor="bottom"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Stack p={2} width="100vw" overflow="scroll" gap={2}>
          {errors.map((e, i) => {
            return (
              <Stack key={i} direction="row" gap={2} alignItems="center">
                <Stack>
                  <Typography variant="h5" color="error.main">
                    {e.tagName}
                  </Typography>
                  <Typography>{e.formattedMessage}</Typography>
                </Stack>
              </Stack>
            );
          })}
          {errors.length === 0 && (
            <Typography align="center">No errors found</Typography>
          )}
        </Stack>
      </Drawer>
    </>
  );
};
