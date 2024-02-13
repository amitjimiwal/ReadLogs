import React from "react";
interface Props {
  isEmailReminder: boolean;
  updateEmail: (isEmailReminder: boolean) => void;
}
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
const EmailToggle: React.FC<Props> = ({ isEmailReminder ,updateEmail}) => {
  return (
    <div className="flex items-center space-x-2 justify-end p-4">
      <Label htmlFor="email-notifications">Email Notifications</Label>
      <Switch
        id="email-notifications"
        checked={isEmailReminder}
        onCheckedChange={() => {
          updateEmail(!isEmailReminder);
        }}
      />
    </div>
  );
};

export default EmailToggle;
