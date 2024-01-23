import React from "react";
import SecondaryNav from "@/components/SecondaryNav";
import SocialCard from "@/components/ui/SocialCard";
import { Category } from "@/utils/constants/type";
const ReadScreen: React.FC = () => {
  return (
    <div>
      <SecondaryNav type={Category.SOCIALS} />
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
      <SecondaryNav type={Category.READS} />
      {/* <div className="grid grid-cols-3 bg-[#A3CFCD]">
        {Priority?.map((priority) => (
          <ReadContainer priority={priority.id} />
        ))}
      </div> */}
    </div>
  );
};

export default ReadScreen;
