/**
 * License: zlib/libpng
 * @author Santo Pfingsten
 * @see https://github.com/Lusito/web-ext-translator
 */

import { State } from "../shared";
import { WetLanguage } from "../wetInterfaces";
import { adjustAllHeights } from "../utils/adjustHeights";

export interface WetActionLoadPayload {
    languages: WetLanguage[];
    mainLanguage: WetLanguage;
}

export interface WetActionLoad {
    type: "LOAD";
    payload: WetActionLoadPayload;
}

export function handleLoad(state: State, payload: WetActionLoadPayload): State {
    const languages = {};
    payload.languages.forEach((lang) => languages[lang.locale] = lang);
    const firstLocale = payload.mainLanguage.locale;
    const secondLocale = payload.languages.map((l) => l.locale).find((l) => l !== firstLocale) || null;
    adjustAllHeights();
    const extension = { languages, mainLanguage: payload.mainLanguage, firstLocale, secondLocale };
    return { ...state, extension, markdown: "" };
}
