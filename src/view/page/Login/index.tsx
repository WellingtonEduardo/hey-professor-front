import { FormEvent, useState } from "react";
import { Form } from "../../components/Form";
import { Input } from "../../components/Input";
import { Link, useNavigate } from "react-router-dom";
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
    <div className="flex flex-col items-center gap-10 py-5">
      <h1 className="font-bold text-2xl text-gray-400">Login</h1>

      <div className="flex justify-center">
        <Form onHandleSubmit={handleSubmit} titleButton="Login">
          <Input value={email} type="email" name="email" placeholder="Email" onHandleChange={setEmail} />
          <Input value={password} type="password" name="password" placeholder="senha" onHandleChange={setPassword} />

        </Form>
      </div>
      <Link className="cursor-pointer font-bold text-gray-400 hover:text-gray-300" to="/register">Se registrar</Link>
    </div>
  )
}
