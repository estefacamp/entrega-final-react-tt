/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */

import Swal from 'sweetalert2';

 export function dispararSweetBasico ( titulo, text, icon, textoBoton){
    Swal.fire({
        title: titulo,
        text: text,
        icon: icon,
        confirmButtonText: textoBoton,
      })
}