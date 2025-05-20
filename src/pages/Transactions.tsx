
import { Layout } from "@/components/Layout";
import { TransactionTable } from "@/components/TransactionTable";
import { getTransactions } from "@/services/botService";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Transactions() {
  const allTransactions = getTransactions();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Appliquer les filtres
  const filteredTransactions = allTransactions.filter(transaction => {
    // Filtre par statut
    if (statusFilter !== "all" && transaction.status !== statusFilter) {
      return false;
    }
    
    // Filtre par type
    if (typeFilter !== "all" && transaction.type !== typeFilter) {
      return false;
    }
    
    // Filtre par recherche (appliqué au hash)
    if (searchTerm && !transaction.hash.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  return (
    <Layout>
      <div className="container py-12">
        <h1 className="text-3xl font-medium mb-8">Historique des transactions</h1>
        
        {/* Filtres */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div>
            <Label htmlFor="status-filter" className="mb-2 block">Filtre par statut</Label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger id="status-filter">
                <SelectValue placeholder="Tous les statuts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="confirmed">Confirmé</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="failed">Échoué</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="type-filter" className="mb-2 block">Filtre par type</Label>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger id="type-filter">
                <SelectValue placeholder="Tous les types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="deposit">Dépôt</SelectItem>
                <SelectItem value="withdraw">Retrait</SelectItem>
                <SelectItem value="start">Démarrage</SelectItem>
                <SelectItem value="stop">Arrêt</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="search" className="mb-2 block">Recherche par hash</Label>
            <Input
              id="search"
              placeholder="Rechercher un hash..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {/* Tableau de transactions */}
        <TransactionTable 
          transactions={filteredTransactions}
          emptyMessage="Aucune transaction ne correspond à vos filtres"
        />
      </div>
    </Layout>
  );
}
