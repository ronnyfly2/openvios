var acti, ctrl, modu;

modu = yOSON.module;

ctrl = yOSON.controller;

acti = yOSON.action;

yOSON.AppSchema.modules.allModules();

if (modu === "" || !yOSON.AppSchema.modules.hasOwnProperty(modu)) {
  yOSON.AppSchema.modules.byDefault();
} else {
  yOSON.AppSchema.modules[modu].allControllers();
  if (ctrl === "" || !yOSON.AppSchema.modules[modu].controllers.hasOwnProperty(ctrl)) {
    yOSON.AppSchema.modules[modu].controllers.byDefault();
  } else {
    yOSON.AppSchema.modules[modu].controllers[ctrl].allActions();
    if (acti === "" || !yOSON.AppSchema.modules[modu].controllers[ctrl].actions.hasOwnProperty(acti)) {
      yOSON.AppSchema.modules[modu].controllers[ctrl].actions.byDefault();
    } else {
      yOSON.AppSchema.modules[modu].controllers[ctrl].actions[acti]();
    }
  }
}
