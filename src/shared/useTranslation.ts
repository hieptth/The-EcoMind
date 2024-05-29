import { TOptions } from "i18next";
import { useTranslation as useI18Translation } from "react-i18next";

export type TranslationOptions = {
  keyPrefix: string;
};
export const useTranslation = (options?: TranslationOptions) => {
  const keyPrefix = options?.keyPrefix;
  const { t } = useI18Translation();

  const tFunction = (key: string, options?: TOptions) => {
    const appendKeyPrefix = `${keyPrefix ? keyPrefix + "." : ""}${key}`;
    const modifiedKey = appendKeyPrefix.replaceAll(".", ":");
    return t(modifiedKey, options);
  };
  return {
    t: tFunction,
  };
};
