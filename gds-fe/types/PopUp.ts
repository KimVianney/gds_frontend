export enum PopupType {
  error = "error",
  warning = "warning",
  success = "success",
  info = "info",
}

export interface PopupContent {
  summary: string;
  title: string;
  type: PopupType;
}

export interface Popup {
  key: string;
  show: boolean;
  content: PopupContent;
}

export type CreatePopup = Partial<Exclude<Popup, "show">> & {
  content: PopupContent;
};

export type AddPopup = (popup: CreatePopup) => void;
