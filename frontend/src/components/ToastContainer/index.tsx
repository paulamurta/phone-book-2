import { useToaster, ToastType } from "react-hot-toast";
import { XCircle, Info, CheckCircle } from "@phosphor-icons/react";
import { ReactElement } from "react";
import { BoxIcon, ContainerBox, Box } from "./styles";

export function ToastContainer() {
  const { toasts } = useToaster();
  toasts.forEach(() => {
    // e.duration = Infinity;
  });

  const toastStyle: {
    [key in ToastType]: {
      icon: ReactElement;
      class: string;
    };
  } = {
    error: {
      icon: <XCircle weight="fill" />,
      class: "toast-error",
    },
    success: {
      icon: <CheckCircle weight="fill" />,
      class: "toast-success",
    },
    loading: {
      icon: <Info weight="fill" />,
      class: "toast-info",
    },
    blank: {
      icon: <Info weight="fill" />,
      class: "toast-info",
    },
    custom: {
      icon: <Info weight="fill" />,
      class: "toast-info",
    },
  };

  function renderComponent() {
    return toasts.map((e) => {
      if (e.visible) {
        return (
          <Box
            id={e.id}
            key={e.id}
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={toastStyle[e.type].class}
          >
            <BoxIcon>{toastStyle[e.type].icon}</BoxIcon>
            <p>{typeof e.message == "string" ? e.message : ""}</p>
          </Box>
        );
      }
    });
  }

  return <ContainerBox>{renderComponent()}</ContainerBox>;
}
