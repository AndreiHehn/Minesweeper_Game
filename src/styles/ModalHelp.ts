import styled from "styled-components";

export const Container = styled.div`
  height: auto;
  width: 500px;
  overflow: hidden;

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
  }

  .slick-dots {
    display: flex !important;
    justify-content: center;
    gap: 10px;

    li {
      list-style-type: none;
    }

    button {
      background-color: var(--text-primary);
      border: none;
      width: 12px;
      height: 12px;
      font-size: 0;
      border-radius: 50%;
      padding: 0;
      margin: 0;
      line-height: 0;
      display: inline-block;
      vertical-align: middle;
      cursor: pointer;
    }

    .slick-active button {
      animation: none;
      background-color: #71717a;
      cursor: default;
      width: 15px;
      height: 15px;
    }
  }

  .carouselArrow {
    position: absolute;
    bottom: 0;
    cursor: pointer;
    transition: transform 0.2s;
    z-index: 1;

    path {
      fill: var(--text-primary);
    }

    &:hover {
      transform: scale(1.1);
    }
  }

  .carouselArrow:first-of-type {
    left: 0px;
  }

  .carouselArrow:last-of-type {
    right: 0px;
  }
`;
