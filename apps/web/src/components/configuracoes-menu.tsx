
import type React from "react";
import { useState } from "react";
import { Settings, ChevronDown, Check, Bot, Utensils, Heart, Car } from "lucide-react";
import { Button } from "@meusocialmedia/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@meusocialmedia/ui";
import { Badge } from "@meusocialmedia/ui";

interface Agent {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  color: string;
}

interface ConfiguracoesMenuProps {
  selectedAgent: string;
  onAgentChange: (agent: string) => void;
}

const agents: Agent[] = [
  {
    id: "geral",
    name: "Geral",
    icon: Bot,
    description: "Default assistant",
    color: "text-blue-500",
  },
  {
    id: "restaurante",
    name: "Restaurante",
    icon: Utensils,
    description: "Gastronomy specialist",
    color: "text-orange-500",
  },
  {
    id: "petshop",
    name: "Petshop",
    icon: Heart,
    description: "Pet care focused",
    color: "text-pink-500",
  },
  {
    id: "lavarapido",
    name: "Lava Rápido",
    icon: Car,
    description: "Automotive services specialist",
    color: "text-cyan-500",
  },
];

export function ConfiguracoesMenu({ selectedAgent, onAgentChange }: ConfiguracoesMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const currentAgent = agents.find((agent) => agent.name === selectedAgent) || agents[0];

  const handleAgentSelect = (agent: Agent) => {
    onAgentChange(agent.name);
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-between text-foreground hover:bg-muted transition-all duration-300 group"
        >
          <div className="flex items-center space-x-2">
            <Settings className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
            <span>Selecionar Agente</span>
          </div>
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-80 p-2 bg-background/95 backdrop-blur-sm border border-border/50 shadow-xl"
        align="start"
        side="top"
      >
        <DropdownMenuLabel className="text-sm font-medium text-muted-foreground px-2 py-1">
          Selecionar Agente
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border/50" />

        <div className="space-y-1">
          {agents.map((agent) => {
            const Icon = agent.icon;
            const isSelected = agent.name === selectedAgent;

            return (
              <DropdownMenuItem
                key={agent.id}
                className={`p-3 cursor-pointer rounded-lg transition-all duration-300 hover:bg-muted/80 focus:bg-muted/80 ${
                  isSelected ? "bg-primary/10 border border-primary/20" : ""
                }`}
                onClick={() => handleAgentSelect(agent)}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        isSelected ? "bg-primary/20" : "bg-muted/50"
                      }`}
                    >
                      <Icon
                        className={`h-4 w-4 transition-all duration-300 ${isSelected ? "text-primary" : agent.color}`}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span
                        className={`text-sm font-medium transition-colors duration-300 ${
                          isSelected ? "text-primary" : "text-foreground"
                        }`}
                      >
                        {agent.name}
                      </span>
                      <span className="text-xs text-muted-foreground">{agent.description}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {isSelected && (
                      <>
                        <Badge
                          variant="outline"
                          className="text-xs bg-primary/10 text-primary border-primary/30 animate-in fade-in duration-300"
                        >
                          Ativo
                        </Badge>
                        <Check className="h-4 w-4 text-primary animate-in zoom-in duration-300" />
                      </>
                    )}
                  </div>
                </div>
              </DropdownMenuItem>
            );
          })}
        </div>

        <DropdownMenuSeparator className="bg-border/50 my-2" />

        <div className="p-2">
          <div className="text-xs text-muted-foreground text-center">
            <p className="mb-1">Agente Atual:</p>
            <div className="flex items-center justify-center space-x-2">
              <currentAgent.icon className={`h-3 w-3 ${currentAgent.color}`} />
              <span className="font-medium text-foreground">{currentAgent.name}</span>
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
