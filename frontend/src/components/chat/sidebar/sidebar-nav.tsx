import { Link } from "react-router-dom";

import useConversation from "@/store/use-conversation";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface SidebarNavProps {
  link: {
    _id: string;
    name: string;
    username: string;
    profilePic: string;
    gender: string;
  };
  isCollapsed: boolean;
}

const SidebarNav = ({ link, isCollapsed }: SidebarNavProps) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  // @ts-ignore
  const isSelected = selectedConversation._id === link._id;

  return (
    <>
      {isCollapsed ? (
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger
              asChild
              onClick={() => setSelectedConversation(link)}
            >
              <Link
                to="#"
                className={cn(
                  buttonVariants({
                    variant: isSelected ? "grey" : "ghost",
                    size: "icon",
                  }),
                  "h-11 w-11 md:h-16 md:w-16 dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                )}
              >
                <Avatar className="flex justify-center items-center">
                  <AvatarImage
                    src={link.profilePic}
                    alt={link.profilePic}
                    width={6}
                    height={6}
                    className="w-10 h-10 "
                  />
                </Avatar>{" "}
                <span className="sr-only">{link.name}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="flex items-center gap-4">
              {link.name}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <Link
          to="#"
          className={cn(
            buttonVariants({
              variant: isSelected ? "grey" : "ghost",
              size: "xl",
            }),
            "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white shrink",
            "justify-start gap-4"
          )}
          onClick={() => setSelectedConversation(link)}
        >
          <Avatar className="flex justify-center items-center">
            <AvatarImage
              src={link.profilePic}
              alt={link.profilePic}
              width={6}
              height={6}
              className="w-10 h-10 "
            />
          </Avatar>
          <div className="flex flex-col max-w-28">
            <span className="capitalize">{link.name}</span>
          </div>
        </Link>
      )}
    </>
  );
};

export default SidebarNav;
