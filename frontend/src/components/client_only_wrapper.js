'use client';

import {useIsClient} from '@uidotdev/usehooks';

export default function ClientOnlyWrapper({ children, fallback }) {
  const isClient = useIsClient();

  return isClient ? children : fallback;
}