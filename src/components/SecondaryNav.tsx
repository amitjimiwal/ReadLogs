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
import Input from "./ui/Input";
import { Priority } from "@/utils/constants/socials";
import { Category } from "@/utils/constants/type";
import { ReadSchema } from "@/models/read";
import { useForm } from "react-hook-form";
interface Props {
  type: Category.READS | Category.SOCIALS;
  addRead?: (read: ReadSchema) => void;
}

type Reads = ReadSchema;
const SecondaryNav: React.FC<Props> = ({ type, addRead }) => {
  const { register, handleSubmit,reset } = useForm<Reads>();
  const submit = (data: Reads) => {
    data = {
      ...data,
      priority: Number(data.priority),
      readUrl: new URL(data.readUrl),
    };
    if (addRead) {
      addRead(data);
    }
    reset();
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
                  <select
                    id="priority"
                    aria-label="Default select example"
                    className=" p-2 sm:p-4 border border-gray-300 rounded-lg focus:outline-none text-gray-500 bg-white"
                    defaultValue="0"
                    {...register("priority", {
                      required: true,
                    })}
                  >
                    <option
                      value="0"
                      disabled
                      className="text-sm sm:text-lg"
                      selected
                    >
                      Select Priority
                    </option>
                    {Priority?.map((option) => (
                      <option
                        value={option.id}
                        className="text-sm sm:text-lg hover:bg-heading"
                      >
                        {option.name}
                      </option>
                    ))}
                  </select>
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
