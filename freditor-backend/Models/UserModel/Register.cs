using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FreditorBackend.Models.UserModel
{
    /// <summary>
    /// Class <c>Register</c> determines a user's register new credentials during registration.
    /// </summary>
    public class Register
    {
        /// <summary>
        /// Property <c>UserName</c> is a user's name.
        /// </summary>
        [Required]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Nazwa uzytkownika musi zawierac przynajmniej 3 znaki!")]
        public string UserName { get; set; }

        /// <summary>
        /// Property <c>Email</c> is an unique email user already has.
        /// </summary>
        [Required]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Email musi zawierac przynajmniej 3 znaki!")]
        public string Email { get; set; }

        /// <summary>
        /// Property <c>Password</c> is a secret password.
        /// </summary>
        [Required]
        [StringLength(50, MinimumLength = 8, ErrorMessage = "Haslo musi zawierac przynajmniej 8 znakow, w tym ([A-Z][a-z][0-9])! Nie wolno uzywac zadnych symboli!")]
        public string Password { get; set; }

        /// <summary>
        /// Property <c>PrepeatPassword</c> is a repeated string of chars given in Password earlier for confirmation.
        /// </summary>
        [Required]
        [StringLength(50, MinimumLength = 8, ErrorMessage = "Haslo musi byc takie same!")]
        public string RepeatPassword { get; set; }
    }
}
