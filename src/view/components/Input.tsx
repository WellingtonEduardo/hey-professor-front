import { ChangeEvent, InputHTMLAttributes } from "react";


type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  onHandleClick: (value: string) => void;
}

export function Input({ onHandleClick, ...props }: InputProps) {

  return (
    <input {...props} className="border-2 border-gray-300 px-2 py-1 w-full" onChange={(e: ChangeEvent<HTMLInputElement>) => {
      onHandleClick(e.currentTarget.value);
    }} />
  );
}
