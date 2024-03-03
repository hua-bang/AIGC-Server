import { useEffect, useState } from "react";
import { SettingValue } from "./typings";
import { getStoreAppSetting, setStoreAppSetting } from "./helper";
import { Settings } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";

const useSetting = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { toast } = useToast();

  const [settingValue, setSettingValue] = useState<SettingValue | undefined>(
    () => getStoreAppSetting()
  );

  const form = useForm<SettingValue>();

  const handleFinish = (value: SettingValue) => {
    setSettingValue(value);
    setStoreAppSetting(value);
    setIsModalOpen(false);
    toast({
      title: "Setting",
      description: "Setting has been saved.",
    });
  };

  useEffect(() => {
    if (settingValue?.OPENAI_API_KEY) {
      form.setValue("OPENAI_API_KEY", settingValue?.OPENAI_API_KEY);
    }
  }, []);

  const renderForm = () => {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFinish)}>
          <FormField
            control={form.control}
            name="OPENAI_API_KEY"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormLabel className="mt-[8px]">OPENAI API KEY：</FormLabel>
                <FormControl>
                  <Input
                    style={{ width: 200 }}
                    size={16}
                    placeholder="please input your api key"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full text-right pt-[12px]">
            <Button size="sm" type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    );
  };

  const renderSetting = () => {
    return (
      <div>
        <Settings
          size={16}
          onClick={() => {
            setIsModalOpen(true);
          }}
        />
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                <div className="flex items-center gap-[4px]">
                  <Settings size={16} />
                  Setting
                </div>
              </DialogTitle>
            </DialogHeader>
            {renderForm()}
          </DialogContent>
        </Dialog>
      </div>
    );
  };

  return {
    renderSetting,
  };
};

export default useSetting;
