"use client";

import styled from "styled-components";

export const LoginWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  min-height: 100vh;
  width: 100vw;

  .form-row {
    width: 100%;

    .ant-col {
      padding: 0;

      label {
        color: #707d95;
        font-size: 12px;
        font-weight: 600;
        line-height: 16px;
        margin-bottom: 4px;
        width: 100%;

        &:after {
          display: none;
        }
      }

      .ant-form-item-control-input-content {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        column-gap: 1.5rem;

        .ant-input-affix-wrapper-focused {
          box-shadow: 0 0 0 1px rgba(255, 120, 40, 0.5);
          -webkit-box-shadow: 0 0 4px 0 rgba(255, 120, 40, 0.5),
          0 0 0 30px #ffffff inset !important;
          border: 2px solid rgba(255, 120, 40, 0.7) !important;
        }

        .custom-input {
          padding: 10px 12px;
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
          border-radius: 4px;
          border: 2px solid #eaedf0;

          // remove autofill background color
          &:-webkit-autofill,
          input:-webkit-autofill {
            -webkit-box-shadow: 0 0 0 30px #ffffff inset !important;
          }

          svg {
            cursor: pointer;

            path {
              stroke: #737D8C;
              stroke-width: 1.8;
            }
          }

          &:focus {
            background: #ffffff;
            border: 2px solid rgba(255, 120, 40, 0.7);
            -webkit-box-shadow: 0 0 4px 0 rgba(255, 120, 40, 0.5),
            0 0 0 30px #ffffff inset !important;
            box-shadow: 0 0 0 1px rgba(255, 120, 40, 0.5);
          }
        }
      }
    }
  }

  .sub-btn-group {
    margin-top: -.75rem;
    width: 100%;
    align-items: center;
    display: flex;
    justify-content: space-between;

    .ant-checkbox-wrapper {
      align-items: center;
    }

    .ant-form-item {
      margin: 0;
    }

    .ant-checkbox-checked:not(.ant-checkbox-disabled) .ant-checkbox-inner,
    .ant-checkbox-checked:not(.ant-checkbox-disabled) .ant-checkbox-inner:hover {
      background: #8F3523;
      border-color: transparent;
    }

    p {
      cursor: pointer;
    }
  }

  .login-btn {
    padding: .5rem 1rem;
    width: 100%;
    border-radius: 4px;
    color: #ffffff;
    background-color: #8F3523;
    text-transform: uppercase;
  }
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
  gap: 1.5rem;

  & > * {
    max-width: 450px;
    width: 100%;
  }

  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .form-title {
    text-align: center;
    display: flex;
    flex-flow: column nowrap;
    gap: 0.25rem;
    line-height: 1.5;
  }

  .divider {
    max-width: 350px;

    .ant-divider {
      margin: 0;

      &:before, &:after {
        border-block-start-width: 2px;
      }
    }
  }
`;
