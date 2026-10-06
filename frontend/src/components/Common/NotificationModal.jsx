import React from 'react';
import { Bell, Check, Trash2, Droplets, Dumbbell, Apple, Info } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

const NotificationModal = ({ isOpen, onClose }) => {
  const { notifications, markAllNotificationsAsRead, clearNotification } = useFitness();

  if (!isOpen) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'hydration':
        return <Droplets className="w-4 h-4 text-blue-500" />;
      case 'workout':
        return <Dumbbell className="w-4 h-4 text-forest-700" />;
      case 'nutrition':
        return <Apple className="w-4 h-4 text-emerald-500" />;
      default:
        return <Info className="w-4 h-4 text-forest-600" />;
    }
  };

  return (
    <div className="absolute right-0 top-14 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-forest-100 z-50 p-4 transition-all duration-200">
      <div className="flex items-center justify-between pb-3 border-b border-forest-50">
        <div className="flex items-center space-x-2">
          <Bell className="w-4 h-4 text-forest-800" />
          <h3 className="font-semibold text-slate-dark text-sm">Notifications</h3>
          <span className="bg-forest-100 text-forest-800 text-xs px-2 py-0.5 rounded-full font-medium">
            {notifications.filter(n => !n.read).length} new
          </span>
        </div>
        {notifications.length > 0 && (
          <button
            onClick={markAllNotificationsAsRead}
            className="text-xs text-forest-700 hover:text-forest-900 font-medium flex items-center space-x-1"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Mark all read</span>
          </button>
        )}
      </div>

      <div className="max-h-80 overflow-y-auto mt-2 divide-y divide-forest-50/50">
        {notifications.length === 0 ? (
          <div className="py-8 text-center text-gray-400 text-xs">
            No notifications yet
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-3 rounded-xl transition flex items-start space-x-3 ${
                notif.read ? 'bg-transparent' : 'bg-forest-50/40'
              }`}
            >
              <div className="mt-0.5 p-2 rounded-xl bg-white shadow-sm border border-forest-100">
                {getIcon(notif.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-slate-dark">{notif.title}</h4>
                  <span className="text-[10px] text-gray-400">{notif.time}</span>
                </div>
                <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{notif.message}</p>
              </div>
              <button
                onClick={() => clearNotification(notif.id)}
                className="text-gray-300 hover:text-red-400 p-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationModal;
