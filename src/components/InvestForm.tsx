
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAccount } from "wagmi";
import { toast } from "sonner";

interface InvestFormProps {
  minInvestment: number;
  onSubmit: (amount: number) => void;
  isPending: boolean;
}

export function InvestForm({ minInvestment, onSubmit, isPending }: InvestFormProps) {
  const [amount, setAmount] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { isConnected } = useAccount();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const parsedAmount = parseFloat(amount);
    
    if (isNaN(parsedAmount)) {
      setError("Veuillez entrer un montant valide");
      return;
    }

    if (parsedAmount < minInvestment) {
      setError(`L'investissement minimum est de ${minInvestment} ETH`);
      return;
    }

    onSubmit(parsedAmount);
    toast.info(`Préparation de l'investissement de ${parsedAmount} ETH...`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="amount">Montant à investir (ETH)</Label>
        <div className="flex gap-2">
          <Input
            id="amount"
            type="number"
            placeholder={`${minInvestment} ETH minimum`}
            min={minInvestment}
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex-1"
            disabled={!isConnected || isPending}
          />
          <Button 
            type="submit"
            className="bg-primary hover:bg-primary/90"
            disabled={!isConnected || isPending || !amount}
          >
            {isPending ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                Chargement...
              </>
            ) : (
              "Investir"
            )}
          </Button>
        </div>
        {!isConnected && (
          <p className="text-sm text-muted-foreground mt-1">
            Connectez votre wallet pour investir
          </p>
        )}
        {error && (
          <Alert variant="destructive" className="mt-2">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="bg-muted/50 p-3 rounded-md text-xs mt-2">
          <p className="font-medium">1% de frais prélevés automatiquement</p>
          <p className="text-muted-foreground mt-1">
            Les frais servent à maintenir la plateforme et continuer son développement.
          </p>
        </div>
      </div>
    </form>
  );
}
