import React, { lazy, Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface LazyComponentProps {
  importFunc: () => Promise<{ default: React.ComponentType<any> }>;
  fallback?: React.ReactNode;
  props?: any;
}

/**
 * LazyComponent - A wrapper for React.lazy with improved error handling
 * Use this for code splitting and lazy loading components
 */
export function LazyComponent({ 
  importFunc, 
  fallback = <Skeleton className="w-full h-40" />, 
  props = {} 
}: LazyComponentProps) {
  const LazyComp = lazy(importFunc);
  
  return (
    <Suspense fallback={fallback}>
      <LazyComp {...props} />
    </Suspense>
  );
}