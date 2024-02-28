import { useEffect, useState } from "react";
import { imgFileToBase64 } from "@/app/utils/file-2-base64";
import { ChatVisionContent } from "@/app/typings/prompt";
import styles from "./index.module.css";
import { Loader, Plus } from "lucide-react";
import { Textarea, TextareaProps } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import Upload from "@/app/components/upload";

const InputWithImage: React.FC<InputWithImageProps> = (props) => {
  const [imageUrl, setImageUrl] = useState<string>();
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const uploadButton = (
    <div className="flex flex-col items-center">
      {loading ? (
        <Loader size={18} strokeWidth={2} />
      ) : (
        <Plus size={18} strokeWidth={2} />
      )}
      <div className="mt-[4px] text-[14px]">Upload</div>
    </div>
  );

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setLoading(true);

      try {
        const image = await imgFileToBase64(file);

        setImageUrl(image);
      } catch (err: any) {
        toast({
          variant: "destructive",
          description: err.message || "Upload failed",
        });
      }
      setLoading(false);
      // 在这里添加处理文件的逻辑
    }
  };

  const inputValue =
    typeof props.value === "string"
      ? props.value
      : props.value?.find((item) => item.type === "text")?.text;

  const handleInputOnChange: TextareaProps["onChange"] = (e) => {
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
        <Upload onChange={handleFileChange}>
          <div className="flex w-[80px] h-[80px] items-center justify-center rounded-[4px] text-[16px] border-[1px]">
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
            ) : (
              uploadButton
            )}
          </div>
        </Upload>
      </div>
      <Textarea
        placeholder="Input your prompt to generate creativity content."
        {...props}
        className="focus-visible:ring-white"
        value={inputValue || ""}
        onChange={handleInputOnChange}
      />
    </div>
  );
};

export interface InputWithImageProps
  extends Omit<TextareaProps, "value" | "onChange"> {
  value: ChatVisionContent;
  onChange?: (value: ChatVisionContent) => void;
}

export default InputWithImage;
