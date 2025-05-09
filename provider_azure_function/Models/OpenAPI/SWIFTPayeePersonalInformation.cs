/*
 * SmartBearCoin - Payees API
 *
 * The **Customer Managment - Payees API** - allows retrieval of payees and payee transactions. The Payees API allows consumers to search, identify and retrieve payee information in one specified country. Customer centricity is part of the DNA of SmartBearCoin. Therefore, Customer Management (CM) is considered a core business capability. The focus of CM is outward focused on enabling a consistent, digital customer experience, throughout the customer journey and across channels (omnichannel). This leads to measurable improvements of customer satisfaction and the increase of sales volume and/or margin. Value exposed through Customer Management capabilities is build upon an API-First strategy at SmartBearCoin. 
 *
 * OpenAPI spec version: 1.0.0
 * Contact: customer.management.apiteam@smartbearcoin.com
 * Generated by: https://github.com/swagger-api/swagger-codegen.git
 */
using System;
using System.Linq;
using System.IO;
using System.Text;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using Newtonsoft.Json;

namespace SmartBearCoin.CustomerManagement.Models.OpenAPI
{ 
    /// <summary>
    /// 
    /// </summary>
    [DataContract]
    public partial class SWIFTPayeePersonalInformation : IEquatable<SWIFTPayeePersonalInformation>
    { 
        /// <summary>
        /// Gets or Sets FamilyName
        /// </summary>

        [DataMember(Name="family_name")]
        public string? FamilyName { get; set; }

        /// <summary>
        /// Gets or Sets FirstName
        /// </summary>

        [DataMember(Name="first_name")]
        public string? FirstName { get; set; }

        /// <summary>
        /// Returns the string presentation of the object
        /// </summary>
        /// <returns>String presentation of the object</returns>
        public override string ToString()
        {
            var sb = new StringBuilder();
            sb.Append("class SWIFTPayeePersonalInformation {\n");
            sb.Append("  FamilyName: ").Append(FamilyName).Append("\n");
            sb.Append("  FirstName: ").Append(FirstName).Append("\n");
            sb.Append("}\n");
            return sb.ToString();
        }

        /// <summary>
        /// Returns the JSON string presentation of the object
        /// </summary>
        /// <returns>JSON string presentation of the object</returns>
        public string ToJson()
        {
            return JsonConvert.SerializeObject(this, Formatting.Indented);
        }

        /// <summary>
        /// Returns true if objects are equal
        /// </summary>
        /// <param name="obj">Object to be compared</param>
        /// <returns>Boolean</returns>
        public override bool Equals(object? obj)
        {
            if (ReferenceEquals(null, obj)) return false;
            if (ReferenceEquals(this, obj)) return true;
            return obj.GetType() == GetType() && Equals((SWIFTPayeePersonalInformation)obj);
        }

        /// <summary>
        /// Returns true if SWIFTPayeePersonalInformation instances are equal
        /// </summary>
        /// <param name="other">Instance of SWIFTPayeePersonalInformation to be compared</param>
        /// <returns>Boolean</returns>
        public bool Equals(SWIFTPayeePersonalInformation? other)
        {
            if (ReferenceEquals(null, other)) return false;
            if (ReferenceEquals(this, other)) return true;

            return 
                (
                    FamilyName == other?.FamilyName ||
                    FamilyName != null &&
                    FamilyName.Equals(other?.FamilyName)
                ) && 
                (
                    FirstName == other?.FirstName ||
                    FirstName != null &&
                    FirstName.Equals(other?.FirstName)
                );
        }

        /// <summary>
        /// Gets the hash code
        /// </summary>
        /// <returns>Hash code</returns>
        public override int GetHashCode()
        {
            unchecked // Overflow is fine, just wrap
            {
                var hashCode = 41;
                // Suitable nullity checks etc, of course :)
                    if (FamilyName != null)
                    hashCode = hashCode * 59 + FamilyName.GetHashCode();
                    if (FirstName != null)
                    hashCode = hashCode * 59 + FirstName.GetHashCode();
                return hashCode;
            }
        }

        #region Operators
        #pragma warning disable 1591

        public static bool operator ==(SWIFTPayeePersonalInformation left, SWIFTPayeePersonalInformation right)
        {
            return Equals(left, right);
        }

        public static bool operator !=(SWIFTPayeePersonalInformation left, SWIFTPayeePersonalInformation right)
        {
            return !Equals(left, right);
        }

        #pragma warning restore 1591
        #endregion Operators
    }
}
