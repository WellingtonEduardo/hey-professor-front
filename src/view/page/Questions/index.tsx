import { FormEvent, useState } from "react";
import { httpClient } from "../../../app/services/httpClient";



export function Questions() {
  const [question, setQuestion] = useState('')


  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    await httpClient.post('/questions', {
      question
    });




  }

  return (
    <div className="text-white">
      <div className="bg-gray-900 py-5 px-3 mb-10">
        <h1>My Questions</h1>
      </div>

      <div className="flex flex-col items-center">
        <form className="flex flex-col w-full px-10" onSubmit={handleSubmit}>
          <label htmlFor="questionInput" className="mb-2">
            Question
          </label>
          <textarea name="question" id="questionInput" className="bg-gray-900 h-[140px] rounded-md px-3 py-2" placeholder="Me faça uma pergunta.." value={question}
            onChange={(e) => {
              setQuestion(e.target.value)

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

    </div>
  );
}
