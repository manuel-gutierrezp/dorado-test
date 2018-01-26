export interface fence {
  id: string;
  latitude: number;
  longitude: number;
  radius: number;
  transitionType: number;
  notification: Notification;
}

export interface Notification {
  id: number;
  title: string;
  text: string;
  openAppOnClick: boolean;
}