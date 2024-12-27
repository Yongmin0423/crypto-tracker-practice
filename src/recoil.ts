import { atom } from "recoil";

export const isDarkAtom = atom({
  key: "isDark",
  default: false, // 기본 테마는 라이트 모드
});
