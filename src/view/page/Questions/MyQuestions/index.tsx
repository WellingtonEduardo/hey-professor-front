import { FormEvent, useEffect, useState } from "react";
import { httpClient } from "../../../../app/services/httpClient";
import { FormQuestion } from "../components/FormQuestion";





export function MyQuestions() {
  const [question, setQuestion] = useState('')
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    async function questionsAll() {
      const response = await httpClient.get('/my-questions/draft');
      setQuestions(response.data.data);


    }
    questionsAll();

  }, []);



  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    await httpClient.post('/questions', {
      question
    });

  }

  function handleChange(value: string) {
    setQuestion(value);
  }


  return (
    <div className="text-white">
      <div className="bg-gray-900 py-5 px-3 mb-10">
        <h1>My Questions</h1>
      </div>

      <FormQuestion
        question={question}
        onHandleSubmit={handleSubmit}
        onHandleChange={handleChange}
      />

      <hr className="border-dashed border-gray-600 my-8" />

      <div className="mx-10 rounded-lg">
        <h2 className="text-gray-400 mb-3 ml-2 font-bold text-lg">Draft</h2>
        <div className="flex justify-around bg-gray-600 py-3 rounded-lg mb-3">
          <span className="w-[200px]">QUESTION</span>
          <span>ACTION</span>
        </div>

        <div>

          {questions.map(item => (
            <>
              <div className="flex justify-around items-center py-2">
                <span className="w-[250px]">{item.question}</span>

                <div className="flex flex-col gap-4">
                  <button className="bg-blue-600 px-2 py-1 rounded-md w-[100px]">
                    Editar
                  </button>

                  <button className="bg-gray-900 px-2 py-1 rounded-md w-[100px]">
                    Arquivar
                  </button>

                  <button className="bg-red-600 px-2 py-1 rounded-md w-[100px]">
                    Excluir
                  </button>
                </div>
              </div>
              <hr className="border-dashed border-gray-600 my-8" />
            </>
          ))}
        </div>

      </div>

    </div>
  );
}
