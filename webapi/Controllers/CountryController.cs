using Microsoft.AspNetCore.Mvc;
using webapi.CRUD;
using webapi.Models;

namespace webapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CountryController : Controller
    {
        private readonly ICountryCRUD countryCrud;
        public CountryController(ICountryCRUD countryCrud)
        {
            this.countryCrud = countryCrud;
        }

        [HttpGet(Name = "GetCountries")]
        public List<Country> GetCountries()
        {
            return countryCrud.getCountry();
        }
    }
}
