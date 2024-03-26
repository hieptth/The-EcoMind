import { Form } from "antd";
import styled from "styled-components";

export const StyledForm = styled(Form)<{ layout: string }>`
  hr {
    width: 100%;
    height: 1.5px;
    background: #eaedf0;
    border: none;
    margin: 0 0 1rem;
  }

  .inline {
    &-start {
      display: inline-block;
      width: calc(50% - 0.5rem);
      margin-right: 1rem;
    }

    &-end {
      display: inline-block;
      width: calc(50% - 0.5rem);
    }
  }

  .ant-form {
    &-item {
      margin-bottom: 1rem;

      &-row {
        justify-content: space-between;
        column-gap: 2rem;
      }

      &-label {
        min-width: ${(props) => (props.layout === "vertical" ? "100%" : "160px")};
        white-space: nowrap;
        ${(props) => {
    return props.layout === "vertical" && "padding-bottom: 0.25rem;";
  }};

        label {
          font-family: Nunito Sans, sans-serif;
          font-size: ${(props) => (props.layout === "vertical" ? 12 : 14)}px;
          font-style: normal;
          font-weight: 600;
          line-height: ${(props) => (props.layout === "vertical" ? 16 : 20)}px;
          text-align: left;
          color: ${(props) => props.layout === "vertical" ? "#707D95" : "#1B2537"};
          width: 100%;

          &:after {
            display: none !important;
          }
        }
      }

      &-control {
        flex: 1;
        max-width: unset;

        &-input-content {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          column-gap: 1.5rem;


          input.ant-input,
          textarea {
            padding: 10px 12px;
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
            border-radius: 4px;
            border: 2px solid #eaedf0;
            font-family: "Nunito Sans", sans-serif;

            &:focus {
              border: 2px solid rgba(255, 120, 40, 0.7);
              box-shadow: 0 0 0 1px rgba(255, 120, 40, 0.5);
            }
          }

          textarea {
            resize: none;

            &::-webkit-scrollbar {
              display: none;
            }
          }

          .ant-picker {
            padding: 10px 12px;
            border-radius: 4px;
            border: 2px solid #eaedf0;

            &-focused {
              border: 2px solid rgba(255, 120, 40, 0.7);
              box-shadow: 0 0 0 1px rgba(255, 120, 40, 0.5);
            }

            &-input {
              font-family: "Nunito Sans", sans-serif;
              font-size: 14px;
              font-weight: 400;
              line-height: 20px;
            }
          }

          .ant-select {
            height: 43px;

            &-selector {
              padding: 10px 12px;
              border: 2px solid #eaedf0;
              height: auto;

              &:has(.ant-select-selection-placeholder) {
                padding: 10px 2px;
              }

              &:focus {
                border: 2px solid rgba(255, 120, 40, 0.7);
                box-shadow: 0 0 0 1px rgba(255, 120, 40, 0.5);
              }
            }

            &-selection-search-input {
              height: unset;
            }

            &-selection-item {
              font-family: "Nunito Sans", sans-serif;
              line-height: 20px;
            }
          }

          .ant-space {
            width: 100%;
            display: flex;
            column-gap: 1.5rem;

            &-item {
              display: flex;
              align-self: flex-start;

              &:last-child {
                flex: 1;

                span {
                  max-width: none;
                }
              }
            }
          }

          .ant-upload {
            width: 64px;
            height: 64px;

            &-wrapper {
              width: fit-content;
              max-width: 128px;
            }

            &-list {
              display: flex;
              flex-flow: column nowrap;
            }

            &.ant-upload-select {
              width: 64px;
              height: 64px;
              margin: 0;
              border: 1px dashed #d0d5dd;

              &:hover {
                border-color: #ff7828 !important;
              }
            }
          }

          .ant-upload-list-item {
            aspect-ratio: 1/1;
            object-fit: cover;

            &-container {
              margin: 0;
              width: fit-content !important;
              height: fit-content !important;
            }

            &-thumbnail {
              img {
                width: 64px !important;
                height: 64px !important;
                object-fit: cover !important;
              }
            }
          }

          .dropZone {
            background: transparent;
            border: 2px solid #eaedf0;
            border-radius: 8px;
            padding: 1rem 1.5rem;
            width: 100%;
            text-align: center;
            font-family: Nunito Sans, sans-serif;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 20px;
            color: #707d95;

            .colored {
              color: #ff7828;
            }

            .ant-upload-drag {
              all: unset;

              span {
                padding: 0;
                height: auto;
                width: 100%;
              }
            }
          }
        }
      }

      &-explain {
        margin-bottom: 1rem;
      }
    }
  }
`;
