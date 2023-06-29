using System.Data.SqlClient;
using webapi.Models;

namespace webapi.CRUD
{
    public class CountryCRUD : ICountryCRUD
    {
        string connectionString = @"Data Source=(LocalDB)\MSSQLLocalDB;AttachDbFilename=C:\Users\jay.paragas.ext\Desktop\ACMEDefinitivo\ACME\webapi\database\Database1.mdf;Integrated Security=True";

        public List<Country> getCountry() 
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                List<Country> countryList = new List<Country>();
                try
                {
                    using (SqlCommand command = new SqlCommand("SELECT * FROM Country", connection))
                    {
                        connection.Open();
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                int idCountry = (int)reader.GetValue(0);
                                string nomPais = reader.GetString(1);
                                Country country = new Country(idCountry, nomPais);
                                countryList.Add(country);
                            }
                        }
                    }
                }
                catch (SqlException ex)
                {
                    Console.WriteLine("Error");
                }
                return countryList;
            }
        }
    }
}
