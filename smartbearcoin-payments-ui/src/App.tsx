import { useState } from 'react';
import API from './Api';
import React from 'react';
import Bugsnag from '@bugsnag/js';

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
        setResponse({ data: 'An error occurred, please try again later' });
        Bugsnag.notify({
          errorMessage: error,
          message: 'error occurred making request to server',
          name: 'payeeRequest'
        });
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
    <>
      <header className="header">
        <div className="wrapper">
          <div className="logo">
            <img src="smartbearlogo.png" alt="a logo" />
          </div>
          <div className="header-text">SmartBearCoin | Payments Service</div>
        </div>
      </header>
      <br />

      <form onSubmit={submitForm}>
        <table style={inputStyle}>
          <tbody>
            <tr>
              <td>Please enter Payee ID:</td>
              <td>
                <input
                  type="text"
                  name="name"
                  value={payee.name}
                  size={36}
                  onChange={(e) => onChangeHandler(e.target)}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td align="right">
                <button type="submit">Submit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <br />
      {response?.data && (
        <table style={inputStyle}>
          <tbody>
            <tr>
              <td>Results:</td>
              <td>{response.data}</td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
};
export default App;
