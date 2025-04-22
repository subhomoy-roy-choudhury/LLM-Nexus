export interface ModelInterface {
  id: string;
  name: string;
  provider: string;
  contextLength: number; // in tokens
  inputPricePerM: number; // price per million tokens in USD
  outputPricePerM: number; // price per million tokens in USD
  releaseDate: string; // YYYY-MM-DD
  parameters: string; // e.g. "7B", "175B"
  tags: string[];
  description: string;
  mode: string; // e.g. "chat"
  litellmProvider?: string; // original provider if through litellm
}
