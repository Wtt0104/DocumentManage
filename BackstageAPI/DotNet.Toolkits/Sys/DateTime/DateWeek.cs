using System;
using System.Collections.Generic;
using System.Globalization;

namespace Toolkits.DateTimeExt
{
    public class DateWeek
    {
        ///   <summary>
        ///  获取某一日期是该年中的第几周
        ///   </summary>
        ///   <param name="dt"> 日期 </param>
        ///   <returns> 该日期在该年中的周数 </returns>
        public static int GetWeekOfYear(DateTime dt)
        {
            GregorianCalendar gc = new GregorianCalendar();
            return gc.GetWeekOfYear(dt, CalendarWeekRule.FirstDay, DayOfWeek.Sunday);
        }

        ///   <summary>
        ///  获取某一年有多少周
        ///   </summary>
        ///   <param name="year"> 年份 </param>
        ///   <returns> 该年周数 </returns>
        public static int GetWeekAmount(int year)
        {
            DateTime end = new DateTime(year, 12, 31);   // 该年最后一天
            System.Globalization.GregorianCalendar gc = new GregorianCalendar();
            return gc.GetWeekOfYear(end, CalendarWeekRule.FirstDay, DayOfWeek.Sunday);   // 该年星期数
        }

        public static List<Week> DatesOfYearWeek(DateTime dt, int deltaWeek)
        {
            List<Week> list = new List<Week>();
            DateTime dts = dt.AddDays(0 - (int)dt.DayOfWeek);
            DateTime dte = dt.AddDays(6 - (int)dt.DayOfWeek);
            for (int i = -deltaWeek; i <= deltaWeek; i++)
            {
                Week w = new Week();
                w.WeekStart = dts.AddDays(i * 7);
                w.WeekEnd = dte.AddDays(i * 7);
                //DateTime dtc = dt.AddDays(i * 7);
                DateTime dtc = w.WeekStart;
                w.Year = dtc.Year;
                w.WeekNo = GetWeekOfYear(dtc);
                list.Add(w);
            }
            return list;
        }

        public static Week DatesOfYearWeek(int yearWeek)
        {
            Week w = new Week();
            int year = yearWeek / 100;
            int weekNo = yearWeek % 100;
            DateTime dt = new DateTime(year, 1, 1);
            DateTime dts = dt.AddDays(0 - (int)dt.DayOfWeek);
            DateTime dte = dt.AddDays(6 - (int)dt.DayOfWeek);
            w.Year = year;
            w.WeekNo = weekNo;
            w.WeekStart = dts.AddDays(7 * (weekNo - 1));
            w.WeekEnd = dte.AddDays(7 * (weekNo - 1));
            return w;
        }
    }

    public class Week
    {
        public int Year { get; set; }
        public int WeekNo { get; set; }
        public DateTime WeekStart { get; set; }
        public DateTime WeekEnd { get; set; }

        public override string ToString()
        {
            return string.Format("{0:yyyy.MM.dd}-{1:yyyy.MM.dd}", this.WeekStart, this.WeekEnd);
        }
    }
}