import React from "react";
import MainNavigation from "./mainNavigation";

export default function Layout({ children }) {
  return (
    <>
      <MainNavigation />
      <div>{children}</div>
    </>
  );
}
