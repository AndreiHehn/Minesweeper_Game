/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

export const AppContext = createContext({} as AppContextProps);

interface AppContextProviderProps {
  children: ReactNode;
}
interface AppContextProps {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
  selectedLanguage: string;
  setSelectedLanguage: Dispatch<SetStateAction<string>>;
  selectedDifficulty: string;
  setSelectedDifficulty: Dispatch<SetStateAction<string>>;
  showModalSettings: boolean;
  setShowModalSettings: Dispatch<SetStateAction<boolean>>;
  resetSettings: boolean;
  setResetSettings: Dispatch<SetStateAction<boolean>>;
  settingsChanged: boolean;
  setSettingsChanged: Dispatch<SetStateAction<boolean>>;
  quitSettings: boolean;
  setQuitSettings: Dispatch<SetStateAction<boolean>>;
}

export function AppContextProvider({ children }: AppContextProviderProps) {
  const [theme, setTheme] = useState<string>(
    localStorage.getItem("minesweeper_theme") || "light"
  );
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    return localStorage.getItem("minesweeper_language") || "en";
  });
  const [selectedDifficulty, setSelectedDifficulty] = useState(() => {
    return localStorage.getItem("minesweeper_difficulty") || "easy";
  });
  const [showModalSettings, setShowModalSettings] = useState<boolean>(false);
  const [resetSettings, setResetSettings] = useState<boolean>(false);
  const [settingsChanged, setSettingsChanged] = useState<boolean>(false);
  const [quitSettings, setQuitSettings] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        selectedLanguage,
        setSelectedLanguage,
        selectedDifficulty,
        setSelectedDifficulty,
        showModalSettings,
        setShowModalSettings,
        resetSettings,
        setResetSettings,
        settingsChanged,
        setSettingsChanged,
        quitSettings,
        setQuitSettings,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
