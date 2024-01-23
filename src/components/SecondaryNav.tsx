import React, { useRef } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Input from "./ui/Input";
import { SOCIALS, Priority } from "@/utils/constants/socials";
import Select from "./ui/Select";
import { Category } from "@/utils/constants/type";
interface Props {
  type: Category.READS | Category.SOCIALS;
}
const SecondaryNav: React.FC<Props> = ({ type }) => {
  const urlRef = useRef<HTMLInputElement>(null);
  return (
    <div className="w-full bg-inherit p-4 flex items-center justify-between">
      <div className="text-2xl font-bold text-[#495E57]">Your {type}</div>
      <div>
        <Dialog>
          <DialogTrigger>
            <Button>Add +</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Your {type}</DialogTitle>
            </DialogHeader>
            <form>
              {type === Category.SOCIALS && (
                <>
                  <Select
                    name="socials"
                    defaultText="Select Social"
                    defaultValue="0"
                    options={SOCIALS}
                  />
                  <Input
                    type="text"
                    label="URL"
                    placeholder="Enter Profile URL"
                    className=" w-full bg-transparent border-2 rounded-xl
                  border-white p-2 text-black placeholder:text-gray-700"
                    ref={urlRef}
                  />
                </>
              )}
              {type === Category.READS && (
                <>
                  <Input
                    type="text"
                    label="Title"
                    placeholder="Enter Read Title"
                    className=" w-full bg-transparent border-2 rounded-xl
                  border-white p-2 text-black placeholder:text-gray-700"
                  />
                  <Input
                    type="text"
                    label="URL"
                    placeholder="Enter Url"
                    className=" w-full bg-transparent border-2 rounded-xl
                  border-white p-2 text-black placeholder:text-gray-700"
                  />
                  <Select
                    options={Priority}
                    name="priority"
                    defaultText="Select Priority"
                    defaultValue="0"
                  />
                </>
              )}

              <DialogFooter>
                <Button type="submit" variant={"secondary"}>
                  Add
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SecondaryNav;
