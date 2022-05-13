var libro = [];
var estado = [];
var persona = [];
var socio = ["Juan","Pedro"];
var almacenados = [];
var socios = ["Juan"];
var j = 0;
var i = 0;


var compVecAlma = localStorage.getItem("HistorialLibroSocios");
if (compVecAlma) {
    almacenados = JSON.parse(compVecAlma);
} else {
    almacenados = [];
}

var compVecSocios = localStorage.getItem("HistorialSocios");
if (compVecSocios) {
    socios = JSON.parse(compVecSocios);
} else {
    socios = [];
}

var compVecPersona = localStorage.getItem("HistorialPersona");
if (compVecPersona) {
    persona = JSON.parse(compVecPersona);
} else {
    persona = [];
}
var compVecEstado = localStorage.getItem("HistorialEstado");
if (compVecEstado) {
    estado = JSON.parse(compVecEstado);
} else {
    estado = [];
}

var compVecLibro = localStorage.getItem("HistorialLibro");
if (compVecLibro) {
    libro = JSON.parse(compVecLibro);
} else {
    libro = [];
}

var nombreSocio = localStorage.getItem("NombreSocio");
if (nombreSocio) {
    socio = JSON.parse(nombreSocio);
} else {
    socio = [];
}


window.onload = function cargarFunciones() {
    tablas();
    selecOptionLibros();
    mostrarSocios();
    selecOptionLibrosSocios();

}

function tablas() {

    var vectoresEscri = "";
    for (i = 0; i < libro.length; i++) {
        if (estado[i] == true) {
            estadoLib = "No esta disponible"
        } else {
            estadoLib = "Si esta disponible"
        }
        vectoresEscri = vectoresEscri + "<tr><td scope='col'>" + libro[i] + "</td><td scope='col'>" + estadoLib + "</td><td>" + persona[i] + "</td></tr>";
    }
    vectoresEscri = "<table class='table table-dark table-striped'><tr><th>Libro</th><th>Estado</th><th>Persona</th></tr>" + vectoresEscri + "</table>";

    document.getElementById("tablas").innerHTML = vectoresEscri;
    mostrarSocios();
    tablaSocios();

}
function selecOptionLibros() {
    var librosEscritos = "";
    for (i = 0; i < libro.length; i++) {
        librosEscritos = librosEscritos + "<option value='" + libro[i] + "'>" + libro[i] + "</option>";
    }

    var librosEscritos4 = "<select class='form-select' aria-label='Default select example' id='librosEscri4'>" + librosEscritos + "</select>";//Estado en particular
    var librosEscritos3 = "<select class='form-select' aria-label='Default select example' id='librosEscri3'>" + librosEscritos + "</select>";//Eliminar un ibro
    librosEscritos = "<select class='form-select' aria-label='Default select example' id='librosEscri'>" + librosEscritos + "</select>";// Cambiar de posedor de un libro

    document.getElementById("salidaLibros").innerHTML = librosEscritos;
    document.getElementById("salidaLibros3").innerHTML = librosEscritos3;
    document.getElementById("salidaLibros4").innerHTML = librosEscritos4;

}



function LibrosDisponibles() {
    //Muestra cuales son los libros disponibles
    var escrLibrosDispo = "";
    var cont=0;
    for (i = 0; i < estado.length; i++) {
        if (estado[i] == false) {
            cont=cont + 1;
            escrLibrosDispo = escrLibrosDispo + "   ◉ " + libro[i] + "\n";
        }
    }
    if(cont == 0) {
        escrLibrosDispo ="No hay libros disponibles"
    }else{
        escrLibrosDispo = "➤Los libros disponibles son: \n" + escrLibrosDispo;
    }
    
    alert(escrLibrosDispo)

}
function CambiarPersona() {
    //Cambiar Persona que tiene el libro
    var librosOpcion = document.getElementById("librosEscri").value;
    var cambiarPersona = document.getElementById("cambiarPersona").value;
    for (var i = 0; i < libro.length; i++) {
        if (libro[i] == librosOpcion) {

            persona[i] = cambiarPersona;
            estado[i] = true;
            if(socio[i]==null) {
                socio[i]=cambiarPersona;
            }
            if (persona[i] == "") {
                estado[i] = false;
            }
        }
    }
    mostrarSocios();
    tablas();
    guardarHistorial();

}
function EntregarLibros() {
    //Entregar todos los libros
    for (var i = 0; i < libro.length; i++) {
        estado[i] = false;
        persona[i] = "";
    }
    alert("🔵Los libros ocupados han sido entregados")

    tablas();
    selecOptionLibrosSocios();
    guardarHistorial();

}
function OrdenarDeMayorAMenor() {
    //Ordenar de mayor a menor
    var bandera2 = true;
    var longitudDeLibrNom = [];
    for (i = 0; i < libro.length; i++) {
        longitudDeLibrNom[i] = libro[i].length;
    }

    do {
        bandera2 = true;
        for (i = 0; i < libro.length; i++) {
            if (longitudDeLibrNom[i] < longitudDeLibrNom[i + 1]) {

                var auxiliare0 = longitudDeLibrNom[i];
                longitudDeLibrNom[i] = longitudDeLibrNom[i + 1];
                longitudDeLibrNom[i + 1] = auxiliare0;

                var auxiliare = libro[i];
                libro[i] = libro[i + 1];
                libro[i + 1] = auxiliare;

                var auxiliare1 = estado[i];
                estado[i] = estado[i + 1];
                estado[i + 1] = auxiliare1;

                var auxiliar3 = persona[i];
                persona[i] = persona[i + 1];
                persona[i + 1] = auxiliar3;

                bandera2 = false;


            }
        }
    } while (bandera2 == false);
    tablas();
    guardarHistorial();
}
function EliminarUnLibro() {
    //Eliminar un libro
    var elimLibro = document.getElementById("librosEscri3").value;

    for (i = 0; i < libro.length; i++) {
        if (libro[i] == elimLibro) {
            estado.splice(i, 1);
            persona.splice(i, 1);
            libro.splice(i, 1);
        }
    }
    tablas();
    selecOptionLibros();
    guardarHistorial();
}
function EliminarPorConsulta() {
    //Eliminar varios libros
    j = 0;

    var eleccionUser = document.getElementsByName("EliminLibrosUsuario");
    for (i = 0; i < eleccionUser.length; i++) {

        if (eleccionUser[i].checked) {
            if (eleccionUser[i].value == "siEstan") {
                var eleccionUserBoolean = false;

            } else if (eleccionUser[i].value == "noEstan") {
                var eleccionUserBoolean = true;

            }

            do {
                var bandera3 = true;
                for (j = 0; j < libro.length; j++) {
                    if (estado[j] == eleccionUserBoolean) {
                        estado.splice(j, 1);
                        persona.splice(j, 1);
                        libro.splice(j, 1);
                        bandera3 = false;
                    }
                }
            } while (bandera3 == false);

        }
    }
    tablas();
    selecOptionLibros();
    selecOptionLibrosSocios();
    guardarHistorial();
}
function AnadirLibro() {
    //Añadir un libros
    var bandera4=false;
    var nuevoLibro = document.getElementById("nuevLibroID").value;


    for (var i = 0; i < libro.length; i++) {
        if (libro[i] == nuevoLibro) {
            bandera4 = true;
        } 
    }

    if(bandera4==false) {
        libro.push(nuevoLibro);
        persona.push("");
        estado.push(false);
    }else {
        alert("🔴Ese libro ya se encuentra en la biblioteca")
    }

    tablas();
    selecOptionLibros();
    selecOptionLibrosSocios();
    guardarHistorial();

}
function EstadoParticularLibro() {
    //Ver estado particular de un libro
    var consultaLibro = document.getElementById("librosEscri4").value;

    var escriConsulLibro = "";

    for (i = 0; i < libro.length; i++) {

        if (libro[i] == consultaLibro) {
            if (estado[i] == true) {
                var estadoLibrosEsc = "No esta disponible";
            } else {
                var estadoLibrosEsc = "Si esta disponible";
            }
            if (persona[i] != "") {
                var personaLibrosEsc = persona[i];
            } else {
                var personaLibrosEsc = "Nadie";
            }
            escriConsulLibro = escriConsulLibro + "🔴➣Libro: " + libro[i] + "\n  🔵➤ Estado: " + estadoLibrosEsc + "\n  🔵➤ Persona: " + personaLibrosEsc;

        }
    }
    alert(escriConsulLibro);

}

//Vectores Relacionados Codigo
function mostrarSocios() {
    var selectSocios = "<option value='nada'>Selecione uno</option>";
    for (i = 0; i < socio.length; i++) {
        selectSocios = selectSocios + "<option value='" + socio[i] + "'>" + socio[i] + "</option>"
    }
    selectSocios = "<select class='form-select' aria-label='Default select example' id='opcionSocios'>" + selectSocios + "</select>"

    document.getElementById("salidaSocios").innerHTML = selectSocios;
}
function selecOptionLibrosSocios() {

    var librosEscritosSocios = "";
    for (i = 0; i < libro.length; i++) {
        if (estado[i] == false) {
            librosEscritosSocios = librosEscritosSocios + "<option value='" + libro[i] + "'>" + libro[i] + "</option>";
        }
    }

    librosEscritosSocios = "<select class='form-select' aria-label='Default select example' id='librosEscriSocios'>" + librosEscritosSocios + "</select>";
    document.getElementById("librosDeVectoresRela").innerHTML = librosEscritosSocios;

}

function guardarHistorial() {

    //Guardar socios en el historial
    var sociosElec = document.getElementById("opcionSocios").value;
    if (sociosElec != "nada") {
        socios.push(sociosElec);
        var vectorSocioStringGuar = JSON.stringify(socios);
        localStorage.setItem("HistorialSocios", vectorSocioStringGuar);

        //Guardar el libro que pidio ese socio en el historial
        var libroSocio = document.getElementById("librosEscriSocios").value;
        almacenados.push(libroSocio);
        var vectorLibroSocioStringGuar = JSON.stringify(almacenados);
        localStorage.setItem("HistorialLibroSocios", vectorLibroSocioStringGuar);

        for (var i = 0; i < libro.length; i++) {
            if (libro[i] == libroSocio) {
                persona[i] = sociosElec;
                estado[i] = true;
            }
        }
    }
    //Guardando Historial de Persona
    var personaGuardada = JSON.stringify(persona);
    localStorage.setItem("HistorialPersona", personaGuardada);
    //Guardando Historial de Estado
    var estadoGuardada = JSON.stringify(estado);
    localStorage.setItem("HistorialEstado", estadoGuardada);
    //Guardando Historial de libro
    var librosGuardados = JSON.stringify(libro);
    localStorage.setItem("HistorialLibro", librosGuardados);
    //Guardar nombres
    var vecSocioGuardado = JSON.stringify(socio);
    localStorage.setItem("NombreSocio", vecSocioGuardado);
    tablaSocios()
    tablas();
    selecOptionLibrosSocios();

}
//--------------------------------------------------------------------//

function tablaSocios() {
    var datosRecuperados = localStorage.getItem("HistorialSocios");
    var datosRecuperados2 = localStorage.getItem("HistorialLibroSocios");

    if (datosRecuperados != null) {
        var vectorSoRecuperado = JSON.parse(datosRecuperados);
        var vectorLiRecuperado = JSON.parse(datosRecuperados2);

        var salidaTabla = "";
        for (var i = 0; i < vectorSoRecuperado.length; i++) {
            salidaTabla = salidaTabla + "<tr><td>" + vectorSoRecuperado[i] + "</td><td>" + vectorLiRecuperado[i] + "</td></tr>";
        }
        salidaTabla = "<table class='table table-dark table-striped'><tr><th>Socios</th><th>Libro</th></tr>" + salidaTabla + "</table>";

        document.getElementById('sociosHistorialID').innerHTML = salidaTabla;

    }
}
