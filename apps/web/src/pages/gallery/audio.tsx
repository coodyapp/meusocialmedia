
import { useState, useRef } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  ArrowLeft,
  Play,
  Pause,
  Download,
  Heart,
  Share,
  Trash2,
  Upload,
  Filter,
  List,
  Search,
  Volume2,
  Music,
} from "lucide-react";
import { Button } from "@meusocialmedia/ui";
import { Input } from "@meusocialmedia/ui";
import { Card, CardContent } from "@meusocialmedia/ui";
import { Badge } from "@meusocialmedia/ui";
import { Progress } from "@meusocialmedia/ui";
import { ThemeToggle } from "@/components/theme-toggle";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@meusocialmedia/ui";

interface AudioItem {
  id: string;
  title: string;
  description: string;
  duration: string;
  tags: string[];
  createdAt: Date;
  size: string;
  format: string;
  likes: number;
  isLiked: boolean;
}

export default function AudioGalleryPage() {
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [playProgress, setPlayProgress] = useState(0);

  const [audioFiles] = useState<AudioItem[]>([
    {
      id: "1",
      title: "Música de Fundo - Motivacional",
      description: "Track instrumental para posts fitness e motivacionais",
      duration: "2:45",
      tags: ["instrumental", "motivacional", "fitness"],
      createdAt: new Date(Date.now() - 3600000),
      size: "4.2 MB",
      format: "MP3",
      likes: 28,
      isLiked: true,
    },
    {
      id: "2",
      title: "Efeito Sonoro - Notificação",
      description: "Som para notificações e alerts em vídeos",
      duration: "0:03",
      tags: ["efeito", "notificacao", "alert"],
      createdAt: new Date(Date.now() - 7200000),
      size: "156 KB",
      format: "WAV",
      likes: 15,
      isLiked: false,
    },
    {
      id: "3",
      title: "Jingle - Podcast Intro",
      description: "Introdução musical para podcast de tecnologia",
      duration: "0:15",
      tags: ["jingle", "podcast", "tecnologia"],
      createdAt: new Date(Date.now() - 86400000),
      size: "891 KB",
      format: "MP3",
      likes: 42,
      isLiked: true,
    },
    {
      id: "4",
      title: "Música Ambiente - Relaxante",
      description: "Track suave para vídeos de lifestyle e bem-estar",
      duration: "3:20",
      tags: ["ambiente", "relaxante", "lifestyle"],
      createdAt: new Date(Date.now() - 172800000),
      size: "5.1 MB",
      format: "MP3",
      likes: 67,
      isLiked: false,
    },
    {
      id: "5",
      title: "Transição - Whoosh",
      description: "Efeito de transição para edição de vídeo",
      duration: "0:02",
      tags: ["transicao", "efeito", "edicao"],
      createdAt: new Date(Date.now() - 259200000),
      size: "89 KB",
      format: "WAV",
      likes: 19,
      isLiked: false,
    },
  ]);

  const filteredAudio = audioFiles.filter((audio) => {
    const matchesSearch =
      audio.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      audio.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      audio.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    if (selectedFilter === "all") return matchesSearch;
    return matchesSearch && audio.tags.includes(selectedFilter);
  });

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handlePlayPause = (audioId: string) => {
    if (currentlyPlaying === audioId) {
      setCurrentlyPlaying(null);
    } else {
      setCurrentlyPlaying(audioId);
      // Simulate progress
      setPlayProgress(0);
      const interval = setInterval(() => {
        setPlayProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setCurrentlyPlaying(null);
            return 0;
          }
          return prev + 2;
        });
      }, 100);
    }
  };

  const handleLike = (audioId: string) => {
    console.log("Liked audio:", audioId);
  };

  const handleDownload = (audio: AudioItem) => {
    console.log("Download audio:", audio.title);
  };

  const handleShare = (audio: AudioItem) => {
    console.log("Share audio:", audio.title);
  };

  const handleDelete = (audioId: string) => {
    console.log("Delete audio:", audioId);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Galeria de Áudio</h1>
              <p className="text-sm text-muted-foreground">
                {filteredAudio.length} arquivos de áudio encontrados
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Filters and Search */}
      <div className="border-b bg-muted/30 p-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center space-x-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar áudios..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
            >
              <option value="all">Todos</option>
              <option value="instrumental">Instrumental</option>
              <option value="efeito">Efeitos</option>
              <option value="jingle">Jingles</option>
              <option value="ambiente">Ambiente</option>
            </select>
          </div>
        </div>
      </div>

      {/* Audio Gallery */}
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-4">
            {filteredAudio.map((audio) => (
              <Card key={audio.id} className="p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      {currentlyPlaying === audio.id ? (
                        <Volume2 className="h-6 w-6 text-primary animate-pulse" />
                      ) : (
                        <Music className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>
                    <Button
                      size="sm"
                      className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full p-0"
                      onClick={() => handlePlayPause(audio.id)}
                    >
                      {currentlyPlaying === audio.id ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-sm mb-1">{audio.title}</h3>
                        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                          {audio.description}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleLike(audio.id)}
                              >
                                <Heart
                                  className={`h-4 w-4 ${audio.isLiked ? "fill-red-500 text-red-500" : ""}`}
                                />
                                <span className="ml-1 text-xs">{audio.likes}</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{audio.isLiked ? "Remover curtida" : "Curtir"}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDownload(audio)}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Download</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button size="sm" variant="ghost" onClick={() => handleShare(audio)}>
                                <Share className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Compartilhar</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDelete(audio.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Excluir</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>

                    {currentlyPlaying === audio.id && (
                      <div className="mb-3">
                        <Progress value={playProgress} className="h-2" />
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1 mb-3">
                      {audio.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center space-x-4">
                        <span>{audio.duration}</span>
                        <span>{audio.format}</span>
                        <span>{audio.size}</span>
                      </div>
                      <span>{formatDate(audio.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredAudio.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Music className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">Nenhum áudio encontrado</h3>
              <p className="text-muted-foreground">Tente ajustar os filtros ou termos de busca</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
