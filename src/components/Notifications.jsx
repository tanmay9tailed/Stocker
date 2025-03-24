"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";

const Notifications = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = axios.get(`api/get-notifications?userId=${userId}`);
        // setNotifications(res.data.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [userId]);

  return (
    <div className="bg-zinc-800 p-4 rounded-lg shadow-lg">
      <h2 className="text-lg font-bold text-white mb-2">Notifications</h2>
      {notifications.length === 0 ? (
        <p className="text-zinc-400">No new notifications</p>
      ) : (
        <ul className="space-y-2">
          {notifications.map((notification) => (
            <li
              key={notification._id}
              className="text-sm text-blue-400 bg-zinc-700 p-2 rounded-lg"
            >
              {notification.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
