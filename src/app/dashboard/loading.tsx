import React from 'react';
import { Loader } from '@/components/ui/Loader/Loader';

export default function DashboardLoading() {
  return (
    <Loader 
      message="Loading market data..." 
    />
  );
}
