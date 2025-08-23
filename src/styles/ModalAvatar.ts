import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  overflow: hidden;
  gap: 5px;
  margin-top: 20px;

  .avatar-wrapper {
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    border: none;
  }

  .avatar-item {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 2px solid transparent;
    transition: transform 0.2s, border-color 0.2s;
    cursor: pointer;
    background-color: #f9f9f9;
    user-select: none;
  }

  .avatar-item:hover {
    transform: scale(1.1);
    border-color: var(--app-color);
  }

  .avatar-item.selected {
    border: 4px solid var(--background-tertiary);
    width: 70px;
    height: 70px;
  }

  .slick-slider {
    position: relative;
    width: 100%;
  }

  .slick-slide {
    display: flex;
    justify-content: center;
  }

  .slick-track {
    display: flex;
    overflow: hidden;
    align-items: center;
  }

  .carouselArrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    transition: transform 0.2s;
    z-index: 1;

    path {
      fill: var(--text-primary);
    }

    &:hover {
      transform: translateY(-50%) scale(1.1);
    }
  }

  .carouselArrow:first-of-type {
    left: 0px;
  }

  .carouselArrow:last-of-type {
    right: 0px;
  }

  .saveButton {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
`;
