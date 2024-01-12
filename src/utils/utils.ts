import { toast } from "react-toastify";

enum NotificationType {
    success = "success",
    error = "error",
    neutral = "neutral",
}

const notify = (message: string, notificationType?: NotificationType) => {
    switch (notificationType) {
        case NotificationType.error:
            return toast.error(message);
        case NotificationType.success:
            return toast.success(message);
        default:
            return toast(message);
    }
}

const getPlayers = (playerCount: number): string => {
    let str = "";
    for (let i = 1; i <= playerCount; i++) {
      str = str + ` P${i}`;
    }
    return str;
  };
  

export { notify, getPlayers, NotificationType };