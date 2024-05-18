import { copyToClipboard as copyToClipboardOrigin } from "@/app/utils";
import { useToast } from "@/components/ui/use-toast";

export const useCopy = () => {
  const { toast } = useToast();

  const copyToClipboard = async (str: string) => {
    await copyToClipboardOrigin(str);
    toast({
      title: "复制成功。",
    });
  };

  return {
    copyToClipboard,
  };
};
