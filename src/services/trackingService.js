import { supabase } from './supabaseClient';

let sessionId = null;

export async function createSession() {
  const { data, error } = await supabase
    .from('sessions')
    .insert({})
    .select('id')
    .single();

  if (error) {
    console.warn('Tracking unavailable:', error.message);
    return null;
  }

  sessionId = data.id;
  return sessionId;
}

export async function trackEvent(eventType, payload = {}) {
  if (!sessionId) return;

  const { error } = await supabase.from('events').insert({
    session_id: sessionId,
    event_type: eventType,
    payload,
  });

  if (error) {
    console.warn('Failed to track event:', error.message);
  }
}

export async function trackAnswer(answer) {
  if (!sessionId) {
    console.warn('No session — cannot track answer');
    return;
  }

  const { error } = await supabase.from('answers').insert({
    session_id: sessionId,
    answer,
  });

  if (error) {
    console.warn('Failed to track answer:', error.message);
  }
}
