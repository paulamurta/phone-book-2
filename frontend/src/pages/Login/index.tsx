import { useTheme } from "styled-components";
import { ContainerRow } from "../../styles/global";
import { motion } from "framer-motion";
import { Header1, Header2 } from "../../styles/typography";
import {
  Background,
  GlassHeader,
  Content,
  TextContainer,
  HeaderButton,
} from "./styles";

import { useState } from "react";
import {
  ArrowRight,
  InstagramLogo,
  FacebookLogo,
  Envelope,
} from "@phosphor-icons/react";
import LoginBox from "./Components/LoginBox";
import { CommonButton } from "../../components/Button/CommonButton";

export default function Home() {
  const [isLoginShown, setIsLoginShown] = useState<boolean>(false);
  const { colors: theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Background>
        <GlassHeader>
          <ContainerRow position={"left"}>
            <HeaderButton>
              <InstagramLogo />
            </HeaderButton>
            <HeaderButton>
              <FacebookLogo />
            </HeaderButton>
            <HeaderButton>
              <Envelope />
            </HeaderButton>
          </ContainerRow>
          <ContainerRow position={"right"}>
            <HeaderButton>About</HeaderButton>
            <HeaderButton>FAQ</HeaderButton>
            <HeaderButton>Pricing</HeaderButton>
          </ContainerRow>
        </GlassHeader>
        {isLoginShown ? (
          <LoginBox setIsLoginShown={setIsLoginShown} />
        ) : (
          <Content>
            <motion.div
              className="logo-box"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <>
                <Header1 $fontColor={theme.typography.white}>
                  Phone Book App
                </Header1>
              </>

              <TextContainer>
                <Header2 $fontColor={theme.typography.lightGray}>
                  Your contacts list.
                </Header2>
                <Header2 $fontColor={theme.typography.lightGray}>
                  Anytime.
                </Header2>
                <Header2 $fontColor={theme.typography.lightGray}>
                  Anywhere.
                </Header2>
              </TextContainer>

              <CommonButton
                width={"100%"}
                text={"LOGIN"}
                icon={<ArrowRight />}
                onClick={() => setIsLoginShown(true)}
              />
            </motion.div>
          </Content>
        )}
      </Background>
    </motion.div>
  );
}
