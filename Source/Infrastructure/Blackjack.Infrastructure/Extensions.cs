﻿using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blackjack.Web.App.Infrastructure
{
    public static class Extensions
    {
        public static void RegisterTranslator<TType1, TType2, TConverter>(this Profile mapperProfile) where TConverter : ITypeConverter<TType1, TType2>, ITypeConverter<TType2, TType1>
        {
            mapperProfile.CreateMap<TType1, TType2>().ConvertUsing<TConverter>();
            mapperProfile.CreateMap<TType2, TType1>().ConvertUsing<TConverter>();
        }
    }
}
