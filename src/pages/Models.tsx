
import { Layout } from "@/components/Layout";
import { BotCard } from "@/components/BotCard";
import { Bot, getBots } from "@/services/botService";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Models() {
  const allBots = getBots();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBots = allBots.filter((bot) =>
    bot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bot.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="container py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-medium mb-2">Modèles de bots</h1>
            <p className="text-muted-foreground">
              Choisissez parmi nos stratégies pré-configurées et lancez votre bot en quelques clics.
            </p>
          </div>
          <div className="w-full md:w-64 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un bot..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {filteredBots.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Aucun bot trouvé pour "{searchTerm}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBots.map((bot: Bot) => (
              <BotCard
                key={bot.id}
                id={bot.id}
                name={bot.name}
                slug={bot.slug}
                description={bot.description}
                minInvestment={bot.minInvestment}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
