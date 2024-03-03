"use client";
import { useToast } from "@/components/ui/use-toast";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  ReactElement,
} from "react";
import { SettingValue } from "../hooks/use-setting/typings";
import {
  getStoreAppSetting,
  setStoreAppSetting,
} from "../hooks/use-setting/helper";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// 定义用户设置的类型
interface UserSettings {
  [key: string]: any; // 根据需要定义更具体的类型
}

// 定义Context的值的类型
interface UserSettingContextType {
  renderSetting: (children?: ReactElement) => React.ReactNode;
}

// 创建一个Context
const UserSettingContext = createContext<UserSettingContextType | undefined>(
  undefined
);

// 自定义Hook，用于在组件中访问Context
export function useUserSetting(): UserSettingContextType {
  const context = useContext(UserSettingContext);
  if (context === undefined) {
    throw new Error("useUserSetting must be used within a UserSettingProvider");
  }
  return context;
}

// 定义Provider的props类型
interface UserSettingProviderProps {
  children: ReactNode;
}

// Provider组件
export const UserSettingProvider: React.FC<UserSettingProviderProps> = ({
  children,
}) => {
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

  const renderSetting = (children?: ReactElement) => {
    return (
      <div>
        {children ? (
          React.cloneElement(children, {
            onClick: (...args: unknown[]) => {
              children.props.onClick?.(...args);
              setIsModalOpen(true);
            },
            style: {
              ...(children.props.style || {}),
              cursor: "pointer",
            },
          })
        ) : (
          <Settings
            size={16}
            onClick={() => {
              setIsModalOpen(true);
            }}
            style={{ cursor: "pointer" }}
          />
        )}
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

  return (
    <UserSettingContext.Provider value={{ renderSetting }}>
      {children}
    </UserSettingContext.Provider>
  );
};
