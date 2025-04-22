import React, { useState, useMemo } from "react";
// import { modelData } from "@/data/modelData";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ModelCard } from "@/components/ModelCard";
import { ModelInterface } from "@/types/model";

const modelData = [
  {
    id: "gpt4o",
    name: "GPT-4o",
    provider: "OpenAI",
    contextLength: 128000,
    inputPricePerM: 5.0,
    outputPricePerM: 15.0,
    releaseDate: "2024-05-13",
    parameters: "~1.8T",
    tags: ["Vision", "General Purpose", "High Performance"],
    description:
      "The most advanced model from OpenAI with vision capabilities and improved performance across tasks.",
    strengths: [
      "High reasoning ability",
      "Multimodal capabilities",
      "Instruction following",
    ],
    limitations: [
      "Expensive",
      "Training cutoff date",
      "Potential for hallucinations",
    ],
    maxInputTokens: 128000,
    maxOutputTokens: 16384,
    batchPricing: {
      inputPricePerM: 2.5,
      outputPricePerM: 7.5,
    },
    features: {
      functionCalling: true,
      parallelFunctionCalling: true,
      responseSchema: true,
      vision: true,
      promptCaching: true,
      systemMessages: true,
      toolChoice: true,
    },
    cacheReadInputPricePerM: 1.25,
    mode: "chat",
    litellmProvider: "openai",
  },
  {
    id: "gpt4",
    name: "GPT-4",
    provider: "OpenAI",
    contextLength: 8192,
    inputPricePerM: 10.0,
    outputPricePerM: 30.0,
    releaseDate: "2023-03-14",
    parameters: "~1T",
    tags: ["General Purpose", "High Performance"],
    description: "Powerful language model with strong reasoning capabilities.",
    strengths: [
      "Reasoning",
      "Following complex instructions",
      "General knowledge",
    ],
    limitations: [
      "Expensive",
      "No vision capabilities in base model",
      "Training cutoff date",
    ],
    maxInputTokens: 8192,
    maxOutputTokens: 16384,
    batchPricing: {
      inputPricePerM: 5.0,
      outputPricePerM: 15.0,
    },
    features: {
      functionCalling: true,
      parallelFunctionCalling: true,
      responseSchema: true,
      vision: false,
      promptCaching: true,
      systemMessages: true,
      toolChoice: true,
    },
    cacheReadInputPricePerM: 2.5,
    mode: "chat",
  },
];

const Index = () => {
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [contextRange, setContextRange] = useState<[number, number]>([
    0, 1000000,
  ]);
  const [showFreeMmodelsOnly, setShowFreeMmodelsOnly] = useState(false);

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedProviders.length > 0) count++;
    if (priceRange[0] > 0 || priceRange[1] < 100) count++;
    if (contextRange[0] > 0 || contextRange[1] < 1000000) count++;
    if (showFreeMmodelsOnly) count++;
    return count;
  }, [selectedProviders, priceRange, contextRange, showFreeMmodelsOnly]);

  // Filter models based on all criteria
  const filteredModels = useMemo(() => {
    return modelData.filter((model: ModelInterface) => {
      // Search filter
      if (
        searchQuery &&
        !model.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !model.provider.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !model.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Provider filter
      if (
        selectedProviders.length > 0 &&
        !selectedProviders.includes(model.provider)
      ) {
        return false;
      }

      // Price filter
      if (
        (model.outputPricePerM < priceRange[0] ||
          model.outputPricePerM > priceRange[1]) &&
        !(priceRange[1] === 100 && model.outputPricePerM > 100)
      ) {
        return false;
      }

      // Free models only filter
      if (showFreeMmodelsOnly && model.outputPricePerM > 0) {
        return false;
      }

      // Context length filter
      if (
        (model.contextLength < contextRange[0] ||
          model.contextLength > contextRange[1]) &&
        !(contextRange[1] === 1000000 && model.contextLength > 1000000)
      ) {
        return false;
      }

      return true;
    });
  }, [
    searchQuery,
    selectedProviders,
    priceRange,
    contextRange,
    showFreeMmodelsOnly,
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container max-w-6xl mx-auto py-12 px-4 space-y-8">
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-teal-500 text-transparent bg-clip-text">
              Discover LLM Models
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore and compare Language Learning Models to find the best
              tools for your AI projects
            </p>
          </div>

          <div className="space-y-6">
            {/* <div className="grid grid-cols-1 gap-4">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div> */}

            {/* <FilterBar
              selectedProviders={selectedProviders}
              setSelectedProviders={setSelectedProviders}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              contextRange={contextRange}
              setContextRange={setContextRange}
              showFreeMmodelsOnly={showFreeMmodelsOnly}
              setShowFreeMmodelsOnly={setShowFreeMmodelsOnly}
              activeFiltersCount={activeFiltersCount}
            /> */}

            {filteredModels.length > 0 ? (
              <>
                {/* <ComparisonChart models={filteredModels} /> */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredModels.map((model: ModelInterface) => (
                    <ModelCard key={model.id} model={model} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16 bg-muted/30 rounded-lg">
                <h3 className="text-lg font-medium">No models found</h3>
                <p className="text-muted-foreground mt-2">
                  Try adjusting your filters or search query
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
