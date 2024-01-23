import React, { useRef } from "react";
import { Button } from "./button";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Input from "./Input";
import CopyButton from "../CopyButton";

interface Props {
  id: string;
  name: string;
  url: string;
}
const SocialCard: React.FC<Props> = ({ id, name, url }) => {
  const urlRef = useRef<HTMLInputElement>(null);
  return (
    <Dialog>
      <div
        id={id}
        className="py-4 px-2 pl-2 w-full shadow-xl max-w-sm rounded-xl text-left flex justify-start flex-wrap bg-[#EBE3D5]"
      >
        <div>
          <h3 className="font-bold text-[#776B5D] text-xl">
            <a href={url} target="_blank" referrerPolicy="no-referrer">
              {name}
            </a>
          </h3>
        </div>
        <div className="flex gap-3 items-center p-2 justify-start w-full">
          <DialogTrigger>
            <Button className="hover:bg-blue-500 hover:text-white bg-white text-black">
              <Pencil1Icon />
            </Button>
          </DialogTrigger>
          <Button className="hover:bg-red-600 hover:text-white bg-white text-red-600">
            <TrashIcon />
          </Button>
          <CopyButton text={url} />
        </div>
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Link</DialogTitle>
        </DialogHeader>
        <form>
          <Input
            type="text"
            label="Enter new Url"
            placeholder="Enter updatded Url"
            className=" w-full bg-transparent border-2 rounded-xl
                  border-white p-2 text-black placeholder:text-gray-700"
            ref={urlRef}
          />
          <DialogFooter>
            <Button type="submit" variant={"secondary"}>
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SocialCard;
