"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/header-menu";
import { cn } from "@/utils/cn";
import '@/app/globals.css';

export function Header() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2 " />
      <p className="text-black dark:text-white ">
        The Navbar will show on top of the page
      </p>
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Formularios">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/SubstandardCondition">Condición Subestándar</HoveredLink>
            <HoveredLink href="/StopWork">Stop Work</HoveredLink>
            <HoveredLink href="/seo">Incidente o Accidente</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Buscador">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/web-dev">Tolerancia 0 Condición subestándar</HoveredLink>
            <HoveredLink href="/interface-design">Tolerancia 0 Stop Work</HoveredLink>
            <HoveredLink href="/seo">Incidente o Accidente</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
