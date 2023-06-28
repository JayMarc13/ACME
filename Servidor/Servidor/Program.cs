using System.Data.SqlClient;

namespace Program
{
    class Program
    {
        string connectionString = @"Data Source=(LocalDB)\MSSQLLocalDB;AttachDbFilename=C:\Users\jay.paragas.ext\Downloads\Servidor\Servidor\database\Database1.mdf;Integrated Security=True";
        static void Main(string[] args)
        {
            Program p = new Program();
            bool sortir = false;

            while (!sortir) 
            {
                Console.WriteLine("1 - Hacer insert en la tabla");
                Console.WriteLine("2 - Consultar la lista de paises");
                Console.WriteLine("3 - Consultar la lista de ciudades");
                Console.WriteLine("4 - Salir del programa\n");

                Console.Write("Elige una opción: ");
                string clientChooseOption = Console.ReadLine();
                int numberChoosed = int.Parse(clientChooseOption);

                switch (numberChoosed) 
                {
                    case 1:
                        p.insertPaisosTable();
                        break;
                    case 2:
                        p.getListPaisosTable();
                        break;
                    case 3:
                        sortir = true;
                        Console.WriteLine("Bye bye");
                        break;
                    case 4:
                       sortir = true;
                        Console.WriteLine("Bye bye");
                        break;
                }
            }

        }

        public void insertPaisosTable() 
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {

                try
                {
                    Console.Write("Introduz el id del pais: ");
                    string countryId = Console.ReadLine();
                    int countryIdNumber = int.Parse(countryId);
                    Console.Write("Introduz el nombre del pais: ");
                    string countryName = Console.ReadLine();

                    SqlCommand myCommand = new SqlCommand("INSERT INTO Paisos VALUES(" + countryId + "," + countryName + ")", connection);
                    connection.Open();
                    myCommand.ExecuteNonQuery();
                }
                catch (SqlException ex) 
                {
                    Console.WriteLine("El pais ya existe");
                }
            }
        }

        public void getListPaisosTable() 
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {

                try
                {
                    using (SqlCommand command = new SqlCommand("SELECT * FROM Paisos", connection))
                    {
                        connection.Open();
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                Console.WriteLine("{0} {1}", reader.GetValue(0), reader.GetString(1));
                            }
                        }
                    }
                }
                catch (SqlException ex)
                {
                    Console.WriteLine("Error");
                }
            }
        }
    }
}
