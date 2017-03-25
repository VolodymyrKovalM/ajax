/**
 * Created by Vova on 22.03.2017.
 */

(function () {

    var link = document.getElementsByTagName('a')[0];

    link.onclick = function () {

        Ajax.send('files/ajax.html', {
            complete: function (data) {
                console.log(data);
                var body = document.getElementsByTagName('body')[0];
                var d = document.createElement('div');
                d.innerHTML = data;
                body.appendChild(d);
            }
        });

        return false;
    };

    var form = document.getElementsByTagName('form')[0];
    var btn = document.getElementById('sub');
    /*form.onsubmit = function (e) {
        e.preventDefault();
        var emailVal = this.getElementById('email').value;
        var url = this.getAttribute('action');

        Ajax.send(url, {
            method: 'POST',
            data: {
                email: emailVal
            },
            complete: function(response) {
                var body = document.getElementsByTagName('body')[0];
                var d = document.createElement('div');
                body.appendChild(d);
                var div = document.getElementsByTagName('div')[0];
                div.innerHTML = response;
                console.log(response);

            }
        });
        console.log(this);
        return false;
    };*/

    btn.onclick = function () {
        var emailVal = document.getElementById('email').value;
        var url = form.getAttribute('action');

        var body = document.getElementsByTagName('body')[0];
        var d = document.createElement('div');
        body.appendChild(d);
        var div = document.getElementsByTagName('div')[0];

        Ajax.send(url, {
            method: 'POST',
            data: {
                email: emailVal
            },
            loading: function () {
                div.innerHTML = 'Loading...'
            },
            complete: function(response) {

                div.innerHTML = response;
                console.log(response);

            }
        });

        return false;
    };
})();
