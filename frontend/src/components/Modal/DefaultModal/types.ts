export type DefaultModalProps = {
  isOpen: boolean;
  height?: string;
  width?: string;
  children: JSX.Element;
  title?: string;
  closeButton?: boolean;
  onClose: () => void;
};
