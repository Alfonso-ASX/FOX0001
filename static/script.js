


$( document ).ready(function() 
{
    M.AutoInit();
    $('#cargando').hide();

$('.modal').modal();

    //Carga imagen si no hay imagen
    $('img').each(function(i,val)
    {//Se recorren todas las imagenes       
        if($(this).attr('src')=='')
        {//Si hay una imagen con src vacio, se pondrá imagen default
            $(this).attr('src', '/img/no_image.jpg')
        }
    });
});

/*

$('a').click(function(){
	if($(this).attr('href')!='#')
	{
	    $('#cargando').show();
        setTimeout(function(){ $('#cargando').hide(); }, 3000);

	}
})


$('.tab a').click(function(){
    $('#cargando').hide();
});
*/


//Funciones


function number_format(number, decimals, dec_point, thousands_sep)
{ // v2019-01-02
/*
 * Se hace varias veses el replace ya que al hacerla solo una y llegar a 
 * más de un millon no limpia todas las comas, checar más adelante y corregir
 */
    number = number.replace(',', "");
    number = number.replace(',', "");
    number = number.replace(',', "");
    number = number.replace(',', "");

    number=parseFloat(number);
    if(isNaN(number))
    {
        return "";
    }

    if(decimals!==undefined)
    {
        // Redondeamos
        number=number.toFixed(decimals);
    }

    // Convertimos el punto en dec_point
    number=number.toString().replace(".", dec_point!==undefined ? dec_point : ",");

    if(thousands_sep)
    {
        // Añadimos los separadores de miles
        var miles=new RegExp("(-?[0-9]+)([0-9]{3})");
        while(miles.test(number)) 
        {
            number=number.replace(miles, "$1" + thousands_sep + "$2");
        }
    }
    return number;
}

function remove_number_format(number)
{ // v2016-02-06
    return parseFloat(number.replace(',', ""))
}



