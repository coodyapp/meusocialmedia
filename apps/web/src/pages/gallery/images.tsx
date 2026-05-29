
import { useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";

import {
  ArrowLeft,
  Download,
  Heart,
  Share,
  Trash2,
  Upload,
  Filter,
  Grid,
  List,
  Search,
} from "lucide-react";
import { Button } from "@meusocialmedia/ui";
import { Input } from "@meusocialmedia/ui";
import { Card, CardContent } from "@meusocialmedia/ui";
import { Badge } from "@meusocialmedia/ui";
import { Avatar, AvatarFallback } from "@meusocialmedia/ui";
import { ThemeToggle } from "@/components/theme-toggle";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@meusocialmedia/ui";

interface ImageItem {
  id: string;
  url: string;
  title: string;
  description: string;
  tags: string[];
  createdAt: Date;
  size: string;
  dimensions: string;
  likes: number;
  isLiked: boolean;
}

export default function ImageGalleryPage() {
  
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const [images] = useState<ImageItem[]>([
    {
      id: "1",
      url: "/images/sample1.jpg",
      title: "Post para Instagram - Fitness",
      description: "Imagem motivacional para academia com overlay de texto",
      tags: ["fitness", "motivacional", "instagram"],
      createdAt: new Date(Date.now() - 3600000),
      size: "2.4 MB",
      dimensions: "1080x1080",
      likes: 15,
      isLiked: false,
    },
    {
      id: "2",
      url: "/images/sample2.jpg",
      title: "Banner para Facebook",
      description: "Design promocional para evento",
      tags: ["facebook", "evento", "promocional"],
      createdAt: new Date(Date.now() - 7200000),
      size: "1.8 MB",
      dimensions: "1200x630",
      likes: 23,
      isLiked: true,
    },
    {
      id: "3",
      url: "/images/sample3.jpg",
      title: "Story para Instagram",
      description: "Template de stories para marca",
      tags: ["instagram", "story", "marca"],
      createdAt: new Date(Date.now() - 86400000),
      size: "956 KB",
      dimensions: "1080x1920",
      likes: 8,
      isLiked: false,
    },
    {
      id: "4",
      url: "/images/sample4.jpg",
      title: "Capa para YouTube",
      description: "Design de capa para canal",
      tags: ["youtube", "capa", "canal"],
      createdAt: new Date(Date.now() - 172800000),
      size: "3.1 MB",
      dimensions: "2560x1440",
      likes: 31,
      isLiked: true,
    },
  ]);

  const filteredImages = images.filter((image) => {
    const matchesSearch =
      image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      image.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      image.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    if (selectedFilter === "all") return matchesSearch;
    return matchesSearch && image.tags.includes(selectedFilter);
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

  const handleLike = (imageId: string) => {
    // Handle like functionality
    console.log("Liked image:", imageId);
  };

  const handleDownload = (image: ImageItem) => {
    // Handle download functionality
    console.log("Download image:", image.title);
  };

  const handleShare = (image: ImageItem) => {
    // Handle share functionality
    console.log("Share image:", image.title);
  };

  const handleDelete = (imageId: string) => {
    // Handle delete functionality
    console.log("Delete image:", imageId);
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
              <h1 className="text-2xl font-bold text-foreground">Galeria de Imagens</h1>
              <p className="text-sm text-muted-foreground">
                {filteredImages.length} imagens encontradas
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
                placeholder="Buscar imagens..."
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
              <option value="instagram">Instagram</option>
              <option value="facebook">Facebook</option>
              <option value="youtube">YouTube</option>
              <option value="fitness">Fitness</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Gallery Content */}
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredImages.map((image) => (
                <Card key={image.id} className="group hover:shadow-lg transition-shadow">
                  <div className="relative aspect-square overflow-hidden rounded-t-lg">
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground">Imagem {image.id}</span>
                    </div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => handleLike(image.id)}
                            >
                              <Heart
                                className={`h-4 w-4 ${image.isLiked ? "fill-red-500 text-red-500" : ""}`}
                              />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{image.isLiked ? "Remover curtida" : "Curtir"}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => handleDownload(image)}
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
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => handleShare(image)}
                            >
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
                              variant="destructive"
                              onClick={() => handleDelete(image.id)}
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
                  <CardContent className="p-4">
                    <h3 className="font-medium text-sm mb-2 line-clamp-2">{image.title}</h3>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                      {image.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {image.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {image.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{image.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{image.dimensions}</span>
                      <div className="flex items-center space-x-1">
                        <Heart className="h-3 w-3" />
                        <span>{image.likes}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredImages.map((image) => (
                <Card key={image.id} className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-xs text-muted-foreground">IMG</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm mb-1">{image.title}</h3>
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                        {image.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {image.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                          {image.dimensions} • {image.size}
                        </span>
                        <span>{formatDate(image.createdAt)}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="ghost" onClick={() => handleLike(image.id)}>
                        <Heart
                          className={`h-4 w-4 ${image.isLiked ? "fill-red-500 text-red-500" : ""}`}
                        />
                        <span className="ml-1">{image.likes}</span>
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDownload(image)}>
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleShare(image)}>
                        <Share className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDelete(image.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">Nenhuma imagem encontrada</h3>
              <p className="text-muted-foreground">Tente ajustar os filtros ou termos de busca</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
