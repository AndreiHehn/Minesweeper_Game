/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useMemo,
} from "react";

export const AppContext = createContext({} as AppContextProps);

interface AppContextProviderProps {
  children: ReactNode;
}

type Difficulty = "Easy" | "Medium" | "Hard";
type FieldSize = { rows: number; cols: number; mines: number };

interface AppContextProps {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
  selectedLanguage: string;
  setSelectedLanguage: Dispatch<SetStateAction<string>>;
  selectedDifficulty: Difficulty;
  setSelectedDifficulty: Dispatch<SetStateAction<Difficulty>>;
  fieldSize: FieldSize; // <-- adicionado
  selectedAvatar: string;
  setSelectedAvatar: Dispatch<SetStateAction<string>>;
  showModalSettings: boolean;
  setShowModalSettings: Dispatch<SetStateAction<boolean>>;
  showModalAvatar: boolean;
  setShowModalAvatar: Dispatch<SetStateAction<boolean>>;
  showModalStatistics: boolean;
  setShowModalStatistics: Dispatch<SetStateAction<boolean>>;
  resetSettings: boolean;
  setResetSettings: Dispatch<SetStateAction<boolean>>;
  settingsChanged: boolean;
  setSettingsChanged: Dispatch<SetStateAction<boolean>>;
  quitSettings: boolean;
  setQuitSettings: Dispatch<SetStateAction<boolean>>;
  avatarChanged: boolean;
  setAvatarChanged: Dispatch<SetStateAction<boolean>>;
  quitAvatar: boolean;
  setQuitAvatar: Dispatch<SetStateAction<boolean>>;
  emptyUsername: boolean;
  setEmptyUsername: Dispatch<SetStateAction<boolean>>;
  activePage: string;
  setActivePage: Dispatch<SetStateAction<string>>;
  loadingMessage: string;
  setLoadingMessage: Dispatch<SetStateAction<string>>;
  minesRemaining: number;
  setMinesRemaining: Dispatch<SetStateAction<number>>;
}

export function AppContextProvider({ children }: AppContextProviderProps) {
  const [username, setUsername] = useState<string>(
    localStorage.getItem("minesweeper_username") || "Player 001"
  );
  const [theme, setTheme] = useState<string>(
    localStorage.getItem("minesweeper_theme") || "light"
  );
  const [selectedLanguage, setSelectedLanguage] = useState(
    () => localStorage.getItem("minesweeper_language") || "en"
  );
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(
    () =>
      (localStorage.getItem("minesweeper_difficulty") as Difficulty) || "Easy"
  );
  const [selectedAvatar, setSelectedAvatar] = useState<string>(
    localStorage.getItem("minesweeper_avatar") || ""
  );
  const [showModalSettings, setShowModalSettings] = useState<boolean>(false);
  const [showModalAvatar, setShowModalAvatar] = useState<boolean>(false);
  const [showModalStatistics, setShowModalStatistics] =
    useState<boolean>(false);
  const [resetSettings, setResetSettings] = useState<boolean>(false);
  const [settingsChanged, setSettingsChanged] = useState<boolean>(false);
  const [quitSettings, setQuitSettings] = useState<boolean>(false);
  const [avatarChanged, setAvatarChanged] = useState<boolean>(false);
  const [quitAvatar, setQuitAvatar] = useState<boolean>(false);
  const [emptyUsername, setEmptyUsername] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<string>("Game");
  const [loadingMessage, setLoadingMessage] = useState<string>(
    "Wait, planting the mines"
  );
  const [minesRemaining, setMinesRemaining] = useState<number>(0);

  // mapa de dificuldades -> tamanho
  const difficultySizes: Record<Difficulty, FieldSize> = {
    Easy: { rows: 9, cols: 9, mines: 10 },
    Medium: { rows: 16, cols: 16, mines: 40 },
    Hard: { rows: 16, cols: 31, mines: 99 },
  };

  // calcular dinamicamente o tamanho baseado na dificuldade
  const fieldSize = useMemo(
    () => difficultySizes[selectedDifficulty],
    [selectedDifficulty]
  );

  return (
    <AppContext.Provider
      value={{
        username,
        setUsername,
        theme,
        setTheme,
        selectedLanguage,
        setSelectedLanguage,
        selectedDifficulty,
        setSelectedDifficulty,
        fieldSize, // <-- já disponível no contexto
        selectedAvatar,
        setSelectedAvatar,
        showModalSettings,
        setShowModalSettings,
        showModalAvatar,
        setShowModalAvatar,
        showModalStatistics,
        setShowModalStatistics,
        resetSettings,
        setResetSettings,
        settingsChanged,
        setSettingsChanged,
        quitSettings,
        setQuitSettings,
        avatarChanged,
        setAvatarChanged,
        quitAvatar,
        setQuitAvatar,
        emptyUsername,
        setEmptyUsername,
        activePage,
        setActivePage,
        loadingMessage,
        setLoadingMessage,
        minesRemaining,
        setMinesRemaining,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
