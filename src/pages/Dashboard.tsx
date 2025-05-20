
import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCard } from "@/components/StatsCard";
import { Button } from "@/components/ui/button";
import { TransactionTable } from "@/components/TransactionTable";
import { getTransactions } from "@/services/botService";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const transactions = getTransactions();
  const [earnings, setEarnings] = useState(0);
  const [invested, setInvested] = useState(0);
  
  // Simulons quelques données changeantes pour l'effet
  useEffect(() => {
    // Simulons des gains qui augmentent périodiquement
    const interval = setInterval(() => {
      setEarnings(prev => {
        const increment = Math.random() * 0.0001;
        return prev + increment;
      });
    }, 5000);
    
    // Valeurs initiales
    setEarnings(0.032);
    setInvested(0.5);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <div className="container py-12">
        <h1 className="text-3xl font-medium mb-8">Tableau de bord</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard 
            title="Balance totale" 
            value={`${(invested + earnings).toFixed(4)} ETH`} 
            description="Investissement initial + gains" 
            type="info" 
            icon="activity" 
          />
          <StatsCard 
            title="Investissement initial" 
            value={`${invested.toFixed(4)} ETH`} 
            type="default" 
          />
          <StatsCard 
            title="Gains générés" 
            value={`+${earnings.toFixed(4)} ETH`} 
            description="Depuis le lancement" 
            type="success" 
            icon="up" 
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Section principale avec les transactions récentes */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Transactions récentes</CardTitle>
                  <CardDescription>
                    Les 5 dernières transactions
                  </CardDescription>
                </div>
                <Link to="/transactions">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    Voir tout
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <TransactionTable 
                  transactions={transactions.slice(0, 5)}
                  emptyMessage="Aucune transaction récente" 
                />
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar avec les bots actifs et performance */}
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Statut du bot</CardTitle>
                <CardDescription>
                  État actuel de votre bot DeFi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">DeFi Yield Optimizer</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
                      Actif
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Temps d'exécution</span>
                      <span>3 jours</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Transactions exécutées</span>
                      <span>17</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Performance</span>
                      <span className="text-success">+6.4%</span>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <Link to="/model/defi-yield-optimizer">
                      <Button variant="outline" className="w-full">
                        Gérer ce bot
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Performance</CardTitle>
                <CardDescription>
                  Vos rendements au fil du temps
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center bg-muted/30 rounded-md">
                  {/* Placeholder pour un futur graphique */}
                  <p className="text-sm text-muted-foreground">
                    Graphique de performance à venir
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
