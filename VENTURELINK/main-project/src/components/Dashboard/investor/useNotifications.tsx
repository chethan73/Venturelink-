// src/components/Dashboard/investor/useNotifications.ts
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // Make sure to use your server URL

const useNotifications = (roomId: string) => {
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    socket.emit('join', roomId); // Join the room

    socket.on('notification', (data: { message: string }) => {
      setNotifications((prev) => [...prev, data.message]);
    });

    // Cleanup on component unmount
    return () => {
      socket.off('notification');
    };
  }, [roomId]);

  return notifications;
};

export default useNotifications;
