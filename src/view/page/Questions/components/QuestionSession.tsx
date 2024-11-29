import { ReactNode } from "react"
import { Link } from "react-router-dom"


type QuestionSessionProps = {
  questions: {
    created_at: string
    created_by: { id: number, name: string }
    id: 1
    question: string
    status: string
    updated_at: string
    votes_sum_like: number
    votes_sum_unlike: number
  }[]
  title: string
  children?: ReactNode
  onHandleDelete?: (id: number) => void
  onHandleArchiveQuestion?: (id: number) => void
  onHandlePublishQuestion?: (id: number) => void
  onHandleRestoreQuestion?: (id: number) => void

}


export function QuestionSession({
  questions,
  title,
  children,
  onHandleDelete,
  onHandleArchiveQuestion,
  onHandlePublishQuestion,
  onHandleRestoreQuestion
}: QuestionSessionProps) {

  return (
    <div className="mx-10 mb-12 rounded-lg">
      <h2 className="text-gray-400 mb-3 ml-1 font-bold text-lg">{title}</h2>
      <div className="flex justify-around bg-gray-600 py-3 rounded-lg mb-3">
        <span className="w-[200px]">QUESTION</span>
        <span>ACTION</span>
      </div>

      <div className="space-y-6">

        {questions.map(item => (

          <div key={item.id} className="flex justify-around items-center py-3 border-b border-gray-500/50 bg-gray-900/20 rounded-lg">
            <span className="w-[250px]">{item.question}</span>



            <div className="flex flex-col gap-4">

              {(title === "DRAFTS" || title === "MY QUESTIONS") && (
                <button className="bg-red-600 px-2 py-1 rounded-md w-[100px]" onClick={() => {
                  onHandleDelete?.(item.id);
                }}>
                  Excluir
                </button>
              )}

              {title === 'DRAFTS' && (
                <>

                  <button className="bg-blue-600 px-2 py-1 rounded-md w-[100px]">
                    <Link to={`/question/${item.id}/edit`} >
                      Editar
                    </Link>
                  </button>
                  <button className="bg-gray-900 px-2 py-1 rounded-md w-[100px]" onClick={() => {
                    onHandlePublishQuestion?.(item.id);
                  }}>
                    Publicar
                  </button>
                </>
              )}




              {title === 'MY QUESTIONS' && (
                <button className="bg-gray-900 px-2 py-1 rounded-md w-[100px]" onClick={() => {
                  onHandleArchiveQuestion?.(item.id);
                }}>
                  Arquivar
                </button>
              )}

              {title === 'ARCHIVED QUESTIONS' && (
                <button className="bg-gray-900 px-2 py-1 rounded-md w-[100px]" onClick={() => {
                  onHandleRestoreQuestion?.(item.id);
                }}>
                  Restaurar
                </button>
              )}






            </div>
          </div>

        ))}
      </div>

      {children}
    </div>
  )
}
