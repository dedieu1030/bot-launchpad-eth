
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { InvestForm } from "@/components/InvestForm";
import { StartButton } from "@/components/StartButton";
import { WithdrawButton } from "@/components/WithdrawButton";
import { Bot, getBot } from "@/services/botService";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, AlertCircle, Dot } from "lucide-react";
import { useContract } from "@/hooks/useContract";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";

export default function ModelDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const bot = getBot(slug || "");
  
  const { 
    balance, 
    isRunning, 
    invest, 
    start, 
    withdraw,
    isInvesting,
    isStarting,
    isWithdrawing
  } = useContract(bot?.contractAddress || "");

  if (!bot) {
    return (
      <Layout>
        <div className="container py-12">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Ce bot n'existe pas. Veuillez vérifier l'URL ou retourner à la liste des bots.
            </AlertDescription>
          </Alert>
          <div className="mt-4">
            <Button onClick={() => navigate("/models")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux bots
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const handleInvest = (amount: number) => {
    invest(amount);
    toast.success(`Investissement de ${amount} ETH en cours`);
  };

  const handleStart = () => {
    start();
    toast.success("Démarrage du bot en cours");
  };

  const handleWithdraw = () => {
    withdraw();
    toast.success("Retrait des fonds en cours");
  };

  return (
    <Layout>
      <div className="container py-12">
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={() => navigate("/models")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux bots
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Informations sur le bot */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">{bot.name}</CardTitle>
                  <div className="flex items-center">
                    <Dot className={`h-6 w-6 ${isRunning ? "text-success" : "text-muted-foreground"}`} />
                    <span className="text-sm font-medium">{isRunning ? "Actif" : "Inactif"}</span>
                  </div>
                </div>
                <CardDescription className="text-base">{bot.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Investissement minimum</h3>
                      <p className="text-lg font-medium">{bot.minInvestment} ETH</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Rendement estimé</h3>
                      <p className="text-lg font-medium text-success">{bot.yield}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Balance actuelle</h3>
                    <p className="text-2xl font-medium">{balance} ETH</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>À propos de cette stratégie</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Le {bot.name} est conçu pour générer des rendements constants tout en minimisant les risques. 
                  Cette stratégie automatisée utilise des algorithmes sophistiqués pour identifier et exploiter 
                  les opportunités du marché.
                </p>
                <p>
                  Une fois le bot démarré, il fonctionnera de manière autonome et vous pourrez suivre ses performances 
                  depuis votre tableau de bord. Vous pouvez retirer vos fonds à tout moment.
                </p>
                <div className="bg-muted/50 p-4 rounded-md">
                  <h4 className="font-medium mb-2">Fonctionnement des frais</h4>
                  <p className="text-sm text-muted-foreground">
                    Des frais de 1% sont prélevés automatiquement sur les montants investis. 
                    Ces frais permettent de maintenir la plateforme et de continuer à développer 
                    de nouvelles stratégies.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Formulaire et actions */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Investir et lancer</CardTitle>
                <CardDescription>
                  Investissez un montant et démarrez le bot
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <InvestForm
                  minInvestment={bot.minInvestment}
                  onSubmit={handleInvest}
                  isPending={isInvesting}
                />
                
                <div className="flex flex-col gap-4 pt-4 border-t">
                  <StartButton 
                    onClick={handleStart} 
                    isPending={isStarting} 
                    status={isRunning ? 'active' : 'inactive'} 
                  />
                  
                  <WithdrawButton 
                    onClick={handleWithdraw} 
                    isPending={isWithdrawing} 
                    balance={balance} 
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
