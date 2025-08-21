import { useContext, useEffect, useState } from "react";
import { Container } from "../styles/ModalSettings";
import { AppContext } from "../lib/context";
import { Button } from "../generic/Button";
// import { LanguageSelector } from "./LanguageSelector";
import i18n from "../lib/language";
import { useTranslation } from "react-i18next";
import { RadioButton } from "../generic/RadioButton";

export function ModalSettings() {
  const { setTheme, theme, setShowModalSettings, setResetSettings } =
    useContext(AppContext);

  // const [localLanguage, setLocalLanguage] = useState(selectedLanguage);
  const [localTheme, setLocalTheme] = useState(theme);

  const { t } = useTranslation();

  // Saves the settings
  function SaveChanges() {
    setTheme(localTheme);

    localStorage.setItem("minesweeper_theme", localTheme);

    setShowModalSettings(false);
  }

  return (
    <Container>
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
