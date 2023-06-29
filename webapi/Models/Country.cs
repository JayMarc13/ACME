namespace webapi.Models
{
    public class Country
    {
        public int CountryId { get; set; }
        public string NomPais { get; set; }

        public Country(int idCountry, string NomPais) 
        {
            this.CountryId = idCountry;
            this.NomPais = NomPais;
        }
    }
}
