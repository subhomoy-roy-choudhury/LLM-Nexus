import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="py-6 mt-8 border-t">
      <div className="container">
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} LLM Nexus
          </p>
          <p className="text-xs text-muted-foreground">
            Pricing and specifications are for informational purposes only and
            may not reflect current rates.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
