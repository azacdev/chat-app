import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Header } from "@/components/header";
import { BackButton } from "@/components/back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
}: CardWrapperProps) => {
  return (
    <Card className="w-full max-w-[500px] shadow-md bg-transparent border-none mx-auto">
      <CardHeader className="">
        <Header label={headerLabel} />
      </CardHeader>
      <BackButton href={backButtonHref} label={backButtonLabel} />
      <CardContent>{children}</CardContent>
    </Card>
  );
};
