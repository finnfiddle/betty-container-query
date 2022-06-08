import { useEffect, useRef, useCallback, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

export const getSmallestBreakpoint = (size, breakpoints) => {
  const sortedPairs = Object.entries(breakpoints)
    .sort(([, value1], [, value2]) => value2 - value1);

  const [smallestKey] = sortedPairs.reduce(([smallestKey, smallestValue], [key, value]) =>
      size < value ? [key, value] : [smallestKey, smallestValue]
    , sortedPairs[0])

  return smallestKey;
};

export const useContainerQuery = (container, breakpoints) => {
  const observer = useRef(null);
  const [currentBreakpoint, setCurrentBreakpoint] = useState();

  useEffect(() => {
    if (!container?.current || !currentBreakpoint) return;
    container.current.classList.remove(...Object.keys(breakpoints));
    container.current.classList.add(currentBreakpoint);
  }, [currentBreakpoint, breakpoints, container])

  const handleSetCurrentBreakpoint = useCallback((size) => {
    const smallest = getSmallestBreakpoint(size, breakpoints);
    setCurrentBreakpoint(smallest);
  }, [breakpoints]);

  const handleResize = useCallback((entry) => {
    if(entry.contentBoxSize) {
      // Firefox implements `contentBoxSize` as a single content rect, rather than an array
      const contentBoxSize = Array.isArray(entry.contentBoxSize) ? entry.contentBoxSize[0] : entry.contentBoxSize;
      handleSetCurrentBreakpoint(contentBoxSize.inlineSize);
    } else {
      const contentRect = Array.isArray(entry) ? entry[0].contentRect : entry.contentRect;
      handleSetCurrentBreakpoint(contentRect.width);
    }
  }, [handleSetCurrentBreakpoint]);

  const observe = useCallback(() => {
    if (container && container.current && observer.current) {
      observer.current.observe(container.current);
    }
  }, [container]);

  useEffect(() => {
    const current = container?.current;
    if (observer?.current && current) {
      observer.current.unobserve(current);
    }
    observer.current = new ResizeObserver(handleResize);
    observe();

    return () => {
      if (observer?.current && current) {
        observer.current.unobserve(current);
      }
    };
  }, [container, handleResize, observe]);

  return currentBreakpoint;
};


