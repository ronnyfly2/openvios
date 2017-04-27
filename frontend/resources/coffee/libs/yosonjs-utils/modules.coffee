yOSON.AppSchema.modules =
	"inicio":
		"controllers":
			"inicio":
				"allActions": ()->
					return
				"actions":
					"index": ()->
						yOSON.AppCore.runModule "sliderCarousel"
						yOSON.AppCore.runModule "scrollBar"
						yOSON.AppCore.runModule "birtDays"
						return
					"byDefault": () ->
						return
			"byDefault": () ->
				return
		"byDefault": () ->
			return
		"allControllers": () ->
			return
	"admin":
		"controllers":
			"menu":
				"allActions": ()->
					return
				"actions":
					"index": ()->
						yOSON.AppCore.runModule "createMenu"
						return
					"byDefault": () ->
						return
			"app":
				"allActions": ()->
					yOSON.AppCore.runModule "addApp"
					return
				"actions":
					"index": ()->
						# yOSON.AppCore.runModule "createApp"
						return
					"byDefault": () ->
						return
			"version":
				"allActions": ()->
					yOSON.AppCore.runModule "versionApp"
					return
				"actions":
					"show": ()->
						return
					"byDefault": () ->
						return
			"dashboard":
				"allActions": ()->
					return
				"actions":
					"index": ()->
						yOSON.AppCore.runModule "dashboard"
						return
					"byDefault": () ->
						return
			"matrix":
				"allActions": ()->
					return
				"actions":
					"show": ()->
						yOSON.AppCore.runModule "matrix"
						return
					"byDefault": () ->
						return
			"insurance":
				"allActions": ()->
					return
				"actions":
					"show": ()->
						yOSON.AppCore.runModule "getUpImage"
						return
					"create": ()->
						yOSON.AppCore.runModule "getUpImage"
						return
					"byDefault": () ->
						return
			"brand":
				"allActions": ()->
					return
				"actions":
					"byDefault": () ->
						return
			"model":
				"allActions": ()->
					return
				"actions":
					"byDefault": () ->
						return
			"role":
				"allActions": ()->
					return
				"actions":
					"index": () ->
						yOSON.AppCore.runModule "role_index"
						return
					"byDefault": () ->
						return
			"broker":
				"allActions": ()->
					return
				"actions":
					"index": ()->
						yOSON.AppCore.runModule "broker_index"
						return
					"byDefault": () ->
						yOSON.AppCore.runModule "broker_index"
						return
			"soat":
				"allActions": ()->
					yOSON.AppCore.runModule "legible"
					yOSON.AppCore.runModule "validatesPendings"
					return
				"actions":
					"byDefault": () ->
						return
			"byDefault": () ->
				return
		"byDefault": () ->
			return
		"allControllers": () ->
			##yOSON.AppCore.runModule "initDataTable"
			##yOSON.AppCore.runModule "initAlert"
			##yOSON.AppCore.runModule "initValidate"
			##yOSON.AppCore.runModule "selectTwoInit"
			##yOSON.AppCore.runModule "initUbigeo"
			return
	"byDefault": () ->
		return
	"allModules": () ->
		yOSON.AppCore.runModule "activeMenu"
		yOSON.AppCore.runModule "getBgImage"
		yOSON.AppCore.runModule "initSelect"
		#yOSON.AppCore.runModule "rippleEfect"
		#yOSON.AppCore.runModule "menuNav"
		return
