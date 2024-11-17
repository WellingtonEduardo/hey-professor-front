import { FormEvent, useState } from "react";
import { Form } from "../../components/Form";
import { Input } from "../../components/Input";
import { httpClient } from "../../../app/services/httpClient";




export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const getCsrfToken = async () => {
    await httpClient.get('/sanctum/csrf-cookie');
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await getCsrfToken();

    const registerResponse = await httpClient.post('/register', {
      name,
      email,
      password,
    });


    console.log({ registerResponse });

  }
  return (
    <div>
      <h1>Register</h1>

      <div className="flex justify-center">
        <Form onHandleSubmit={handleSubmit}>
          <Input value={name} type="name" name="name" placeholder="Nome" onHandleClick={setName} />
          <Input value={email} type="email" name="email" placeholder="Email" onHandleClick={setEmail} />
          <Input value={password} type="password" name="password" placeholder="senha" onHandleClick={setPassword} />

        </Form>
      </div>
    </div>
  )
}
