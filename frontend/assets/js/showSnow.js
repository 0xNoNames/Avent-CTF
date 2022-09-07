import * as Snow from './snow.js'

window.onload = function () {
    var snow = new Snow.default({
        id: 'snow',
        theme: 'pastel',
        min_size: 1,
        max_size: 5
    });
    snow.start();
}