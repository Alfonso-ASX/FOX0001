  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB9rKrUosSRqmtCy9c65mO8NVDAGPxThB0",
    authDomain: "bolsainmobiliaria-mx.firebaseapp.com",
    databaseURL: "https://bolsainmobiliaria-mx.firebaseio.com",
    projectId: "bolsainmobiliaria-mx",
    storageBucket: "bolsainmobiliaria-mx.appspot.com",
    messagingSenderId: "204267997772"
  };
  firebase.initializeApp(config);
observador();

function observador(tipo='normal')
{
	firebase.auth().onAuthStateChanged(function(user) 
	{
	  if (user) 
	  {
	    var displayName = user.displayName;
	    var email = user.email;
	    var emailVerified = user.emailVerified;
	    var photoURL = user.photoURL;
	    var isAnonymous = user.isAnonymous;
	    var uid = user.uid;
	    var providerData = user.providerData;

	    if(!checkCookie('uid'))
	    {

			setCookie('uid', uid); //cookie de sesión
			setCookie('email', email); //cookie de sesión
			if(tipo=='crear')
			{
				$("#formCrear").submit();
			}
			else
			{
				location.reload();	

			}	
	    }
	    else
	    {
			setCookie('uid', uid); //cookie de sesión
			setCookie('email', email); //cookie de sesión

	    }
	  }
	  else
	  {



	    if(checkCookie('uid'))
	    {

			eliminarCookie('uid')
			eliminarCookie('email'); //cookie de sesión
			if(tipo=='crear')
			{
				$("#formCrear").submit();
			}
			else
			{
				location.reload();				
			}	
			location.href="/web/";
	    }
	  }
	});
}




  
$("#btnSesion").click(function()
{
	var usuario = $('#usuario').val();
	var contrasena = $('#contrasena').val();

	firebase.auth().signInWithEmailAndPassword(usuario, contrasena).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  M.toast({html: errorMessage})

	});
	observador();
});




  
$("#btnRecuperar").click(function()
{

	var auth = firebase.auth();
	var emailAddress = $('#usuarioRecuperar').val();

	auth.sendPasswordResetEmail(emailAddress).then(function() {
	  M.toast({html: 'El correo fue enviado con éxito.'})

	}).catch(function(error) {
			  var errorCode = error.code;
	  var errorMessage = error.message;
	  M.toast({html: errorMessage})

	});
});


  
$("#btnCrear").click(function()
{

	var usuario = $('#usuarioCrear').val();
	var contrasena = $('#contrasenaCrear').val();

	firebase.auth().createUserWithEmailAndPassword(usuario, contrasena).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  M.toast({html: errorMessage})

	});

	observador('crear')
});



  
$("#btnSalir").click(function()
{
	firebase.auth().signOut().then(function() {
	  // Sign-out successful.
	}).catch(function(error) {
	  // An error happened.
	});
	observador();
});










//Funciones de cookies

function setCookie(cname, cvalue) {
  var d = new Date();
  d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie(cname) {
  var resul = false;
  var username = getCookie(cname);
  if (username != "") {
    resul = true;
  }
  return resul;
}

function eliminarCookie(cname) {
  return document.cookie = cname + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

//Fin funciones de cookies

