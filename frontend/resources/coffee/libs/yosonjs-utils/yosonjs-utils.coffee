###
Devuelve un funcion cuando se termino de cargar,
el numero maximo de imagenes a cargar.
@autor Jhonnatan Castro
###
beforeLoadImages = (oP)->
  _st =
    total: oP.images.length
    countImgLoaded: 0
  _fn =
    createImages: (oP)->
      log "images to load", _st.total
      i = 0
      while i < _st.total
        source = oP.images[i]
        img = new Image()
        img.onload = ->
          _fn.loadImages(img.src)
          return
        img.src = source
        i++
      return
    loadImages: (src)->
      _st.countImgLoaded++
      log "loading image [", _st.countImgLoaded, "]", src
      if _st.countImgLoaded == oP.MaxNumberImagesLoad
        log "Max images loaded [", oP.MaxNumberImagesLoad, "]"
        oP.callback()
      return

  _fn.createImages(oP)
  return


###
Devuelve un array bidimensional
@autor Ronny
###
splitColumns = (total, columns)->
  contar = 0
  myArray = []
  divide_on_colums = Math.ceil(total / columns)
  i = 0
  while i < columns
    myArray[i] = []
    z = 0
    while z < divide_on_colums
      myArray[i].push contar++
      z++
    i++
  return myArray


goToURL = (e)->
  ele = $(e.target)
  if !ele.hasClass("track")
    ele = ele.parents(".track")

  window.myEvent = ele.prop("tagName")
  if ele.prop("tagName").toLowerCase() == 'a'
    href = ele.attr("href")
    window.location.href = href
  return

capitalize = (str) ->
# return str.replace /(.)|\s(.)/, ($1) ->
#     $1.toUpperCase()
# return
  return str.replace /(^|\s)([a-z])/g, (m, $1, $2) ->
    $1 + $2.toUpperCase()
  return

isMobile =
  Android: ->
    navigator.userAgent.match /Android/i
  BlackBerry: ->
    navigator.userAgent.match /BlackBerry/i
  iOS: ->
    navigator.userAgent.match /iPhone|iPad|iPod/i
  Opera: ->
    navigator.userAgent.match /Opera Mini/i
  Windows: ->
    navigator.userAgent.match /IEMobile/i
  any: ->
    isMobile.Android() or isMobile.BlackBerry() or isMobile.iOS() or isMobile.Opera() or isMobile.Windows()


(($) ->
  $.fn.removeClassRegEx = (regex) ->
    classes = $(this).attr("class")
    return false  if not classes or not regex
    classArray = []
    classes = classes.split(" ")
    i = 0
    len = classes.length

    while i < len
      classArray.push classes[i]  unless classes[i].match(regex)
      i++
    $(this).attr "class", classArray.join(" ")
    $ this

  return) (jQuery)

# http://blog.blakesimpson.co.uk/read/51-swipe-js-detect-touch-direction-and-distance
(($) ->
  $.fn.swipe = (callback) ->
    touchDown = false
    originalPosition = null
    $el = $(this)

    swipeInfo = (event) ->
      eoriginal = if (typeof event.originalEvent.targetTouches == 'undefined') then event.originalEvent else event.originalEvent.targetTouches[0]
      x = eoriginal.pageX
      y = eoriginal.pageY
      dx = undefined
      dy = undefined
      dx = if x > originalPosition.x then 'right' else 'left'
      dy = if y > originalPosition.y then 'down' else 'up'
      {
        direction:
          x: dx
          y: dy
        offset:
          x: x - (originalPosition.x)
          y: originalPosition.y - y
      }
    $el.on 'touchstart mousedown', (event) ->
      touchDown = true
      eoriginal = if (typeof event.originalEvent.targetTouches == 'undefined') then event.originalEvent else event.originalEvent.targetTouches[0]
      originalPosition =
        x: eoriginal.pageX
        y: eoriginal.pageY
      return

    $el.on 'touchend mouseup', ->
      touchDown = false
      originalPosition = null
      return

    $el.on 'touchmove mousemove', (event) ->
      if !touchDown
        return
      info = swipeInfo(event)
      callback info.direction, info.offset
      return
    true) (jQuery)
# ---


# func neo_ajax global
# @params: obj (Object), loader ($element), callbackSuccess (function), callbackError (function)
# usage
# @param: obj = { url: 'file/ajax.php', method: 'GET', type: 'json' }
# @param: loader = $(".loader")
# @param: callbackSuccess = function()
# @param: callbackError = function()
window.request = null
neo_ajax = (obj, loader, callbackSuccess, callbackError) ->
  if(typeof obj != "object")
    log "neo_ajax: error param obj"
    return
  if(typeof obj.url == "undefined")
    log "neo_ajax: obj.url is necesary"
    return
  window.request = $.ajax
    url: obj.url
    method: if typeof obj.method != "undefined" then obj.method else 'GET'
    dataType: if typeof obj.type != "undefined" then obj.type else 'html'
    data: if typeof obj.data != "undefined" then obj.data else ''
    cache: true
    beforeSend: () ->
      loader.show()
      if(window.request != null)
        window.request.abort()
      return
  window.request.done (result) ->
    loader.hide()
    if(typeof callbackSuccess == "function")
      callbackSuccess(result)
    else
      log "parametro ajax callback error"
    return
  window.request.fail (jqXHR, textStatus) ->
    loader.hide()
    if(typeof callbackError == "function")
      callbackError(jqXHR)
    else
      log 'Request failed: ' + textStatus
    return

  return

window.valid =
  isEmail: (str) ->
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str)
# returns a boolean
  isNotEmpty: (str) ->
    return /\S+/.test(str)
# returns a boolean
  isNumber: (str) ->
    return /^[0-9]+$/.test(str)
# returns a boolean
  isEquals: (str1, str2) ->
    return str1 == str2
#returns a default
  isEmpty: (svalue, sdefault) ->
    return if svalue == "" then sdefault else svalue


window.log = () ->
  enviroment = () ->
    return /(local\.|dev\.|localhost)/gi.test(document.domain)

  if (typeof (console) != "undefined" && enviroment())
    if (typeof (console.log.apply) != "undefined")
      console.log.apply(console, arguments)
      return
    else
      console.log(Array.prototype.slice.call(arguments))
      return
  return

#Retorna el unicode humano
String::removeSigns = ->
  that = this
  table =
    ">": "Mayor de"
    "<": "Menor de"

  for esp of table
    espObj = new RegExp("[" + esp + "]", "gi")
    that = that.replace(espObj, table[esp])
  $.parseJSON "\"" + that + "\""

#remueve los acentos transformandolos a formato unicode
String::removeAccents = ->
  that = this
  espObj = null
  table =
    "ñ": "\\u00F1"
    "Ñ": "\\u00D1"
    "ç": "\\u00C7"
    ">": "Mayor de"
    "<": "Menor de"
    $: "\\u0024"
    "&": "\\u0026"
    "á": "\\u00E1"
    "à": "\\u00E0"
    "ã": "\\u00E3"
    "â": "\\u00E2"
    "ä": "\\u00E4"
    "Á": "\\u00C1"
    "À": "\\u00C0"
    "Ã": "\\u00C3"
    "Â": "\\u00C2"
    "Ä": "\\u00C4"
    "é": "\\u00E9"
    "è": "\\u00E8"
    "ë": "\\u00EB"
    "ê": "\\u00EA"
    "É": "\\u00C9"
    "È": "\\u00C8"
    "Ë": "\\u00CB"
    "Ê": "\\u00CA"
    "í": "\\u00ED"
    "ì": "\\u00EC"
    "ï": "\\u00EF"
    "î": "\\u00EE"
    "Í": "\\u00ED"
    "Ì": "\\u00EC"
    "Ï": "\\u00EF"
    "Î": "\\u00EE"
    "ó": "\\u00F3"
    "ò": "\\u00F2"
    "ö": "\\u00F6"
    "ô": "\\u00F4"
    "õ": "\\u00F5"
    "Ó": "\\u00D3"
    "Ò": "\\u00D2"
    "Ö": "\\u00D6"
    "Ô": "\\u00D4"
    "Õ": "\\u00D5"
    "ú": "\\u00FA"
    "ù": "\\u00F9"
    "ü": "\\u00FC"
    "û": "\\u00FB"
    "Ú": "\\u00DA"
    "Ù": "\\u00D9"
    "Ü": "\\u00DC"
    "Û": "\\u00DB"

  for esp of table
    espObj = new RegExp("[" + esp + "]", "gi")
    that = that.replace(espObj, table[esp])
  that

Cookie =
  create: (c, d, e) ->
    a = ""
    if e
      b = new Date()
      b.setTime b.getTime() + (e * 24 * 60 * 60 * 1000)
      a = "; expires=" + b.toGMTString()
    else
      a = ""

    #document.cookie = c + "=" + d + a + "; path=/application/busqueda/";
    document.cookie = c + "=" + d + a + "; path=/"
    this

  read: (b) ->
    e = b + "="
    a = document.cookie.split(";")
    d = 0

    while d < a.length
      f = a[d]
      f = f.substring(1, f.length)  while f.charAt(0) is " "
      return f.substring(e.length, f.length)  if f.indexOf(e) is 0
      d++
    null

  del: (a) ->
    @create a, "", -1

isArray = (element) ->
  result = false
  result = true  if Object::toString.call(element) is "[object Array]"
  result


###
yosonjs - Utils
@class utils
@main yosonjs/utils
@author Jan Sanchez
###

setTimeout(()->
  class Utils

  Utils.prototype.colorLog = (msg, color)->
    log("%c" + msg, "color:" + color + ";font-weight:bold")
    return

  Utils.prototype.loadYosonMCA = () ->
    lhref = window.location.href

    tempUrl = lhref.substr(lhref.indexOf('3000/modules/') + 12)
    tempUrl = tempUrl.replace('.html', '')
    tempUrl = tempUrl.replace('.phtml', '')
    tempUrl = tempUrl.substr(1, tempUrl.length)


    mainPath = tempUrl
    parts = mainPath.split('/')

    #if yOSON.static
    yOSON.module = parts[parts.length - 5]
    yOSON.controller = parts[parts.length - 2]
    yOSON.action = parts[parts.length - 1] || 'index'
    return

  Utils.prototype.loadStaticFiles = () ->

# Carga dinámica del module.css
    Module = document.createElement('link')
    Module.type = 'text/css'
    Module.rel = 'stylesheet'
    Module.media = 'all'
    Module.href = yOSON.statHost + 'css/modules/' + yOSON.module + '/all.css' + yOSON.statVers

    styleModule = document.getElementsByTagName('link')[document.getElementsByTagName('link').length - 1]
    styleModule.parentNode.insertBefore(Module, styleModule)

    # Carga dinámica del module-controller.css
    controller = document.createElement('link')
    controller.type = 'text/css'
    controller.rel = 'stylesheet'
    controller.media = 'all'
    controller.href = yOSON.statHost + 'css/modules/' + yOSON.module + '/' + yOSON.controller + '.css' + yOSON.statVers

    styleController = document.getElementsByTagName('link')[document.getElementsByTagName('link').length - 1]
    styleController.parentNode.insertBefore(controller, styleController)


    objDependencyManager = new yOSON.Components.DependencyManager()
    depedencies = [
      'js/dist/'+ yOSON.module +'/all/all.js',
      'js/dist/' + yOSON.module + '/' + yOSON.controller + '/' + yOSON.action + '/'+yOSON.action+'.js',
    #   'js/dist/' + yOSON.module + '/' + yOSON.controller + '/' + yOSON.action +'.js',
      'js/libs/yosonjs-utils/modules.js',
      'js/libs/yosonjs-utils/appLoad.js'
    ]
    objDependencyManager.ready(depedencies, ->
      log("librerías cargadas con éxito")
    )


  sourcePath = 'frontend/resources/'

  yOSON.utils = new Utils()

  if yOSON.static
    yOSON.utils.loadYosonMCA()
    yOSON.utils.loadStaticFiles()

  yOSON.utils.colorLog(' > ' + yOSON.module + ' | ' + yOSON.controller + ' | ' + yOSON.action, 'orange')

  yOSON.utils.colorLog(' > jade view path: ' + sourcePath + 'jade/modules/' + yOSON.module + '/' + yOSON.controller + '/' + yOSON.action + '.jade', 'gray');
  yOSON.utils.colorLog(' > coffee controller path: ' + sourcePath + 'coffee/modules/' + yOSON.module + '/' + yOSON.controller + '/', 'gray');
  yOSON.utils.colorLog(' > stylus module path: ' + sourcePath + 'stylus/modules/' + yOSON.module + '/module_' + yOSON.module + '.styl', 'green');
  yOSON.utils.colorLog(' > stylus controller path: ' + sourcePath + 'stylus/modules/' + yOSON.module + '/' + yOSON.controller + '.styl', 'green');
  yOSON.utils.colorLog(' - - - - - - - - - - - - - - - - ', 'black')
  return

, 150)
