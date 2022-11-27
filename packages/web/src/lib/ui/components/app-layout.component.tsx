import { FC, PropsWithChildren, useState } from 'react';
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import { useRouter } from 'next/router';
import { CreateTemplateReturn } from '@brail/core';
import { NextComponentType, NextPageContext } from 'next';
import { UtilityDrawer } from './utility-drawer.component';
import { Tab, TabNavigation } from './tab-navigation.component';
import { IconButton, Stack } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ErrorDrawer } from './error-drawer.component';
import SwaggerUI from 'swagger-ui-react';
import { useQueryParam } from '../hooks/use-query-param.hook';

const useBrailLayout = (
  template: NextComponentType<NextPageContext, any, any>
) => {
  const router = useRouter();
  const tab = (router.query.tab?.toString() ?? 'preview') as Tab;

  const methods: Partial<
    Pick<
      CreateTemplateReturn<any>,
      | 'generatePreviewHtml'
      | 'generatePreviewJson'
      | 'generatePreviewMjml'
      | 'getErrors'
    >
  > = {
    generatePreviewHtml: template['generatePreviewHtml' as never],
    generatePreviewJson: template['generatePreviewJson' as never],
    generatePreviewMjml: template['generatePreviewMjml' as never],
    getErrors: template['getErrors' as never],
  };
  const [_isLayoutVisible, setIsLayoutVisible] = useQueryParam(
    'layoutVisible',
    'true'
  );
  const isLayoutVisible = _isLayoutVisible.toLowerCase() === 'true';

  const htmlPreview = methods.generatePreviewHtml?.();
  const mjmlPreview = methods.generatePreviewMjml?.();
  const jsonPreview = JSON.stringify(
    methods.generatePreviewJson?.() ?? '{}',
    undefined,
    2
  );

  const changeTab = (tab: Tab) => {
    router.push({
      query: { ...router.query, tab },
    });
  };

  const isTemplate = 'name' in template && template.name === 'TemplatePage';

  const hasHtml = methods.generatePreviewHtml != null;
  const hasMjml = methods.generatePreviewMjml != null;
  const hasJson = methods.generatePreviewJson != null;

  return {
    isTemplate,
    changeTab,
    tab,
    hasHtml,
    htmlPreview,
    hasMjml,
    mjmlPreview,
    hasJson,
    jsonPreview,
    toggleLayoutVisible: () =>
      setIsLayoutVisible(isLayoutVisible ? 'false' : 'true'),
    isLayoutVisible,
    getErrors: methods.getErrors,
  };
};

export type BrailLayoutProps = PropsWithChildren<{
  template: NextComponentType<NextPageContext, any, any>;
}>;

const queryClient = new QueryClient();

export const BrailLayout: FC<BrailLayoutProps> = (props) => {
  const { template, children } = props;

  const {
    changeTab,
    tab,
    hasHtml,
    hasJson,
    hasMjml,
    htmlPreview,
    jsonPreview,
    mjmlPreview,
    toggleLayoutVisible,
    isLayoutVisible,
    getErrors,
  } = useBrailLayout(template);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Stack position="relative" width="100%" height="100vh">
          <Stack position="relative" direction="row" flex={1}>
            {isLayoutVisible && <UtilityDrawer />}
            <Stack
              position="relative"
              flex={1}
              height="100%"
              maxHeight="100vh"
              overflow="hidden"
            >
              {isLayoutVisible && (
                <TabNavigation
                  hasMjml={hasMjml}
                  hasHtml={hasHtml}
                  hasJson={hasJson}
                  activeTab={tab}
                  changeTab={changeTab}
                />
              )}
              <Stack direction="row" gap={4} flex={1} overflow="scroll">
                {tab === 'preview' && <Stack flex={1}>{children}</Stack>}
                {[
                  ['html', htmlPreview],
                  ['mjml', mjmlPreview],
                  ['json', jsonPreview],
                ].map(([name, x]) => {
                  return (
                    <Stack
                      key={name}
                      display={name === tab ? 'flex' : 'none'}
                      component="pre"
                      p={2}
                      flex={1}
                      sx={{
                        backgroundColor: 'rgba(55, 65, 81, 1)',
                        borderRadius: '0.25rem',
                        color: 'rgba(229, 231, 235, 1)',
                        fontFamily: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace`,
                        overflow: 'scroll',
                        padding: '0.5rem 0.75rem',
                      }}
                    >
                      {x}
                    </Stack>
                  );
                })}
                {tab === 'openapi' && (
                  <Stack flex={1}>
                    <SwaggerUI tryItOutEnabled url="/api/openapi.json" />
                  </Stack>
                )}
              </Stack>
            </Stack>
          </Stack>
          <Stack
            direction="row"
            gap={1}
            alignItems="center"
            sx={{
              position: 'absolute',
              right: 8,
              bottom: 8,
            }}
          >
            <IconButton onClick={toggleLayoutVisible}>
              {isLayoutVisible ? <VisibilityOff /> : <Visibility />}
            </IconButton>
            {getErrors != null && <ErrorDrawer getErrors={getErrors} />}
          </Stack>
        </Stack>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
