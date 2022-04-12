using System;
using System.Text;

namespace FreditorBackend.Models.HelperModel
{
    /// <summary>
    /// Class <c>StringByteReverseConverter</c> a unused class determines converison between string -> byte[] and byte[] -> string.
    /// </summary>
    public class StringByteReverseConverter
    {
        // Encodes a byte array to a string with BAIS encoding, which 
        // preserves runs of ASCII characters unchanged.
        //
        // For simplicity, this method's base-64 encoding always encodes groups of 
        // three bytes if possible (as four characters). This decision may 
        // unfortunately cut off the beginning of some ASCII runs.
        public static string convert(byte[] bytes) { return convert(bytes, true); }
        public static string convert(byte[] bytes, bool allowControlChars)
        {
            StringBuilder sb = new StringBuilder();
            int i = 0;
            int b;
            while (i < bytes.Length)
            {
                b = get(bytes, i++);
                if (isAscii(b, allowControlChars))
                    sb.Append((char)b);
                else
                {
                    sb.Append('\b');
                    // Do binary encoding in groups of 3 bytes
                    for (; ; b = get(bytes, i++))
                    {
                        int accum = b;
                        Console.WriteLine("i=" + i);
                        if (i < bytes.Length)
                        {
                            b = get(bytes, i++);
                            accum = (accum << 8) | b;
                            if (i < bytes.Length)
                            {
                                b = get(bytes, i++);
                                accum = (accum << 8) | b;
                                sb.Append(encodeBase64Digit(accum >> 18));
                                sb.Append(encodeBase64Digit(accum >> 12));
                                sb.Append(encodeBase64Digit(accum >> 6));
                                sb.Append(encodeBase64Digit(accum));
                                if (i >= bytes.Length)
                                    break;
                            }
                            else
                            {
                                sb.Append(encodeBase64Digit(accum >> 10));
                                sb.Append(encodeBase64Digit(accum >> 4));
                                sb.Append(encodeBase64Digit(accum << 2));
                                break;
                            }
                        }
                        else
                        {
                            sb.Append(encodeBase64Digit(accum >> 2));
                            sb.Append(encodeBase64Digit(accum << 4));
                            break;
                        }
                        if (isAscii(get(bytes, i), allowControlChars) &&
                          (i + 1 >= bytes.Length || isAscii(get(bytes, i), allowControlChars)) &&
                          (i + 2 >= bytes.Length || isAscii(get(bytes, i), allowControlChars)))
                        {
                            sb.Append('!'); // return to ASCII mode
                            break;
                        }
                    }
                }
            }
            return sb.ToString();
        }

        // Decodes a BAIS string back to a byte array.
        public static byte[] convert(string s)
        {
            byte[] b;
            try
            {
                b = Encoding.UTF8.GetBytes(s);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message.ToString());
            }
            for (int i = 0; i < b.Length - 1; ++i)
            {
                if (b[i] == '\b')
                {
                    int iOut = i++;

                    for (; ; )
                    {
                        int cur;
                        if (i >= b.Length || ((cur = get(b, i)) < 63 || cur > 126))
                            throw new Exception("String cannot be interpreted as a BAIS array");
                        int digit = (cur - 64) & 63;
                        int zeros = 16 - 6; // number of 0 bits on right side of accum
                        int accum = digit << zeros;

                        while (++i < b.Length)
                        {
                            if ((cur = get(b, i)) < 63 || cur > 126)
                                break;
                            digit = (cur - 64) & 63;
                            zeros -= 6;
                            accum |= digit << zeros;
                            if (zeros <= 8)
                            {
                                b[iOut++] = (byte)(accum >> 8);
                                accum <<= 8;
                                zeros += 8;
                            }
                        }

                        if ((accum & 0xFF00) != 0 || (i < b.Length && b[i] != '!'))
                            throw new Exception("String cannot be interpreted as BAIS array");
                        i++;

                        // Start taking bytes verbatim
                        while (i < b.Length && b[i] != '\b')
                            b[iOut++] = b[i++];
                        if (i >= b.Length)
                            return CopyOfRange(b, 0, iOut);
                        i++;
                    }
                }
            }
            return b;
        }

        static byte[] CopyOfRange(byte[] src, int start, int end)
        {
            int len = end - start;
            byte[] dest = new byte[len];
            // note i is always from 0
            for (int i = 0; i < len; i++)
            {
                dest[i] = src[start + i]; // so 0..n = 0+x..n+x
            }
            return dest;
        }

        static int get(byte[] bytes, int i) { return ((int)bytes[i]) & 0xFF; }
        public static int decodeBase64Digit(char digit)
        { return digit >= 63 && digit <= 126 ? (digit - 64) & 63 : -1; }
        public static char encodeBase64Digit(int digit)
        { return (char)((digit + 1 & 63) + 63); }
        static bool isAscii(int b, bool allowControlChars)
        { return b < 127 && (b >= 32 || (allowControlChars && b != '\b')); }
    }
}
