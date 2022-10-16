import { useState } from 'react';
import API from './Api';
import { PayeeInterface } from './Payee';
import { Dropdown, Option } from './Dropdown';
import { StyledButton, StyledSelect } from './Styles';
import React from 'react';
import Bugsnag from '@bugsnag/js';

export const App = () => {
  const [optionValue, setOptionValue] = useState('');
  const handleSelect = (e: any) => {
    setResponse({ data: 'No Response' });
    switch (e.target.value) {
      case 'search for payees':
        setOptionValue('get_all_payees');
        break;
      case 'search for payee':
        setOptionValue('search_payee_selection');
        break;

      default:
        setOptionValue(e.target.value);
        break;
    }
  };
  const [payeeSearchParams, setPayeeSearchParams] = useState({
    country_of_origin: 'unset',
    name_choice: 'unset'
  });
  const handleSelectSearchParams = (e: any) => {
    setPayeeSearchParams({
      ...payeeSearchParams,
      country_of_origin:
        e.target.id === 'c_of_o_choice'
          ? e.target.value
          : payeeSearchParams.country_of_origin ?? false,
      name_choice:
        e.target.id === 'name_choice'
          ? e.target.value
          : payeeSearchParams.name_choice ?? false
    });
  };

  interface Response {
    data: PayeeInterface[] | 'No Response';
  }
  let initialState: PayeeInterface = {
    account_name: 'string',
    iban: 'string',
    any_bic: 'string',
    bank_account_currency: 'string',
    bank_name: 'AAAA Bank',
    bank_code: 'string',
    id: 'string',
    name: '1e331a0f-29bd-4b6b-8b21-8b87ed653c6b'
  };
  const inputStyle = { border: '1px solid black', height: 75, padding: 10 };
  const [payee, setPayee] = useState<PayeeInterface>(initialState);
  const [response, setResponse] = useState<Response>();

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    API.getPayeeById(payee.name)
      .then((response) => {
        setResponse({ data: [response] });
      })
      .catch(function (error: any) {
        setResponse({ data: 'No Response' });
      });
  };
  const getPayeesRequest = () => {
    API.getPayees(
      payeeSearchParams.country_of_origin,
      payeeSearchParams.name_choice
    )
      .then((response) => {
        setResponse({ data: response });
      })
      .catch(function (error: any) {
        setResponse({ data: 'No Response' });
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
            <img src="SmartBearCoin-logo.png" alt="SmartBearCoin logo" />
          </div>
          <div className="header-text">SmartBearCoin | Payments Service</div>
        </div>
      </header>
      <br />

      <div>
        <h1>Which service are you interested in?</h1>
        <Dropdown formLabel="Choose a service" onChange={handleSelect}>
          <Option defaultValue="Click to see options" />
          <Option value="search for payee" />
          <Option value="search for payees" />
        </Dropdown>
      </div>
      {optionValue === 'get_all_payees' && (
        <>
          Select required search options:
          <br />
          <br />
          <StyledSelect
            id="c_of_o_choice"
            name="c_of_o_choice"
            onChange={handleSelectSearchParams}
          >
            <Option defaultValue="country of origin" />
            <Option value="IE" />
            <Option value="IT" />
            <Option value="FR" />
          </StyledSelect>
          <StyledSelect
            id="name_choice"
            name="name_choice"
            onChange={handleSelectSearchParams}
          >
            <Option defaultValue="name_choice" />
            <Option value="coffee" />
            <Option value="paris" />
            <Option value="LTD" />
          </StyledSelect>
          {payeeSearchParams.country_of_origin !== 'unset' &&
            payeeSearchParams.name_choice !== 'unset' && (
              <>
                <StyledButton
                  type="submit"
                  value="Search payees with selected criteria"
                  onClick={(e) => getPayeesRequest()}
                />
                <br />
              </>
            )}
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
                {response?.data.map((d) => {
                  return (
                    <tr key={d.id}>
                      <td>{d.account_name}</td>
                      <td>{d.iban}</td>
                      <td>{d.any_bic}</td>
                      <td>{d.bank_account_currency}</td>
                      <td>{d.bank_name}</td>
                      <td>{d.bank_code}</td>
                      <td>{d.id}</td>
                      <td>{d.name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </>
      )}
      <>
        {optionValue === 'search_payee_selection' && (
          <>
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
                      <StyledButton type="submit" value="Submit" />
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
                    <td>{response?.data[0].account_name}</td>
                    <td>{response?.data[0].iban}</td>
                    <td>{response?.data[0].any_bic}</td>
                    <td>{response?.data[0].bank_account_currency}</td>
                    <td>{response?.data[0].bank_name}</td>
                    <td>{response?.data[0].bank_code}</td>
                    <td>{response?.data[0].id}</td>
                    <td>{response?.data[0].name}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </>
        )}
      </>
    </>
  );
};
export default App;
