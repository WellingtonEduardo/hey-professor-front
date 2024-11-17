import { FormEvent, FormHTMLAttributes } from "react";

// Corretamente estendendo o FormHTMLAttributes
type FormProps = FormHTMLAttributes<HTMLFormElement> & {
  onHandleSubmit: (event: FormEvent<HTMLFormElement>) => void
};

export function Form({ children, onHandleSubmit, ...props }: FormProps) {


  return (
    <form onSubmit={onHandleSubmit} {...props} className="flex gap-6 w-[300px] flex-col" >
      {children}



      <button type="submit" className="bg-blue-600 hover:bg-blue-500 w-4/5 m-auto py-2 rounded-xl font-bold text-white">
        Registrar
      </button>

    </form>

  );
}
