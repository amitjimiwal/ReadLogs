import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { socialsType as socials } from "@/utils/constants/socials";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import Input from "../ui/Input";
import { DialogClose } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
type Social = {
  name: string;
  url: URL;
};
interface AddSocialProps {
  updateSocials: (social: { name: string; url: URL | string }) => void;
}
const AddSocial: React.FC<AddSocialProps> = ({ updateSocials }) => {
  const { register, handleSubmit } = useForm<Social>();
  const submit = (data: Social) => {
    updateSocials(data);
  };
  // const [currentSelection, setcurrentSelection] = useState<string>("");
  return (
    <Dialog>
      <DialogTrigger>
        <button className="border-grey-50 border-[1px] rounded-full shadow-xl p-2 bg-black text-white">
          <Plus size={24} strokeWidth={4} />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Add your Social Link</DialogHeader>
        <form onSubmit={handleSubmit(submit)}>
          <select
            id="social"
            aria-label="Default select example"
            className="outline-none border-gray-500 border-[1px] rounded-lg focus:outline-none text-gray-500 bg-white sm:px-2 sm:py-1"
            defaultValue="0"
            {...register("name", {
              required: true,
            })}
          >
            <option value="0" className="text-sm sm:text-lg hover:bg-heading">
              Select a social
            </option>
            {socials.map((social) => (
              <option
                key={social.name}
                value={social.name}
                className="text-sm sm:text-lg hover:bg-heading"
              >
                {social.name}
              </option>
            ))}
          </select>
          <Input
            type="text"
            label="Enter UrL"
            placeholder="Enter Url"
            className=" w-full bg-transparent border-2 rounded-xl
          border-white p-2 text-black placeholder:text-gray-700"
            {...register("url", {
              required: true,
            })}
          />
          <DialogClose asChild>
            <Button type="submit" variant={"secondary"}>
              SAVE
            </Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSocial;
