using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using SmartBearCoin.CustomerManagement.Models;
using SmartBearCoin.CustomerManagement.Models.OpenAPI;
using System;
using System.Collections.Specialized;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace SmartBearCoin.CustomerManagement.Services
{
    public static class ValidationServiceExtensions
    {
        public static void AddValidationService(this IServiceCollection services)
        {
            services.AddScoped<IValidationService, ValidationService>();
        }        
    }

    public class ValidationService : IValidationService
    {
        public SimpleValidationResult ValidateQueryParameters(NameValueCollection queryParameters)
        {
            
            string countryOfRegistration = queryParameters["country_of_registration"] ?? string.Empty;
            string jurisdiction_identifier = queryParameters["jurisdiction_identifier"] ?? string.Empty;
            string name = queryParameters["name"] ?? string.Empty;
            string jurisdiction_identifier_type = queryParameters["jurisdiction_identifier_type"] ?? string.Empty;

            // check that the 'country_of_registration' was supplied
            if(string.IsNullOrEmpty(countryOfRegistration))
            {
                return new SimpleValidationResult()
                {
                    Result = false,
                    ErrorType = "missing-request-parameter",
                    Details = "The request does not contain the mandatory [country_of_registration] query parameter"
                };                
            }

            // check it passes regex pattern validation
            if(!Regex.Match(countryOfRegistration, @"^[a-zA-Z]{2}$", RegexOptions.IgnoreCase).Success)
            {
                return new SimpleValidationResult()
                {
                    Result = false,
                    ErrorType = "invalid-request-parameter-format",
                    Details = "The request parameter [country_of_registration] does not conform to regex ^[a-zA-Z]{2}$"
                };  
            }

            // If jurisdiction identifier is missing then name is required
            if(string.IsNullOrEmpty(jurisdiction_identifier) && string.IsNullOrEmpty(name))
            {
                return new SimpleValidationResult()
                {
                    Result = false,
                    ErrorType = "missing-request-parameter",
                    Details = "The request does not contain the conditionally mandatory [name] query parameter. [name] is mandatory if [jurisdiction_identifier] is not supplied"
                }; 
            }

            // If name exists then it must be at least 2 characters long
            if(!string.IsNullOrEmpty(name) && name.Length < 2)
            {
                return new SimpleValidationResult()
                {
                    Result = false,
                    ErrorType = "invalid-request-parameter-format",
                    Details = "The request parameter [name] must be at least 2 characters in length"
                };
            }

            //if jurisdiction_identifier is provided then jurisdiction_identifier_type MUST also be provided (and vice versa)
            if((string.IsNullOrEmpty(jurisdiction_identifier) && !string.IsNullOrEmpty(jurisdiction_identifier_type)) || 
            (!string.IsNullOrEmpty(jurisdiction_identifier) && string.IsNullOrEmpty(jurisdiction_identifier_type)))
            {
                return new SimpleValidationResult()
                {
                    Result = false,
                    ErrorType = "missing-request-parameter",
                    Details = "If either [jurisdiction_identifier] or [jurisdiction_identifier_type] are provided, then both must be provided"
                }; 
            }
            
            //validate the jurisdiction_identifier_type is a known identifier type
            if(!string.IsNullOrEmpty(jurisdiction_identifier_type) && !IsJurisdictionIdentifierTypeValid(jurisdiction_identifier_type))
            {
                return new SimpleValidationResult()
                {
                    Result = false,
                    ErrorType = "invalid-request-parameter-value",
                    Details = "The [jurisdiction_identifier_type] is invalid. It must be one of: chamber-of-commerce-number, siret, fiscal-code, vat-number, cif, nif, tax-number, ssn, company-number"
                };                 
            }

            return new SimpleValidationResult(){ Result = true, Details = "success!" };
        }

        private bool IsJurisdictionIdentifierTypeValid(string identifierType)
        {
            switch(identifierType.ToLowerInvariant())
            {
                case("chamber-of-commerce-number"):
                case("siret"):
                case("fiscal-code"):
                case("vat-number"):
                case("cif"):
                case("nif"):
                case("tax-number"):
                case("ssn"):
                case("company-number"):
                    return true;
                default:
                    return false;
            }
        }

        private Problem.TitleEnum ConvertErrorToProblemType(string errorType)
        {
            return (Problem.TitleEnum)Enum.Parse(typeof(Problem.TitleEnum), errorType, true);
        }

        public Problem GenerateValidationProblem(SimpleValidationResult validationResults, string code)
        {
            string enumValue = string.Concat(validationResults.ErrorType?.Replace("-",""), "Enum");

            return new Problem() 
            { 
                Code = code, 
                Status = 400, 
                Title = ConvertErrorToProblemType(enumValue),
                Instance = $"https://api.smartbearcoin.com/problems/{validationResults.ErrorType}",
                Details = new List<ProblemDetails>()
                {
                    new ProblemDetails() 
                    {
                        Type = (ProblemDetails.TypeEnum)Enum.Parse(typeof(ProblemDetails.TypeEnum), enumValue, true),
                        Title = (ProblemDetails.TitleEnum)Enum.Parse(typeof(ProblemDetails.TitleEnum), enumValue, true),
                        Detail = validationResults?.Details ?? string.Empty
                    }
                }
            };


        }
    }
}