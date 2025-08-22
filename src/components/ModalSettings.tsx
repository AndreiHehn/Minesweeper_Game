/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { Container } from "../styles/ModalSettings";
import { AppContext } from "../lib/context";
import { Button } from "../generic/Button";
import i18n from "../lib/language";
import { useTranslation } from "react-i18next";
import { RadioButton } from "../generic/RadioButton";
import { LanguageSelector } from "./LanguageSelector";
import ToolTip from "../generic/ToolTip";
import InputText from "../generic/InputText";

export function ModalSettings() {
  const {
    username,
    setUsername,
    setTheme,
    theme,
    setShowModalSettings,
    setResetSettings,
    selectedLanguage,
    setSelectedLanguage,
    selectedDifficulty,
    setSelectedDifficulty,
    setSettingsChanged,
    setEmptyUsername,
  } = useContext(AppContext);

  const [localUsername, setLocalUserName] = useState(username);
  const [localLanguage, setLocalLanguage] = useState(selectedLanguage);
  const [localTheme, setLocalTheme] = useState(theme);
  const [localDifficulty, setLocalDifficulty] = useState(selectedDifficulty);

  const { t } = useTranslation();

  useEffect(() => {
    if (
      localUsername != username ||
      localLanguage != selectedLanguage ||
      localTheme != theme ||
      localDifficulty != selectedDifficulty
    ) {
      setSettingsChanged(true);
    } else {
      setSettingsChanged(false);
    }
  }, [
    localUsername,
    username,
    localLanguage,
    selectedLanguage,
    localTheme,
    theme,
    localDifficulty,
    selectedDifficulty,
  ]);

  // Saves the settings
  function SaveChanges() {
    if (localUsername != "") {
      setUsername(localUsername);
      setTheme(localTheme);
      setSelectedLanguage(localLanguage);
      setSelectedDifficulty(localDifficulty);

      localStorage.setItem("minesweeper_username", localUsername);
      localStorage.setItem("minesweeper_theme", localTheme);
      localStorage.setItem("minesweeper_language", localLanguage);
      localStorage.setItem("minesweeper_difficulty", localDifficulty);
      i18n.changeLanguage(localLanguage);

      setShowModalSettings(false);
    } else {
      setEmptyUsername(true);
    }
  }

  return (
    <Container>
      <section className="userOptions">
        <div className="sectionSeparator">
          <h2 className="locationText">{t("User Options")}</h2>
          <hr className="sectionLine" />
        </div>
        <div className="userName">
          <h3 className="userNameText">{t("User Name")}:</h3>
          <InputText
            backgroundColor="var(--background-primary)"
            borderColor="#71717A"
            borderRadius="4px"
            height="25px"
            width="160px"
            fontSize="14px"
            fontColor="var(--text-primary)"
            maxLenght={20}
            onChange={(e) => setLocalUserName(e.target.value)}
            defaultValue={username}
            placeholder={t("Insert your username")}
          ></InputText>
        </div>
      </section>
      <section className="gameOptions">
        <div className="sectionSeparator">
          <h2 className="locationText">{t("Game Options")}</h2>
          <hr className="sectionLine" />
        </div>
        <div className="difficultySelector">
          <h3 className="difficultyText">{t("Difficulty")}:</h3>
          <div className="radioButtons">
            <div className="rb-item">
              <RadioButton
                name="difficultyRB"
                text={t("Easy")}
                color="var(--app-color)"
                bgColor="var(--background-primary)"
                value="easy"
                checked={localDifficulty == "easy"}
                onChange={(val) => setLocalDifficulty(val)}
              ></RadioButton>
              <ToolTip
                iconColor="var(--text-primary)"
                iconSize="12px"
                message={t("9x9 Grid, 10 Mines")}
                boxColor="var(--background-tertiary)"
                boxPosition="right"
                borderRadius="2px"
                fontSize="10px"
              ></ToolTip>
            </div>
            <div className="rb-item">
              <RadioButton
                name="difficultyRB"
                text={t("Medium")}
                color="var(--app-color)"
                bgColor="var(--background-primary)"
                value="medium"
                checked={localDifficulty == "medium"}
                onChange={(val) => setLocalDifficulty(val)}
              ></RadioButton>
              <ToolTip
                iconColor="var(--text-primary)"
                iconSize="12px"
                message={t("16x16 Grid, 40 Mines")}
                boxColor="var(--background-tertiary)"
                boxPosition="right"
                borderRadius="2px"
                fontSize="10px"
              ></ToolTip>
            </div>
            <div className="rb-item">
              <RadioButton
                name="difficultyRB"
                text={t("Hard")}
                color="var(--app-color)"
                bgColor="var(--background-primary)"
                value="hard"
                checked={localDifficulty == "hard"}
                onChange={(val) => setLocalDifficulty(val)}
              ></RadioButton>
              <ToolTip
                iconColor="var(--text-primary)"
                iconSize="12px"
                message={t("16x31 Grid, 99 Mines")}
                boxColor="var(--background-tertiary)"
                boxPosition="right"
                borderRadius="2px"
                fontSize="10px"
              ></ToolTip>
            </div>
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
