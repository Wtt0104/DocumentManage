﻿using System;
using System.Text;

namespace Toolkits.ConvertExt
{
    /// <summary>
    /// 处理数据类型转换，数制转换、编码转换相关的类
    /// </summary>
    public sealed class ConvertHelper2
    {
        #region 各进制数间转换

        /// <summary>
        /// 实现各进制数间的转换。ConvertBase("15",10,16)表示将十进制数15转换为16进制的数。
        /// </summary>
        /// <param name="value">要转换的值,即原值</param>
        /// <param name="from">原值的进制,只能是2,8,10,16四个值。</param>
        /// <param name="to">要转换到的目标进制，只能是2,8,10,16四个值。</param>
        public static string ConvertBase(string value, int from, int to)
        {
            try
            {
                int intValue = System.Convert.ToInt32(value, from);  //先转成10进制
                string result = System.Convert.ToString(intValue, to);  //再转成目标进制
                if (to == 2)
                {
                    int resultLength = result.Length;  //获取二进制的长度
                    switch (resultLength)
                    {
                        case 7:
                            result = "0" + result;
                            break;

                        case 6:
                            result = "00" + result;
                            break;

                        case 5:
                            result = "000" + result;
                            break;

                        case 4:
                            result = "0000" + result;
                            break;

                        case 3:
                            result = "00000" + result;
                            break;
                    }
                }
                return result;
            }
            catch
            {
                //LogHelper.WriteTraceLog(TraceLogLevel.Error, ex.Message);
                return "0";
            }
        }

        #endregion 各进制数间转换

        #region 使用指定字符集将string转换成byte[]

        /// <summary>
        /// 使用指定字符集将string转换成byte[]
        /// </summary>
        /// <param name="text">要转换的字符串</param>
        /// <param name="encoding">字符编码</param>
        public static byte[] StringToBytes(string text, Encoding encoding)
        {
            return encoding.GetBytes(text);
        }

        #endregion 使用指定字符集将string转换成byte[]

        #region 使用指定字符集将byte[]转换成string

        /// <summary>
        /// 使用指定字符集将byte[]转换成string
        /// </summary>
        /// <param name="bytes">要转换的字节数组</param>
        /// <param name="encoding">字符编码</param>
        public static string BytesToString(byte[] bytes, Encoding encoding)
        {
            return encoding.GetString(bytes);
        }

        #endregion 使用指定字符集将byte[]转换成string

        #region 将byte[]转换成int

        /// <summary>
        /// 将byte[]转换成int
        /// </summary>
        /// <param name="data">需要转换成整数的byte数组</param>
        public static int BytesToInt32(byte[] data)
        {
            //如果传入的字节数组长度小于4,则返回0
            if (data.Length < 4)
            {
                return 0;
            }

            //定义要返回的整数
            int num = 0;

            //如果传入的字节数组长度大于4,需要进行处理
            if (data.Length >= 4)
            {
                //创建一个临时缓冲区
                byte[] tempBuffer = new byte[4];

                //将传入的字节数组的前4个字节复制到临时缓冲区
                Buffer.BlockCopy(data, 0, tempBuffer, 0, 4);

                //将临时缓冲区的值转换成整数，并赋给num
                num = BitConverter.ToInt32(tempBuffer, 0);
            }

            //返回整数
            return num;
        }

        #endregion 将byte[]转换成int
    }
}