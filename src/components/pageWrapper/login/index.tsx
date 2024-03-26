import { LoginForm, LoginImage, LoginWrapper } from "./login.styles";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import Image from "next/image";
import LoginImage1 from "@assets/login_image_1.jpg";
import LoginImage2 from "@assets/login_image_2.jpg";
import LoginImage3 from "@assets/login_image_3.jpeg";
import { CustomTypography } from "@common/components";
import { Image as ImageConstants } from "@constants";
import { ReactElement, ReactNode } from "react";
import "swiper/css";
import "swiper/css/effect-cards";

export const LoginPageWrapper = (props: {
  children: ReactElement | ReactNode;
}) => {
  return (
    <LoginWrapper>
      <LoginImage>
        <div className="image-wrapper">
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper"
          >
            <SwiperSlide>
              <Image
                src={LoginImage1}
                alt={"Card1"}
                layout="responsive"
                objectFit="cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={LoginImage2}
                alt={"Card2"}
                layout="responsive"
                objectFit="cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={LoginImage3}
                alt={"Card3"}
                layout="responsive"
                objectFit="cover"
              />
            </SwiperSlide>
          </Swiper>
          <div className="image-subtitle">
            <CustomTypography variant="T36M">
              Find Your Perfect Place <br/> With EcoMind
            </CustomTypography>
          </div>
        </div>
      </LoginImage>
      <LoginForm>
        <div className="logo">
          <Image
            src={`${ImageConstants.LOGO}/ecomind-logo.png`}
            alt={"The EcoMind Logo"}
            quality={100}
            objectFit="contain"
            width={120}
            height={120}
          />
        </div>
        <div className="form-title">
          <CustomTypography variant="T30M">
            Welcome to The EcoMind
          </CustomTypography>
          <CustomTypography variant="T16R" color="#737D8C">
            Experience sustainable living beyond boundaries:
            <br/>
            Find your green home with us today!
          </CustomTypography>
        </div>
        {props.children}
      </LoginForm>
    </LoginWrapper>
  );
};
