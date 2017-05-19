yOSON.AppSchema.modules =
	"inicio":
		"controllers":
			"inicio":
				"allActions": ()->
					return
				"actions":
					"index": ()->
						yOSON.AppCore.runModule "getMap"
						yOSON.AppCore.runModule "getTab"
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
		return
