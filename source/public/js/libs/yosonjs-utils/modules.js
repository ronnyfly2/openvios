yOSON.AppSchema.modules = {
  "inicio": {
    "controllers": {
      "inicio": {
        "allActions": function() {},
        "actions": {
          "index": function() {
            yOSON.AppCore.runModule("getMap");
            yOSON.AppCore.runModule("getTab");
          },
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
  }
};
