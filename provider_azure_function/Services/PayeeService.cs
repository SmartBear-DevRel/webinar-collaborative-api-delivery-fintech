using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.DependencyInjection;
using SmartBearCoin.CustomerManagement.Models;
using SmartBearCoin.CustomerManagement.Models.OpenAPI;

namespace SmartBearCoin.CustomerManagement.Services
{
    public static class PayeeServiceExtensions
    {
        public static void AddValidationService(this IServiceCollection services)
        {
            services.AddScoped<IPayeeService, PayeeService>();
        }        
    }

    public class PayeeService : IPayeeService
    {
        public Payee GetPayeeDetails(string payeeId)
        {
            switch(payeeId.ToLowerInvariant())
            {
                case ("f55e2f3d-a05a-4893-9b39-b2c609a977e8"):
                    return new Payee()
                    {
                        Id = "f55e2f3d-a05a-4893-9b39-b2c609a977e8",
                        Name = "Raw Wine SRL",
                        AccountName = "Raw Wine Srl, Bari",
                        BankAccountCurrency = "EUR",
                        BankName = "BANCA POPOLARE DI BARI SCPA",
                        AnyBic = "BPBAIT3BXXX",
                        BankCode = "BPBA",
                        Iban = "IT60X0542811101000000123456",
                        PayeeType = SWIFTPayee.PayeeTypeEnum.OrganizastionEnum,
                        RemittanceEmailAddress = "accounts@rawwine.it"
                    };
                case ("3057a155-1699-4894-9998-bfa7ab846119"):
                    return new Payee()
                    {
                        Id = "3057a155-1699-4894-9998-bfa7ab846119",
                        Name = "Coffee And Coffee Group S.R.L",
                        AccountName = "Coffee And Coffee Group S.R.L", 
                        BankAccountCurrency = "EUR",
                        BankName = "BANCA D'ITALIA",
                        AnyBic = "BITAITRRB2B",
                        BankCode = "BITA",
                        Iban = "IT60X0542811101000000123456",
                        PayeeType = SWIFTPayee.PayeeTypeEnum.OrganizastionEnum,
                        RemittanceEmailAddress = "accounts@coffeecoffee.it"
                    };
                case ("d0bd8cc2-800c-4199-9908-f14f9b814f8e"):
                    return new Payee()
                    {
                        Id = "d0bd8cc2-800c-4199-9908-f14f9b814f8e",
                        Name = "Atena Books S.R.L.",
                        AccountName = "Atena Books S.R.L.",
                        BankAccountCurrency = "EUR",
                        BankName = "BANCA POPOLARE DI BARI SCPA",
                        AnyBic = "BPBAIT3BXXX",
                        BankCode = "BPBA",
                        Iban = "IT60X0542811101000000123445",
                        PayeeType = SWIFTPayee.PayeeTypeEnum.OrganizastionEnum,
                        RemittanceEmailAddress = "accounts@atenabooks.ie"
                    };
                case ("1dde99af-288b-44f6-94a2-024d85b7673b"):
                    return new Payee()
                    {
                        Id = "1dde99af-288b-44f6-94a2-024d85b7673b",
                        Name = "Coffee Paris",
                        AccountName = "Coffee Paris",
                        BankAccountCurrency = "EUR",
                        BankName = "BNP PARIBAS",
                        AnyBic = "AIBKIE2D",
                        BankCode = "20041",
                        Iban = "FR1420041010050500013M02606",
                        PayeeType = SWIFTPayee.PayeeTypeEnum.OrganizastionEnum,
                        RemittanceEmailAddress = "accounts@bnp.fr"
                    };
                case ("4eb603f3-e7e7-47b1-a5df-557b6204616e"):
                    return new Payee()
                    {
                        Id = "4eb603f3-e7e7-47b1-a5df-557b6204616e",
                        Name = "Easons Books LTD",
                        AccountName = "Easons Galway ",
                        BankAccountCurrency = "EUR",
                        BankName = "Allied Irish Bank",
                        AnyBic = "AIBKIE2D",
                        BankCode = "AIBK",
                        Iban = "IE29AIBK93115212345678",
                        PayeeType = SWIFTPayee.PayeeTypeEnum.OrganizastionEnum,
                        RemittanceEmailAddress = "accounts@easons.ie"
                    };
                case ("a83acdb9-4353-425f-8d16-eae37d905cb8"):
                    return new Payee()
                    {
                        Id = "a83acdb9-4353-425f-8d16-eae37d905cb8",
                        Name = "Cava LTD",
                        AccountName = "Cava Foods", 
                        BankAccountCurrency = "EUR",
                        BankName = "BANK OF IRELAND",
                        AnyBic = "BOFIIE2D",
                        BankCode = "BOFI",
                        Iban = "IE79BOFI93115212345678",
                        PayeeType = SWIFTPayee.PayeeTypeEnum.OrganizastionEnum,
                        RemittanceEmailAddress = "accounts@cava.ie"
                    };
                case ("1e331a0f-29bd-4b6b-8b21-8b87ed653c6b"):
                    return new Payee()
                    {
                        Id = "1e331a0f-29bd-4b6b-8b21-8b87ed653c6b",
                        Name = "SmartBear Software",
                        AccountName = "SmartBear Software",
                        BankAccountCurrency = "EUR",
                        BankName = "BANK OF IRELAND",
                        AnyBic = "BOFIIE2D",
                        BankCode = "BOFI",
                        Iban = "IE79BOFI93115212345999",
                        PayeeType = SWIFTPayee.PayeeTypeEnum.OrganizastionEnum,
                        RemittanceEmailAddress = "p.accounts@smartbear.com"
                    };
                default:
                    return new Payee();
            }
        }

        public PagedResult<Payee> GetPayees(string country_code, string jurisdiction_identifier, string jurisdiction_identifier_type, string name)
        {
            var payees = new List<Payee>();

            switch(country_code.ToLowerInvariant())
            {
                case ("it"):
                    payees = GetItalianPayees(country_code);
                    break;
                case ("ie"):
                    payees = GetIrishPayees(country_code);
                    break;
                case ("fr"):
                    payees = GetFrenchPayees(country_code);
                    break;
                default:
                    payees = new List<Payee>();
                    break;
            }

            if(!string.IsNullOrEmpty(name) && payees.Count > 0)
            {
                payees = payees.Where(p => p.Name.Contains(name, StringComparison.InvariantCultureIgnoreCase)).ToList();
            }

            return new PagedResult<Payee>()
            {
                Data = payees
            };
        }


        public PagedResult<Transaction> GetPayeeTransactions(string payeeId)
        {
            if(IsPayeeKnown(payeeId))
            {
                return new PagedResult<Transaction>()
                {
                    Data = new List<Transaction>() 
                    {
                        new Transaction()
                        {
                            Id = Guid.NewGuid().ToString()
                        }
                    },
                    Links = new PaginationLinks()
                    {
                        Self = $"/payees/{payeeId}/transactions"
                    }
                };
            }
            else
            {
                return new PagedResult<Transaction>()
                {
                    Data = Enumerable.Empty<Transaction>()
                };
            }           

        }

        
        private List<Payee> GetItalianPayees(string countryCode)
        {                            
            return new List<Payee>()
            {
                new Payee()
                {
                    Id = "f55e2f3d-a05a-4893-9b39-b2c609a977e8",
                    Name = "Raw Wine SRL",
                    AccountName = "Raw Wine Srl, Bari",
                    BankAccountCurrency = "EUR",
                    BankName = "BANCA POPOLARE DI BARI SCPA",
                    AnyBic = "BPBAIT3BXXX",
                    BankCode = "BPBA",
                    Iban = "IT60X0542811101000000123456",
                    PayeeType = SWIFTPayee.PayeeTypeEnum.OrganizastionEnum,
                    RemittanceEmailAddress = "accounts@rawwine.it"
                },
                new Payee()
                {
                    Id = "3057a155-1699-4894-9998-bfa7ab846119",
                    Name = "Coffee And Coffee Group S.R.L",
                    AccountName = "Coffee And Coffee Group S.R.L", 
                    BankAccountCurrency = "EUR",
                    BankName = "BANCA D'ITALIA",
                    AnyBic = "BITAITRRB2B",
                    BankCode = "BITA",
                    Iban = "IT60X0542811101000000123456",
                    PayeeType = SWIFTPayee.PayeeTypeEnum.OrganizastionEnum,
                    RemittanceEmailAddress = "accounts@coffeecoffee.it"
                },
                new Payee()
                {
                    Id = "d0bd8cc2-800c-4199-9908-f14f9b814f8e",
                    Name = "Atena Books S.R.L.",
                    AccountName = "Atena Books S.R.L.",
                    BankAccountCurrency = "EUR",
                    BankName = "BANCA POPOLARE DI BARI SCPA",
                    AnyBic = "BPBAIT3BXXX",
                    BankCode = "BPBA",
                    Iban = "IT60X0542811101000000123445",
                    PayeeType = SWIFTPayee.PayeeTypeEnum.OrganizastionEnum,
                    RemittanceEmailAddress = "accounts@atenabooks.ie"
                }                                
            };
        }

        private List<Payee> GetFrenchPayees(string countryCode)
        {
                            
            return new List<Payee>()
            {
                new Payee()
                {
                    Id = "1dde99af-288b-44f6-94a2-024d85b7673b",
                    Name = "Coffee Paris",
                    AccountName = "Coffee Paris",
                    BankAccountCurrency = "EUR",
                    BankName = "BNP PARIBAS",
                    AnyBic = "AIBKIE2D",
                    BankCode = "20041",
                    Iban = "FR1420041010050500013M02606",
                    PayeeType = SWIFTPayee.PayeeTypeEnum.OrganizastionEnum,
                    RemittanceEmailAddress = "accounts@bnp.fr"
                }
            };                            
        }

        private List<Payee> GetIrishPayees(string countryCode)
        {                         
            return new List<Payee>()
            {
                new Payee()
                {
                    Id = "4eb603f3-e7e7-47b1-a5df-557b6204616e",
                    Name = "Easons Books LTD",
                    AccountName = "Easons Galway ",
                    BankAccountCurrency = "EUR",
                    BankName = "Allied Irish Bank",
                    AnyBic = "AIBKIE2D",
                    BankCode = "AIBK",
                    Iban = "IE29AIBK93115212345678",
                    PayeeType = SWIFTPayee.PayeeTypeEnum.OrganizastionEnum,
                    RemittanceEmailAddress = "accounts@easons.ie"

                },
                new Payee()
                {
                    Id = "a83acdb9-4353-425f-8d16-eae37d905cb8",
                    Name = "Cava LTD",
                    AccountName = "Cava Foods", 
                    BankAccountCurrency = "EUR",
                    BankName = "BANK OF IRELAND",
                    AnyBic = "BOFIIE2D",
                    BankCode = "BOFI",
                    Iban = "IE79BOFI93115212345678",
                    PayeeType = SWIFTPayee.PayeeTypeEnum.OrganizastionEnum,
                    RemittanceEmailAddress = "accounts@cava.ie"
                },
                new Payee()
                {
                    Id = "1e331a0f-29bd-4b6b-8b21-8b87ed653c6b",
                    Name = "SmartBear Software",
                    AccountName = "SmartBear Software",
                    BankAccountCurrency = "EUR",
                    BankName = "BANK OF IRELAND",
                    AnyBic = "BOFIIE2D",
                    BankCode = "BOFI",
                    Iban = "IE79BOFI93115212345999",
                    PayeeType = SWIFTPayee.PayeeTypeEnum.OrganizastionEnum,
                    RemittanceEmailAddress = "p.accounts@smartbear.com"
                }                                
            };
        }

        public bool IsPayeeKnown(string payeeId)
        {
            switch(payeeId.ToLowerInvariant())
            {
                case("f55e2f3d-a05a-4893-9b39-b2c609a977e8"):
                case("3057a155-1699-4894-9998-bfa7ab846119"):
                case("d0bd8cc2-800c-4199-9908-f14f9b814f8e"):
                case("1dde99af-288b-44f6-94a2-024d85b7673b"):
                case("4eb603f3-e7e7-47b1-a5df-557b6204616e"):
                case("a83acdb9-4353-425f-8d16-eae37d905cb8"):
                case("1e331a0f-29bd-4b6b-8b21-8b87ed653c6b"):
                    return true;
                default:
                    return false;
            }
        }
    }
}