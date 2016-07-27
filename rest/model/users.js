var stub = [];
stub[1] = {
    id: 1,
    name: 'Sample Boss',
    iswheel: true,
    iconClass: ''
};
stub[100] = {
    id: 100,
    name: 'Sample User',
    iswheel: false,
    iconClass: ''
};

var accessor = {
    get: function(id) {
        return stub[id];
    },

    set: function(id, obj) {
        if (!stub[id]) return false;

        stub[id] = obj;
        return true;
    },

    query: function(q) {
        var cooked = [];

        // tbd.
        stub.forEach(function(elm, idx) {
            cooked.push(elm);
        });

        return cooked;
    }
};

module.exports = accessor;
