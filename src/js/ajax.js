/**
 * Created by Vova on 22.03.2017.
 */
var Ajax = {};

Ajax.createXHR = function (url, options) {
    var xhr = false;

    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if(window.ActiveXObject) {
        try {
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        } catch (eror) {
            xhr = false;
        }
    }

    if (xhr) {
        options = options || {};
        options.method = options.method || 'GET';
        options.data = options.data || null;
        options.async = options.async || true;

        if(options.data) {
            var qstring = [];

            for(var key in options.data) {
                qstring.push(encodeURIComponent(key) + '=' + encodeURIComponent(options.data[key]));

                options.data = qstring.join('&');
            }
        }

        xhr.onreadystatechange = function () {
            if(xhr.readyState == 1) {
                if(options.loading) {
                    options.loading.call(xhr);
                }

            }
            if((xhr.readyState == 4) && (xhr.status == 200 || xhr.status == 304)) {
                var contentType = xhr.getResponseHeader('Content-type');

                if(options.complete) {
                    if(contentType == 'application/json') {
                        options.complete.call(xhr, JSON.parse(xhr.responseText));
                    } else if(contentType == 'text/xml' || contentType == 'application/xml') {
                        options.complete.call(xhr, xhr.responseXML);
                    } else {
                        options.complete.call(xhr, xhr.responseText);
                    }
                }
            }
        };

        xhr.open(options.method, url, options.async);
        return xhr;
    } else {
        return false;
    }
};

Ajax.send = function (url, options) {
    var xhr = Ajax.createXHR(url, options);

    if (xhr) {
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

        if(options.method.toUpperCase() == 'POST') {
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }
        xhr.send(options.data);
    }
};