// Copyright (c) CBC/Radio-Canada. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import template from 'text!./image-loader.html';
import $ from 'jquery';
import ko from 'knockout';


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
var KocoImageLoader = function(params, componentInfo) {

    // componentInfo contains info of the DOM
    var options = $.extend({
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

    var $element = $(componentInfo.element);

    // this classname allows for adding the default image through css
    $element.addClass(options.defaultImgClassName);

    $element.css('width', options.width);
    $element.css('height', options.height);

    // we check the status of this image
    var img = $('<img />').load(function() {
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

            $(img).attr('width', imgWidth);
            $(img).attr('height', imgHeight);
        })
        .error(function(jqXHR, error, errorThrown) {
            if (options.error.display) {
                $element.removeClass(options.defaultImgClassName);
                $element.addClass(options.error.className);

                if (jqXHR.status && jqXHR.status == 404) {
                    // at this point display a message

                } else {
                    // at this point display a message
                }
            }
        })
        .attr('src', ko.unwrap(options.src));

};

KocoImageLoader.prototype.dispose = function() {};

export default {
    viewModel: {
        createViewModel: function(params, componentInfo) {
            return new KocoImageLoader(params, componentInfo);
        }
    },
    template: template
};
