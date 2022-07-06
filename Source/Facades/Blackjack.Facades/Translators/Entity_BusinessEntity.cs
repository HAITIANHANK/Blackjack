using AutoMapper;
using Blackjack.Web.App.BusinessEntities.User;
using Blackjack.Web.App.Data.Entities;
using Blackjack.Web.App.Facades.Translators.User;
using Blackjack.Web.App.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blackjack.Web.App.Facades.Translators
{
    public class Entity_BusinessEntity : Profile
    {
        public Entity_BusinessEntity()
        {
            this.RegisterTranslator<UserEntity, UserBE, UserEntity_UserBE>();
        }
    }
}
