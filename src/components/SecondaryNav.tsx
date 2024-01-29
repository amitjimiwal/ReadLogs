import React, { useRef } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import Input from "./ui/Input";
import { SOCIALS, Priority } from "@/utils/constants/socials";
import { Category } from "@/utils/constants/type";
import { ReadSchema } from "@/models/read";
import { useForm } from "react-hook-form";
interface Props {
  type: Category.READS | Category.SOCIALS;
  addRead?: (read: ReadSchema) => void;
}

type Reads = ReadSchema;
const SecondaryNav: React.FC<Props> = ({ type, addRead }) => {
  const { register, handleSubmit } = useForm<Reads>();
  const submit = (data: Reads) => {
    console.log({ ...data, priority: Number(data.priority) });
    // if (addRead) {
    //   addRead(data);
    // }
  };
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
            <form onSubmit={handleSubmit(submit)}>
              {type === Category.SOCIALS && (
                <>
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
                    {...register("title", {
                      required: true,
                    })}
                  />
                  <Input
                    type="text"
                    label="URL"
                    placeholder="Enter Url"
                    className=" w-full bg-transparent border-2 rounded-xl
                  border-white p-2 text-black placeholder:text-gray-700"
                    {...register("readUrl", {
                      required: true,
                    })}
                  />
                  <Select
                    {...register("priority", {
                      required: true,
                    })}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">High</SelectItem>
                      <SelectItem value="2">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </>
              )}
              <DialogClose asChild>
                <DialogFooter>
                  <Button type="submit" variant={"secondary"}>
                    Add
                  </Button>
                </DialogFooter>
              </DialogClose>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SecondaryNav;
