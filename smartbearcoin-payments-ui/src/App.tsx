import { useState } from 'react';
import API from './Api';
import { PayeeInterface } from './Payee';

export const App = () => {
  interface Response {
    data: PayeeInterface | 'No Response';
  }
  let initialState: PayeeInterface = {
    account_name: 'string',
    iban: 'string',
    any_bic: 'string',
    bank_account_currency: 'string',
    bank_name: 'AAAA Bank',
    bank_code: 'string',
    id: 'string',
    name: '592b4ece-c7a2-46ff-b380-96fd1638852a'
  };
  const inputStyle = { border: '1px solid black', height: 75, padding: 10 };
  const [payee, setPayee] = useState<PayeeInterface>(initialState);
  const [response, setResponse] = useState<Response>();

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    API.getPayeeById(payee.name)
      .then((response) => {
        setResponse({ data: response });
        console.log(response);
      })
      .catch(function (error: any) {
        setResponse({ data: 'No Response' });
        console.log(error);
      });
    API.getPayees('DE', 'foo')
      .then((response) => {
        setResponse({ data: response });
        console.log(response);
      })
      .catch(function (error: any) {
        setResponse({ data: 'No Response' });
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
      {response?.data && response?.data !== 'No Response' && (
        <table style={inputStyle}>
          <tbody>
            <tr>
              <th>{'account_name'}</th>
              <th>{'iban'}</th>
              <th>{'any_bic'}</th>
              <th>{'bank_account_currency'}</th>
              <th>{'bank_name'}</th>
              <th>{'bank_code'}</th>
              <th>{'id'}</th>
              <th>{'name'}</th>
            </tr>
            <tr>
              <td>{response?.data.account_name}</td>
              <td>{response?.data.iban}</td>
              <td>{response?.data.any_bic}</td>
              <td>{response?.data.bank_account_currency}</td>
              <td>{response?.data.bank_name}</td>
              <td>{response?.data.bank_code}</td>
              <td>{response?.data.id}</td>
              <td>{response?.data.name}</td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
};
export default App;
