import ReactDOM from 'react-dom/server';

export const renderToStaticMarkup: typeof ReactDOM['renderToStaticMarkup'] = (
  element
) => {
  return ReactDOM.renderToStaticMarkup(element).replace(
    /<script><\/script>/g,
    ''
  ); // Enables comments
};
