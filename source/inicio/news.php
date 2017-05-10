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
    <link href="http://local.openvios/public/css/all.css?ver=1494399326221" media="all" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,700" rel="stylesheet" type="text/css">
    <link href="http://local.openvios/public/img/favicon.ico" rel="shortcut icon" type="image/x-icon">
    <link href="" rel="icon"><!--[if lte IE 9]>
      <!--link(href!='#{page.static}/css/modules/all/ie.css', media='all', rel='stylesheet', type='text/css')-->
      <script src="http://local.openvios/public/js/libs/selectivizr/selectivizr.js?ver=1494399326221"></script>
      <script src="http://local.openvios/public/js/libs/html5shiv/dist/html5shiv.js?ver=1494399326221"></script><![endif]-->
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
    <div data-page="news" class="container">
      <aside>
        <div class="user"><img src="http://local.openvios/public/img/user_photo_1.png">
          <h3>Hola Lisset</h3><a href="javascrip:;">Campus Villa</a>
        </div>
        <nav>
          <ul>
            <li><a href="javascript:;" data-link="home">
                <div class="icon-home"></div><span>Inicio</span></a></li>
            <li><a href="javascript:;" data-link="news">
                <div class="icon-news"></div><span>Noticias</span></a></li>
            <li><a href="javascript:;" data-link="directory">
                <div class="icon-directory"></div><span>Directorio</span></a></li>
            <li><a href="javascript:;" data-link="family">
                <div class="icon-upc-family"></div><span>FAmilia UPC</span></a></li>
            <li><a href="javascript:;" data-link="events">
                <div class="icon-events"></div><span>Eventos, Beneficios y Servicios</span></a></li>
            <li><a href="javascript:;" data-link="adn">
                <div class="icon-adn"></div><span>ADMN UPC</span></a></li>
          </ul>
        </nav>
      </aside>
      <div class="content">
        <section class="banner_top">
          <article class="row_banner_top">
            <div data-bg="http://local.openvios/public/img/banner_details_news.jpg" class="ctn_img"></div>
            <div class="ctn_title">
              <div class="hack_space"></div>
              <h2>NOTICIAS</h2>
            </div>
            <div class="ctn_shortcuts">
              <div class="icon icon-arrow_left"></div>
              <ul>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              <div class="icon icon-arrow_right"></div>
            </div>
            <div class="ctn_search">
              <form action="">
                <input type="text" placeholder="Busca todo sobre Conéctate aquí" class="search">
                <div class="icon icon-search"></div>
              </form>
            </div>
          </article>
        </section>
        <section class="box_content_child modules">
          <article class="ctn ctn_details_news">
            <h3 class="title title_blue">BÚSQUEDA GENERAL</h3>
            <div class="row row_details_news">
              <form class="search_news">
                <div class="box_search">
                  <fieldset>
                    <input type="text" placeholder="INGRESA EL NOMBRE DE LA NOTICIA">
                  </fieldset>
                  <fieldset>
                    <select class="select_lightblue">
                      <option value="">Ordena por fecha</option>
                      <option value="1">Hoy</option>
                      <option value="2">Ayer</option>
                      <option value="3">Última semana</option>
                      <option value="4">Último mes</option>
                    </select>
                  </fieldset>
                </div>
                <fieldset class="txt_right">
                  <button type="button" class="btn btn_blue">REALIZAR BÚSQUEDA</button>
                </fieldset>
              </form>
              <div class="box_list_news">
                <ul>
                  <li class="item_news">
                    <div class="ctn_img_news ctn_img_news_right"><img src="http://local.openvios/public/img/news_two.png"><img src="http://local.openvios/public/img/mask_bottom.png" class="mask mask_bottom"></div>
                    <div class="ctn_txt_news">
                      <h2> <a href="javascript:;">Fechas y respuestas del proceso de matricula</a></h2>
                      <div class="tags"><a href="javascript:;">Área</a><span> / </span><a href="javascript:;">Dirección</a><span> / </span><a href="javascript:;">Jefatura</a></div>
                      <div class="date"><span>29.05.2016 03.46 pm</span></div>
                    </div>
                  </li>
                  <li class="item_news">
                    <div class="ctn_img_news ctn_img_news_right"><img src="http://local.openvios/public/img/news_two.png"><img src="http://local.openvios/public/img/mask_bottom.png" class="mask mask_bottom"></div>
                    <div class="ctn_txt_news">
                      <h2> <a href="javascript:;">Fechas y respuestas del proceso de matricula</a></h2>
                      <div class="tags"><a href="javascript:;">Área</a><span> / </span><a href="javascript:;">Dirección</a><span> / </span><a href="javascript:;">Jefatura</a></div>
                      <div class="date"><span>29.05.2016 03.46 pm</span></div>
                    </div>
                  </li>
                  <li class="item_news">
                    <div class="ctn_img_news ctn_img_news_right"><img src="http://local.openvios/public/img/news_two.png"><img src="http://local.openvios/public/img/mask_bottom.png" class="mask mask_bottom"></div>
                    <div class="ctn_txt_news">
                      <h2> <a href="javascript:;">Fechas y respuestas del proceso de matricula</a></h2>
                      <div class="tags"><a href="javascript:;">Área</a><span> / </span><a href="javascript:;">Dirección</a><span> / </span><a href="javascript:;">Jefatura</a></div>
                      <div class="date"><span>29.05.2016 03.46 pm</span></div>
                    </div>
                  </li>
                  <li class="item_news">
                    <div class="ctn_img_news ctn_img_news_right"><img src="http://local.openvios/public/img/news_two.png"><img src="http://local.openvios/public/img/mask_bottom.png" class="mask mask_bottom"></div>
                    <div class="ctn_txt_news">
                      <h2> <a href="javascript:;">Fechas y respuestas del proceso de matricula</a></h2>
                      <div class="tags"><a href="javascript:;">Área</a><span> / </span><a href="javascript:;">Dirección</a><span> / </span><a href="javascript:;">Jefatura</a></div>
                      <div class="date"><span>29.05.2016 03.46 pm</span></div>
                    </div>
                  </li>
                  <li class="item_news">
                    <div class="ctn_img_news ctn_img_news_right"><img src="http://local.openvios/public/img/news_two.png"><img src="http://local.openvios/public/img/mask_bottom.png" class="mask mask_bottom"></div>
                    <div class="ctn_txt_news">
                      <h2> <a href="javascript:;">Fechas y respuestas del proceso de matricula</a></h2>
                      <div class="tags"><a href="javascript:;">Área</a><span> / </span><a href="javascript:;">Dirección</a><span> / </span><a href="javascript:;">Jefatura</a></div>
                      <div class="date"><span>29.05.2016 03.46 pm</span></div>
                    </div>
                  </li>
                  <li class="item_news">
                    <div class="ctn_img_news ctn_img_news_right"><img src="http://local.openvios/public/img/news_two.png"><img src="http://local.openvios/public/img/mask_bottom.png" class="mask mask_bottom"></div>
                    <div class="ctn_txt_news">
                      <h2> <a href="javascript:;">Fechas y respuestas del proceso de matricula</a></h2>
                      <div class="tags"><a href="javascript:;">Área</a><span> / </span><a href="javascript:;">Dirección</a><span> / </span><a href="javascript:;">Jefatura</a></div>
                      <div class="date"><span>29.05.2016 03.46 pm</span></div>
                    </div>
                  </li>
                </ul>
                <div class="paginator"><a href="javasciprt:;" class="disabled icon icon-arrow_left"></a>
                  <ul>
                    <li><a href="javasciprt:;" class="selected">1</a></li>
                    <li><a href="javasciprt:;">2</a></li>
                    <li><a href="javasciprt:;">3</a></li>
                  </ul><a href="javasciprt:;" class="icon icon-arrow_right"></a>
                </div>
              </div>
            </div>
          </article>
          <div class="box_aside">
            <article class="ctn ctn_search">
              <h3 class="title title_blue_upc">Búsqueda  de la noticia</h3>
              <div class="row row_search"><a href="javascript:;" class="btn btn_blue">REALIZAR BUSQUEDA</a></div>
            </article>
            <article class="ctn ctn_find">
              <h3 class="title title_red">ENTÉRATE</h3>
              <div class="row row_find">
                <ul class="owl-carousel carousel_box">
                  <li><img src="http://local.openvios/public/img/enterate_1.png"><a href="javascript:;">Creatividad Empresarial 2016</a>
                    <div class="tags"><a href="javascript:;">Área</a><span> / </span><a href="javascript:;">Dirección</a><span> / </span><a href="javascript:;">Jefatura</a></div>
                    <div class="date"><span>25/08/2016  04:46 p.m.</span></div>
                  </li>
                  <li><img src="http://local.openvios/public/img/enterate_1.png"><a href="javascript:;">Creatividad Empresarial 2016</a>
                    <div class="tags"><a href="javascript:;">Área</a><span> / </span><a href="javascript:;">Dirección</a><span> / </span><a href="javascript:;">Jefatura</a></div>
                    <div class="date"><span>25/08/2016  04:46 p.m.</span></div>
                  </li>
                </ul>
              </div>
            </article>
            <article class="ctn ctn_pride">
              <h3 class="title title_red">ORGULLO UPC</h3>
              <div class="row row_pride">
                <ul class="owl-carousel carousel_box">
                  <li><img src="http://local.openvios/public/img/orgullo_upc_1.png">
                    <div class="ctn_txt"><a href="javascript:;">Colaboradores de UPC recibieron certificación Lean Six Sigma y fueron premiados </a><span>Fecha de Publicación: 07/08/2014</span></div>
                  </li>
                  <li><img src="http://local.openvios/public/img/orgullo_upc_1.png">
                    <div class="ctn_txt"><a href="javascript:;">Colaboradores de UPC recibieron certificación Lean Six Sigma y fueron premiados </a><span>Fecha de Publicación: 07/08/2014</span></div>
                  </li>
                </ul>
              </div>
            </article>
            <article class="ctn ctn_evolution">
              <h3 class="title title_blue_2">Evolución Cultural</h3>
              <div class="row row_evolution">
                <div class="box_img"><img src="http://local.openvios/public/img/evolution.png">
                  <div class="mask_img">
                    <div class="hack_space"></div>
                    <div class="icon icon-arrow"></div>
                  </div>
                </div>
                <h4>Así vivimos nuestra visión UPC</h4>
                <div class="date"><span>25/08/2016  04:46 p.m.</span></div>
              </div>
            </article>
          </div>
        </section>
      </div>
    </div>
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
    <script src="http://local.openvios/public/js/libs/yosonjs/dist/yoson.js?ver=1494399326226" type="text/javascript"></script>
    <script src="http://local.openvios/public/js/libs/yosonjs-utils/yosonjs-utils.js?ver=1494399326226" type="text/javascript"></script>
    <script src="http://local.openvios/public/js/dist/all/all.js?ver=1494399326226" type="text/javascript"></script>
    <script src="http://local.openvios/public/js/dist/inicio/inicio/inicio.js?ver=1494399326226" type="text/javascript"></script>
    <script src="http://local.openvios/public/js/libs/yosonjs-utils/modules.js?ver=1494399326226" type="text/javascript"></script>
    <script src="http://local.openvios/public/js/libs/yosonjs-utils/appLoad.js?ver=1494399326226" type="text/javascript"></script>
  </body>
</html>