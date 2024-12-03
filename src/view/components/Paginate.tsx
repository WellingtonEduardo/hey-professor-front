import { useState, useEffect } from 'react';
import axios from 'axios';

export function Paginate() {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [links, setLinks] = useState({});

  useEffect(() => {
    fetchQuestions(currentPage);
  }, [currentPage]);

  const fetchQuestions = async (page: string) => {
    try {
      const response = await axios.get(`http://localhost:8000/questions?page=${page}`);
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
    <div>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>{question.title}</li>
        ))}
      </ul>
      <div>
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
