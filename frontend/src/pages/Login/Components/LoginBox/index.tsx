import { useTheme } from "styled-components";
import { Content, LoginForm, TextContainer } from "../../styles";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { DefaultInput } from "../../../../components/Input/DefaultInput";
import { useState } from "react";
import { Body2, Header3 } from "../../../../styles/typography";
import { useAuthGlobal } from "../../../../contexts/AuthContext/useAuthGlobal";
import { CommonButton } from "../../../../components/Button/CommonButton";

export default function LoginBox({ setIsLoginShown }: any) {
  const { colors: theme } = useTheme();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { login, errorLogin, setErrorLogin, isLogout, setIsLogout, token } =
    useAuthGlobal();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await login(email, password);
  }
  return (
    <Content>
      <motion.div
        className="login-box"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <LoginForm onSubmit={handleSubmit}>
          <TextContainer $alignItems="flex-end">
            <Header3 $bold>Welcome back!</Header3>
            <Body2>Let's manage your contacts</Body2>
          </TextContainer>
          <DefaultInput
            width="100%"
            key="E-mail"
            label={"E-mail*"}
            value={email}
            placeholder={"mail@website.com"}
            onChange={(value) => {
              setEmail(value);
            }}
          />
          <DefaultInput
            key="Password"
            label={"Password*"}
            value={password}
            type="password"
            placeholder={"password"}
            onChange={(value) => {
              setPassword(value);
            }}
          />

          <CommonButton
            width={"30%"}
            text={"LOGIN"}
            color={theme.typography.body}
            icon={<ArrowRight />}
            onClick={() => setIsLoginShown(true)}
          />
        </LoginForm>
        <CommonButton
          text={"GO BACK"}
          icon={<ArrowLeft />}
          onClick={() => setIsLoginShown(false)}
        />
      </motion.div>
    </Content>
  );
}
