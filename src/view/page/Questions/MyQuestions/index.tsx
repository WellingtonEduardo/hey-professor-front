import { FormEvent, useEffect, useState } from "react";
import { httpClient } from "../../../../app/services/httpClient";
import { FormQuestion } from "../components/FormQuestion";
import { QuestionSession } from "../components/QuestionSession";
import { Header } from "../../../components/Header";



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


export function MyQuestions() {
  const [question, setQuestion] = useState('')
  const [questionsDraft, setQuestionsDraft] = useState<QuestionProps[]>([]);
  const [questionsPublish, setQuestionsPublish] = useState<QuestionProps[]>([]);
  const [questionsArchive, setQuestionsArchive] = useState<QuestionProps[]>([]);

  useEffect(() => {
    async function questionsAll() {
      const responseDraft = await httpClient.get('/my-questions/draft');
      setQuestionsDraft(responseDraft.data.data);
      const responsePublish = await httpClient.get('/my-questions/published');
      setQuestionsPublish(responsePublish.data.data);
      const responseArchive = await httpClient.get('/my-questions/archived');
      setQuestionsArchive(responseArchive.data.data);

    }
    questionsAll();

  }, []);


  async function handleDeleteQuestion(id: number) {
    await httpClient.delete(`/questions/${id}`);
    setQuestionsDraft(questionsDraft.filter(q => q.id !== id));
    setQuestionsPublish(questionsPublish.filter(q => q.id !== id));
  }

  async function handleArchiveQuestion(id: number) {
    await httpClient.delete(`/questions/${id}/archive`)
    setQuestionsPublish(questionsPublish.filter(q => q.id !== id));
    setQuestionsArchive([...questionsArchive, questionsPublish.find(q => q.id === id)!]);
  }

  async function handleRestoreQuestion(id: number) {
    await httpClient.put(`/questions/${id}/restore`)
    setQuestionsArchive(questionsArchive.filter(q => q.id !== id));
    setQuestionsPublish([...questionsPublish, questionsArchive.find(q => q.id === id)!]);
  }

  async function handlePublishQuestion(id: number) {
    await httpClient.put(`/questions/${id}/publish`)
    setQuestionsDraft(questionsDraft.filter(q => q.id !== id));
    setQuestionsPublish([...questionsPublish, questionsDraft.find(q => q.id === id)!]);
  }


  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const response = await httpClient.post('/questions', {
      question
    });

    setQuestionsDraft([...questionsDraft, response.data.data]);

    setQuestion("");

  }

  function handleChange(value: string) {
    setQuestion(value);
  }



  return (
    <>
      <Header />

      <div className="text-white w-3/4 m-auto">


        <FormQuestion
          question={question}
          onHandleSubmit={handleSubmit}
          onHandleChange={handleChange}
        />

        <hr className="border-dashed border-gray-600 mx-10 my-8  m-auto" />

        <QuestionSession
          title="DRAFTS"
          questions={questionsDraft}
          onHandleDelete={handleDeleteQuestion}
          onHandleArchiveQuestion={handleArchiveQuestion}
          onHandlePublishQuestion={handlePublishQuestion}
        >
          <hr className="border-dashed border-gray-600 my-8" />
        </QuestionSession>

        <QuestionSession
          title="MY QUESTIONS"
          questions={questionsPublish}
          onHandleDelete={handleDeleteQuestion}
          onHandleArchiveQuestion={handleArchiveQuestion}
        >
          <hr className="border-dashed border-gray-600 my-8" />
        </QuestionSession>

        <QuestionSession
          title="ARCHIVED QUESTIONS"
          questions={questionsArchive}
          onHandleRestoreQuestion={handleRestoreQuestion}
        />

      </div>
    </>
  );
}
