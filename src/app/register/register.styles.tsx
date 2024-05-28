import styled from "styled-components";

export const LoginWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  min-height: 100vh;
  width: 100vw;
`;

export const LoginImage = styled.div`
  // min-width: 720px;
  padding: 0 5%;
  flex: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #8f3523;
  background-image: url("/assets/login_img_overlay.png");
  background-size: cover;

  @media (max-width: 1250px) {
    display: none;
  }

  .image-wrapper {
    display: flex;
    flex-flow: column wrap;
    gap: 2rem;

    .swiper {
      width: 340px;
      height: 430px;

      &-slide {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        border-radius: 50px 50px 10px 50px;
        box-shadow: 0 6px 16px 0 rgba(8, 21, 39, 0.3);
        overflow: hidden;
        border: none;
        outline: none;

        img {
          width: 100%;
          height: 100% !important;
        }
      }
    }

    .image-subtitle {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;

      p {
        color: #ffffff;
        text-shadow: 2px 4px 5px rgba(5, 17, 34, 0.3);
      }
    }
  }
`;

export const LoginForm = styled.div`
  flex: 50%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  & > * {
    max-width: 500px;
  }

  .form-title {
    text-align: center;
    display: flex;
    flex-flow: column nowrap;
    gap: 0.25rem;
    line-height: 1.5;
  }
`;

export const SocialLogin = styled.div`
  cursor: pointer;
  display: flex;
  flex-flow: row nowrap;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;

  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  color: #737d8c;
`;
