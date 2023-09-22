using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class ChangePassword
    {
        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Contraseña actual")]
        public string ContraseñaActual { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Nueva contraseña")]
        public string NuevaContraseña { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Confirmar nueva contraseña")]
        [Compare("NuevaContraseña", ErrorMessage = "Las contraseñas no coinciden.")]
        public string ConfirmarNuevaContraseña { get; set; }

    }
}
