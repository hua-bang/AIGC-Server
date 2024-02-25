import { Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { SettingValue } from "./typings";
import { getStoreAppSetting, setStoreAppSetting } from "./helper";
import { Settings } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import styles from "./index.module.scss";
import { useToast } from "@/components/ui/use-toast";

const useSetting = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { toast } = useToast();

  const [settingValue, setSettingValue] = useState<SettingValue | undefined>(
    () => getStoreAppSetting()
  );

  const [form] = Form.useForm<SettingValue>();

  const handleOk = () => {
    form.submit();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleFinish = (value: SettingValue) => {
    setSettingValue(value);
    setStoreAppSetting(value);
    toast({
      title: "Setting",
      description: "Setting has been saved.",
    });
  };

  useEffect(() => {
    settingValue && form.setFieldsValue(settingValue);
  }, []);

  const renderSetting = () => {
    return (
      <div className={styles.settingsWrapper}>
        <Settings
          size={16}
          onClick={() => {
            setIsModalOpen(true);
          }}
        />
        <Dialog open={isModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                <div className="flex items-center gap-[4px]">
                  <Settings size={16} />
                  Setting
                </div>
              </DialogTitle>
            </DialogHeader>
            <Form<SettingValue> form={form} onFinish={handleFinish}>
              <Form.Item label="OPENAI API KEY" name="OPENAI_API_KEY">
                <Input value={settingValue?.OPENAI_API_KEY} />
              </Form.Item>
            </Form>
            <DialogFooter>
              <Button type="submit" onClick={handleOk}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Modal
          title={
            <div className="flex items-center gap-[4px]">
              <Settings size={16} />
              Setting
            </div>
          }
          open={false}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Save"
        ></Modal>
      </div>
    );
  };

  return {
    renderSetting,
  };
};

export default useSetting;
