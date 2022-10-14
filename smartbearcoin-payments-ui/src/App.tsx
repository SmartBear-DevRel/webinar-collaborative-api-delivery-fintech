import { useState } from 'react';
import API from './Api';

export const App = () => {
  interface payee {
    name: string;
  }
  interface response {
    response: string | 'No Response';
  }
  let initialState: payee = {
    name: '592b4ece-c7a2-46ff-b380-96fd1638852a'
  };
  const inputStyle = { border: '1px solid black', height: 75, padding: 10 };
  const [payee, setPayee] = useState<payee>(initialState);
  const [response, setResponse] = useState<response>();

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    API.getPayeeById(payee.name)
      .then((response) => {
        setResponse(response.data);
        console.log(response.data);
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
          {response?.response && (
            <tr>
              <td colSpan={0}>{response.response}</td>
            </tr>
          )}
        </tbody>
      </table>
    </form>
  );
};
export default App;
