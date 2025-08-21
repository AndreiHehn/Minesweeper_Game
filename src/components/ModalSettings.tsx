/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { Container } from "../styles/ModalSettings";
import { AppContext } from "../lib/context";
import { Button } from "../generic/Button";
import i18n from "../lib/language";
import { useTranslation } from "react-i18next";
import { RadioButton } from "../generic/RadioButton";
import { LanguageSelector } from "./LanguageSelector";

export function ModalSettings() {
  const {
    setTheme,
    theme,
    setShowModalSettings,
    setResetSettings,
    selectedLanguage,
    setSelectedLanguage,
    selectedDifficulty,
    setSelectedDifficulty,
    setSettingsChanged,
  } = useContext(AppContext);

  const [localLanguage, setLocalLanguage] = useState(selectedLanguage);
  const [localTheme, setLocalTheme] = useState(theme);
  const [localDifficulty, setLocalDifficulty] = useState(selectedDifficulty);

  const { t } = useTranslation();

  useEffect(() => {
    if (localLanguage != selectedLanguage || localTheme != theme) {
      setSettingsChanged(true);
    } else {
      setSettingsChanged(false);
    }
  }, [localLanguage, selectedLanguage, localTheme, theme]);

  // Saves the settings
  function SaveChanges() {
    setTheme(localTheme);
    setSelectedLanguage(localLanguage);

    localStorage.setItem("minesweeper_theme", localTheme);
    localStorage.setItem("minesweeper_language", localLanguage);
    i18n.changeLanguage(localLanguage);

    setShowModalSettings(false);
  }

  return (
    <Container>
      <section className="gameOptions">
        <div className="sectionSeparator">
          <h2 className="locationText">{t("Game Options")}</h2>
          <hr className="sectionLine" />
        </div>
        <div className="difficultySelector">
          <h3 className="difficultyText">{t("Difficulty")}:</h3>
          <div className="radioButtons">
            <RadioButton
              name="difficultyRB"
              text={t("Easy")}
              color="var(--app-color)"
              bgColor="var(--background-primary)"
              value="easy"
              checked={localDifficulty == "easy"}
              onChange={(val) => setLocalDifficulty(val)}
            ></RadioButton>
            <RadioButton
              name="difficultyRB"
              text={t("Medium")}
              color="var(--app-color)"
              bgColor="var(--background-primary)"
              value="medium"
              checked={localDifficulty == "medium"}
              onChange={(val) => setLocalDifficulty(val)}
            ></RadioButton>
            <RadioButton
              name="difficultyRB"
              text={t("Hard")}
              color="var(--app-color)"
              bgColor="var(--background-primary)"
              value="hard"
              checked={localDifficulty == "hard"}
              onChange={(val) => setLocalDifficulty(val)}
            ></RadioButton>
          </div>
        </div>
      </section>
      <section className="languageAndTheme">
        <div className="sectionSeparator">
          <h2 className="locationText">{t("Language and Theme")}</h2>
          <hr className="sectionLine" />
        </div>
        <div className="themeSelector">
          <h3 className="themeText">{t("Theme")}:</h3>
          <div className="radioButtons">
            <RadioButton
              name="themeRB"
              text={t("Light Theme")}
              color="var(--app-color)"
              bgColor="var(--background-primary)"
              value="light"
              checked={localTheme == "light"}
              onChange={(val) => setLocalTheme(val)}
            ></RadioButton>
            <RadioButton
              name="themeRB"
              text={t("Dark Theme")}
              color="var(--app-color)"
              bgColor="var(--background-primary)"
              value="dark"
              checked={localTheme == "dark"}
              onChange={(val) => setLocalTheme(val)}
            ></RadioButton>
            <RadioButton
              name="themeRB"
              text={t("System Theme")}
              color="var(--app-color)"
              bgColor="var(--background-primary)"
              value="system"
              checked={localTheme == "system"}
              onChange={(val) => setLocalTheme(val)}
            ></RadioButton>
          </div>
        </div>
        <div className="languageSelector">
          <h3 className="languageText">{t("Language")}:</h3>
          <LanguageSelector
            selectedLanguage={localLanguage}
            onSelectLanguage={setLocalLanguage}
          />
        </div>
      </section>
      <footer className="footer-buttons">
        <Button
          color="gray"
          borderRadius="4px"
          functionButton={() => setResetSettings(true)}
        >
          {t("Reset")}
        </Button>
        <Button color="green" borderRadius="4px" functionButton={SaveChanges}>
          {t("Save")}
        </Button>
      </footer>
    </Container>
  );
}
