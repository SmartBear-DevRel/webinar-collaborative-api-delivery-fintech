import { useState } from 'react';
import API from './Api';

export const App = () => {
  interface Payee {
    name: string;
  }
  interface Response {
    data: string | 'No Response';
  }
  let initialState: Payee = {
    name: '592b4ece-c7a2-46ff-b380-96fd1638852a'
  };
  const inputStyle = { border: '1px solid black', height: 75, padding: 10 };
  const [payee, setPayee] = useState<Payee>(initialState);
  const [response, setResponse] = useState<Response>();

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    API.getPayeeById(payee.name)
      .then((response) => {
        setResponse({ data: response });
        console.log(response);
      })
      .catch(function (error: any) {
        console.log(error);
      });
  };
  const onChangeHandler = (event: HTMLInputElement) => {
    const { name, value } = event;
    setPayee((prev) => {
      return { ...prev, [name]: value };
    });
  };
  return (
    <form onSubmit={submitForm}>
      <table style={inputStyle}>
        <tbody>
          <tr>
            <td>Name:</td>
            <td>
              <input
                type="text"
                name="name"
                value={payee.name}
                onChange={(e) => onChangeHandler(e.target)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <button type="submit">Submit</button>
            </td>
          </tr>
        </tbody>
      </table>
      {response?.data && (
        <tr>
          <td colSpan={2}>{response.data}</td>
        </tr>
      )}
    </form>
  );
};
export default App;
