var stub = {};
stub.boss1 = {
  id: 'boss1',
  name: 'Sample Boss',
  iswheel: true,
  iconClass: ''
};
stub.user1 = {
  id: 'user1',
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
    for (var key in stub) {
      if (stub.hasOwnProperty(key)) {
        cooked.push(stub[key]);
      }
    }

    return cooked;
  }
};

module.exports = accessor;
