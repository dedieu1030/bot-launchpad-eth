
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PlayCircle } from "lucide-react";

interface BotCardProps {
  id: string;
  name: string;
  slug: string;
  description: string;
  minInvestment: number;
}

export function BotCard({ id, name, slug, description, minInvestment }: BotCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/model/${slug}`);
  };

  return (
    <Card className="w-full transition-all duration-300 hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-primary/10">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-2 text-sm">
          <span className="text-muted-foreground">Investissement min.</span>
          <span className="font-medium">{minInvestment} ETH</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleClick} className="w-full bg-primary hover:bg-primary/90">
          <PlayCircle className="mr-2 h-4 w-4" />
          Démarrer ce bot
        </Button>
      </CardFooter>
    </Card>
  );
}
