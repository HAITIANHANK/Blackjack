using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Blackjack.Web.App.Infrastructure.Exceptions
{
    public class WebException : Exception
    {
        public readonly HttpStatusCode ResponseCode;
        public new readonly string Message;

        public WebException(HttpStatusCode responseCode, string message)
        {
            ResponseCode = responseCode;
            Message = message;
        }
    }
}
