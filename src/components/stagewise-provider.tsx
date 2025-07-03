'use client';

import { useEffect } from 'react';
import { setupStagewise } from '@/lib/stagewise';

export function StagewiseProvider() {
  useEffect(() => {
    setupStagewise();
  }, []);

  return null;
} 