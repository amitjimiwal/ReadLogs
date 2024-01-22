import SecondaryNav from '@/components/SecondaryNav'
import SocialCard from '@/components/ui/SocialCard'
import { Category } from '@/utils/constants/type'
import React from 'react'

const ReadScreen: React.FC = () => {
  return (
    <div>
      <SecondaryNav type={Category.SOCIALS}/>
      <div className='flex flex-wrap gap-4 p-4 bg-[#A3CFCD]'>
      <SocialCard id="1" name="Twitter" url="https://twitter.com" />
      <SocialCard id="1" name="Linkedin" url="https://www.linkedin.com/company/zocketdigital/sjfhdfhdjfdf" />
      <SocialCard id="1" name="Twitter" url="https://twitter.com" />
      <SocialCard id="1" name="Twitter" url="https://twitter.com" />
      </div>
      {/* <SecondaryNav type={Category.READS}/>
      <div className='flex flex-wrap gap-4 p-4 bg-[#A3CFCD]'>
      <SocialCard id="1" name="Twitter" url="https://twitter.com" />
      <SocialCard id="1" name="Twitter" url="https://twitter.com" />
      <SocialCard id="1" name="Twitter" url="https://twitter.com" />
      <SocialCard id="1" name="Twitter" url="https://twitter.com" />
      </div> */}
    </div>
  )
}

export default ReadScreen
