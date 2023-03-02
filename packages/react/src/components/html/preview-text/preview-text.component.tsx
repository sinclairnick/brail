export type PreviewTextProps = { children: string };

export const PreviewText = (props: PreviewTextProps) => {
  return (
    <div
      style={{
        display: "none",
        fontSize: 1,
        lineHeight: 1,
        maxHeight: 0,
        maxWidth: 0,
        opacity: 0,
        overflow: "hidden",
        fontFamily: "sans-serif",
        // @ts-expect-error
        msoHide: "all",
      }}
    >
      {props.children}
    </div>
  );
};
