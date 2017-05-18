yOSON.AppSchema.modules =
	"inicio":
		"controllers":
			"inicio":
				"allActions": ()->
					return
				"actions":
					"index": ()->
						yOSON.AppCore.runModule "getMap"
						return
					"byDefault": () ->
						return
			"byDefault": () ->
				return
		"byDefault": () ->
			return
		"allControllers": () ->
			##yOSON.AppCore.runModule "initDataTable"
			return
	"byDefault": () ->
		return
	"allModules": () ->
		yOSON.AppCore.runModule "activeMenu"
		yOSON.AppCore.runModule "getBgImage"
		#yOSON.AppCore.runModule "initSelect"
		#yOSON.AppCore.runModule "rippleEfect"
		#yOSON.AppCore.runModule "menuNav"
		return
