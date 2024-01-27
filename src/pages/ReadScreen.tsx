import React, { useCallback, useEffect, useState } from "react";
import SecondaryNav from "@/components/SecondaryNav";
import SocialCard from "@/components/ui/SocialCard";
import { Category } from "@/utils/constants/type";
import dbService from "@/appwrite/dbService";
import ReadCard from "@/components/ui/ReadCard";
import { Models } from "appwrite";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { useSelector } from "react-redux";
import { AuthState } from "@/redux/store/store";
import Read from "@/models/read";

const ReadScreen: React.FC = () => {
  const user: Models.User<Models.User> = useSelector(
    (state: AuthState) => state.auth.userData
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [reads, setReads] = useState<
    Models.DocumentList<Models.Document> | undefined
  >();

  const addRead = useCallback((read: Read) => {
    dbService
      .addRead(read)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const deleteRead = useCallback((id: string) => {
    dbService
      .deleteRead({ documentID: id })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const updateRead = useCallback((read) => {
    dbService
      .updateRead({
        documentID: read.id,
        newPriority: read.priority,
        readUrl: read.readUrl,
        title: read.title,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(
    function () {
      // setLoading(true);
      try {
        dbService.getRead({ userID: String(user.$id) }).then((res) => {
          setReads(res);
          setLoading((loading) => !loading);
        });
      } catch (error) {
        console.log(error);
      }
    },
    [user.$id, addRead, deleteRead, updateRead]
  );

  return (
    <div>
      <SecondaryNav type={Category.SOCIALS} />
      {loading ? (
        <LoadingSkeleton number={2} />
      ) : (
        <div className="flex flex-wrap gap-4 p-4 bg-[#B6BBC4]">
          <SocialCard id="1" name="Twitter" url="https://twitter.com" />
          <SocialCard
            id="1"
            name="Linkedin"
            url="https://www.linkedin.com/company/zocketdigital/sjfhdfhdjfdf"
          />
          <SocialCard id="1" name="Twitter" url="https://twitter.com" />
          <SocialCard id="1" name="Twitter" url="https://twitter.com" />
        </div>
      )}
      <SecondaryNav type={Category.READS} addRead={addRead} />
      {loading ? (
        <LoadingSkeleton number={2} />
      ) : (
        <>
          <div className="p-4">
            <div className="text-2xl mb-5">{reads?.total} Reads in total</div>
            {reads?.documents?.map((read) => (
              <ReadCard
                userID={read.userID}
                id={read.$id}
                title={read.title}
                readUrl={read.readUrl}
                priority={read.priority}
                isRead={read.isRead}
                deleteRead={deleteRead}
                updateRead={updateRead}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ReadScreen;
