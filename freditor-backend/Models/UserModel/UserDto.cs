using System.ComponentModel.DataAnnotations;

namespace FreditorBackend.Models.UserModel
{
    /// <summary>
    /// Class <c>User</c> identifies an user by giving correct credentials like: username, email and password.
    /// </summary>
    public class UserDto
    {
        /// <summary>
        /// Property <c>UserId</c> represents unique identity for a signle user in database.
        /// </summary>
        [Key]
        public int UserId { get; set; }

        /// <summary>
        /// Property <c>UserName</c> represents unique name for a single user.
        /// </summary>
        [Required]
        public string UserName { get; set; }

        /// <summary>
        /// Property <c>Email</c> represents unique email for a single user.
        /// </summary>
        [Required]
        public string Email { get; set; }

        /// <summary>
        /// Property <c>Password</c> represents unique password for a single user. 
        /// Password should be encrypted in database.
        /// </summary>
        [Required]
        public byte[] Password { get; set; }

        /// <summary>
        /// Property <c>Salt</c> is a helper property for generating hash passwords.
        /// </summary>
        public byte[] Salt { get; set; }
    }
}
