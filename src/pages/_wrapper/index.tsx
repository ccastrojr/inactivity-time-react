import React, { useEffect, useState } from 'react';

const Wrapper: React.FC = ({ children }) => {
  // Set to interval you want
  const [waitingTime, setWaitingTime] = useState(10000);

  // const { user } = yourAuthHook;
  const user = { name: 'Cláudio Castro' };

  let inactivityTime: NodeJS.Timeout;

  const logout = () => {
    alert('You have been logged out');
  };

  const setTimeouts = () => {
    inactivityTime = setTimeout(logout, waitingTime);
  };

  const clearTimeouts = () => {
    if (inactivityTime) clearTimeout(inactivityTime);
  };

  /* It will only be executed if the user is logged */
  useEffect(() => {
    if (user) {
      const events = [
        'mousemove',
        'click',
        'scroll',
        'keypress',
        /* Or any other event you want monitoring :) */
      ];

      const resetTimeout = () => {
        clearTimeouts();
        setTimeouts();
      };

      events.forEach(e => {
        window.addEventListener(e, resetTimeout);
      });

      setTimeouts();
      
      return () => {
        events.forEach(e => {
          window.removeEventListener(e, resetTimeout);
          clearTimeouts();
        });
      };
    }
  }, [clearTimeouts, setTimeouts, user]);

  return (
    <>
      { children }
    </>
  );
};

export default Wrapper;