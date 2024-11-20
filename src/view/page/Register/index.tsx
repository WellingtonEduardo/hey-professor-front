import { FormEvent, useState } from "react";
import { Form } from "../../components/Form";
import { Input } from "../../components/Input";
import { httpClient } from "../../../app/services/httpClient";
import { useSanctum } from "react-sanctum";
import { useNavigate } from "react-router-dom";




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
    <div>
      <h1>Register</h1>

      <div className="flex justify-center">
        <Form onHandleSubmit={handleSubmit}>
          <Input value={name} type="name" name="name" placeholder="Nome" onHandleClick={setName} />
          <Input value={email} type="email" name="email" placeholder="Email" onHandleClick={setEmail} />
          <Input value={emailConfirmation} type="email" name="emailConfirmation" placeholder="Email" onHandleClick={setEmailConfirmation} />
          <Input value={password} type="password" name="password" placeholder="senha" onHandleClick={setPassword} />

        </Form>
      </div>
    </div>
  )
}
