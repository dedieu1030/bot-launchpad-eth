
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCard } from "@/components/StatsCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";

// Pour démonstration seulement - serait normalement validé côté contrat
const ADMIN_ADDRESS = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";

export default function Admin() {
  const { address, isConnected } = useAccount();
  const navigate = useNavigate();
  
  // Vérifiez si l'utilisateur est admin
  const isAdmin = isConnected && address?.toLowerCase() === ADMIN_ADDRESS.toLowerCase();
  
  useEffect(() => {
    if (!isConnected) {
      toast.error("Veuillez connecter votre wallet", {
        icon: <AlertCircle className="h-4 w-4" />,
      });
      navigate("/");
      return;
    }
    
    if (!isAdmin) {
      toast.error("Accès non autorisé", {
        icon: <AlertCircle className="h-4 w-4" />,
      });
      navigate("/");
    }
  }, [isConnected, isAdmin, navigate]);
  
  if (!isAdmin) {
    return null;
  }
  
  // Données mockées pour la démo
  const platformStats = {
    totalUsers: 128,
    activeBotsCount: 87,
    totalEthInvested: 42.5,
    totalFeesCollected: 0.425,
    userConversionRate: 68,
  };
  
  const topBots = [
    { name: "DeFi Yield Optimizer", users: 45, volume: 18.3 },
    { name: "MEV Flash Bot", users: 24, volume: 12.7 },
    { name: "Arbitrage DEX Pro", users: 15, volume: 8.4 },
    { name: "Stablecoin Strategy", users: 3, volume: 3.1 },
  ];

  return (
    <Layout>
      <div className="container py-12">
        <h1 className="text-3xl font-medium mb-8">Administration</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard 
            title="Total utilisateurs" 
            value={platformStats.totalUsers} 
            type="info" 
          />
          <StatsCard 
            title="Bots actifs" 
            value={platformStats.activeBotsCount} 
            type="success" 
          />
          <StatsCard 
            title="ETH investis" 
            value={`${platformStats.totalEthInvested} ETH`} 
            type="default" 
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Section principale */}
          <div className="md:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Bots les plus populaires</CardTitle>
                <CardDescription>
                  Les bots avec le plus d'utilisateurs et de volume
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom du bot</TableHead>
                      <TableHead>Utilisateurs</TableHead>
                      <TableHead>Volume (ETH)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topBots.map((bot) => (
                      <TableRow key={bot.name}>
                        <TableCell className="font-medium">{bot.name}</TableCell>
                        <TableCell>{bot.users}</TableCell>
                        <TableCell>{bot.volume}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Activité quotidienne</CardTitle>
                <CardDescription>
                  Transactions et utilisateurs actifs sur les 7 derniers jours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted/30 rounded-md">
                  {/* Placeholder pour un futur graphique */}
                  <p className="text-sm text-muted-foreground">
                    Graphique d'activité à venir
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Revenus de la plateforme</CardTitle>
                <CardDescription>
                  Frais collectés par la plateforme (1%)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-4">
                  {platformStats.totalFeesCollected} ETH
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Taux de conversion</span>
                      <span>{platformStats.userConversionRate}%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Bots / utilisateur</span>
                      <span>1.23</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Revenu moyen / utilisateur</span>
                      <span>0.0033 ETH</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Dernières alertes</CardTitle>
                <CardDescription>
                  Événements nécessitant une attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-warning/10 border border-warning/20 rounded-md text-sm">
                    <p className="font-medium text-warning">3 transactions échouées</p>
                    <p className="text-muted-foreground mt-1 text-xs">
                      MEV Flash Bot - Hier à 15:42
                    </p>
                  </div>
                  <div className="p-3 bg-muted/50 border border-border rounded-md text-sm">
                    <p className="font-medium">Nouveau record de TVL</p>
                    <p className="text-muted-foreground mt-1 text-xs">
                      42.5 ETH - Aujourd'hui à 09:17
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
