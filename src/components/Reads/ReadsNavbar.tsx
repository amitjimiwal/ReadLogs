import React, { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
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
import { Priority } from "@/utils/constants/priority";
import { ReadSchema } from "@/models/read";
import { useForm } from "react-hook-form";
import EmailToggle from "../EmailToggle";
import dbService from "@/appwrite/dbService";
import { Models } from "appwrite";
import { useSelector } from "react-redux";
import { AuthState } from "@/redux/store/store";
import toast from "react-hot-toast";
interface Props {
  addRead?: (read: ReadSchema) => void;
  updateSortBy?: (sortBy: number) => void;
}

type Reads = ReadSchema;
const ReadsNavbar: React.FC<Props> = ({ addRead, updateSortBy }) => {
  const user: Models.User<Models.Preferences> | undefined = useSelector(
    (state: AuthState) => state.auth.userData
  );
  const [trigger, setTrigger] = useState<boolean>(false);
  const [emailReminder, setEmailReminder] = useState<
    Models.DocumentList<Models.Document> | undefined
  >();
  const { register, handleSubmit, reset } = useForm<Reads>();
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
  const updateEmailReminder = useCallback(
    (isEmailReminder: boolean) => {
      const documentID = emailReminder ? emailReminder.documents[0].$id : "";
      dbService
        .updateEmailReminder({ documentID, isEmailReminder })
        .then((res) => {
          console.log(res);
          toast.success("Email Reminder Updated");
          setTrigger((trigger) => !trigger);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [emailReminder]
  );
  useEffect(() => {
    dbService.getEmailReminder({ userID: String(user?.$id) }).then((res) => {
      setEmailReminder(res);
    });
  }, [user?.$id, trigger]);
  return (
    <>
      <div className="w-full bg-inherit p-4 flex items-center justify-between">
        <div className="sm:text-2xl font-bold text-[#495E57] text-lg">
          Your Reads
        </div>
        <div className="flex items-center gap-3">
          <select
            id="sortBy"
            aria-label="Default select example"
            className="outline-none border-gray-500 border-[1px] rounded-lg focus:outline-none text-gray-500 bg-white sm:px-2 sm:py-1"
            defaultValue="0"
            onChange={(e) => {
              if (updateSortBy) {
                updateSortBy(Number(e.target.value));
              }
            }}
          >
            <option value="0" className="text-sm sm:text-lg hover:bg-heading">
              High to Low
            </option>
            <option value="1" className="text-sm sm:text-lg hover:bg-heading">
              Low to High
            </option>
          </select>
          <Dialog>
            <DialogTrigger>
              <Button className="text-sm sm:text-xl">Add +</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Your Read</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(submit)}>
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
                        key={option.id}
                        value={option.id}
                        className="text-sm sm:text-lg hover:bg-heading"
                      >
                        {option.name}
                      </option>
                    ))}
                  </select>
                </>
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
      {emailReminder?.documents[0] != undefined && (
        <EmailToggle
          isEmailReminder={emailReminder.documents[0].isEmailReminder}
          updateEmail={updateEmailReminder}
        />
      )}
    </>
  );
};

export default ReadsNavbar;
