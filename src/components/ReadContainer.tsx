import React from "react";
import SocialCard from "./ui/SocialCard";
interface Props {
  priority: number | string;
}
const ReadContainer: React.FC<Props> = ({ priority }) => {
  return (
    <div>
      {priority}
      <SocialCard id="1" name="Twitter" url="https://twitter.com" />
      <SocialCard id="1" name="Twitter" url="https://twitter.com" />
      <SocialCard id="1" name="Twitter" url="https://twitter.com" />
    </div>
  );
};

export default ReadContainer;
