import { createContext, useContext } from 'react';

export type EmailContextType = {
  /**
   * The available full width to any child components.
   * Since box-sizing is not fully supported we must compute it ourselves.
   * This limits our ability to nest, since this value must be known at compile-time.
   */
  boxWidth: number;
};

const EmailContext = createContext({} as EmailContextType);

export const EmailProvider = EmailContext.Provider;

export const useEmailContext = () => useContext(EmailContext);
