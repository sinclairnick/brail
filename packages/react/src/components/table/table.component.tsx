export type TableProps = React.DetailedHTMLProps<
  React.TableHTMLAttributes<HTMLTableElement>,
  HTMLTableElement
>;

/**
 * A <table> component with basic style resets.
 */
export const Table = (props: TableProps) => {
  return (
    <table
      role="presentation"
      cellPadding={0}
      cellSpacing={0}
      border={0}
      {...props}
    />
  );
};
