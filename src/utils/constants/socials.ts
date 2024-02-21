import { Github,Linkedin,Twitter,File, FileSpreadsheet,Instagram } from "lucide-react";
export const socialsType = [
     {
          icon: "Linkedin",
          name: "linkedinURL",
          view: Linkedin,
     },
     {
          icon: "Twitter",
          name: "TwitterURL",
          view: Twitter,
     },
     {
          icon: "Github",
          name: "githubURL",
          view: Github,
     },
     {
          icon: "Resume",
          name: "resumeURL",
          view: File,
     },
     {
          icon: "Cover Letter",
          name: "coverLetterURL",
          view: FileSpreadsheet,
     },
     {
          icon: "Instagram",
          name: "instaURL",
          view: Instagram,
     }
]

/* src/components/socials/AddSocial.tsx
Linkedin
Github
X
Twitter
Instagram
File
FileSpreadsheet
*/