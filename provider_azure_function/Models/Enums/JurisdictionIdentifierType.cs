using System.Runtime.Serialization;

namespace SmartBearCoin.CustomerManagement.Models.Enums
{
    public enum JurisdictionIdentifierType
    {
        [EnumMember(Value = "chamber-of-commerce-number")]
        ChamberOfCommerceNumber,
        [EnumMember(Value = "siret")]
        Siret,
        [EnumMember(Value = "fiscal-code")]
        FiscalCode,
        [EnumMember(Value = "vat-number")]
        VATNumber,
        [EnumMember(Value = "cif")]
        CIF,
        [EnumMember(Value = "nif")]
        NIF,
        [EnumMember(Value = "tax-number")]
        TaxNumber,
        [EnumMember(Value = "ssn")]
        SSN,
        [EnumMember(Value = "company-number")]
        CompanyNumber
    }
}