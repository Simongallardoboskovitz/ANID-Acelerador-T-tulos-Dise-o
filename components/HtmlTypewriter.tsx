import React, { useState, useEffect, useRef, useContext } from 'react';
import { DevModeContext } from '../contexts/DevModeContext';

interface HtmlTypewriterProps {
  htmlContent: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

const HtmlTypewriter: React.FC<HtmlTypewriterProps> = ({ htmlContent, speed = 15, className = '', onComplete }) => {
  const [displayedContent, setDisplayedContent] = useState('');
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete; // Keep ref updated with the latest callback
  const { devMode } = useContext(DevModeContext);

  useEffect(() => {
    // If in dev mode, display content immediately and finish.
    if (devMode) {
      setDisplayedContent(htmlContent);
      if (onCompleteRef.current) {
        onCompleteRef.current();
      }
      return;
    }

    // This effect should only run when the content itself changes.
    // When parent re-renders with a new `onComplete` function, this effect will not re-run.
    setDisplayedContent(''); // Reset on content change
    if (!htmlContent) {
        if(onCompleteRef.current) onCompleteRef.current();
        return;
    };

    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex >= htmlContent.length) {
        clearInterval(intervalId);
        if (onCompleteRef.current) {
          onCompleteRef.current();
        }
        return;
      }

      const char = htmlContent[currentIndex];
      let nextSegment = char;

      // If it's a tag or an entity, consume the whole thing at once
      if (char === '<' || char === '&') {
        const endChar = char === '<' ? '>' : ';';
        const endIndex = htmlContent.indexOf(endChar, currentIndex);
        if (endIndex !== -1) {
          nextSegment = htmlContent.substring(currentIndex, endIndex + 1);
        }
      }
      
      setDisplayedContent((prev) => prev + nextSegment);
      currentIndex += nextSegment.length;

    }, speed);

    return () => clearInterval(intervalId);
  }, [htmlContent, speed, devMode]); // devMode is now a dependency

  return <div className={className} dangerouslySetInnerHTML={{ __html: displayedContent }} />;
};

export default HtmlTypewriter;
