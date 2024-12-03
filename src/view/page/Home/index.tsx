import { useEffect, useState } from "react";
import { httpClient } from "../../../app/services/httpClient";
import { Header } from "../../components/Header";
import { Questions } from "../../components/Questions";

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


  const handleVote = async (id: number, vote: string) => {
    await httpClient.post(`/questions/${id}/vote/${vote}`);
    ListQuestion();
  }

  return (
    <>
      <Header />
      <div className="flex flex-col px-10  items-center text-white">

        <Questions
          questions={questions}
          onHandleVote={handleVote}
        />
      </div>


    </>

  )
}
