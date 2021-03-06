(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'jquery', 'knockout'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('jquery'), require('knockout'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.jquery, global.knockout);
        global.imageLoaderUi = mod.exports;
    }
})(this, function (exports, _jquery, _knockout) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _jquery2 = _interopRequireDefault(_jquery);

    var _knockout2 = _interopRequireDefault(_knockout);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    /**
     * Constructor
     *
     * @param {Object} params - The parameters passed to the imageLoader
     * @param {Object} params.width - default width of the image (optional)
     * @param {Object} params.height - default height of the image (optional)
     * @param {Object} params.defaultImgClassName - default className for the blank image (optional)
     * @param {Object} params.errorOptions - 
     *
     * @param {Object} componentInfo - Information on the component (its DOM element, name etc...)
     * 
     */
    // Copyright (c) CBC/Radio-Canada. All rights reserved.
    // Licensed under the MIT license. See LICENSE file in the project root for full license information.

    var KocoImageLoader = function KocoImageLoader(params, componentInfo) {

        // componentInfo contains info of the DOM
        var options = _jquery2.default.extend({
            width: 256,
            height: 256,
            src: null,
            defaultImgClassName: 'default-img',
            error: {
                className: 'default-error',
                display: false
            },
            autoRatio: false
        }, params);

        var $element = (0, _jquery2.default)(componentInfo.element);

        // this classname allows for adding the default image through css
        $element.addClass(options.defaultImgClassName);

        $element.css('width', options.width);
        $element.css('height', options.height);

        // we check the status of this image
        var img = (0, _jquery2.default)('<img />').load(function () {
            $element.removeClass(options.defaultImgClassName);
            $element.html(img);

            var imgWidth = options.width;
            var imgHeight = options.height;

            if (options.autoRatio) {
                var oWidth = img.width();
                var oHeight = img.height();

                imgHeight = oHeight / oWidth * options.width;
                $element.css('height', imgHeight);
            }

            (0, _jquery2.default)(img).attr('width', imgWidth);
            (0, _jquery2.default)(img).attr('height', imgHeight);
        }).error(function (jqXHR, error, errorThrown) {
            if (options.error.display) {
                $element.removeClass(options.defaultImgClassName);
                $element.addClass(options.error.className);

                if (jqXHR.status && jqXHR.status == 404) {
                    // at this point display a message

                } else {
                        // at this point display a message
                    }
            }
        }).attr('src', _knockout2.default.unwrap(options.src));
    };

    KocoImageLoader.prototype.dispose = function () {};

    exports.default = {
        viewModel: {
            createViewModel: function createViewModel(params, componentInfo) {
                return new KocoImageLoader(params, componentInfo);
            }
        },
        template: template
    };
});