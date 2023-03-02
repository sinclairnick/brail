export type HtmlCommentProps = {
  text: string;
};

export const HtmlComment = (props: HtmlCommentProps) => {
  return (
    <script
      className="__comment"
      dangerouslySetInnerHTML={{ __html: `${props.text}` }}
    />
  );
};
