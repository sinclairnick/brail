import ChevronRight from '@mui/icons-material/ChevronRight';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import {
  Stack,
  Typography,
  Button,
  Drawer,
  TextField,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Collapse,
} from '@mui/material';
import Link from 'next/link';
import * as React from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Close from '@mui/icons-material/Close';
import { useQueryParam } from '../hooks/use-query-param.hook';

const useTemplates = () => {
  const templatesQuery = useQuery('templates', async () => {
    const res = await fetch('/api/__introspect/templates');
    const data: { name: string; path: string }[] = await res.json();
    return data;
  });
  return templatesQuery;
};

const useUtilityDrawer = () => {
  const templatesQuery = useTemplates();
  const [filter, setFilter] = useState('');
  const [_isDrawerOpen, setIsDrawerOpen] = useQueryParam(
    'isDrawerOpen',
    'false'
  );
  const isDrawerOpen = _isDrawerOpen.toLowerCase() === 'true';

  const templates = templatesQuery.data ?? [];

  const filteredTemplates = templates.filter(
    (x) =>
      x.name.toLowerCase().includes(filter) ||
      x.path.toLowerCase().includes(filter)
  );

  return {
    templates: filteredTemplates,
    isLoading: templatesQuery.isLoading,
    filter,
    setFilter,
    isDrawerOpen,
    setIsDrawerOpen,
  };
};

export const UtilityDrawer = () => {
  const {
    templates,
    isLoading,
    setFilter,
    filter,
    isDrawerOpen,
    setIsDrawerOpen,
  } = useUtilityDrawer();

  return (
    <Stack
      bgcolor="white"
      height="100%"
      minHeight="100vh"
      gap={2}
      borderRight={(theme: any) => `1px solid ${theme.palette.grey[100]}`}
      position="relative"
      py={4}
    >
      <Button
        color="inherit"
        size="small"
        sx={{
          position: 'absolute',
          right: isDrawerOpen ? 8 : -48,
          bottom: 16,
          zIndex: 10,
          minWidth: 0,
          px: 1,
        }}
        onClick={() => setIsDrawerOpen(isDrawerOpen ? 'false' : 'true')}
      >
        {isDrawerOpen ? <ChevronLeft /> : <ChevronRight />}
      </Button>
      <Collapse in={isDrawerOpen} orientation="horizontal">
        <Stack position="relative" gap={1} width={300}>
          <Accordion defaultExpanded disableGutters>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h4">Templates</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack gap={1} width="100%">
                {isLoading && (
                  <Stack height={50} bgcolor="grey.50" width="100%" />
                )}
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
                          <Link href={`/${t.path}`} passHref key={t.path}>
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
            </AccordionDetails>
          </Accordion>
        </Stack>
      </Collapse>
    </Stack>
  );
};
