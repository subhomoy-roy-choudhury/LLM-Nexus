import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ModelInterface } from "@/types/model";
// import { ProviderIcon } from "./ProviderIcon";

interface ModelCardProps {
  model: ModelInterface;
}

export const ModelCard: React.FC<ModelCardProps> = ({ model }) => {
  const formatPrice = (price: number) => {
    if (price === 0) return "Free";
    return `$${price.toFixed(2)}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const formatContextLength = (length: number) => {
    if (length >= 1000000) {
      return `${(length / 1000000).toFixed(1)}M tokens`;
    } else if (length >= 1000) {
      return `${(length / 1000).toFixed(0)}K tokens`;
    }
    return `${length} tokens`;
  };

  return (
    <Card className="card-hover-effect">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              {/* <ProviderIcon provider={model.provider} className="w-5 h-5" /> */}
              <span className="text-sm text-muted-foreground">
                {model.provider}
              </span>
            </div>
            <CardTitle className="mt-1">{model.name}</CardTitle>
          </div>
          <Badge variant="outline" className="text-xs">
            {model.parameters}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {model.description}
        </p>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground text-xs">Context Length</p>
            <p className="font-medium">
              {formatContextLength(model.contextLength)}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Released</p>
            <p className="font-medium">{formatDate(model.releaseDate)}</p>
          </div>
        </div>

        <Separator className="my-3" />

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground text-xs">Input Price</p>
            <p className="font-medium">{formatPrice(model.inputPricePerM)}/M</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Output Price</p>
            <p className="font-medium">
              {formatPrice(model.outputPricePerM)}/M
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex flex-wrap gap-1">
        {model.tags.map((tag: string) => (
          <Badge key={tag} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  );
};

export default ModelCard;
