import { useMemo, useState } from 'react';
import Navbar, { NAV_ITEMS } from './Navbar';
import RobotScene, { SECTIONS } from './RobotScene';

function HomePage() {
  const [progress, setProgress] = useState(0);
  const isMobile = useMemo(() => window.matchMedia('(max-width: 768px)').matches, []);

  const activeSection = useMemo(() => {
    return [...SECTIONS].reverse().find((section) => progress >= section.stop) || SECTIONS[0];
  }, [progress]);

  return (
    <div className="home-page">
      <Navbar compact={progress > 0.08} />

      {isMobile ? (
        <div className="mobile-fallback">
          <div className="mobile-fallback__poster" />
          <div className="overlay-text">
            <h1>{activeSection.title}</h1>
            <p>{activeSection.body}</p>
          </div>
        </div>
      ) : (
        <>
          <div className="canvas-wrap">
            <RobotScene onProgress={setProgress} />
          </div>

          <div className="scroll-spacer" aria-hidden="true" />

          <div className="overlay-text">
            <h1>{activeSection.title}</h1>
            <p>{activeSection.body}</p>
          </div>
        </>
      )}

      {progress > 0.98 && (
        <div className="cta-floating-menu">
          {NAV_ITEMS.map((item) => (
            <button className="cta-btn" type="button" key={item}>
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
