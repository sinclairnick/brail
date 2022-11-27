import React, { useEffect, useState } from 'react';
import { Badge, Drawer, IconButton, Stack, Typography } from '@mui/material';
import ErrorOutline from '@mui/icons-material/ErrorOutline';

type Error = {
  line: number;
  message: string;
  tagName: string;
  formattedMessage: string;
};

export type ErrorDrawerProps = {
  getErrors: () => Promise<Error[]>;
};

const useErrorDrawer = (getErrors: ErrorDrawerProps['getErrors']) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [errors, setErrors] = useState<Error[]>([]);

  useEffect(() => {
    const get = async () => {
      const x = await getErrors();
      setErrors(x);
    };
    get();
  }, [getErrors]);

  return {
    isDrawerOpen,
    setIsDrawerOpen,
    errors,
  };
};

export const ErrorDrawer = (props: ErrorDrawerProps) => {
  const { isDrawerOpen, setIsDrawerOpen, errors } = useErrorDrawer(
    props.getErrors
  );
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
