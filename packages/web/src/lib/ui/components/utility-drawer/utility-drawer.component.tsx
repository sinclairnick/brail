import ChevronRight from '@mui/icons-material/ChevronRight';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import { Stack, Button, Collapse, NoSsr } from '@mui/material';
import * as React from 'react';
import { useQueryParam } from '../../hooks/use-query-param.hook';
import { useRouter } from 'next/router';
import { TemplatesList } from './templates-list.component';
import { SendEmailButton } from './send-email-button.component';

const useUtilityDrawer = () => {
  const router = useRouter();
  const [_isDrawerOpen, setIsDrawerOpen] = useQueryParam(
    'isDrawerOpen',
    'true'
  );
  const isDrawerOpen = router.isReady
    ? _isDrawerOpen.toLowerCase() === 'true'
    : false;

  return {
    isDrawerOpen,
    setIsDrawerOpen,
  };
};

export type UtilityDrawerProps = {
  html: string;
};

export const UtilityDrawer = (props: UtilityDrawerProps) => {
  const { isDrawerOpen, setIsDrawerOpen } = useUtilityDrawer();

  return (
    <NoSsr>
      <Stack
        bgcolor="white"
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
            right: -48,
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
          <Stack position="relative" gap={4} width={300} p={2}>
            <SendEmailButton html={props.html} />
            <TemplatesList />
          </Stack>
        </Collapse>
      </Stack>
    </NoSsr>
  );
};
