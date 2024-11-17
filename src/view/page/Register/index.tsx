import { FormEvent, useState } from "react";
import { Form } from "../../components/Form";
import { Input } from "../../components/Input";




export function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // console.log({
    //   name, email, password
    // });

  }
  return (
    <div>
      <h1>Register</h1>

      <div className="flex justify-center">
        <Form onHandleSubmit={handleSubmit}>
          <Input type="name" name="name" placeholder="Nome" onHandleClick={setName} />
          <Input type="email" name="email" placeholder="Email" onHandleClick={setEmail} />
          <Input type="password" name="password" placeholder="senha" onHandleClick={setPassword} />

        </Form>
      </div>
    </div>
  )
}
