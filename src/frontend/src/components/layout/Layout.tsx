import { Outlet } from "@tanstack/react-router";
import { Header } from "./Header";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer
        className="border-t border-border h-1"
        data-ocid="layout.footer"
      />
    </div>
  );
}
