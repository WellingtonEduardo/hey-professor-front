import { FormEvent, useState } from "react";
import { Form } from "../../components/Form";
import { Input } from "../../components/Input";
import { httpClient } from "../../../app/services/httpClient";




export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const getCsrfToken = async () => {
    return await httpClient.get('/sanctum/csrf-cookie');
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await getCsrfToken();




    const loginResponse = await httpClient.post('/login', {
      email,
      password,
    });
    // console.log('Login Response:', loginResponse);


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
