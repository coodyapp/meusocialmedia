import { X, Play, Volume2, Maximize2, Settings, VolumeX } from "lucide-react";
import { Button, Card, Badge } from "@meusocialmedia/ui";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DemoModal({ isOpen, onClose }: DemoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Content - Video Only */}
      <Card className="relative w-full max-w-5xl mx-4 h-[80vh] bg-black/95 backdrop-blur-xl border-0 shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 h-8 w-8 p-0 bg-black/50 hover:bg-black/70 text-white rounded-full"
        >
          <X className="h-4 w-4" />
        </Button>

        {/* Video Container */}
        <div className="relative w-full h-full bg-black group">
          {/* Video Placeholder */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 flex items-center justify-center">
            <div className="text-center space-y-6">
              <div className="relative">
                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm border border-white/20">
                  <Play className="h-10 w-10 text-white ml-1" />
                </div>
                <div className="absolute inset-0 w-24 h-24 bg-white/5 rounded-full animate-ping mx-auto" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-medium text-white">Demo do SocialAI</h3>
                <p className="text-white/80 max-w-md text-lg">
                  Veja como nossos agentes de IA criam conteúdo incrível para suas redes sociais
                </p>
                <Badge
                  variant="outline"
                  className="bg-white/10 text-white border-white/20 backdrop-blur-sm"
                >
                  Duração: 3:45
                </Badge>
              </div>
            </div>
          </div>

          {/* Video Controls Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {/* Main Controls */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <Button
                  size="lg"
                  variant="ghost"
                  className="text-white hover:bg-white/20 h-12 w-12 rounded-full"
                >
                  <Play className="h-6 w-6" />
                </Button>
                <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                  <Volume2 className="h-4 w-4" />
                </Button>
                <div className="text-white text-sm font-medium">
                  <span>0:00</span>
                  <span className="text-white/60 mx-2">/</span>
                  <span>3:45</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                  <Settings className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-white/20 rounded-full h-2 cursor-pointer">
              <div className="bg-primary h-2 rounded-full w-0 transition-all duration-300 relative">
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            {/* Volume Control */}
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center space-x-2">
                <VolumeX className="h-4 w-4 text-white/60" />
                <div className="w-20 bg-white/20 rounded-full h-1">
                  <div className="bg-white h-1 rounded-full w-3/4" />
                </div>
                <Volume2 className="h-4 w-4 text-white" />
              </div>
              <div className="text-white/60 text-xs">HD 1080p</div>
            </div>
          </div>

          {/* Loading Animation */}
          <div className="absolute top-6 left-6">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-100" />
              <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-200" />
            </div>
          </div>

          {/* Video Title Overlay */}
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2">
              <h4 className="text-white font-medium text-sm">SocialAI - Demonstração Completa</h4>
            </div>
          </div>

          {/* Keyboard Shortcuts Hint */}
          <div className="absolute bottom-20 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-1000">
            <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-white/80">
              <div>Espaço: Play/Pause</div>
              <div>F: Tela cheia</div>
              <div>Esc: Fechar</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
