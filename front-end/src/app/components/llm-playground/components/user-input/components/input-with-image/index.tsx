import { Input, Upload, UploadProps, message } from "antd";
import { TextAreaProps } from "antd/es/input";
import { useEffect, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";
import { imgFileToBase64 } from "@/app/utils/file-2-base64";
import { ChatVisionContent } from "@/app/typings/prompt";
import styles from "./index.module.css";

const InputWithImage: React.FC<InputWithImageProps> = (props) => {
  const [imageUrl, setImageUrl] = useState<string>();
  const [loading, setLoading] = useState(false);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleChange: UploadProps["onChange"] = async (
    info: UploadChangeParam<UploadFile>
  ) => {
    setLoading(true);

    try {
      const image = await imgFileToBase64(info.file as RcFile);
      setImageUrl(image);
    } catch (err: any) {
      message.warning(err.message || "Upload failed");
    }

    setLoading(false);
  };

  const inputValue =
    typeof props.value === "string"
      ? props.value
      : props.value?.find((item) => item.type === "text")?.text;

  const handleInputOnChange: TextAreaProps["onChange"] = (e) => {
    const value = e.target.value;

    const inputWithImageValue: ChatVisionContent = [];

    if (imageUrl) {
      inputWithImageValue.push({
        type: "image_url",
        image_url: {
          url: imageUrl,
        },
      });
    }

    if (value) {
      inputWithImageValue.push({
        type: "text",
        text: value,
      });
    }

    props.onChange?.(inputWithImageValue);
  };

  useEffect(() => {
    if (!props.value) {
      setImageUrl(undefined);
    }
  }, [props.value]);

  return (
    <div className={styles.imgUploader}>
      <div>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={() => {
            return false;
          }}
          onChange={handleChange}
          maxCount={1}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
          ) : (
            uploadButton
          )}
        </Upload>
      </div>
      <Input.TextArea
        bordered={false}
        placeholder="Input your prompt to generate creativity content."
        size="large"
        {...props}
        value={inputValue}
        onChange={handleInputOnChange}
      />
    </div>
  );
};

export interface InputWithImageProps
  extends Omit<TextAreaProps, "value" | "onChange"> {
  value: ChatVisionContent;
  onChange?: (value: ChatVisionContent) => void;
}

export default InputWithImage;
