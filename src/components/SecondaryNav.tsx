import React from 'react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
const SecondaryNav = () => {
  return (
    <div className='w-full bg-black p-4 flex items-center justify-between'>
      <div className='text-white'>
        Your Socials
      </div>
      <div>
        <Dialog>
          <DialogTrigger>
            <Button variant={"secondary"}>
              Add +
            </Button>
          </DialogTrigger>
          <DialogContent>
            Hello sir
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default SecondaryNav
