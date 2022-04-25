using System.ComponentModel.DataAnnotations;

namespace FreditorBackend.Models.UserModel
{
    /// <summary>
    /// Class <c>Login</c> gets and sets username and password.
    /// </summary>
    public class Login
    {
        /// <summary>
        /// Property <c>UserName</c> is the users's name when logging in.
        /// </summary>
        [Required]
        public string UserName { get; set; }

        /// <summary>
        /// Property <c>Password</c> is a secret password allowing to access to user's account.
        /// </summary>
        [Required]
        public string Password { get; set; }
    }
}
