import { FormEvent, useState } from "react";
import { httpClient } from "../../../../app/services/httpClient";
import { FormQuestion } from "../components/FormQuestion";





export function MyQuestions() {
  const [question, setQuestion] = useState('')


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

    </div>
  );
}
