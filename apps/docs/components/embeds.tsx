import { INDEX_SANDBOX_EMBED } from "../constants";

export const IndexSandbox = () => {
  return (
    <iframe
      style={{
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
				overflow: "hidden",
				borderRadius: 8,
				height: "80vh",
				minHeight: 400
      }}
      width="100%"
      src={INDEX_SANDBOX_EMBED}
    />
  );
};
