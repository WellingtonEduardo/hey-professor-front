import { FormEvent } from "react";



type FormQuestionProps = {
  question: string;
  onHandleChange: (value: string) => void;
  onHandleSubmit: (event: FormEvent<HTMLFormElement>) => void;

}

export function FormQuestion({ question, onHandleSubmit, onHandleChange }: FormQuestionProps) {
  return (
    <div className="flex flex-col items-center">
      <form className="flex flex-col w-full px-10" onSubmit={onHandleSubmit}>
        <label htmlFor="questionInput" className="mb-2">
          Question
        </label>
        <textarea name="question" id="questionInput" className="bg-gray-900 h-[140px] rounded-md px-3 py-2" placeholder="Me faça uma pergunta.." value={question}
          onChange={(e) => {
            onHandleChange(e.target.value)

          }}
        />

        <div className="m-auto space-x-10 mt-5">
          <button className="bg-blue-600 px-2 py-1 rounded-md w-[100px]">
            Salvar
          </button>
          <button className="bg-gray-900 px-2 py-1 rounded-md w-[100px]">
            Cancelar
          </button>
        </div>

      </form>
    </div>
  );
};
