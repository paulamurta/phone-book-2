import userError from "../../assets/images/create_user_error.svg";
import { useEffect, useRef, useState } from "react";
import {
  ImgButton,
  InputFileUpload,
  ImgGlass,
  ChosenImg,
  Illustration,
  Wrapper,
} from "./styles";
import { AddPhotoProps } from "./types";
import { CustomTooltip } from "../Tooltip";

export function AddPhoto({
  file,
  setFile,
  path,
  setPath,
  acceptedFileSize,
  setAcceptedFileSize,
  acceptedFileType,
  setAcceptedFileType,
  defaultFileSize,
  fileType,
  setHasImgChanged,
}: AddPhotoProps) {
  const [uploadError, setUploadError] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const oneMB = 1048576;

  useEffect(() => {
    return () => {
      if (file instanceof File) {
        URL.revokeObjectURL(URL.createObjectURL(file));
      }
    };
  }, [file]);

  useEffect(() => {
    acceptedFileSize && acceptedFileType
      ? setUploadError(false)
      : setUploadError(true);
  }, [acceptedFileSize, acceptedFileType]);

  useEffect(() => {
    if (path) {
      setFileName(path);
    }
  }, [path]);

  useEffect(() => {
    if (setPath) {
      setPath(fileName);
    }
  }, [fileName, setPath]);

  function handleChange(e: any) {
    e.preventDefault();
    e.stopPropagation();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      setFile(file);
      file.size <= defaultFileSize
        ? setAcceptedFileSize(true)
        : setAcceptedFileSize(false);
      const fileTypeAccepted = fileType.some((type) =>
        file.name.endsWith(type),
      );
      fileTypeAccepted ? setAcceptedFileType(true) : setAcceptedFileType(false);
    }
  }

  function deletePhoto() {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setPath("");
    setFile("");
    setFileName("");
    setAcceptedFileSize(true);
    setAcceptedFileType(true);
    setHasImgChanged && setHasImgChanged(true);
  }

  function onButtonClick(e: any) {
    e.preventDefault();
    e.stopPropagation();
    if (inputRef.current) {
      inputRef.current.click();
    }
  }

  return (
    <Wrapper>
      <InputFileUpload
        ref={inputRef}
        type="file"
        multiple={true}
        onChange={handleChange}
        id="input-file-upload"
      />

      {file && (
        <CustomTooltip title={"Excluir foto"} placement="right-end">
          <ImgButton onClick={deletePhoto}>
            <ImgGlass />
            {typeof file === "string" ? (
              <ChosenImg src={file} alt="Delete image" />
            ) : (
              <ChosenImg
                src={
                  uploadError
                    ? userError
                    : file instanceof File
                    ? URL.createObjectURL(file)
                    : ""
                }
                alt="Delete image"
              />
            )}
          </ImgButton>
        </CustomTooltip>
      )}

      {!file && (
        <CustomTooltip title={"Add image"} placement="right-end">
          <ImgButton onClick={onButtonClick}>
            <Illustration />
          </ImgButton>
        </CustomTooltip>
      )}

      {!acceptedFileType ? (
        <p>Your image must be a JPG or PNG file</p>
      ) : !acceptedFileSize ? (
        <p>
          {defaultFileSize >= oneMB
            ? "Maximum allowed size is" +
              defaultFileSize / (1024 * 1024) +
              " MB"
            : "Maximum allowed size is" + defaultFileSize / 1024 + " KB"}
        </p>
      ) : (
        ""
      )}
    </Wrapper>
  );
}
