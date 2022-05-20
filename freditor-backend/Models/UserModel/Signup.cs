﻿using System.ComponentModel.DataAnnotations;

namespace FreditorBackend.Models.UserModel
{
    /// <summary>
    /// Class <c>Signup</c> determines a user's signup new credentials during registration.
    /// </summary>
    public class Signup
    {
        /// <summary>
        /// Property <c>UserName</c> is a user's name.
        /// </summary>
        [Required]
        public string UserName { get; set; }

        /// <summary>
        /// Property <c>Email</c> is an unique email user already has.
        /// </summary>
        [Required]
        public string Email { get; set; }

        /// <summary>
        /// Property <c>Password</c> is a secret password.
        /// </summary>
        [Required]
        public string Password { get; set; }

        /// <summary>
        /// Property <c>PrepeatPassword</c> is a repeated string of chars given in Password earlier for confirmation.
        /// </summary>
        [Required]
        public string RepeatPassword { get; set; }
    }
}
