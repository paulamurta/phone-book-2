import { useTheme } from "styled-components";
import { EnterButton } from "../../../../components/Button/EnterButton";

import { Content, LoginContainer } from "../../styles";
import { motion } from "framer-motion";
import { ArrowLeft } from "@phosphor-icons/react";
import { DefaultInput } from "../../../../components/Input/DefaultInput";
import { useState } from "react";

export default function LoginBox({ setIsLoginShown }: any) {
  const { colors: theme } = useTheme();
  const [email, setEmail] = useState<string>("");

  return (
    <Content>
      <motion.div
        className="login-box"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <LoginContainer>
          <DefaultInput
            key="first-name"
            label={"First Name*"}
            value={email}
            placeholder={"E-mail"}
            onChange={(value) => {
              setEmail(value);
            }}
          />
        </LoginContainer>
        <EnterButton
          text={"GO BACK"}
          icon={<ArrowLeft />}
          onClick={() => setIsLoginShown(false)}
        />
      </motion.div>
    </Content>
  );
}
