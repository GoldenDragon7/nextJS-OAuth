import { createContext, useContext } from "react";
import { useRouter } from "next/router";

const I18nContext = createContext({
  t: (translation: string) => ""
});

export function I18nProvider({ children }) {
  const { locale } = useRouter();
  const t = (translation: string) => {
    const localePath = require(`../public/locales/${locale}.json`)
    return localePath[translation]
  }

  return (
    <I18nContext.Provider value={{ t }}>
      { children }
    </I18nContext.Provider>
  )
}

export default I18nContext;
