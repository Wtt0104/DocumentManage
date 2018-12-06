using System.Security.Cryptography;
using System.Text;

namespace Toolkits.Security
{
    /// <summary>
    /// MD5加密
    /// </summary>
    public class MD5Encrypt
    {
        /// <summary>
        /// MD5加密算法
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static string GetMD5(string data)
        {
            using (MD5 md5Hash = MD5.Create())
            {
                string hash = GetMd5Hash(md5Hash, data);

                return hash;
            }
        }

        /// <summary>
        /// MD5加密算法
        /// </summary>
        /// <param name="md5Hash"></param>
        /// <param name="input"></param>
        /// <returns></returns>
        public static string GetMd5Hash(MD5 md5Hash, string input)
        {
            // Convert the input string to a byte array and compute the hash.
            byte[] data = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(input));

            // Create a new Stringbuilder to collect the bytes
            // and create a string.
            StringBuilder sBuilder = new StringBuilder();

            // Loop through each byte of the hashed data
            // and format each one as a hexadecimal string.
            for (int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("x2"));
            }

            // Return the hexadecimal string.
            return sBuilder.ToString();
        }
    }
}