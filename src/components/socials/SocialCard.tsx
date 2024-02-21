import React from "react";
import { Button } from "../ui/button";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { LucideIcon } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Input from "../ui/Input";
import CopyButton from "../CopyButton";
import { useForm } from "react-hook-form";
interface Props {
  id: string;
  name: string;
  url: string;
  updateSocials: (social: { name: string; url: URL | string }) => void;
  Icon: LucideIcon;
}
type Form = {
  name?: string;
  url: URL | string;
};
const SocialCard: React.FC<Props> = ({
  id,
  name,
  url,
  updateSocials,
  Icon,
}) => {
  const { register, handleSubmit } = useForm<Form>();
  const submit = (data: Form) => {
    updateSocials({ name, ...data });
  };
  return (
    <div
      id={id}
      className="shadow-xl rounded-xl bg-gradient-to-r from-blue-900 to-blue-500 p-2 w-auto"
    >
      <div className="font-bold text-white text-xl flex items-center gap-3">
        <Icon size={20} strokeWidth={2} />
        <a href={url} target="_blank" referrerPolicy="no-referrer">
          {name}
        </a>
        <CopyButton text={url} />
        <Dialog>
          <DialogTrigger>
            <Button className="hover:bg-blue-500 hover:text-white bg-transparent text-black px-2">
              <Pencil1Icon />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit {name}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(submit)}>
              <Input
                type="text"
                label="Enter new Url"
                placeholder="Enter updatded Url"
                className=" w-full bg-transparent border-2 rounded-xl
                  border-white p-2 text-black placeholder:text-gray-700"
                {...register("url", {
                  required: true,
                })}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="submit" variant={"secondary"}>
                    Save Changes
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SocialCard;
