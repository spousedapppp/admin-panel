import React from "react";

const Main = ({ children }) => {
  return (
    <main className="layout w-full overflow-auto overflow-y-scroll p-3 md:p-8 2xl:p-10">
      <div className="mx-auto w-full max-w-[1400px]">{children}</div>
    </main>
  );
};

export default Main;
