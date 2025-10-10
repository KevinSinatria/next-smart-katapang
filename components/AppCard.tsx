'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';
import { App } from '@/types';
import { useState } from 'react';

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
      <Card className="h-full border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-white">
        <div className="aspect-video w-full overflow-hidden rounded-t-xl bg-slate-100">
          {!imageLoaded && (
            <div className="w-full h-full animate-pulse bg-slate-200"></div>
          )}
          <img
            src={app.image_url}
            alt={app.title}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
        </div>

        <CardHeader className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
              {app.title}
            </CardTitle>
            <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors flex-shrink-0 mt-1" />
          </div>
          {categoryName && (
            <Badge variant="secondary" className="w-fit bg-blue-50 text-blue-700 hover:bg-blue-100">
              {categoryName}
            </Badge>
          )}
        </CardHeader>

        <CardContent>
          <CardDescription className="text-slate-600 leading-relaxed line-clamp-3">
            {app.description}
          </CardDescription>
        </CardContent>
      </Card>
    </a>
  );
}
