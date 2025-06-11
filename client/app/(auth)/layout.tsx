import React, { ReactNode } from "react";

const AuthPageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      {children}
    </div>
  );
};

export default AuthPageLayout;
