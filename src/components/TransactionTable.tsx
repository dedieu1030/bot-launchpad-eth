import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, XCircle } from "lucide-react";

interface Transaction {
  id: string;
  hash: string;
  type: 'deposit' | 'withdraw' | 'start' | 'stop';
  amount?: number;
  timestamp: number;
  status: 'pending' | 'confirmed' | 'failed';
  botId: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
  emptyMessage?: string;
}

export function TransactionTable({ transactions, emptyMessage = "Aucune transaction" }: TransactionTableProps) {
  if (!transactions.length) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status: Transaction['status']) => {
    switch (status) {
      case 'confirmed':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300 flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Confirmé</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300 flex items-center gap-1"><Clock className="h-3 w-3" /> En attente</Badge>;
      case 'failed':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300 flex items-center gap-1"><XCircle className="h-3 w-3" /> Échoué</Badge>;
    }
  };

  const getTypeLabel = (type: Transaction['type']) => {
    switch (type) {
      case 'deposit':
        return 'Dépôt';
      case 'withdraw':
        return 'Retrait';
      case 'start':
        return 'Démarrage';
      case 'stop':
        return 'Arrêt';
    }
  };

  const formatHash = (hash: string) => {
    return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
  };

  return (
    <Table>
      <TableCaption>Historique des transactions</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Montant</TableHead>
          <TableHead>Hash</TableHead>
          <TableHead className="text-right">Statut</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell className="font-medium">{formatDate(transaction.timestamp)}</TableCell>
            <TableCell>{getTypeLabel(transaction.type)}</TableCell>
            <TableCell>{transaction.amount ? `${transaction.amount} ETH` : '-'}</TableCell>
            <TableCell>
              <a 
                href={`https://etherscan.io/tx/${transaction.hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {formatHash(transaction.hash)}
              </a>
            </TableCell>
            <TableCell className="text-right">{getStatusBadge(transaction.status)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
