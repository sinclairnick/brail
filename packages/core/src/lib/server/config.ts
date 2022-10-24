/**
 * (Correctly) silences a NextJS error about lack of request resolution.
 * See: https://nextjs.org/docs/api-routes/request-helpers#custom-config
 */
export const getBrailApiConfig = () => {
  return {
    api: { externalResolver: true },
  };
};
