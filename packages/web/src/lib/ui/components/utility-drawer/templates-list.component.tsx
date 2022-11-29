import ChevronRight from '@mui/icons-material/ChevronRight';
import Close from '@mui/icons-material/Close';
import {
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Link from 'next/link';

const useTemplates = () => {
  const templatesQuery = useQuery('templates', async () => {
    const res = await fetch('/api/__introspect/templates');
    const data: { name: string; path: string }[] = await res.json();
    return data;
  });
  return templatesQuery;
};

const useTemplatesList = () => {
  const templatesQuery = useTemplates();

  const [filter, setFilter] = useState('');

  const templates = templatesQuery.data ?? [];

  const filteredTemplates = templates.filter(
    (x) =>
      x.name.toLowerCase().includes(filter) ||
      x.path.toLowerCase().includes(filter)
  );

  return {
    filter,
    setFilter,
    templates: filteredTemplates,
    isLoading: templatesQuery.isLoading,
  };
};

export const TemplatesList = () => {
  const { filter, isLoading, setFilter, templates } = useTemplatesList();

  return (
    <Stack gap={1} width="100%">
      {isLoading && <Stack height={50} bgcolor="grey.50" width="100%" />}
      {!isLoading && (
        <>
          <TextField
            placeholder="Filter"
            variant="outlined"
            onChange={(e: any) => setFilter(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton size="small">
                  <Close fontSize="small" />
                </IconButton>
              ),
            }}
          />
          <Stack maxHeight={700} overflow="scroll">
            {templates.map((t) => {
              return (
                <Link href={t.path} passHref key={t.path} legacyBehavior>
                  <Button
                    sx={{ justifyContent: 'space-between' }}
                    endIcon={<ChevronRight />}
                    color="inherit"
                  >
                    <Stack>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="grey.700"
                      >
                        {t.name}
                      </Typography>
                      <Typography variant="body2" color="grey.500">
                        {t.path}
                      </Typography>
                    </Stack>
                  </Button>
                </Link>
              );
            })}
          </Stack>
        </>
      )}
    </Stack>
  );
};
