import React, { useCallback, useEffect, useState } from "react";
import AddSocial from "./AddSocial";
import { Models } from "appwrite";
import { useSelector } from "react-redux";
import { AuthState } from "@/redux/store/store";
import dbService from "@/appwrite/dbService";
import LoadingSkeleton from "../LoadingSkeleton";
import { socialsType } from "@/utils/constants/socials";
import SocialCard from "./SocialCard";
import toast from "react-hot-toast";
const Social: React.FC = () => {
  const user: Models.User<Models.Preferences> | undefined = useSelector(
    (state: AuthState) => state.auth.userData
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [trigger, setTrigger] = useState<boolean>(false);
  const [socials, setSocials] = useState<
    Models.DocumentList<Models.Document> | undefined
  >();
  //update the socials
  const updateSocials = useCallback(
    (social: { name: string; url: URL | string | null }) => {
      dbService
        .updateSocials({ documentID: socials?.documents[0].$id || "", social })
        .then(() => {
          toast.success(`${social.name} updated successfully!`);
          setTrigger((trigger) => !trigger);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to update socials");
        });
    },
    [socials?.documents]
  );
  useEffect(() => {
    setLoading(true);
    try {
      dbService.getSocials({ userID: String(user?.$id) }).then((res) => {
        setSocials(res);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }, [user?.$id, trigger]);
  return (
    <div className="w-full p-4 ">
      <nav className="w-full text-xl sm:text-2xl mb-2">
        Your Documents & Social Link
      </nav>
      {loading ? (
        <LoadingSkeleton number={2} />
      ) : (
        <div className="flex items-center gap-5 flex-wrap">
          {!loading &&
            socials?.documents && socials?.documents.length > 0 &&
            socialsType.map((social) => {
              if (socials?.documents[0][social.name] !== null) {
                return (
                  <SocialCard
                    key={social.name}
                    id={social.name}
                    name={social.name}
                    url={socials?.documents[0][social.name]}
                    updateSocials={updateSocials}
                    Icon={social.view}
                  />
                );
              }
            })}
          <AddSocial updateSocials={updateSocials} />
        </div>
      )}
    </div>
  );
};

export default Social;
