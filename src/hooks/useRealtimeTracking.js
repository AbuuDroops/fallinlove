import { useEffect, useState } from 'react';
import { createSession, trackEvent } from '../services/trackingService';

export function useRealtimeTracking(pageName) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    createSession().then(() => setReady(true));
  }, []);

  useEffect(() => {
    if (ready) {
      trackEvent('page_view', { page: pageName });
    }
  }, [pageName, ready]);

  const track = (eventType, payload) => trackEvent(eventType, payload);

  return { track };
}
