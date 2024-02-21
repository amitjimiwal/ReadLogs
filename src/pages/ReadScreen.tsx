import React, { useCallback, useEffect, useState } from "react";
import ReadsNavbar from "@/components/Reads/ReadsNavbar";
import dbService from "@/appwrite/dbService";
import ReadCard from "@/components/Reads/ReadCard";
import { Models } from "appwrite";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { useSelector } from "react-redux";
import { AuthState } from "@/redux/store/store";
import { ReadSchema } from "@/models/read";
import toast from "react-hot-toast";
import Social from "@/components/socials/Social";

const ReadScreen: React.FC = () => {
  const user: Models.User<Models.Preferences> | undefined = useSelector(
    (state: AuthState) => state.auth.userData
  );
  const [sortBy, setSortBy] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [reads, setReads] = useState<
    Models.DocumentList<Models.Document> | undefined
  >();
  //state for triggering effect to update the reads
  const [trigger, setTrigger] = useState<boolean>(false);
  const addRead = useCallback(
    (read: ReadSchema) => {
      dbService
        .addRead({ ...read, userID: String(user?.$id) })
        .then(() => {
          toast.success("Read added successfully");
          setTrigger((trigger) => !trigger);
        })
        .catch((err) => {
          toast.error("Error while adding read");
          console.log(err);
        });
    },
    [user?.$id]
  );
  const deleteRead = useCallback((id: string) => {
    dbService
      .deleteRead({ documentID: id })
      .then(() => {
        toast.success("Read deleted successfully");
        setTrigger((trigger) => !trigger);
      })
      .catch((err) => {
        toast.error("Error while deleting read");
        console.log(err);
      });
  }, []);
  const updateRead = useCallback(
    (
      id: string,
      changes: {
        priority?: number;
        isRead?: boolean;
        title?: string;
        readUrl?: string | URL;
      }
    ) => {
      dbService
        .updateRead({ documentID: id, updates: changes })
        .then(() => {
          toast.success("Read updated successfully");
          setTrigger((trigger) => !trigger);
        })
        .catch((err) => {
          toast.error("Error while updating read");
          console.log(err);
        });
    },
    []
  );
  const updateSortby = useCallback((sortBy: number) => {
    setSortBy(sortBy);
  }, []);
  useEffect(
    function () {
      setLoading(true);
      try {
        dbService.getRead({ userID: String(user?.$id) }).then((res) => {
          //sort reads by priority
          if (sortBy === 0) {
            res?.documents?.sort((a, b) => {
              return a.priority - b.priority;
            });
          } else if (sortBy === 1) {
            res?.documents?.sort((a, b) => {
              return b.priority - a.priority;
            });
          }
          setReads(res);
          setLoading(false);
        });
      } catch (error) {
        console.log(error);
      }
    },
    [user?.$id, trigger, sortBy]
  );

  return (
    <div>
      <Social/>
      <ReadsNavbar addRead={addRead} updateSortBy={updateSortby} />
      {loading ? (
        <LoadingSkeleton number={2} />
      ) : (
        <>
          <div className="p-4 w-full">
            <div className="text-2xl mb-5">{reads?.total} Reads in total</div>
            <div className="flex flex-wrap gap-10 items-center mx-auto animate-fade-down">
              {reads?.documents?.map((read) => (
                <ReadCard
                  key={read.$id}
                  userID={read.userID}
                  id={read.$id}
                  title={read.title}
                  readUrl={read.readUrl}
                  priority={read.priority}
                  isRead={read.isRead}
                  previewImage={read.previewImage}
                  deleteRead={deleteRead}
                  updateRead={updateRead}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ReadScreen;
