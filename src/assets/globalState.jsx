import { createGlobalState } from "react-hooks-global-states";

export const useMode = createGlobalState(getSystemModePreference());

export function getSystemModePreference() {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
    return mediaQuery.matches;
}
