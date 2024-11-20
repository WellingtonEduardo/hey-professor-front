import { FormEvent, useState } from "react";
import { Form } from "../../components/Form";
import { Input } from "../../components/Input";
import { httpClient } from "../../../app/services/httpClient";
import { useNavigate } from "react-router-dom";
import { useSanctum } from "react-sanctum";




export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { signIn } = useSanctum();



  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {

      await signIn(email, password);



      navigate('/', { replace: true });

    } catch (error) {
      console.log(error);

    }




  }
  return (
    <div>
      <h1>Login</h1>

      <div className="flex justify-center">
        <Form onHandleSubmit={handleSubmit}>
          <Input value={email} type="email" name="email" placeholder="Email" onHandleClick={setEmail} />
          <Input value={password} type="password" name="password" placeholder="senha" onHandleClick={setPassword} />

        </Form>
      </div>
    </div>
  )
}
