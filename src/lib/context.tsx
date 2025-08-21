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
  showModalSettings: boolean;
  setShowModalSettings: Dispatch<SetStateAction<boolean>>;
  resetSettings: boolean;
  setResetSettings: Dispatch<SetStateAction<boolean>>;
}

export function AppContextProvider({ children }: AppContextProviderProps) {
  const [theme, setTheme] = useState<string>(
    localStorage.getItem("minesweeper_theme") || "light"
  );
  const [showModalSettings, setShowModalSettings] = useState<boolean>(false);
  const [resetSettings, setResetSettings] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        showModalSettings,
        setShowModalSettings,
        resetSettings,
        setResetSettings,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
