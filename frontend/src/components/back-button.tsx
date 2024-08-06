import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
interface BackButtonProps {
  href: string;
  label: string;
}

export const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <Button variant={"link"} className="font-normal w-full justify-start pl-6">
      <Link to={href}>{label}</Link>
    </Button>
  );
};
