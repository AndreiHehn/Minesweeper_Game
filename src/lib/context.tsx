/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useMemo,
  useEffect,
} from "react";

export const AppContext = createContext({} as AppContextProps);

interface AppContextProviderProps {
  children: ReactNode;
}

type Difficulty = "Easy" | "Medium" | "Hard";
type FieldSize = { rows: number; cols: number; mines: number };

interface DifficultyStats {
  wins: number;
  defeats: number;
  best: number;
}

interface GameStats {
  Easy: DifficultyStats;
  Medium: DifficultyStats;
  Hard: DifficultyStats;
}

interface AppContextProps {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
  selectedLanguage: string;
  setSelectedLanguage: Dispatch<SetStateAction<string>>;
  selectedDifficulty: Difficulty;
  setSelectedDifficulty: Dispatch<SetStateAction<Difficulty>>;
  fieldSize: FieldSize;
  selectedAvatar: string;
  setSelectedAvatar: Dispatch<SetStateAction<string>>;
  showModalSettings: boolean;
  setShowModalSettings: Dispatch<SetStateAction<boolean>>;
  showModalAvatar: boolean;
  setShowModalAvatar: Dispatch<SetStateAction<boolean>>;
  showModalStatistics: boolean;
  setShowModalStatistics: Dispatch<SetStateAction<boolean>>;
  showModalEndGame: boolean;
  setShowModalEndGame: Dispatch<SetStateAction<boolean>>;
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
  resetStats: boolean;
  setResetStats: Dispatch<SetStateAction<boolean>>;
  activePage: string;
  setActivePage: Dispatch<SetStateAction<string>>;
  loadingMessage: string;
  setLoadingMessage: Dispatch<SetStateAction<string>>;
  gameResult: string;
  setGameResult: Dispatch<SetStateAction<string>>;
  minesRemaining: number;
  setMinesRemaining: Dispatch<SetStateAction<number>>;
  markedMines: number;
  setMarkedMines: Dispatch<SetStateAction<number>>;
  endGame: boolean;
  setEndGame: Dispatch<SetStateAction<boolean>>;
  resetField: number;
  setResetField: Dispatch<SetStateAction<number>>;
  matchTime: number;
  setMatchTime: Dispatch<SetStateAction<number>>;

  stats: GameStats;
  setStats: Dispatch<SetStateAction<GameStats>>;
  addWin: (difficulty: Difficulty, time: number) => void;
  addDefeat: (difficulty: Difficulty) => void;
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
  const [showModalEndGame, setShowModalEndGame] = useState<boolean>(false);
  const [resetSettings, setResetSettings] = useState<boolean>(false);
  const [settingsChanged, setSettingsChanged] = useState<boolean>(false);
  const [quitSettings, setQuitSettings] = useState<boolean>(false);
  const [avatarChanged, setAvatarChanged] = useState<boolean>(false);
  const [quitAvatar, setQuitAvatar] = useState<boolean>(false);
  const [emptyUsername, setEmptyUsername] = useState<boolean>(false);
  const [resetStats, setResetStats] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<string>("Game");
  const [loadingMessage, setLoadingMessage] = useState<string>(
    "Wait, planting the mines"
  );
  const [gameResult, setGameResult] = useState<string>("");
  const [minesRemaining, setMinesRemaining] = useState<number>(0);
  const [markedMines, setMarkedMines] = useState<number>(0);
  const [endGame, setEndGame] = useState<boolean>(false);
  const [resetField, setResetField] = useState(0);
  const [matchTime, setMatchTime] = useState<number>(0);

  // mapa de dificuldades -> tamanho
  const difficultySizes: Record<Difficulty, FieldSize> = {
    Easy: { rows: 9, cols: 9, mines: 10 },
    Medium: { rows: 16, cols: 16, mines: 40 },
    Hard: { rows: 16, cols: 30, mines: 99 },
  };

  // calcular dinamicamente o tamanho baseado na dificuldade
  const fieldSize = useMemo(
    () => difficultySizes[selectedDifficulty],
    [selectedDifficulty]
  );

  const defaultStats: GameStats = {
    Easy: { wins: 0, defeats: 0, best: 0 },
    Medium: { wins: 0, defeats: 0, best: 0 },
    Hard: { wins: 0, defeats: 0, best: 0 },
  };

  const [stats, setStats] = useState<GameStats>(() => {
    const stored = localStorage.getItem("minesweeper_stats");
    return stored ? JSON.parse(stored) : defaultStats;
  });

  useEffect(() => {
    localStorage.setItem("minesweeper_stats", JSON.stringify(stats));
  }, [stats]);

  const addWin = (difficulty: Difficulty, time: number) => {
    setStats((prev) => {
      const newBest =
        prev[difficulty].best === 0
          ? time
          : Math.min(prev[difficulty].best, time);

      return {
        ...prev,
        [difficulty]: {
          ...prev[difficulty],
          wins: prev[difficulty].wins + 1,
          best: newBest,
        },
      };
    });
  };

  const addDefeat = (difficulty: Difficulty) => {
    setStats((prev) => ({
      ...prev,
      [difficulty]: {
        ...prev[difficulty],
        defeats: prev[difficulty].defeats + 1,
      },
    }));
  };

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
        fieldSize,
        selectedAvatar,
        setSelectedAvatar,
        showModalSettings,
        setShowModalSettings,
        showModalAvatar,
        setShowModalAvatar,
        showModalStatistics,
        setShowModalStatistics,
        showModalEndGame,
        setShowModalEndGame,
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
        resetStats,
        setResetStats,
        activePage,
        setActivePage,
        loadingMessage,
        setLoadingMessage,
        gameResult,
        setGameResult,
        minesRemaining,
        setMinesRemaining,
        markedMines,
        setMarkedMines,
        endGame,
        setEndGame,
        resetField,
        setResetField,
        matchTime,
        setMatchTime,
        stats,
        setStats,
        addWin,
        addDefeat,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
