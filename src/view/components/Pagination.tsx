import { useEffect, useState } from "react";
import { httpClient } from "../../app/services/httpClient";

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
type LinksProps = {
  first: string | null
  last: string | null
  next: string | null
  prev: string | null
}
export function Pagination({ onHandleSetQuestions }: { onHandleSetQuestions: (data: QuestionProps[]) => void }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [links, setLinks] = useState<LinksProps>({
    first: null,
    last: null,
    next: null,
    prev: null,
  });


  useEffect(() => {
    fetchQuestions(currentPage);
  }, [currentPage]);

  const fetchQuestions = async (page: number) => {
    try {
      const response = await httpClient.get(`/questions?page=${page}`);
      const { data, links, meta } = response.data;

      onHandleSetQuestions(data);
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
  );
};
