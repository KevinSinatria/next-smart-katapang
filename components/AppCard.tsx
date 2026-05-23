"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { App } from "@/types";
import { useState } from "react";
import Image from "next/image";

interface AppCardProps {
  app: App;
  categoryName?: string;
}

export function AppCard({ app, categoryName }: AppCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <a
      href={app.visit_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full group"
    >
      <Card className="h-full border border-slate-200/80 hover:border-blue-300/60 transition-all duration-500 bg-white/80 backdrop-blur-sm card-gradient-border hover-glow rounded-2xl overflow-hidden">
        {/* Image container */}
        <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
          {!imageLoaded && (
            <div className="w-full h-full animate-pulse bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 animate-shimmer" />
          )}
          <Image
            src={app.image_url}
            alt={app.title}
            width={500}
            height={500}
            className={`w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ease-out ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
          {/* Visit indicator */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-blue-700 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400 shadow-lg">
            Kunjungi
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>

        <CardHeader className="space-y-3 pb-3">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 leading-snug">
              {app.title}
            </CardTitle>
            <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-all duration-300 shrink-0 mt-1 group-hover:rotate-12" />
          </div>
          {categoryName && (
            <Badge
              variant="secondary"
              className="w-fit bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 hover:from-blue-100 hover:to-indigo-100 border border-blue-100/50 font-medium text-xs"
            >
              {categoryName}
            </Badge>
          )}
        </CardHeader>

        <CardContent className="pt-0">
          <CardDescription className="text-slate-500 leading-relaxed line-clamp-3 text-sm">
            {app.description}
          </CardDescription>
        </CardContent>
      </Card>
    </a>
  );
}
