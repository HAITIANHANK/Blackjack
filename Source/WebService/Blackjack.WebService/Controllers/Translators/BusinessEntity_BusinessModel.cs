using Blackjack.Web.App.BusinessEntities.User;
using Blackjack.Web.App.BusinessModels.User;
using Blackjack.Web.App.WebService.Controllers.Translators.Users;
using Blackjack.Web.App.Infrastructure;
using AutoMapper;

namespace Blackjack.Web.App.WebService.Controllers.Translators
{
    public class BusinessEntity_BusinessModel : Profile
    {
        public BusinessEntity_BusinessModel()
        {
            this.RegisterTranslator<UserBE, UserBM, UserBE_UserBM>();
        }
    }
}
