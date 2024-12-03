
type QuestionProps = {
  questions: {
    created_at: string
    created_by: { id: number, name: string }
    id: 1
    question: string
    status: string
    updated_at: string
    votes_sum_like: number
    votes_sum_unlike: number
  }[],
  onHandleVote: (id: number, vote: string) => void
}


export function Questions({ questions, onHandleVote }: QuestionProps) {
  return (
    <div className="flex flex-col w-3/4 gap-5">
      {questions.map(item => (
        <div key={item.id} className="flex justify-between bg-gray-900/20 border-b-2 border-gray-500 px-5 py-7">
          <p className="w-[300px]">{item.question}</p>
          <div className="space-y-4">
            <p onClick={() => {
              onHandleVote(item.id, "like")
            }} className="cursor-pointer" >
              ⬆ {item.votes_sum_like}
            </p>
            <p onClick={() => {
              onHandleVote(item.id, "unlike")
            }} className="cursor-pointer">
              ⬇ {item.votes_sum_unlike}
            </p>
          </div>
        </div>
      ))}

    </div>
  )
}
