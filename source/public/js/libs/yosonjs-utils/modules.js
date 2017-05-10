yOSON.AppSchema.modules = {
  "inicio": {
    "controllers": {
      "inicio": {
        "allActions": function() {},
        "actions": {
          "index": function() {
            yOSON.AppCore.runModule("sliderCarousel");
            yOSON.AppCore.runModule("scrollBar");
            yOSON.AppCore.runModule("birtDays");
          },
          "byDefault": function() {}
        }
      },
      "byDefault": function() {}
    },
    "byDefault": function() {},
    "allControllers": function() {}
  },
  "admin": {
    "controllers": {
      "menu": {
        "allActions": function() {},
        "actions": {
          "index": function() {
            yOSON.AppCore.runModule("createMenu");
          },
          "byDefault": function() {}
        }
      },
      "app": {
        "allActions": function() {
          yOSON.AppCore.runModule("addApp");
        },
        "actions": {
          "index": function() {},
          "byDefault": function() {}
        }
      },
      "version": {
        "allActions": function() {
          yOSON.AppCore.runModule("versionApp");
        },
        "actions": {
          "show": function() {},
          "byDefault": function() {}
        }
      },
      "dashboard": {
        "allActions": function() {},
        "actions": {
          "index": function() {
            yOSON.AppCore.runModule("dashboard");
          },
          "byDefault": function() {}
        }
      },
      "matrix": {
        "allActions": function() {},
        "actions": {
          "show": function() {
            yOSON.AppCore.runModule("matrix");
          },
          "byDefault": function() {}
        }
      },
      "insurance": {
        "allActions": function() {},
        "actions": {
          "show": function() {
            yOSON.AppCore.runModule("getUpImage");
          },
          "create": function() {
            yOSON.AppCore.runModule("getUpImage");
          },
          "byDefault": function() {}
        }
      },
      "brand": {
        "allActions": function() {},
        "actions": {
          "byDefault": function() {}
        }
      },
      "model": {
        "allActions": function() {},
        "actions": {
          "byDefault": function() {}
        }
      },
      "role": {
        "allActions": function() {},
        "actions": {
          "index": function() {
            yOSON.AppCore.runModule("role_index");
          },
          "byDefault": function() {}
        }
      },
      "broker": {
        "allActions": function() {},
        "actions": {
          "index": function() {
            yOSON.AppCore.runModule("broker_index");
          },
          "byDefault": function() {
            yOSON.AppCore.runModule("broker_index");
          }
        }
      },
      "soat": {
        "allActions": function() {
          yOSON.AppCore.runModule("legible");
          yOSON.AppCore.runModule("validatesPendings");
        },
        "actions": {
          "byDefault": function() {}
        }
      },
      "byDefault": function() {}
    },
    "byDefault": function() {},
    "allControllers": function() {}
  },
  "byDefault": function() {},
  "allModules": function() {
    yOSON.AppCore.runModule("activeMenu");
    yOSON.AppCore.runModule("getBgImage");
    yOSON.AppCore.runModule("initSelect");
  }
};
