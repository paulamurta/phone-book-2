import { useTheme } from "styled-components";
import { FiInstagram } from "react-icons/fi";
import { FiFacebook } from "react-icons/fi";
import { FiMail } from "react-icons/fi";

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
import { EnterButton } from "../../components/Button/EnterButton";
import { useState } from "react";
import { ArrowRight, AddressBook } from "@phosphor-icons/react";
import LoginBox from "./Components/LoginBox";

export default function Login() {
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
              <FiInstagram />
            </HeaderButton>
            <HeaderButton>
              <FiFacebook />
            </HeaderButton>
            <HeaderButton>
              <FiMail />
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

              <EnterButton
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
