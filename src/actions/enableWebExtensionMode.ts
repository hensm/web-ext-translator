/**
 * License: zlib/libpng
 * @author Santo Pfingsten
 * @see https://github.com/Lusito/web-ext-translator
 */

import { State } from "../shared";

export interface WetActionEnableWebExtensionMode {
    type: "ENABLE_WEB_EXTENSION_MODE";
}

export function handleEnableWebExtensionMode(state: State): State {
    return { ...state, webExtensionMode: true };
}
