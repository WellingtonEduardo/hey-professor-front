
import { httpClient } from "../../app/services/httpClient";

export function Download() {
  const handleDownload = async () => {
    try {

      const response = await httpClient.get("/questions/download",
        {
          responseType: 'blob',
        }
      );

      if (response.status !== 200) {
        throw new Error("Erro ao baixar o arquivo");
      }

      const fileData = await response.data;

      const blob = new Blob([fileData], { type: 'application/octet-stream' });;


      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = 'myQuestions.xlsx';
      document.body.appendChild(a);
      a.click();


      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro ao fazer download:', error);
    }
  };

  return (
    <button onClick={handleDownload}>
      Baixar Planilha
    </button>
  );
}
