
/*
Devuelve un funcion cuando se termino de cargar,
el numero maximo de imagenes a cargar.
@autor Jhonnatan Castro
 */
var Cookie, beforeLoadImages, capitalize, goToURL, isArray, isMobile, neo_ajax, splitColumns;

beforeLoadImages = function(oP) {
  var _fn, _st;
  _st = {
    total: oP.images.length,
    countImgLoaded: 0
  };
  _fn = {
    createImages: function(oP) {
      var i, img, source;
      log("images to load", _st.total);
      i = 0;
      while (i < _st.total) {
        source = oP.images[i];
        img = new Image();
        img.onload = function() {
          _fn.loadImages(img.src);
        };
        img.src = source;
        i++;
      }
    },
    loadImages: function(src) {
      _st.countImgLoaded++;
      log("loading image [", _st.countImgLoaded, "]", src);
      if (_st.countImgLoaded === oP.MaxNumberImagesLoad) {
        log("Max images loaded [", oP.MaxNumberImagesLoad, "]");
        oP.callback();
      }
    }
  };
  _fn.createImages(oP);
};


/*
Devuelve un array bidimensional
@autor Ronny
 */

splitColumns = function(total, columns) {
  var contar, divide_on_colums, i, myArray, z;
  contar = 0;
  myArray = [];
  divide_on_colums = Math.ceil(total / columns);
  i = 0;
  while (i < columns) {
    myArray[i] = [];
    z = 0;
    while (z < divide_on_colums) {
      myArray[i].push(contar++);
      z++;
    }
    i++;
  }
  return myArray;
};

goToURL = function(e) {
  var ele, href;
  ele = $(e.target);
  if (!ele.hasClass("track")) {
    ele = ele.parents(".track");
  }
  window.myEvent = ele.prop("tagName");
  if (ele.prop("tagName").toLowerCase() === 'a') {
    href = ele.attr("href");
    window.location.href = href;
  }
};

capitalize = function(str) {
  return str.replace(/(^|\s)([a-z])/g, function(m, $1, $2) {
    return $1 + $2.toUpperCase();
  });
};

isMobile = {
  Android: function() {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function() {
    return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
  }
};

(function($) {
  $.fn.removeClassRegEx = function(regex) {
    var classArray, classes, i, len;
    classes = $(this).attr("class");
    if (!classes || !regex) {
      return false;
    }
    classArray = [];
    classes = classes.split(" ");
    i = 0;
    len = classes.length;
    while (i < len) {
      if (!classes[i].match(regex)) {
        classArray.push(classes[i]);
      }
      i++;
    }
    $(this).attr("class", classArray.join(" "));
    return $(this);
  };
})(jQuery);

(function($) {
  return $.fn.swipe = function(callback) {
    var $el, originalPosition, swipeInfo, touchDown;
    touchDown = false;
    originalPosition = null;
    $el = $(this);
    swipeInfo = function(event) {
      var dx, dy, eoriginal, x, y;
      eoriginal = typeof event.originalEvent.targetTouches === 'undefined' ? event.originalEvent : event.originalEvent.targetTouches[0];
      x = eoriginal.pageX;
      y = eoriginal.pageY;
      dx = void 0;
      dy = void 0;
      dx = x > originalPosition.x ? 'right' : 'left';
      dy = y > originalPosition.y ? 'down' : 'up';
      return {
        direction: {
          x: dx,
          y: dy
        },
        offset: {
          x: x - originalPosition.x,
          y: originalPosition.y - y
        }
      };
    };
    $el.on('touchstart mousedown', function(event) {
      var eoriginal;
      touchDown = true;
      eoriginal = typeof event.originalEvent.targetTouches === 'undefined' ? event.originalEvent : event.originalEvent.targetTouches[0];
      originalPosition = {
        x: eoriginal.pageX,
        y: eoriginal.pageY
      };
    });
    $el.on('touchend mouseup', function() {
      touchDown = false;
      originalPosition = null;
    });
    $el.on('touchmove mousemove', function(event) {
      var info;
      if (!touchDown) {
        return;
      }
      info = swipeInfo(event);
      callback(info.direction, info.offset);
    });
    return true;
  };
})(jQuery);

window.request = null;

neo_ajax = function(obj, loader, callbackSuccess, callbackError) {
  if (typeof obj !== "object") {
    log("neo_ajax: error param obj");
    return;
  }
  if (typeof obj.url === "undefined") {
    log("neo_ajax: obj.url is necesary");
    return;
  }
  window.request = $.ajax({
    url: obj.url,
    method: typeof obj.method !== "undefined" ? obj.method : 'GET',
    dataType: typeof obj.type !== "undefined" ? obj.type : 'html',
    data: typeof obj.data !== "undefined" ? obj.data : '',
    cache: true,
    beforeSend: function() {
      loader.show();
      if (window.request !== null) {
        window.request.abort();
      }
    }
  });
  window.request.done(function(result) {
    loader.hide();
    if (typeof callbackSuccess === "function") {
      callbackSuccess(result);
    } else {
      log("parametro ajax callback error");
    }
  });
  window.request.fail(function(jqXHR, textStatus) {
    loader.hide();
    if (typeof callbackError === "function") {
      callbackError(jqXHR);
    } else {
      log('Request failed: ' + textStatus);
    }
  });
};

window.valid = {
  isEmail: function(str) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str);
  },
  isNotEmpty: function(str) {
    return /\S+/.test(str);
  },
  isNumber: function(str) {
    return /^[0-9]+$/.test(str);
  },
  isEquals: function(str1, str2) {
    return str1 === str2;
  },
  isEmpty: function(svalue, sdefault) {
    if (svalue === "") {
      return sdefault;
    } else {
      return svalue;
    }
  }
};

window.log = function() {
  var enviroment;
  enviroment = function() {
    return /(local\.|dev\.|localhost)/gi.test(document.domain);
  };
  if (typeof console !== "undefined" && enviroment()) {
    if (typeof console.log.apply !== "undefined") {
      console.log.apply(console, arguments);
      return;
    } else {
      console.log(Array.prototype.slice.call(arguments));
      return;
    }
  }
};

String.prototype.removeSigns = function() {
  var esp, espObj, table, that;
  that = this;
  table = {
    ">": "Mayor de",
    "<": "Menor de"
  };
  for (esp in table) {
    espObj = new RegExp("[" + esp + "]", "gi");
    that = that.replace(espObj, table[esp]);
  }
  return $.parseJSON("\"" + that + "\"");
};

String.prototype.removeAccents = function() {
  var esp, espObj, table, that;
  that = this;
  espObj = null;
  table = {
    "ñ": "\\u00F1",
    "Ñ": "\\u00D1",
    "ç": "\\u00C7",
    ">": "Mayor de",
    "<": "Menor de",
    $: "\\u0024",
    "&": "\\u0026",
    "á": "\\u00E1",
    "à": "\\u00E0",
    "ã": "\\u00E3",
    "â": "\\u00E2",
    "ä": "\\u00E4",
    "Á": "\\u00C1",
    "À": "\\u00C0",
    "Ã": "\\u00C3",
    "Â": "\\u00C2",
    "Ä": "\\u00C4",
    "é": "\\u00E9",
    "è": "\\u00E8",
    "ë": "\\u00EB",
    "ê": "\\u00EA",
    "É": "\\u00C9",
    "È": "\\u00C8",
    "Ë": "\\u00CB",
    "Ê": "\\u00CA",
    "í": "\\u00ED",
    "ì": "\\u00EC",
    "ï": "\\u00EF",
    "î": "\\u00EE",
    "Í": "\\u00ED",
    "Ì": "\\u00EC",
    "Ï": "\\u00EF",
    "Î": "\\u00EE",
    "ó": "\\u00F3",
    "ò": "\\u00F2",
    "ö": "\\u00F6",
    "ô": "\\u00F4",
    "õ": "\\u00F5",
    "Ó": "\\u00D3",
    "Ò": "\\u00D2",
    "Ö": "\\u00D6",
    "Ô": "\\u00D4",
    "Õ": "\\u00D5",
    "ú": "\\u00FA",
    "ù": "\\u00F9",
    "ü": "\\u00FC",
    "û": "\\u00FB",
    "Ú": "\\u00DA",
    "Ù": "\\u00D9",
    "Ü": "\\u00DC",
    "Û": "\\u00DB"
  };
  for (esp in table) {
    espObj = new RegExp("[" + esp + "]", "gi");
    that = that.replace(espObj, table[esp]);
  }
  return that;
};

Cookie = {
  create: function(c, d, e) {
    var a, b;
    a = "";
    if (e) {
      b = new Date();
      b.setTime(b.getTime() + (e * 24 * 60 * 60 * 1000));
      a = "; expires=" + b.toGMTString();
    } else {
      a = "";
    }
    document.cookie = c + "=" + d + a + "; path=/";
    return this;
  },
  read: function(b) {
    var a, d, e, f;
    e = b + "=";
    a = document.cookie.split(";");
    d = 0;
    while (d < a.length) {
      f = a[d];
      while (f.charAt(0) === " ") {
        f = f.substring(1, f.length);
      }
      if (f.indexOf(e) === 0) {
        return f.substring(e.length, f.length);
      }
      d++;
    }
    return null;
  },
  del: function(a) {
    return this.create(a, "", -1);
  }
};

isArray = function(element) {
  var result;
  result = false;
  if (Object.prototype.toString.call(element) === "[object Array]") {
    result = true;
  }
  return result;
};


/*
yosonjs - Utils
@class utils
@main yosonjs/utils
@author Jan Sanchez
 */

setTimeout(function() {
  var Utils, sourcePath;
  Utils = (function() {
    function Utils() {}

    return Utils;

  })();
  Utils.prototype.colorLog = function(msg, color) {
    log("%c" + msg, "color:" + color + ";font-weight:bold");
  };
  Utils.prototype.loadYosonMCA = function() {
    var lhref, mainPath, parts, tempUrl;
    lhref = window.location.href;
    tempUrl = lhref.substr(lhref.indexOf('3000/modules/') + 12);
    tempUrl = tempUrl.replace('.html', '');
    tempUrl = tempUrl.replace('.phtml', '');
    tempUrl = tempUrl.substr(1, tempUrl.length);
    mainPath = tempUrl;
    parts = mainPath.split('/');
    yOSON.module = parts[parts.length - 5];
    yOSON.controller = parts[parts.length - 2];
    yOSON.action = parts[parts.length - 1] || 'index';
  };
  Utils.prototype.loadStaticFiles = function() {
    var Module, controller, depedencies, objDependencyManager, styleController, styleModule;
    Module = document.createElement('link');
    Module.type = 'text/css';
    Module.rel = 'stylesheet';
    Module.media = 'all';
    Module.href = yOSON.statHost + 'css/modules/' + yOSON.module + '/all.css' + yOSON.statVers;
    styleModule = document.getElementsByTagName('link')[document.getElementsByTagName('link').length - 1];
    styleModule.parentNode.insertBefore(Module, styleModule);
    controller = document.createElement('link');
    controller.type = 'text/css';
    controller.rel = 'stylesheet';
    controller.media = 'all';
    controller.href = yOSON.statHost + 'css/modules/' + yOSON.module + '/' + yOSON.controller + '.css' + yOSON.statVers;
    styleController = document.getElementsByTagName('link')[document.getElementsByTagName('link').length - 1];
    styleController.parentNode.insertBefore(controller, styleController);
    objDependencyManager = new yOSON.Components.DependencyManager();
    depedencies = ['js/dist/' + yOSON.module(+'/all/all.js', 'js/dist/' + yOSON.module + '/' + yOSON.controller + '/' + yOSON.action + '/' + yOSON.action + '.js', 'js/libs/yosonjs-utils/modules.js', 'js/libs/yosonjs-utils/appLoad.js')];
    return objDependencyManager.ready(depedencies, function() {
      return log("librerías cargadas con éxito");
    });
  };
  sourcePath = 'frontend/resources/';
  yOSON.utils = new Utils();
  if (yOSON["static"]) {
    yOSON.utils.loadYosonMCA();
    yOSON.utils.loadStaticFiles();
  }
  yOSON.utils.colorLog(' > ' + yOSON.module + ' | ' + yOSON.controller + ' | ' + yOSON.action, 'orange');
  yOSON.utils.colorLog(' > jade view path: ' + sourcePath + 'jade/modules/' + yOSON.module + '/' + yOSON.controller + '/' + yOSON.action + '.jade', 'gray');
  yOSON.utils.colorLog(' > coffee controller path: ' + sourcePath + 'coffee/modules/' + yOSON.module + '/' + yOSON.controller + '/', 'gray');
  yOSON.utils.colorLog(' > stylus module path: ' + sourcePath + 'stylus/modules/' + yOSON.module + '/module_' + yOSON.module + '.styl', 'green');
  yOSON.utils.colorLog(' > stylus controller path: ' + sourcePath + 'stylus/modules/' + yOSON.module + '/' + yOSON.controller + '.styl', 'green');
  yOSON.utils.colorLog(' - - - - - - - - - - - - - - - - ', 'black');
}, 150);
