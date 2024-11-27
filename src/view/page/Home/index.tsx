import { useEffect } from "react";
import { httpClient } from "../../../app/services/httpClient";
import { Header } from "../../components/Header";
import { Link } from "react-router-dom";


export function Home() {



  async function ListQuestion() {
    const questions = await httpClient.get('/questions');
    console.log(questions);
  }

  useEffect(() => {
    ListQuestion();
  }, []);


  return (
    <>
      <Header />
      <div className="flex flex-col ">
        <Link to='/question-create' className="bg-blue-500 rounded-lg px-2 py-1 w-[120px] ml-4 mt-4 mb-10">
          Criar pergunta
        </Link>
        <h1>Welcome to the Home Page</h1>
        <p>This is where your content will be displayed.</p>
      </div>

    </>

  )
}
