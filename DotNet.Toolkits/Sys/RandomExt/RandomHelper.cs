using System;
using System.Linq;

namespace Toolkits.RandomExt
{
    /// <summary>
    /// BaseRandom
    /// 产生随机数
    ///
    /// 随机数管理，最大值、最小值可以自己进行设定。
    /// </summary>
    public class RandomHelper
    {
        private int Minimum { set; get; }
        private int Maximal { set; get; }
        private int RandomLength { set; get; }

        private string RandomString { set; get; } = "0123456789ABCDEFGHIJKMLNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        private readonly Random Random = new Random(DateTime.Now.Second);

        #region constructor

        private RandomHelper()
        {
            Minimum = 1;
            Maximal = 999;
            RandomLength = 6;
        }

        private RandomHelper(int Max, int Min)
        {
            Minimum = Min;
            Maximal = Max;
        }

        private RandomHelper(int Length)
        {
            RandomLength = Length;
        }

        #endregion constructor

        #region public string GetRandomString() 产生随机字符

        /// <summary>
        /// 产生随机字符
        /// </summary>
        /// <returns>字符串</returns>
        public string GetRandomString()
        {
            return GetRandomString(RandomLength);
        }

        public string GetRandomString(int stringLength)
        {
            string returnValue = string.Empty;
            for (int i = 0; i < stringLength; i++)
            {
                int r = Random.Next(0, RandomString.Length - 1);
                returnValue += RandomString[r];
            }
            return returnValue;
        }

        /// <summary>
        /// Generates the check code with unique number.
        /// </summary>
        /// <returns>The check code number.</returns>
        /// <param name="codeCount">Code count. Max 10</param>
        public string GetRandomNumString(int codeCount)
        {
            codeCount = codeCount > 10 ? 10 : codeCount;   // unable to return unique number list longer than 10

            int[] arrInt = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 };
            arrInt = arrInt.OrderBy(c => Guid.NewGuid()).ToArray<int>();// make the array in random order

            string str = string.Empty;

            for (int i = 0; i < codeCount; i++)
            {
                str += arrInt[i];
            }
            return str;
        }

        #endregion public string GetRandomString() 产生随机字符

        #region public static int GetRandom()

        /// <summary>
        /// 产生随机数
        /// </summary>
        /// <returns>随机数</returns>
        public int GetRandom()
        {
            return Random.Next(Minimum, Maximal);
        }

        #endregion public static int GetRandom()

        #region public static int GetRandomInt(int minimum, int maximal)

        /// <summary>
        /// 产生随机数
        /// </summary>
        /// <param name="minNumber">最小值</param>
        /// <param name="maxNumber">最大值</param>
        /// <returns>随机数</returns>
        public int GetRandomInt(int minNumber, int maxNumber)
        {
            return Random.Next(minNumber, maxNumber);
        }

        #endregion public static int GetRandomInt(int minimum, int maximal)

        #region 生成一个0.0到1.0的随机小数

        /// <summary>
        /// 生成一个0.0到1.0的随机小数
        /// </summary>
        public double GetRandomDouble()
        {
            return Random.NextDouble();
        }

        #endregion 生成一个0.0到1.0的随机小数

        #region 对一个数组进行随机排序

        /// <summary>
        /// 对一个数组进行随机排序
        /// </summary>
        /// <typeparam name="T">数组的类型</typeparam>
        /// <param name="arr">需要随机排序的数组</param>
        public void GetRandomArray<T>(T[] arr)
        {
            //对数组进行随机排序的算法:随机选择两个位置，将两个位置上的值交换

            //交换的次数,这里使用数组的长度作为交换次数
            int count = arr.Length;

            //开始交换
            for (int i = 0; i < count; i++)
            {
                //生成两个随机数位置
                int targetIndex1 = GetRandomInt(0, arr.Length);
                int targetIndex2 = GetRandomInt(0, arr.Length);

                //定义临时变量
                T temp;

                //交换两个随机数位置的值
                temp = arr[targetIndex1];
                arr[targetIndex1] = arr[targetIndex2];
                arr[targetIndex2] = temp;
            }
        }

        #endregion 对一个数组进行随机排序
    }
}