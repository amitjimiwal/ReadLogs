import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { forwardRef } from "react";
interface Priority {
  id: string |number;
  name: string ;
}
const SelectBox= forwardRef(function SelectBox({options,...props} :{
  options: Priority[];
}, ref: React.Ref<HTMLDivElement>){
  return (
    <Select>
      <SelectTrigger>
        <SelectValue className="">Select</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.id} value={String(option.id)} ref={ref} {...props}>
            {option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
})

export default SelectBox;
