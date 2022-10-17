export class Payee implements PayeeInterface {
  account_name: string;
  iban: string;
  any_bic: string;
  bank_account_currency: string;
  bank_name: string;
  bank_code: string;
  id: string;
  name: string;
  constructor({
    account_name,
    iban,
    any_bic,
    bank_account_currency,
    bank_name,
    bank_code,
    id,
    name
  }: PayeeInterface) {
    this.account_name = account_name;
    this.iban = iban;
    this.any_bic = any_bic;
    this.bank_account_currency = bank_account_currency;
    this.bank_name = bank_name;
    this.bank_code = bank_code;
    this.id = id;
    this.name = name;
  }
}

export interface PayeeInterface {
  account_name: string;
  iban: string;
  any_bic: string;
  bank_account_currency: string;
  bank_name: string;
  bank_code: string;
  id: string;
  name: string;
  success?: boolean;
  errorMessage?: string;
}
