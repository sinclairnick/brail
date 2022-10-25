import { ToggleButton, ToggleButtonGroup, Stack } from '@mui/material';
import * as React from 'react';

export type Tab = 'html' | 'mjml' | 'json' | 'preview' | 'openapi';

export type TabNavigationProps = {
  hasMjml: boolean;
  hasHtml: boolean;
  hasJson: boolean;
  activeTab: Tab;
  changeTab: (tab: Tab) => void;
};

export const TabNavigation = (props: TabNavigationProps) => {
  const { hasHtml, hasJson, hasMjml, activeTab, changeTab } = props;

  return (
    <Stack
      direction="row"
      p={2}
      bgcolor="white"
      alignItems="center"
      borderBottom={(theme: any) => `1px solid ${theme.palette.grey[100]}`}
    >
      <Stack
        width="100%"
        direction="row"
        alignItems="center"
        justifyContent="center"
        flex={1}
      >
        <ToggleButtonGroup
          value={activeTab}
          exclusive
          aria-label="Platform"
          onChange={(e: any) => changeTab(e.target.value as Tab)}
          size="small"
        >
          <ToggleButton value="preview">Preview</ToggleButton>
          {hasMjml && <ToggleButton value="mjml">MJML</ToggleButton>}
          {hasHtml && <ToggleButton value="html">HTML</ToggleButton>}
          {hasJson && <ToggleButton value="json">JSON</ToggleButton>}
          {hasJson && <ToggleButton value="openapi">Open API</ToggleButton>}
        </ToggleButtonGroup>
      </Stack>
    </Stack>
  );
};
