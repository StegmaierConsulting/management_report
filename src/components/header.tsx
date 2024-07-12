"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "@/components/ui/header-menu";
import { cn } from "@/utils/cn";
import '@/app/globals.css';
import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <div className="relative w-full flex items-center justify-center bg-black">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div className={cn("fixed top-5 inset-x-0 max-w-4xl mx-auto z-50", className)}>
      <div className="flex items-center space-x-4 bg-white p-2 rounded-full ">
        <Link href="/main">
          <Image
            src="/stegmaier.png" // Cambia este src por la ruta de tu imagen
            alt="Logo"
            width={150}
            height={60}
            className="cursor-pointer"
          />
        </Link>
        <Menu setActive={setActive}>
          <MenuItem setActive={setActive} active={active} item="Formularios">
            <div className="flex flex-col space-y-2 text-sm">
              <HoveredLink href="/ZeroTolerance">Tolerancia Cero</HoveredLink>
              <HoveredLink href="/IncidentOrAccident">Incidente o Accidente</HoveredLink>
            </div>
          </MenuItem>
          <MenuItem setActive={setActive} active={active} item="Buscador">
            <div className="flex flex-col space-y-2 text-sm">
              <HoveredLink href="/web-dev">Condición Subestándar</HoveredLink>
              <HoveredLink href="/seo">Incidente o Accidente</HoveredLink>
            </div>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}
