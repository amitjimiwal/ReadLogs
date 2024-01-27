import React from "react";
import Read from "@/models/read";
import { Button } from "./button";
import CopyButton from "../CopyButton";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogFooter, DialogHeader } from "./dialog";
import Input from "./Input";
interface ReadProps extends Read {
  deleteRead: (id: string) => void;
  updateRead: (read: Read) => void;
}
const ReadCard: React.FC<ReadProps> = ({
  id,
  title,
  readUrl,
  isRead,
  priority,
  userID,
  deleteRead,
  updateRead,
}) => {
  const urlRef = React.useRef<HTMLInputElement>(null);
  return (
    <Dialog>
      <div
        id={id}
        className={`rounded-lg shadow-md overflow-hidden w-full mb-5 ${
          isRead ? "border-green-400 border-2" : ""
        }`}
      >
        <div
          className={`p-2 flex items-center justify-between ${
            priority === 2 ? "bg-red-200" : "bg-gray-100 dark:bg-gray-800"
          }`}
        >
          <h1 className="text-lg font-semibold flex gap-4 items-center hover:text-blue-500 hover:underline">
            {" "}
            <a href={readUrl} target="_blank" referrerPolicy="no-referrer">
              {title}
            </a>
            <CopyButton text={readUrl} />
          </h1>
          <div>
            <input type="checkbox" checked={isRead} className="mr-2" />
          </div>
          {/* {isRead} {priority} {userID} */}
        </div>
        <div className="flex p-2 bg-gray-50 dark:bg-gray-900 gap-3">
          <DialogTrigger>
            <Button
              className="text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white dark:text-blue-300 dark:border-blue-300 dark:hover:bg-blue-300 dark:hover:text-black"
              variant="outline"
            >
              Edit
            </Button>
          </DialogTrigger>
          <Button
            className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white dark:text-red-300 dark:border-red-300 dark:hover:bg-red-300 dark:hover:text-black"
            variant="outline"
            onClick={() => deleteRead(id)}
          >
            Delete
          </Button>
          <Button
            className="bg-green-500 text-white hover:bg-green-600 dark:bg-green-300 dark:text-black dark:hover:bg-green-400"
            variant="secondary"
          >
            <a href={readUrl} target="_blank" referrerPolicy="no-referrer">
              Go
            </a>
          </Button>
        </div>
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Read Url</DialogTitle>
        </DialogHeader>
        <form>
          <Input
            type="text"
            label="Enter new Url"
            placeholder="Enter updatded Url"
            className=" w-full bg-transparent border-2 rounded-xl
                  border-white p-2 text-black placeholder:text-gray-700"
            value={readUrl}
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

export default ReadCard;
