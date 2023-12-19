import { Session, SessionController } from "./type";

export declare global {
  interface Window {
    __SESSION__: SessionController;
  }
}
