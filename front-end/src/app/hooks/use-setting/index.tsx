import { SettingOutlined } from "@ant-design/icons";
import { Form, Input, Modal, message } from "antd";
import { useEffect, useState } from "react";
import { SettingValue } from "./typings";
import { getStoreAppSetting, setStoreAppSetting } from "./helper";

const useSetting = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    message.success("Save successfully");
  };

  useEffect(() => {
    settingValue && form.setFieldsValue(settingValue);
  }, []);

  const renderSetting = () => {
    return (
      <>
        <SettingOutlined
          onClick={() => {
            setIsModalOpen(true);
          }}
        />
        <Modal
          title="Setting"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Save"
        >
          <Form<SettingValue> form={form} onFinish={handleFinish}>
            <Form.Item label="OPENAI_API_KEY" name="OPENAI_API_KEY">
              <Input value={settingValue?.OPENAI_API_KEY} />
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  };

  return {
    renderSetting,
  };
};

export default useSetting;