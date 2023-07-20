using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    /*[Authorize] //<-*//*- Verificar el token */
    public class CityController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public CityController(AplicationDbContext context)
        {
            this._context = context;
        }

        //Enviar la lista de Cities
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                Thread.Sleep(500);
                var listaCities = await _context.City.ToListAsync();
                return Ok(listaCities);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Retornar la ciudad con la id que ha pasado
        [HttpGet("{cityId}")]
        public async Task<IActionResult> Get(int cityId)
        {
            try
            {
                var city = await _context.City.FindAsync(cityId);
                if (city == null)
                {
                    return NotFound();
                }
                return Ok(city);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet ("CitiesWithCountries")]
        public async Task<IActionResult> GetCitiesWithCountries()
        {
            try
            {
                var listaCities = await _context.City.
                    Join(
                        _context.Country,
                        city => city.CountryId,
                        Country => Country.CountryId,
                        (City, Country) => new 
                        {
                            CityId = City.CityId,
                            CityName = City.CityName,
                            CountryId = City.CountryId,
                            CountryName = Country.CountryName
                        }
                    ). ToListAsync();

                return Ok(listaCities);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("byCountryName/{countryName}")]
        public async Task<IActionResult> ListCitiesWithCountryName(string countryName)
        {
            try
            {
                var listCityByCountry = await _context.City
                .Join(
                    _context.Country,
                    city => city.CountryId,
                    country => country.CountryId,
                    (city, country) => new
                    {
                        City = city,
                        Country = country
                    }
                )
                .Where(item => item.Country.CountryName == countryName)
                .Select(item => new
                {
                    CityName = item.City.CityName
                })
                .ToListAsync();


                if (listCityByCountry == null)
                {
                    return NotFound();
                }
                return Ok(listCityByCountry);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // Eliminar el ciudad con la id pasada 
        [HttpDelete("{cityId}")]
        public async Task<IActionResult> Delete(int cityId)
        {
            try
            {
                var city = await _context.City.FindAsync(cityId);
                if (city == null)
                {
                    return NotFound();
                }

                _context.City.Remove(city);
                await _context.SaveChangesAsync();

                return NoContent();

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("byCityName/{cityName}")]
        public async Task<IActionResult> RemoveByCityName(string cityName)
        {
            try
            {
                City cityToDelete = _context.City.FirstOrDefault(c => c.CityName == cityName);
                if (cityToDelete == null)
                {
                    return NotFound();
                }

                 _context.City.Remove(cityToDelete);
                await _context.SaveChangesAsync();

                return NoContent();

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        //Add city
        [HttpPost]
        public async Task<IActionResult> Post(City city)
        {
            try
            {
                _context.Add(city);
                await _context.SaveChangesAsync();

                return CreatedAtAction("Get", new { CityId = city.CityId }, city);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        [HttpPut("{cityId}")]
        public async Task<IActionResult> Put(int cityId, City city)
        {
            try
            {
                if (cityId != city.CityId)
                {
                    return BadRequest();
                }

                var cityItem = await _context.City.FindAsync(cityId);

                if (cityItem == null)
                {
                    return NotFound();
                }

                cityItem.CityName = city.CityName;

                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("UpdateByCityname/{cityName}")]
        public async Task<IActionResult> UpdateByCityName(string cityName, City city)
        {
            try
            {
                var cityToUpdate = _context.City.FirstOrDefault(c => c.CityName == cityName);

                if (cityToUpdate == null)
                {
                    return NotFound();
                }

                cityToUpdate.CityName = city.CityName;

                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("country/{countryId}")]
        public async Task<IActionResult> GetCitiesByCountry(int countryId)
        {
            try
            {
                var cities = _context.City.Where(c => c.CountryId == countryId).ToList();

                if (cities.Count == 0)
                {
                    return NotFound();
                }

                return Ok(cities);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
