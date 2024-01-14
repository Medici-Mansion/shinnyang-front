import { Session, SessionController } from "./type";

interface ShareToKakaoArg {
  templateId: number;
  installTalk?: boolean;
  templateArgs: {
    LETTER_ID: string;
    CAT_AVATAR: string;
    CAT_NAME: string;
    SENDER: string;
  };
  serverCallbackArgs?: {};
}

export declare global {
  interface Window {
    __SESSION__: SessionController;
    Kakao?: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendCustom: (args: ShareToKakaoArg) => void;
      };
    };
  }
}
