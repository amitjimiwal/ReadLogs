import React from "react";
import { Read } from "@/models/read";
import { Button } from "../ui/button";
import CopyButton from "../CopyButton";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogFooter, DialogHeader } from "../ui/dialog";
import Input from "../ui/Input";
import { useForm } from "react-hook-form";
import { Priority } from "@/utils/constants/priority";
interface ReadProps extends Read {
  deleteRead: (id: string) => void;
  updateRead: (
    id: string,
    changes: {
      priority?: number;
      isRead?: boolean;
      title?: string;
      readUrl?: string | URL;
    }
  ) => void;
}
type Form = {
  readUrl: string | URL;
};
const ReadCard: React.FC<ReadProps> = ({
  id,
  title,
  readUrl,
  isRead,
  priority,
  deleteRead,
  updateRead,
  previewImage,
}) => {
  const { register, handleSubmit } = useForm<Form>();
  const submit = (data: Form) => {
    data = {
      ...data,
      readUrl: new URL(data.readUrl),
    };
    updateRead(id, { readUrl: data.readUrl });
  };
  return (
    <div
      id={id}
      className={`rounded-lg shadow-md w-80 mb-5 h-auto  ${
        isRead ? "border-green-400 border-2" : ""
      }`}
    >
      <div className="w-full">
        <img
          src={String(previewImage)}
          className="w-full h-auto aspect-video sm:w-80"
        />
      </div>
      <div
        className={`w-full p-2 flex items-center justify-between ${
          priority === 1 ? "bg-red-200" : "bg-gray-100 dark:bg-gray-800"
        }`}
      >
        <h1 className="w-full text-lg font-semibold flex gap-4 items-center hover:text-blue-500 hover:underline flex-wrap">
          {" "}
          <a
            href={String(readUrl)}
            target="_blank"
            referrerPolicy="no-referrer"
            className="text-wrap"
          >
            {title.slice(0, 20)}...
          </a>
          <CopyButton text={String(readUrl)} />
        </h1>
        <div>
          <input
            type="checkbox"
            checked={isRead}
            className="mr-2"
            onChange={() => {
              updateRead(id, { isRead: !isRead });
            }}
          />
        </div>
      </div>
      <div className="flex p-2 bg-gray-50 dark:bg-gray-900 gap-3 items-center">
        <Dialog>
          <DialogTrigger>
            <Button
              className="text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white dark:text-blue-300 dark:border-blue-300 dark:hover:bg-blue-300 dark:hover:text-black"
              variant="outline"
            >
              Edit
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Read</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(submit)}>
              <Input
                type="text"
                label="Enter new Url"
                placeholder="Enter updatded Url"
                className=" w-full bg-transparent border-2 rounded-xl
                  border-white p-2 text-black placeholder:text-gray-700"
                {...register("readUrl", {
                  required: true,
                })}
              />
              <DialogClose asChild>
                <DialogFooter>
                  <Button type="submit" variant={"secondary"}>
                    Save Changes
                  </Button>
                </DialogFooter>
              </DialogClose>
            </form>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger>
            <Button
              className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white dark:text-red-300 dark:border-red-300 dark:hover:bg-red-300 dark:hover:text-black"
              variant="outline"
            >
              Delete
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
            </DialogHeader>
            <DialogContent>
              <p className="text-red-500">
                This action cannot be undone. This will permanently delete this
                read.
              </p>
            </DialogContent>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary">Cancel</Button>
              </DialogClose>
              <Button
                className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white dark:text-red-300 dark:border-red-300 dark:hover:bg-red-300 dark:hover:text-black"
                variant="outline"
                onClick={() => deleteRead(id)}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button
          className="bg-green-500 text-white hover:bg-green-600 dark:bg-green-300 dark:text-black dark:hover:bg-green-400"
          variant="secondary"
        >
          <a
            href={String(readUrl)}
            target="_blank"
            referrerPolicy="no-referrer"
          >
            Go
          </a>
        </Button>
        <div className="ml-auto">
          <select
            id="priority"
            aria-label="Default select example"
            className="outline-none"
            defaultValue={priority}
            onChange={(e) => {
              updateRead(id, { priority: Number(e.target.value) });
            }}
          >
            {Priority?.map((option) => (
              <option
                key={option.id}
                value={option.id}
                className="text-sm sm:text-lg hover:bg-heading"
              >
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ReadCard;
