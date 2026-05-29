
import type React from "react";
import { Button,Input,Card,Badge,Avatar, AvatarFallback,Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from '@meusocialmedia/ui';

import { useState, useRef, useEffect } from "react";
import {
  Send,
  Bot,
  User,
  Plus,
  Menu,
  LogOut,
  Sparkles,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Image,
  Music,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { ConfiguracoesMenu } from "@/components/configuracoes-menu";
import { useNavigate, useSearch } from "@tanstack/react-router";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  isTyping?: boolean;
}

interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
}

export default function ChatPage() {
  const navigate = useNavigate();

    {
      id: "1",
      content: "Olá! Sou seu assistente de IA para redes sociais. Como posso ajudá-lo hoje?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatSessions] = useState<ChatSession[]>([
    {
      id: "1",
      title: "Estratégia de Conteúdo",
      lastMessage: "Como criar posts virais?",
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: "2",
      title: "Análise de Engajamento",
      lastMessage: "Métricas do Instagram",
      timestamp: new Date(Date.now() - 7200000),
    },
    {
      id: "3",
      title: "Criação de Legendas",
      lastMessage: "Legendas para fitness",
      timestamp: new Date(Date.now() - 86400000),
    },
  ]);
  const [selectedAgent, setSelectedAgent] = useState("Geral");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    const typingMessage: Message = {
      id: "typing",
      content: "",
      role: "assistant",
      timestamp: new Date(),
      isTyping: true,
    };
    setMessages((prev) => [...prev, typingMessage]);

    setTimeout(() => {
      setMessages((prev) => prev.filter((msg) => msg.id !== "typing"));

      const responses = [
        "Ótima pergunta! Para criar conteúdo envolvente nas redes sociais, recomendo focar em storytelling autêntico e usar elementos visuais atrativos.",
        "Posso ajudá-lo a desenvolver uma estratégia de conteúdo personalizada. Que tipo de público você quer alcançar?",
        "Vou criar algumas sugestões de posts para você. Qual é o seu nicho principal?",
        "Excelente! Vamos trabalhar juntos para otimizar sua presença digital. Precisa de ajuda com que plataforma específica?",
      ];

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleLogout = () => {
    // Clear any stored user data if needed
    // localStorage.removeItem('userToken') // Example if you store tokens

    // Redirect to home page
    navigate({ to: "/" });
  };

  return (
    <div className="flex h-screen bg-background">
      <div
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-muted/30 border-r transform lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden"
              >
                ×
              </Button>
            </div>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Nova Conversa
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Conversas Recentes</h3>
            {chatSessions.map((session) => (
              <Card
                key={session.id}
                className="p-3 cursor-pointer hover:bg-muted/50 border-l-4 border-l-primary/20 hover:border-l-primary"
              >
                <div className="flex flex-col space-y-1">
                  <h4 className="text-sm font-medium truncate">{session.title}</h4>
                  <p className="text-xs text-muted-foreground truncate">{session.lastMessage}</p>
                  <span className="text-xs text-muted-foreground">
                    {formatTime(session.timestamp)}
                  </span>
                </div>
              </Card>
            ))}
          </div>

          <div className="p-4 border-t space-y-2">
            {/* Gallery Links */}
            <div className="space-y-1 mb-4">
              <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Galerias
              </h4>
              <Button
                variant="ghost"
                className="w-full justify-start text-foreground hover:bg-muted"
                onClick={() => navigate({ to: "/gallery/images" })}
              >
                <Image className="h-4 w-4 mr-2" />
                Galeria de Imagens
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-foreground hover:bg-muted"
                onClick={() => navigate({ to: "/gallery/audio" })}
              >
                <Music className="h-4 w-4 mr-2" />
                Galeria de Áudio
              </Button>
            </div>

            <ConfiguracoesMenu selectedAgent={selectedAgent} onAgentChange={setSelectedAgent} />
            <Button
              variant="ghost"
              className="w-full justify-start text-foreground hover:bg-muted"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-lg font-semibold">Assistente IA</h1>
                  <div className="flex items-center space-x-1">
                    <div className="h-2 w-2 bg-green-500 rounded-full" />
                    <span className="text-xs text-muted-foreground">Online</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-primary border-primary/20">
                {selectedAgent}
              </Badge>
              <ThemeToggle />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
              }`}
            >
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarFallback
                  className={
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }
                >
                  {message.role === "user" ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </AvatarFallback>
              </Avatar>

              <div
                className={`flex-1 max-w-3xl ${message.role === "user" ? "flex flex-col items-end" : ""}`}
              >
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground ml-12"
                      : "bg-muted mr-12"
                  }`}
                >
                  {message.isTyping ? (
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" />
                        <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce delay-100" />
                        <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce delay-200" />
                      </div>
                      <span className="text-sm text-muted-foreground">Digitando...</span>
                    </div>
                  ) : (
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  )}
                </div>

                <div
                  className={`flex items-center space-x-2 mt-2 text-xs text-muted-foreground ${
                    message.role === "user" ? "justify-end" : ""
                  }`}
                >
                  <span>{formatTime(message.timestamp)}</span>
                  {message.role === "assistant" && !message.isTyping && (
                    <div className="flex items-center space-x-1">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 hover:bg-muted"
                              onClick={() => copyMessage(message.content)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Copiar mensagem</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 hover:bg-muted"
                            >
                              <ThumbsUp className="h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Gostei</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 hover:bg-muted"
                            >
                              <ThumbsDown className="h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Não gostei</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t bg-background p-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative flex items-end space-x-2">
              <div className="flex-1 relative">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite sua mensagem..."
                  className="pr-12 py-3 text-base resize-none"
                  disabled={isLoading}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Sparkles className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="bg-primary text-primary-foreground hover:bg-primary/90 p-3"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Pressione Enter para enviar, Shift + Enter para nova linha
            </p>
          </div>
        </div>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
