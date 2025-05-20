
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Layout>
      <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] py-12 text-center">
        <h1 className="text-6xl font-medium mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Cette page n'existe pas ou a été déplacée
        </p>
        <Link to="/">
          <Button className="bg-primary hover:bg-primary/90">
            Retourner à l'accueil
          </Button>
        </Link>
      </div>
    </Layout>
  );
}
