import { useRef, useState, useCallback } from 'react';
import { useRealtimeTracking } from '../hooks/useRealtimeTracking';
import { useTimeSpent } from '../hooks/useTimeSpent';
import { trackAnswer } from '../services/trackingService';
import LoadingScreen from '../components/ui/LoadingScreen';
import ScrollProgress from '../components/ui/ScrollProgress';
import AmbientLove from '../components/ui/AmbientLove';
import MusicPlayer from '../components/ui/MusicPlayer';
import HeroSection from '../components/sections/HeroSection';
import StorySection from '../components/sections/StorySection';
import GallerySection from '../components/sections/GallerySection';
import TimelineSection from '../components/sections/TimelineSection';
import ReasonsSection from '../components/sections/ReasonsSection';
import LetterSection from '../components/sections/LetterSection';
import CountdownSection from '../components/sections/CountdownSection';
import ProposalSection from '../components/sections/ProposalSection';
import CeremonySection from '../components/sections/CeremonySection';

export default function HomePage() {
  const { track } = useRealtimeTracking('home');
  const [started, setStarted] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);
  const [letterOpened, setLetterOpened] = useState(false);
  const [showProposal, setShowProposal] = useState(false);
  const [showCeremony, setShowCeremony] = useState(false);
  const [loading, setLoading] = useState(true);
  const sectionRefs = {
    hero: useRef(null),
    story1: useRef(null),
    story2: useRef(null),
    gallery: useRef(null),
    timeline: useRef(null),
    reasons: useRef(null),
    letter: useRef(null),
    countdown: useRef(null),
    proposal: useRef(null),
    ceremony: useRef(null),
  };

  useTimeSpent((seconds) => {
    track('time_spent', { seconds });
  });

  const scrollToSection = useCallback((refKey) => {
    const el = sectionRefs[refKey]?.current;
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  const handleAnswer = useCallback(async (answer) => {
    if (answer === 'yes') {
      track('answer_yes');
      setShowCeremony(true);
      setTimeout(() => scrollToSection('ceremony'), 100);
    } else {
      track('answer_no');
      await trackAnswer(answer);
      window.location.href = '/thank-you';
    }
  }, []);

  const handleCeremonyDone = useCallback(() => {
    window.location.href = '/success?name=Ratna';
  }, []);

  const handleCountdownComplete = useCallback(() => {
    setShowProposal(true);
    setTimeout(() => scrollToSection('proposal'), 100);
  }, []);

  return (
    <div className="overflow-x-hidden">
      <LoadingScreen onDone={() => setLoading(false)} />

      <ScrollProgress started={started} letterOpened={letterOpened} />

      <div className={loading ? 'hidden' : ''}>
        <AmbientLove />

      <div ref={sectionRefs.hero}>
        <HeroSection onStart={() => {
          setStarted(true);
          setMusicStarted(true);
          scrollToSection('story1');
        }} />
      </div>

      {started && (
        <>
          <div ref={sectionRefs.story1}>
            <StorySection part="all" />
          </div>

          <div ref={sectionRefs.gallery}>
            <GallerySection />
          </div>

          <div ref={sectionRefs.timeline}>
            <TimelineSection />
          </div>

          <div ref={sectionRefs.reasons}>
            <ReasonsSection />
          </div>

          <div ref={sectionRefs.letter}>
            <LetterSection onOpen={() => setLetterOpened(true)} />
          </div>

          {letterOpened && (
            <>
              <div ref={sectionRefs.countdown}>
                <CountdownSection onComplete={handleCountdownComplete} />
              </div>

              {showProposal && (
                <div ref={sectionRefs.proposal}>
                  <ProposalSection onAnswer={handleAnswer} />
                </div>
              )}

              {showCeremony && (
                <div ref={sectionRefs.ceremony}>
                  <CeremonySection onDone={handleCeremonyDone} />
                </div>
              )}
            </>
          )}
        </>
      )}

      <MusicPlayer startOnPlay={musicStarted} />
      </div>
    </div>
  );
}
