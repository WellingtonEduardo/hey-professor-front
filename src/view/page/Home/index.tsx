import { useEffect, useState } from "react";
import { httpClient } from "../../../app/services/httpClient";
import { Header } from "../../components/Header";

type QuestionProps = {
  created_at: string
  created_by: { id: number, name: string }
  id: 1
  question: string
  status: string
  updated_at: string
  votes_sum_like: number
  votes_sum_unlike: number
}


export function Home() {
  const [questions, setQuestions] = useState<QuestionProps[]>([])



  async function ListQuestion() {
    const response = await httpClient.get('/questions');

    setQuestions(response.data.data);
  }

  useEffect(() => {
    ListQuestion();

  }, []);



  return (
    <>
      <Header />
      <div className="flex flex-col px-10  items-center text-white">

        <div className="flex flex-col w-3/4 gap-5">
          {questions.map(item => (
            <div key={item.id} className="flex justify-between bg-gray-900/20 border-b-2 border-gray-500 px-5 py-7">
              <p className="w-[300px]">{item.question}</p>
              <div>
                <p> ⬆ {item.votes_sum_like}</p>
                <p> ⬇ {item.votes_sum_unlike}</p>
              </div>
            </div>
          ))}

        </div>
      </div>


    </>

  )
}
