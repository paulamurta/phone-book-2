import { Dispatch, SetStateAction } from "react";

export interface AddPhotoProps {
  file?: File | string;
  setFile: Dispatch<SetStateAction<File | string>>;
  path?: string;
  setPath: Dispatch<SetStateAction<string>>;
  acceptedFileSize: boolean;
  setAcceptedFileSize: Dispatch<SetStateAction<boolean>>;
  acceptedFileType: boolean;
  setAcceptedFileType: Dispatch<SetStateAction<boolean>>;
  setHasImgChanged?: Dispatch<SetStateAction<boolean>>;
  defaultFileSize: number;
  fileType: string[];
}
