import { ReactNode } from "react";

const FEATURES = [
  {
    label: "Idiomatic React",
    description: "Write email templates using React syntax you know and love.",
    icon: "⚛️",
  },
  {
    label: "Built-in Type-safety",
    description:
      "Enjoy end-to-end type-safety, from React through to the server.",
    icon: "🔒",
  },
  {
    label: "Framework Agnostic",
    description: "Brail integrates with your favourite meta-frameworks.",
    icon: "💌",
  },
  {
    label: "Developer-first",
    description:
      "Enjoy first-in-class DX and rich devtools. Live-reloading out-of-the-box.",
    icon: <b style={{ color: "grey" }}>{`{ }`}</b>,
  },
  {
    label: "Theming",
    description: "Easily theme email templates using a stitches-like API.",
    icon: "🌈",
  },
  {
    label: "Instant APIs",
    description: "Instantly serve your templates via type-safe APIs and/or SDKs.",
    icon: "✨",
  },
] satisfies Array<{ label: string; description: string; icon: ReactNode }>;

export const Features = () => {
  return (
    <>
      <style jsx>{`
				.features {
					grid-template-columns: 1fr 1fr 1fr;
				}
        @media (max-width: 768px) {
					.features {
						grid-template-columns: 1fr 1fr;
					}
        }
        @media (max-width: 480px) {
					.features {
						grid-template-columns: 1fr;
					}
        }
      `}</style>
      <div
        className="features"
        style={{
          display: "grid",
          gap: "2em",
        }}
      >
        {FEATURES.map((feature) => (
          <div key={feature.label}>
            <span style={{ fontSize: 32 }}>{feature.icon}</span>
            <h3 style={{ fontWeight: "bold", fontSize: 20 }}>
              {feature.label}
            </h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};
