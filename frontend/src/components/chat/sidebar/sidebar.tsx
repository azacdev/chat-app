import { Link } from "react-router-dom";
import { LogOut, MoreHorizontal, Search, SquarePen } from "lucide-react";

import SidebarNav from "./sidebar-nav";
import { cn } from "@/lib/utils";
import GetLogout from "@/hooks/get-logout";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";

interface SidebarProps {
  isCollapsed: boolean;
  links: {
    _id: string;
    name: string;
    username: string;
    profilePic: string;
    gender: string;
  }[];
  onClick?: () => void;
  isMobile: boolean;
}

export function Sidebar({ links, isCollapsed }: SidebarProps) {
  const { logout } = GetLogout();

  return (
    <div
      data-collapsed={isCollapsed}
      className="relative group flex flex-col h-full gap-4 p-2 data-[collapsed=true]:p-2 "
    >
      <form className="flex items-center gap-2">
        <Input type="text" placeholder="Search..." className="text-black" />
        <Button type="submit">
          <Search />
        </Button>
      </form>
      {!isCollapsed && (
        <div className="flex justify-between p-2 items-center">
          <div className="flex gap-2 items-center text-2xl">
            <p className="font-medium">Chats</p>
            <span className="text-zinc-300">({links.length})</span>
          </div>

          <div>
            <Link
              to="#"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-9 w-9"
              )}
            >
              <MoreHorizontal size={20} />
            </Link>

            <Link
              to="#"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-9 w-9"
              )}
            >
              <SquarePen size={20} />
            </Link>
          </div>
        </div>
      )}

      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links &&
          links.map((link, index) => (
            <SidebarNav isCollapsed={isCollapsed} link={link} key={index} />
          ))}
      </nav>

      <div className="mt-auto p-2">
        <LogOut className="h-6 w-6 cursor-pointer" onClick={() => logout()} />
      </div>
    </div>
  );
}
