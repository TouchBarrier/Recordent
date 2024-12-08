// src/useIdleTimeout.js
import { useEffect } from 'react';

const useIdleTimeout = (onLogout, timeoutDuration = 600000) => {
  useEffect(() => {
    // Initialize timeout for idle detection
    const timeout = setTimeout(() => {
      onLogout(); // Call onLogout after inactivity period
    }, timeoutDuration);

    // Reset timeout whenever user interacts (mousemove or keydown)
    const resetTimeout = () => clearTimeout(timeout);

    // Add event listeners for user interaction
    window.addEventListener('mousemove', resetTimeout);
    window.addEventListener('keydown', resetTimeout);

    // Cleanup the event listeners and timeout when component unmounts
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', resetTimeout);
      window.removeEventListener('keydown', resetTimeout);
    };
  }, [onLogout, timeoutDuration]); // Re-run effect if `onLogout` or `timeoutDuration` changes

};

export default useIdleTimeout;
