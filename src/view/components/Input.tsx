import { ChangeEvent, InputHTMLAttributes } from "react";


type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  onHandleChange: (value: string) => void;
}

export function Input({ onHandleChange, ...props }: InputProps) {

  return (
    <input {...props} className="border-2 border-gray-300 px-2 py-1 w-full" onChange={(e: ChangeEvent<HTMLInputElement>) => {
      onHandleChange(e.currentTarget.value);
    }} />
  );
}
