/* eslint-disable react-hooks/exhaustive-deps */
import { Container } from "../styles/ModalAvatar";
import Slider from "react-slick";

import avatar1 from "../assets/icons/avatar01.png";
import avatar2 from "../assets/icons/avatar02.png";
import avatar3 from "../assets/icons/avatar03.png";
import avatar4 from "../assets/icons/avatar04.png";
import avatar5 from "../assets/icons/avatar05.png";
import avatar6 from "../assets/icons/avatar06.png";
import ArrowNextIcon from "../../src/assets/icons/ArrowNextIcon.svg?react";
import ArrowPrevIcon from "../../src/assets/icons/ArrowPrevIcon.svg?react";
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../lib/context";
import { Button } from "../generic/Button";
import { useTranslation } from "react-i18next";

export default function AvatarSelection() {
  const {
    selectedAvatar,
    setSelectedAvatar,
    setShowModalAvatar,
    setAvatarChanged,
  } = useContext(AppContext);
  const avatarList = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];
  const [localAvatar, setLocalAvatar] = useState(selectedAvatar);
  const { t } = useTranslation();

  const reorderedList = useRef<string[]>(
    selectedAvatar
      ? [selectedAvatar, ...avatarList.filter((a) => a !== selectedAvatar)]
      : avatarList
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    draggable: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  useEffect(() => {
    if (localAvatar != selectedAvatar) {
      setAvatarChanged(true);
    } else {
      setAvatarChanged(false);
    }
  }, [localAvatar, selectedAvatar]);

  function NextArrow(props: any) {
    const { onClick } = props;
    return <ArrowNextIcon className="carouselArrow" onClick={onClick} />;
  }

  function PrevArrow(props: any) {
    const { onClick } = props;
    return <ArrowPrevIcon className="carouselArrow" onClick={onClick} />;
  }

  function SaveAvatar() {
    setSelectedAvatar(localAvatar);
    localStorage.setItem("minesweeper_avatar", localAvatar);
    setShowModalAvatar(false);
  }

  return (
    <Container>
      <Slider {...settings}>
        {reorderedList.current.map((avatar, index) => (
          <div className="avatar-wrapper" key={index}>
            <img
              src={avatar}
              alt={`Avatar ${index + 1}`}
              className={`avatar-item ${
                localAvatar === avatar ? "selected" : ""
              }`}
              onClick={() => (setLocalAvatar(avatar), console.log(avatar))}
            />
          </div>
        ))}
      </Slider>
      <footer className="saveButton">
        <Button color="green" borderRadius="4px" functionButton={SaveAvatar}>
          {t("Save")}
        </Button>
      </footer>
    </Container>
  );
}
