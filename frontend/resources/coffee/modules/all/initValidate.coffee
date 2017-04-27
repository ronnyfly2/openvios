yOSON.AppCore.addModule "initValidate", (Sb) ->
    st = {}
    defaults =
        formValidate:".content_form form"
        btnForm: ".content_form form .btn_submit[type=submit]"
        btnBack: ".link_btn"
        txtNoSpace: ".no_space"
    dom = {}
    catchDom = (st)->
        dom.btnForm = $(st.btnForm)
        dom.formValidate = $(st.formValidate)
        dom.btnBack = $(st.btnBack)
        dom.txtNoSpace = $(st.txtNoSpace)
        return
    suscribeEvents = ()->
        $('input').on 'keyup', events.pressEnter
        dom.btnBack.on 'click', events.linkBack
        dom.txtNoSpace.on 'input', events.noSpace
        $('.upercase input[type=text]').on 'input', events.upPercase
        if dom.formValidate.length > 0
            dom.formValidate.parsley().on 'form:submit', events.getParsleySubmit
            dom.formValidate.parsley().on 'form:validate', events.getParsleyValidate
        return
    events =
        upPercase:()->
            textChange = $(this).val()
            $(this).val(textChange.toUpperCase())
            return
        noSpace:()->
            noSpaceIn= $(this).val()
            noSpaceIn= noSpaceIn.replace(/\s/g,"")
            $(this).val(noSpaceIn)
            return
        getParsleyValidate: (e)->
            if $('.img_server').length > 0
                imageDB = $('.img_server').attr('data-image')
                if imageDB != ''
                    # dom.formValidate.parsley().validate()
                    $('.file_upload').attr('data-parsley-required', 'false')
                else
                    events.initValidateImg(e)
            return
        getParsleySubmit:(e)->
            if dom.formValidate.parsley().isValid()
                utils.loader $('.content_form'), true
            return
        pressEnter:(e)->
            if e.which == 13
                $(e.target).blur()
                return
        initValidateImg: (e)->
            if $('.img_server').val() !=''
                $('.img_server').parents('.upload').siblings('.advise').removeClass('error_file')
            else
                e.submitEvent.preventDefault()
                utils.loader $('.content_form'), false
                $('.img_server').parents('.upload').siblings('.advise').addClass('error_file')
            return
        linkBack:()->
            urlAbsolute = window.location.href
            temporal = urlAbsolute.split('//')
            protocol = temporal[0]
            urlPage = temporal[1]
            arrTemporal = urlPage.split('/')
            if urlPage.split('/').pop() == 'edit'
                arrTemporal.length = arrTemporal.length - 2
                newUrlPage = arrTemporal.join('/')
                window.location = 'http://'+ newUrlPage
            else
                arrTemporal.length = arrTemporal.length - 1
                newUrlPage = arrTemporal.join('/')
                window.location = 'http://'+ newUrlPage
            return
    initialize = (opts) ->
        st = $.extend({}, defaults, opts)
        catchDom(st)
        suscribeEvents()
        return

    return {
        init: initialize
    }
,["/js/libs/parsleyjs/dist/parsley.js",
  "/js/libs/parsleyjs/src/i18n/es.js",
  "/js/libs/jq-utils/jq-utils.js"]
