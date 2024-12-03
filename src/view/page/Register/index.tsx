import { FormEvent, useState } from "react";
import { Form } from "../../components/Form";
import { Input } from "../../components/Input";
import { httpClient } from "../../../app/services/httpClient";
import { useSanctum } from "react-sanctum";
import { Link, useNavigate } from "react-router-dom";




export function Register() {
  const { signIn } = useSanctum();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailConfirmation, setEmailConfirmation] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();




  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();


    await httpClient.post('/register', {
      name,
      email,
      'email_confirmation': emailConfirmation,
      password,
    });

    await signIn(email, password);
    navigate('/', { replace: true });



  }
  return (
    <div className="flex flex-col items-center gap-10 py-5">
      <h1 className="font-bold text-2xl text-gray-400">Registrar</h1>

      <div className="flex justify-center">
        <Form onHandleSubmit={handleSubmit} titleButton="Registrar">
          <Input value={name} type="name" name="name" placeholder="Nome" onHandleChange={setName} />
          <Input value={email} type="email" name="email" placeholder="Email" onHandleChange={setEmail} />
          <Input value={emailConfirmation} type="email" name="emailConfirmation" placeholder="Email" onHandleChange={setEmailConfirmation} />
          <Input value={password} type="password" name="password" placeholder="senha" onHandleChange={setPassword} />

        </Form>


      </div>
      <Link className="cursor-pointer font-bold text-gray-400 hover:text-gray-300" to="/login">Fazer login</Link>
    </div>
  )
}
