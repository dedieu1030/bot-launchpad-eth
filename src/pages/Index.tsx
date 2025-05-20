
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useAccount } from "wagmi";
import { WalletConnectButton } from "@/components/WalletConnectButton";
import { Bot, getBots } from "@/services/botService";
import { BotCard } from "@/components/BotCard";
import { ArrowRight, Bot as BotIcon, Shield, Zap } from "lucide-react";

export default function Index() {
  const { isConnected } = useAccount();
  const featuredBots = getBots().slice(0, 2);

  return (
    <Layout>
      {/* Hero section */}
      <section className="py-20 px-4">
        <div className="container flex flex-col items-center text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-8">
            <BotIcon className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">
            Déployez votre bot Ethereum <span className="text-primary">sans code</span>
          </h1>
          <p className="text-xl max-w-2xl text-muted-foreground mb-8">
            Lancez des stratégies de trading automatisées sur Ethereum
            sans aucune compétence technique requise.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            {isConnected ? (
              <Link to="/models">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Voir les bots disponibles
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            ) : (
              <WalletConnectButton />
            )}
            <Link to="/dashboard">
              <Button size="lg" variant="outline">
                Accéder au tableau de bord
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured bots */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h2 className="text-3xl font-medium mb-2">Bots populaires</h2>
              <p className="text-muted-foreground max-w-xl">
                Nos stratégies les plus performantes, prêtes à être déployées en un seul clic.
              </p>
            </div>
            <Link to="/models" className="mt-4 md:mt-0">
              <Button variant="outline" className="flex items-center gap-2">
                Voir tous les bots
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredBots.map((bot: Bot) => (
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
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-medium mb-3">Simple, Sécurisé, Sans Code</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Notre plateforme permet à tous de profiter des opportunités du trading automatisé,
              sans connaissances techniques.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Déploiement en 1 clic</h3>
              <p className="text-muted-foreground">
                Sélectionnez un bot, investissez des ETH et démarrez-le immédiatement.
                Aucun code, aucune configuration complexe.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6">
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-success" />
              </div>
              <h3 className="text-xl font-medium mb-2">Sécurité maximale</h3>
              <p className="text-muted-foreground">
                Tous nos contrats sont audités et vos fonds restent sous votre contrôle.
                Retirez-les à tout moment.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <BotIcon className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-2">Stratégies optimisées</h3>
              <p className="text-muted-foreground">
                Des bots développés par des experts qui exploitent efficacement les
                opportunités du marché.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container flex flex-col items-center text-center">
          <h2 className="text-3xl font-medium mb-4">Prêt à démarrer?</h2>
          <p className="max-w-2xl mb-8">
            Déployez votre premier bot en quelques minutes et commencez à
            générer des rendements automatisés dès aujourd'hui.
          </p>
          <div className="flex gap-4">
            {isConnected ? (
              <Link to="/models">
                <Button variant="secondary" size="lg">
                  Voir les bots disponibles
                </Button>
              </Link>
            ) : (
              <WalletConnectButton />
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
