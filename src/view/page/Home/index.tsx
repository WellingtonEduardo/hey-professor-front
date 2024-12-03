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
  const [search, setSearch] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [links, setLinks] = useState({});


  async function ListQuestion() {
    const response = await httpClient.get('/questions');
    console.log(response);

    setQuestions(response.data.data);
  }

  useEffect(() => {
    ListQuestion();

  }, []);


  const handleVote = async (id: number, vote: string) => {
    await httpClient.post(`/questions/${id}/vote/${vote}`);
    ListQuestion();
  }

  async function handleSearch() {
    const response = await httpClient.get(`/questions?q=${search}`);

    setQuestions(response.data.data);
  }




  useEffect(() => {
    fetchQuestions(currentPage);
  }, [currentPage]);

  const fetchQuestions = async (page: number) => {
    try {
      const response = await httpClient.get(`/questions?page=${page}`);
      const { data, links, meta } = response.data;

      setQuestions(data);
      setLinks(links);
      setLastPage(meta.last_page);
    } catch (error) {
      console.error("Erro ao buscar perguntas:", error);
    }
  };

  const handleNextPage = () => {
    if (links.next) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (links.prev) {
      setCurrentPage(currentPage - 1);
    }
  };


  return (
    <>
      <Header />
      <div className="flex flex-col px-10  items-center text-white">
        <div className=" w-3/4 gap-3 flex justify-between mb-4">
          <input type="text" name="search" className=" py-2 px-2 rounded-lg flex-1 bg-gray-900 border-gray-600 border" onChange={(e) => {
            setSearch(e.target.value)
          }} />
          <button className="bg-blue-600 px-3 py-1 rounded-lg" onClick={handleSearch}>
            Search
          </button>

        </div>

        <Questions
          questions={questions}
          onHandleVote={handleVote}
        />
      </div>

      <div className=" flex justify-center px-10 text-gray-400 font-bold text-lg py-6">
        <div className=" w-3/4 flex justify-around">
          <button onClick={handlePrevPage} disabled={!links.prev}>
            Anterior
          </button>
          <span>Página {currentPage} de {lastPage}</span>
          <button onClick={handleNextPage} disabled={!links.next}>
            Próxima
          </button>
        </div>
      </div>


    </>

  )
}
