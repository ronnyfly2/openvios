<!DOCTYPE html><!--[if IE 7]>
<html lang="es" xmlns:og="http://ogp.me/ns#" xmlns:fb="http://ogp.me/ns/fb#" class="ie7"></html><![endif]--><!--[if IE 8]>
<html lang="es" xmlns:og="http://ogp.me/ns#" xmlns:fb="http://ogp.me/ns/fb#" class="ie8"></html><![endif]--><!--[if IE 9]>
<html lang="es" xmlns:og="http://ogp.me/ns#" xmlns:fb="http://ogp.me/ns/fb#" class="ie9"></html><![endif]-->
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="language" content="es">
    <title>Openvios</title>
    <meta name="title" content="Openvios">
    <meta name="description" content="Openvios">
    <meta name="author" content="Openvios.com">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="index, follow">
    <meta name="keywords" content="Openvios">
    <meta property="og:description" content="Openvios">
    <meta property="og:image" content="http://local.openvios/public">
    <meta property="og:site_name" content="Openvios">
    <meta property="og:title" content="Openvios">
    <meta property="og:type" content="website">
    <meta property="og:url" content="http://local.openvios/">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link href="http://local.openvios/public/css/all.css?ver=1494399328010" media="all" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,700" rel="stylesheet" type="text/css">
    <link href="http://local.openvios/public/img/favicon.ico" rel="shortcut icon" type="image/x-icon">
    <link href="" rel="icon"><!--[if lte IE 9]>
      <!--link(href!='#{page.static}/css/modules/all/ie.css', media='all', rel='stylesheet', type='text/css')-->
      <script src="http://local.openvios/public/js/libs/selectivizr/selectivizr.js?ver=1494399328010"></script>
      <script src="http://local.openvios/public/js/libs/html5shiv/dist/html5shiv.js?ver=1494399328010"></script><![endif]-->
    <script>
      var yOSON = {
      "module": "inicio",
      "controller": "inicio",
      "action": "index",
      "baseHost": "",
      "statHost": "",
      "eHost": "",
      "statVers": "",
      "AppCore": {},
      "AppSandbox": {},
      "AppSchema": {
      "modules": {},
      "requires": {}
      },
      "static" : false,
      "url" :  {},
      "isLogged" : false
      }
    </script>
  </head>
  <body id="app-layout">
    <header>
      <div class="box_center">
        <h1><img src="http://local.openvios/public/img/logo_openvios.png" alt="logotipo | Openvios - ¿Quieres un producto del extrangero? Compra en línea, nosotros lo traemos">
          <hr>
          <div class="box_txt"><span>Telf.: 975-192-066</span><span>info@openvios.com</span></div>
        </h1>
        <nav>
          <ul>
            <li><a href="javascript:;">Inicio</a></li>
            <li><a href="javascript:;">Servicios</a></li>
            <li><a href="javascript:;">Cómo funciona</a></li>
            <li><a href="javascript:;">Contáctanos</a></li>
          </ul><a href="javascript:;" class="btn btn_white">REGISTRATE</a>
        </nav>
      </div>
    </header>
    <footer>
      <div class="box_center">
        <p>2017 Copyright © Openvios.com . Todos los derechos reservados</p>
        <p>Contacto: info@openvios.com | Teléfono: 975-192-066</p>
      </div>
    </footer>
    <script type="text/template" id="tplProvince">
      <option value="">Seleccione Provincia</option><% _.each(provinces, function(postIts, index) { %>
      <option data-value="<%= index %>" value="<%= postIts.id %>"><%= postIts.value %></option><% }); %>
    </script>
    <script type="text/template" id="tplDistrict">
      <option value="">Seleccione Distrito</option><% _.each(districts, function(postIts, index) { %>
      <option data-value="<%= index %>" value="<%= postIts.id %>"><%= postIts.value %></option><% }); %>
    </script>
    <script type="text/template" id="tplModel">
      <option value="">Seleccione Modelo</option><% _.each(models, function(postIts, index) { %>
      <option data-value="<%= index %>" value="<%= postIts.id %>"><%= postIts.name %></option><% }); %>
    </script>
    <script src="http://local.openvios/public/js/libs/jquery/dist/jquery.min.js" type="text/javascript"></script>
    <script src="http://local.openvios/public/js/libs/yosonjs/dist/yoson.js?ver=1494399328013" type="text/javascript"></script>
    <script src="http://local.openvios/public/js/libs/yosonjs-utils/yosonjs-utils.js?ver=1494399328013" type="text/javascript"></script>
    <script src="http://local.openvios/public/js/dist/all/all.js?ver=1494399328013" type="text/javascript"></script>
    <script src="http://local.openvios/public/js/dist/inicio/inicio/inicio.js?ver=1494399328013" type="text/javascript"></script>
    <script src="http://local.openvios/public/js/libs/yosonjs-utils/modules.js?ver=1494399328013" type="text/javascript"></script>
    <script src="http://local.openvios/public/js/libs/yosonjs-utils/appLoad.js?ver=1494399328013" type="text/javascript"></script>
  </body>
</html>